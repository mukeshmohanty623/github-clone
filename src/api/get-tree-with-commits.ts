import { octokit } from "@/api/octokit";
import { parsePrId } from "@/lib/format";
import type { CodeTreeRow } from "@/components/CodeTreeTable";

// Builds the top-level file/folder table with each entry's most recent commit.
//
// The previous implementation issued one `listCommits({ path })` REST call per
// tree entry (N+1 fan-out) — ~40 requests for a repo like facebook/react, which
// was both slow and prone to GitHub throttling / socket timeouts. This version
// resolves every entry's latest commit in a SINGLE GraphQL request by aliasing
// a `history(first: 1, path: ...)` field per entry. The caller supplies the
// already-fetched root tree entries, so this adds just one request total.

// Structural shape of a root tree entry (matches `octokit.rest.git.getTree`).
type TreeEntry = { path?: string; type?: string };

type CommitNode = {
  message: string;
  committedDate: string;
  url: string;
};

// GitHub GraphQL caps query cost; chunk very large root trees to stay well
// under it (a single `history(first: 1)` alias is cheap, so this is generous).
const MAX_ALIASES_PER_QUERY = 100;

async function fetchLatestCommitByPath(
  owner: string,
  repo: string,
  ref: string,
  paths: string[],
): Promise<Map<string, CommitNode>> {
  const result = new Map<string, CommitNode>();

  for (let start = 0; start < paths.length; start += MAX_ALIASES_PER_QUERY) {
    const chunk = paths.slice(start, start + MAX_ALIASES_PER_QUERY);

    const varDecls = chunk.map((_, i) => `$p${i}: String!`).join(", ");
    const aliases = chunk
      .map(
        (_, i) =>
          `f${i}: history(first: 1, path: $p${i}) { nodes { message committedDate url } }`,
      )
      .join("\n");

    const variables: Record<string, string> = { owner, repo, ref };
    chunk.forEach((path, i) => {
      variables[`p${i}`] = path;
    });

    const query = `
      query ($owner: String!, $repo: String!, $ref: String!, ${varDecls}) {
        repository(owner: $owner, name: $repo) {
          object(expression: $ref) {
            ... on Commit {
              ${aliases}
            }
          }
        }
      }
    `;

    const data = await octokit.graphql<{
      repository: {
        object: Record<string, { nodes: CommitNode[] }> | null;
      } | null;
    }>(query, variables);

    const commit = data.repository?.object ?? {};
    chunk.forEach((path, i) => {
      const node = commit[`f${i}`]?.nodes?.[0];
      if (node) result.set(path, node);
    });
  }

  return result;
}

export async function getTreeWithLatestCommit(
  owner: string,
  repo: string,
  ref: string,
  entries: TreeEntry[],
): Promise<CodeTreeRow[]> {
  const named = (entries ?? []).filter(
    (e): e is TreeEntry & { path: string } =>
      typeof e.path === "string" && e.path.length > 0,
  );

  const commitByPath = await fetchLatestCommitByPath(
    owner,
    repo,
    ref,
    named.map((e) => e.path),
  );

  let filesAndFolders: CodeTreeRow[] = named.map((entry) => {
    const last = commitByPath.get(entry.path);
    return {
      type: entry.type === "blob" ? "file" : "folder",
      fileName: entry.path,
      commitMessage: last?.message ?? "",
      commitMessageUrl: last?.url ?? "",
      prId: parsePrId(last?.message),
      lastModified: last?.committedDate ?? "",
    };
  });

  filesAndFolders = filesAndFolders.sort((a, b) => {
    if (a.type === b.type) {
      if (a.fileName[0] === b.fileName[0]) {
        return a.fileName.localeCompare(b.fileName);
      }
      if (
        a.fileName[0].toUpperCase() === a.fileName[0] &&
        b.fileName[0].toUpperCase() !== b.fileName[0]
      ) {
        return -1;
      }
      if (
        a.fileName[0].toUpperCase() !== a.fileName[0] &&
        b.fileName[0].toUpperCase() === b.fileName[0]
      ) {
        return 1;
      }
      return a.fileName.localeCompare(b.fileName);
    }
    return a.type === "folder" ? -1 : 1;
  });

  return filesAndFolders;
}
