import { octokit } from "@/api/octokit";
import { parsePrId } from "@/lib/format";

// Thin typed wrappers around Octokit REST methods. Each returns the parsed
// `.data` payload (not a `Response`). Error handling / fallbacks live in the
// caller (`get-repo-view-model.ts`) so these stay predictable.
//
// `repos.get` itself lives in `octokit.ts` as the request-memoized `getRepo`.

export async function getUser(username: string) {
  const { data } = await octokit.rest.users.getByUsername({ username });
  return data;
}

// `mediaType: { format: "raw" }` makes GitHub return the file body directly, so
// `data` is the markdown string — no base64 decode, no separate `download_url`
// text fetch. Octokit's types still describe the JSON object, hence the cast.
export async function getReadmeRaw(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.getReadme({
    owner,
    repo,
    mediaType: { format: "raw" },
  });
  return data as unknown as string;
}

// Second call with the default media type, only for the `html`-ish `url` the
// About sidebar links to.
export async function getReadmeMeta(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.getReadme({ owner, repo });
  return data;
}

export async function getRawContent(owner: string, repo: string, path: string) {
  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
    mediaType: { format: "raw" },
  });
  return data as unknown as string;
}

// Fetch raw file content from an absolute GitHub API URL (used for the
// community-profile Code of Conduct fallback, whose file is referenced only by
// URL, not by repo-relative path).
export async function getRawContentByUrl(url: string) {
  const { data } = await octokit.request({
    method: "GET",
    url,
    mediaType: { format: "raw" },
  });
  return data as unknown as string;
}

export async function getReleases(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.listReleases({ owner, repo });
  return data;
}

export async function getContributors(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.listContributors({ owner, repo });
  return data;
}

export async function getDeployments(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.listDeployments({ owner, repo });
  return data;
}

export async function getCommunityProfile(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.getCommunityProfileMetrics({
    owner,
    repo,
  });
  return data;
}

export async function getBranches(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.listBranches({ owner, repo });
  return data;
}

export async function getTags(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.listTags({ owner, repo });
  return data;
}

export async function getTree(owner: string, repo: string, treeSha: string) {
  const { data } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: treeSha,
  });
  return data;
}

// Reshaped to the fields `CodeTreeTableProps` spreads in. `totalCommits` has
// always been a hardcoded placeholder.
export async function getLastCommitDetails(
  owner: string,
  repo: string,
  ref: string,
) {
  const { data: commit } = await octokit.rest.repos.getCommit({
    owner,
    repo,
    ref,
  });

  return {
    lastCommitMessage: commit.commit.message,
    lastCommitMessageUrl: commit.html_url,
    lastCommitid: commit.sha,
    lastCommitModifiedTime: commit.commit.committer?.date ?? "",
    totalCommits: "30",
    lastCommitAuthorName: commit.author?.login ?? "",
    lastCommitAuthorImageSrcUrl: commit.author?.avatar_url ?? "",
    lastCommitPrId: parsePrId(commit.commit.message),
  };
}
