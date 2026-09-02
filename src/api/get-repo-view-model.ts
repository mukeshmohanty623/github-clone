import { getRepo } from "@/api/octokit";
import {
  getBranches,
  getCommunityProfile,
  getContributors,
  getDeployments,
  getLastCommitDetails,
  getRawContent,
  getRawContentByUrl,
  getReadmeMeta,
  getReadmeRaw,
  getReleases,
  getTags,
  getTree,
  getUser,
} from "@/api/github";
import { getTreeWithLatestCommit } from "@/api/get-tree-with-commits";
import { formatCompactCount } from "@/lib/format";
import type { HeaderProps } from "@/components/Header";
import type { MainHeaderProps } from "@/components/MainHeader";
import type { CodeTreeTableProps } from "@/components/CodeTreeTable";
import type { ReleaseData, DeploymentData, RepoViewModel } from "@/types/github";

// Fetches everything the repo page needs and returns it pre-shaped to the
// component prop contracts. Replaces the inline fetch + transform logic that
// used to live in `src/app/[org]/[repo]/page.tsx`.
export async function getRepoViewModel(
  org: string,
  repo: string,
): Promise<RepoViewModel> {
  const repoData = await getRepo(org, repo);
  if (!repoData || repoData.private) {
    // Page renders the "404 not found" state and never reads the other fields.
    return { notFound: true } as RepoViewModel;
  }

  const owner = repoData.owner.login;
  const branch = repoData.default_branch;
  const htmlUrl = repoData.html_url;

  const [
    user,
    readmeContents,
    readmeMeta,
    releases,
    contributors,
    deployments,
    communityProfile,
    branches,
    tags,
    tree,
    latestCommitDetails,
    codeTreeRows,
  ] = await Promise.all([
    getUser(owner),
    getReadmeRaw(org, repo).catch(() => ""),
    getReadmeMeta(org, repo).catch(() => null),
    getReleases(org, repo).catch(() => [] as ReleaseData[]),
    getContributors(org, repo).catch(() => []),
    getDeployments(org, repo).catch(() => [] as DeploymentData[]),
    getCommunityProfile(org, repo).catch(() => null),
    getBranches(org, repo),
    getTags(org, repo),
    getTree(org, repo, branch),
    getLastCommitDetails(org, repo, branch),
    getTreeWithLatestCommit(org, repo, branch),
  ]);

  // Locate the standard community docs at the repo root.
  const rootBlobs = new Set(
    tree.tree
      .filter((t) => t.type === "blob" && t.path)
      .map((t) => t.path as string),
  );
  const licensePath = rootBlobs.has("LICENSE")
    ? "LICENSE"
    : rootBlobs.has("LICENSE.md")
      ? "LICENSE.md"
      : null;
  const securityPath = rootBlobs.has("SECURITY.md") ? "SECURITY.md" : null;
  const cocFallbackUrl =
    communityProfile?.files?.code_of_conduct_file?.url ?? null;

  const [codeOfConduct, license, security] = await Promise.all([
    rootBlobs.has("CODE_OF_CONDUCT.md")
      ? getRawContent(org, repo, "CODE_OF_CONDUCT.md").catch(() => null)
      : cocFallbackUrl
        ? getRawContentByUrl(cocFallbackUrl).catch(() => null)
        : Promise.resolve(null),
    licensePath
      ? getRawContent(org, repo, licensePath).catch(() => null)
      : Promise.resolve(null),
    securityPath
      ? getRawContent(org, repo, securityPath).catch(() => null)
      : Promise.resolve(null),
  ]);

  const header: HeaderProps = {
    orgName: repoData.full_name.split("/")[0],
    repoName: repoData.name,
    orgUrl: user.html_url,
    repoUrl: htmlUrl,
    starGazersCount: formatCompactCount(repoData.stargazers_count),
    forksCount: formatCompactCount(repoData.forks_count),
    tagsCount: String(tags.length),
    branchCount: String(branches.length),
    visibility: repoData.visibility ?? "public",
    repoData,
    orgType: user.type as "Organization" | "User",
    ownerDetails: {
      displayName: user.name ?? "",
      avatarUrl: user.avatar_url,
      location: user.location ?? undefined,
      about: user.bio ?? undefined,
      ownerUrl: user.html_url,
      repoCount:
        user.public_repos != null ? String(user.public_repos) : undefined,
    },
  };

  const mainHeader: MainHeaderProps = {
    branchUrl: `${htmlUrl}/branches`,
    tagsUrl: `${htmlUrl}/tags`,
    uploadFileUrl: `${htmlUrl}/upload/${branch}`,
    newFileUrl: `${htmlUrl}/new/${branch}`,
    tagsCount: String(tags.length),
    branchCount: String(branches.length),
    branches: branches.map((b) => b.name),
    tags: tags.map((t) => t.name),
    defaultBranch: branch,
    orgName: repoData.full_name.split("/")[0],
    repoName: repoData.name,
  };

  const codeTree: CodeTreeTableProps = {
    branchName: branch,
    repoUrl: htmlUrl,
    ...latestCommitDetails,
    rows: codeTreeRows,
  };

  return {
    notFound: false,
    repoData,
    header,
    mainHeader,
    codeTree,
    contributors: (Array.isArray(contributors) ? contributors : []).map((c) => ({
      login: c.login ?? "",
      avatar_url: c.avatar_url ?? "",
      html_url: c.html_url ?? "",
    })),
    releases: releases as ReleaseData[],
    deployments: deployments as DeploymentData[],
    readme: { contents: readmeContents, url: readmeMeta?.url ?? null },
    docs: {
      codeOfConduct,
      license,
      security,
      licenseName: repoData.license?.name ?? null,
    },
  };
}
