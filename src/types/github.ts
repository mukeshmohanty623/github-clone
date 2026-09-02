import type { octokit } from "@/api/octokit";
import type { HeaderProps } from "@/components/Header";
import type { MainHeaderProps } from "@/components/MainHeader";
import type { CodeTreeTableProps } from "@/components/CodeTreeTable";

// Derive entity shapes straight from Octokit's endpoint methods instead of
// hand-writing interfaces — they stay in sync with `@octokit/types`.
type Data<T extends (...args: never[]) => Promise<{ data: unknown }>> = Awaited<
  ReturnType<T>
>["data"];

export type RepoData = Data<typeof octokit.rest.repos.get>;
export type UserData = Data<typeof octokit.rest.users.getByUsername>;
export type ReleaseData = Data<typeof octokit.rest.repos.listReleases>[number];
export type DeploymentData =
  Data<typeof octokit.rest.repos.listDeployments>[number];
export type CommunityProfile =
  Data<typeof octokit.rest.repos.getCommunityProfileMetrics>;

// Only the fields `Contributors.tsx` actually reads.
export type ContributorSummary = {
  html_url: string;
  avatar_url: string;
  login: string;
};

// Single object handed to the repo page. Composed from the components' own
// exported prop types so those files stay the source of truth for the
// presentation contract.
export type RepoViewModel = {
  notFound: boolean;
  repoData: RepoData;
  header: HeaderProps;
  mainHeader: MainHeaderProps;
  codeTree: CodeTreeTableProps;
  contributors: ContributorSummary[];
  releases: ReleaseData[];
  deployments: DeploymentData[];
  readme: { contents: string; url: string | null };
  docs: {
    codeOfConduct: string | null;
    license: string | null;
    security: string | null;
    licenseName: string | null;
  };
};
