import { octokit } from "@/api/octokit";
import { getTree } from "@/api/github";
import { parsePrId } from "@/lib/format";
import type { CodeTreeRow } from "@/components/CodeTreeTable";

// Builds the top-level file/folder table with each entry's most recent commit.
//
// This deliberately keeps the original N+1 shape: one `listCommits({ path })`
// request per tree entry. It could be collapsed into a single `listCommits`
// walk (or one GraphQL query), but that is left for later to keep the output
// and request count identical to the pre-Octokit implementation.

async function getLastCommitForPath(owner: string, repo: string, path: string) {
  const { data } = await octokit.rest.repos.listCommits({ owner, repo, path });
  const last = data[0];
  return {
    commitMessage: last?.commit?.message ?? "",
    lastModified: last?.commit?.committer?.date ?? "",
    commitMessageUrl: last?.html_url ?? "",
    prId: parsePrId(last?.commit?.message),
  };
}

export async function getTreeWithLatestCommit(
  owner: string,
  repo: string,
  branch: string,
): Promise<CodeTreeRow[]> {
  const { data: commit } = await octokit.rest.repos.getCommit({
    owner,
    repo,
    ref: branch,
  });
  const tree = await getTree(owner, repo, commit.commit.tree.sha);

  let filesAndFolders: CodeTreeRow[] = await Promise.all(
    tree.tree.map(async (item) => {
      const path = item.path ?? "";
      const { commitMessage, lastModified, commitMessageUrl, prId } =
        await getLastCommitForPath(owner, repo, path);
      return {
        type: item.type === "blob" ? "file" : "folder",
        fileName: path,
        commitMessage,
        commitMessageUrl,
        prId,
        lastModified,
      };
    }),
  );

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
