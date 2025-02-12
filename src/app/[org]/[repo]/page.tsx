import {
  fetchBranches,
  fetchCommunityProfile,
  fetchContributors,
  fetchLastCommitDetails,
  fetchReadme,
  fetchReleases,
  fetchRepo,
  fetchTags,
  fetchTrees,
  fetchUserDetails,
} from "@/api/fetch-repo";
import { type HeaderProps } from "@/components/Header";
import RepoPageLayout from "@/components/layouts/RepoPageLauyout";

// import { MainHeader, type MainHeaderProps } from "@/components/MainHeader";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  BookOpen,
  CircleCheck,
  Eye,
  GitBranch,
  GitFork,
  HeartHandshake,
  LinkIcon,
  NotepadText,
  Scale,
  Star,
  Tag,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RepoDetails } from "@/components/RepoDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainHeader } from "@/components/MainHeader";
import { type CodeTreeRow, CodeTreeTable } from "@/components/CodeTreeTable";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTreeWithLatestCommit } from "@/api/getTreeWithCommits";
import { Contributors } from "@/components/Contributors";
import { Metadata } from "next";

dayjs.extend(relativeTime);
const apiKey = process.env.GITHUB_TOKEN;
type Props = {
  params: Promise< { org: string; repo: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const { org, repo } = await params;
  const repoDataResponse = await fetchRepo(org, repo);
  const repoData = await repoDataResponse.json();
  return {
    title: `${org}/${repo}: ${repoData?.description}`
  }
}

export default async function RepoPage({
  params,
}: {
  params: { org: string; repo: string };
}) {
  const { org, repo } = await params;
  // Fetch data from API
  const repoDataResponse = await fetchRepo(org, repo);

  if (!repoDataResponse.ok) {
    return <div>404 not found</div>;
  }
  const repoData = await repoDataResponse.json();
  if(repoData?.private){
    return <div>404 not found</div>;
  }
  const userDataResponse = await fetchUserDetails(repoData?.owner?.url);
  const userData = await userDataResponse.json();

  const readmeUrlResponse = await fetchReadme(org, repo);
  const readmeData = await readmeUrlResponse?.json();

  const readmeResponse = await fetch(readmeData?.download_url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const readmeContents = await readmeResponse.text();

  const promises = [
    fetchReleases(org, repo).then((res) => res.json()),
    fetchContributors(org, repo).then((res) => res.json()),
    fetch(repoData?.deployments_url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).then((res) => res.json()),
    fetchCommunityProfile(org, repo).then((res) => res.json()),
    fetchBranches(org, repo).then((res) => res.json()),
    fetchTags(org, repo).then((res) => res.json()),
    fetchTrees(org, repo).then((res) => res.json()),
  ];

  const data = await Promise.all(promises);

  const releasesData = data[0];
  const contributorsData = data[1];
  const deploymentsData = data[2];
  // const _communityProfileData = data[3];
  const branchesData = data[4];
  const tagsData = data[5];

  const licenseData = repoData?.license;
  let codeOfConductUrl = null;
  let licenseUrl = null;
  let securityUrl = null;
  let codeOfConductData = null;
  let licenseDecodedData = null;
  let securityData = null;
  const treeData = data[6];
  treeData?.tree?.map((tree: { type: string; url: string; path: string }) => {
    if (tree.type == "blob" && tree.path == "CODE_OF_CONDUCT.md") {
      codeOfConductUrl = tree.url;
    } else if (
      tree.type == "blob" &&
      (tree.path == "LICENSE" || tree.path == "LICENSE.md")
    ) {
      licenseUrl = tree.url;
    } else if (tree.type == "blob" && tree.path == "SECURITY.md") {
      securityUrl = tree.url;
    }
  });

  if (codeOfConductUrl) {
    const fetchData = await fetch(codeOfConductUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await fetchData.json();
    codeOfConductData = Buffer.from(data?.content, "base64").toString("utf-8");
  } else {
    const fetchData = await fetchCommunityProfile(org, repo);
    const data = await fetchData.json();
    if (data?.files?.code_of_conduct_file) {
      codeOfConductUrl = data?.files?.code_of_conduct_file?.url;
      const fetchCodeOfConductData = await fetch(codeOfConductUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const CodeOfConductData = await fetchCodeOfConductData.json();
      codeOfConductData = Buffer.from(
        CodeOfConductData?.content,
        "base64"
      ).toString("utf-8");
    }
  }

  if (licenseUrl) {
    const fetchData = await fetch(licenseUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await fetchData.json();
    licenseDecodedData = Buffer.from(data?.content, "base64").toString("utf-8");
  }

  if (securityUrl) {
    const fetchData = await fetch(securityUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await fetchData.json();
    securityData = Buffer.from(data?.content, "base64").toString("utf-8");
  }

  const headerData: HeaderProps = {
    orgName: (repoData?.full_name as string)?.split("/")[0],
    repoName: repoData?.name,
    orgUrl: userData?.html_url,
    repoUrl: repoData?.html_url,
    starGazersCount: Number(repoData?.stargazers_count)>999 ? `${(Number(repoData?.stargazers_count)/1000).toString().substring(0,4)}k` : repoData?.stargazers_count,
    forksCount: Number(repoData?.forks_count)>999 ? `${(Number(repoData?.forks_count)/1000).toString().substring(0,4)}k` : repoData?.forks_count,
    tagsCount: tagsData?.length,
    branchCount: branchesData.length,
    visibility: repoData?.visibility,
    repoData: repoData,
    orgType: userData?.type,
    ownerDetails: {
      displayName: userData?.name,
      avatarUrl: userData?.avatar_url,
      location: userData?.location,
      about: userData?.bio,
      ownerUrl: userData?.html_url,
      repoCount: userData?.public_repos,
    },
  };
  const mainHeaderProps = {
    branchUrl: `${repoData?.html_url}/branches`,
    tagsUrl: `${repoData?.html_url}/tags`,
    uploadFileUrl: `${repoData?.html_url}/upload/${repoData.default_branch}`,
    newFileUrl: `${repoData?.html_url}/new/${repoData.default_branch}`,
    tagsCount: tagsData?.length,
    branchCount: branchesData.length,
    branches: branchesData.map(
      (branchData: { name: string }) => branchData.name
    ),
    tags: tagsData.map((tag: { name: string }) => tag.name),
    defaultBranch: repoData.default_branch,
  };

  const codeTreeRows: CodeTreeRow[] = await getTreeWithLatestCommit(
    org,
    repo,
    repoData.default_branch
  );
  const latestCommitDetails = await fetchLastCommitDetails(
    org,
    repo,
    repoData.default_branch
  );
  const codeTreeProps = {
    branchName: repoData.default_branch,
    repoUrl: repoData?.html_url,
    ...latestCommitDetails,
    rows: codeTreeRows,
  };

  return (
    <RepoPageLayout headerData={headerData}>
      <div className="xl:max-w-[1280px] max-w-full px-4 xl:mr-auto xl:ml-auto py-2 gap-2">
        <div className="justify-between items-start py-4 gap-4 hidden">
          <div className="flex items-center gap-2">
            {userData?.type == "Organization" ? (
              <Avatar className="w-6 h-6 rounded-lg">
                <AvatarImage src={userData?.avatar_url} alt={"profileImage"} />
                <AvatarFallback>{userData?.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="w-6 h-6 rounded-full">
                <AvatarImage src={userData?.avatar_url} alt={"profileImage"} />
                <AvatarFallback>
                  {userData?.name && userData?.name[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <a
              href={`${userData?.html_url}`}
              className="scroll-m-20 text-xl font-bold tracking-tight hover:underline truncate"
            >
              {repoData?.name}
            </a>
            <Badge variant={"outline"} className="capitalize">
              {repoData?.visibility}
            </Badge>
          </div>
          <RepoDetails
            watchersCount={repoData?.watchers_count>999 ? `${(Number(repoData?.watchers_count)/1000).toString().substring(0,4)}k` : repoData?.watchers_count}
            forksCount={repoData?.forks_count>999 ? `${(Number(repoData?.forks_count)/1000).toString().substring(0,4)}k` : repoData?.forks_count}
            starGazersCount={repoData?.stargazers_count>999 ? `${(Number(repoData?.stargazers_count)/1000).toString().substring(0,4)}k` : repoData?.stargazers_count}
            repoUrl={repoData?.html_url}
          />
        </div>
        <div className="flex-col md:hidden gap-4  hidden">
          <RepoDetails
            watchersCount={repoData?.watchers_count>999 ? `${(Number(repoData?.watchers_count)/1000).toString().substring(0,4)}k` : repoData?.watchers_count}
            forksCount={repoData?.forks_count>999 ? `${(Number(repoData?.forks_count)/1000).toString().substring(0,4)}k` : repoData?.forks_count}
            starGazersCount={repoData?.stargazers_count>999 ? `${(Number(repoData?.stargazers_count)/1000).toString().substring(0,4)}k` : repoData?.stargazers_count}
            repoUrl={repoData?.html_url}
          />
          <h5>{repoData?.description}</h5>
          <div>
            {repoData.homepage && (
              <div className="flex items-center gap-2 my-2">
                <LinkIcon size={15} />
                <a
                  href={repoData.homepage}
                  className="hover:underline text-[#0969DA] font-semibold"
                >
                  {repoData.homepage}
                </a>
              </div>
            )}
            <div className="flex items-center gap-3 my-2 flex-wrap">
              <a
                href={`${repoData?.html_url}/stargazers`}
                className="flex items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Star size={15} />
                <span className="font-bold text-sm text-gray-600 hover:text-[#0969DA]">
                {Number(repoData?.stargazers_count)>999 ? `${(Number(repoData?.stargazers_count)/1000).toString().substring(0,4)}k` : repoData?.stargazers_count}
                </span>{" "}
                stars
              </a>
              <a
                href={`${repoData?.html_url}/forks`}
                className="flex items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <GitFork size={15} />
                <span className="font-bold text-sm text-gray-600 hover:text-[#0969DA]">
                {Number(repoData?.forks_count)>999 ? `${(Number(repoData?.forks_count)/1000).toString().substring(0,4)}k` : repoData?.forks_count}
                </span>{" "}
                forks
              </a>
              <a
                href={`${repoData?.html_url}/watchers`}
                className="flex items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Eye size={15} />
                <span className="font-bold text-sm text-gray-600 hover:text-[#0969DA]">
                {Number(repoData?.watchers_count)>999 ? `${(Number(repoData?.watchers_count)/1000).toString().substring(0,4)}k` : repoData?.watchers_count}
                </span>{" "}
                watching
              </a>
              <a
                href={`${repoData?.html_url}/branches`}
                className="flex items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <GitBranch size={15} />
                <span className="font-bold text-sm text-gray-600 hover:text-[#0969DA]">
                  {20}
                </span>{" "}
                stars
              </a>
              <a
                href={`${repoData?.html_url}/tags`}
                className="flex items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Tag size={15} />
                <span className="font-bold text-sm text-gray-600 hover:text-[#0969DA]">
                  {20}
                </span>{" "}
                forks
              </a>
              <a
                href={`${repoData?.html_url}/activity`}
                className="flex items-center gap-2 text-sm hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Activity size={15} />
                Activity
              </a>
            </div>
          </div>
        </div>
        <Separator className="hidden"/>
      </div>
      <div className="grid md:grid-cols-[75%_25%] grid-cols-[1fr] xl:max-w-[1280px] max-w-full px-4 xl:mr-auto xl:ml-auto py-2 gap-2 lg:gap-6">
        <div className="min-w-0 box-border">
          <MainHeader {...mainHeaderProps} />
          <CodeTreeTable {...codeTreeProps} />
          <div className="mt-6 border rounded border-gray-300 max-w-full">
            <Tabs defaultValue="readme" className="w-full relative">
              <TabsList className="sticky top-0 z-10 bg-white">
                <TabsTrigger value="readme">
                  <BookOpen size={18} /> README
                </TabsTrigger>
                {codeOfConductData && (
                  <TabsTrigger value="code-of-conduct">
                    <HeartHandshake size={18} /> Code of conduct
                  </TabsTrigger>
                )}
                {licenseDecodedData && (
                  <TabsTrigger value="license" className="hidden md:inline-flex">
                    <Scale size={18} />{" "}
                    {licenseData?.name == "Other"
                      ? "License"
                      : licenseData?.name}
                  </TabsTrigger>
                )}
                {securityData && (
                  <TabsTrigger value="security" className="hidden md:inline-flex">
                    <Scale size={18} /> Security
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="readme" className="px-8">
                <MarkdownRenderer contents={readmeContents} />
              </TabsContent>
              {codeOfConductData && (
                <TabsContent value="code-of-conduct" className="px-8">
                  <MarkdownRenderer contents={codeOfConductData} />
                </TabsContent>
              )}
              {licenseDecodedData && (
                <TabsContent value="license" className="px-8">
                  <pre className="whitespace-pre-wrap text-sm">
                    {licenseDecodedData}
                  </pre>
                </TabsContent>
              )}
              {securityData && (
                <TabsContent value="security" className="px-8">
                  <MarkdownRenderer contents={securityData} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
        <div className="min-w-0 box-border">
          <div className="py-4 hidden md:block">
            <h3 className="font-bold mb-4 text-lg">About</h3>
            <h5 className="my-4">{repoData?.description}</h5>
            {repoData.homepage && (
              <div className="flex items-center gap-1 my-4">
                <LinkIcon size={20} />
                <a
                  href={repoData.homepage}
                  title={repoData.homepage}
                  className="hover:underline text-[#0969DA] font-bold text-sm truncate"
                >
                  {repoData.homepage}
                </a>
              </div>
            )}
            {repoData?.topics?.length && (
              <div className="flex flex-row items-center flex-wrap gap-2  my-4">
                {repoData?.topics?.map((topic: string) => (
                  <a href={`https://github.com/topics/${topic}`} key={topic}>
                    <Badge className="border-transparent bg-[#ddf4ff] text-[#0969DA] hover:bg-[#0969DA] hover:text-white hover:cursor-pointer text-xs">
                      {topic}
                    </Badge>
                  </a>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <a
                href={readmeData?.url}
                className="flex text-sm font-medium items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <BookOpen size={17} />
                Readme
              </a>
              <a
                href={`${repoData?.html_url}/activity`}
                className="flex  items-center text-sm font-medium gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Activity size={17} />
                Activity
              </a>
              <a
                href={`${repoData?.html_url}/custom-properties`}
                className="flex items-center text-sm font-medium gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <NotepadText size={17} />
                Custom properties
              </a>
              <a
                href={`${repoData?.html_url}/stargazers`}
                className="flex items-center gap-2 text-sm font-medium hover:!text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Star size={17} />
                <span className="font-bold text-sm">
                   {Number(repoData?.stargazers_count)>999 ? `${(Number(repoData?.stargazers_count)/1000).toString().substring(0,4)}k` : repoData?.stargazers_count}
                </span>{" "}
                stars
              </a>
              <a
                href={`${repoData?.html_url}/watchers`}
                className="flex items-center text-sm font-medium gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Eye size={17} />
                <span className="font-bold text-sm">
                {Number(repoData?.watchers_count)>999 ? `${(Number(repoData?.watchers_count)/1000).toString().substring(0,4)}k` : repoData?.watchers_count}
                </span>{" "}
                watching
              </a>
              <a
                href={`${repoData?.html_url}/forks`}
                className="flex items-center text-sm font-medium gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <GitFork size={17} />
                <span className="font-bold text-sm">
                {Number(repoData?.forks_count)>999 ? `${(Number(repoData?.forks_count)/1000).toString().substring(0,4)}k` : repoData?.forks_count}
                </span>{" "}
                forks
              </a>
              <a
                href={`https://support.github.com/contact/report-abuse`}
                target="_blank"
                className="flex text-sm font-medium items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                Report repository
              </a>
            </div>
          </div>
          <Separator />
          <div className="py-5 flex flex-col gap-4">
            {releasesData?.length > 0 ? (
              <>
                <div>
                  <a
                    href={`${repoData?.html_url}/releases`}
                    className="font-bold hover:text-[#0969DA]"
                  >
                    Releases
                  </a>
                  <span className="ml-2">
                    <Badge variant={"secondary"}>{releasesData?.length}</Badge>
                  </span>
                </div>
                <a
                  href={`${releasesData[0]?.html_url}`}
                  className="flex gap-2 hover:text-[#0969DA] max-w-fit"
                >
                  <Tag size={20} color="green" className="mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">
                        {releasesData[0]?.name}
                      </h3>
                      <Badge
                        style={{
                          color: "green",
                          borderColor: "green !important",
                        }}
                        className="text-xs"
                        variant={"outline"}
                      >
                        Latest
                      </Badge>
                    </div>
                    <h5
                      title={dayjs(releasesData[0]?.published_at).format(
                        "MMM DD, YYYY, hh:mm A [GMT]Z"
                      )}
                      className="text-sm"
                    >
                      {dayjs().to(dayjs(releasesData[0]?.published_at))}
                    </h5>
                  </div>
                </a>
                <a
                  href={`${repoData?.html_url}/releases`}
                  className="hover:underline text-[#0969DA] max-w-fit text-sm font-medium"
                >
                  {" "}
                  + {releasesData?.length - 1} releases
                </a>
              </>
            ) : (
              <>
              
              <div>
                  <a
                    href={`${repoData?.html_url}/releases`}
                    className="font-bold hover:text-[#0969DA]"
                  >
                    Releases
                  </a>
                  <span className="ml-2">
                    {releasesData?.length>0 && <Badge variant={"secondary"}>{releasesData?.length}</Badge>}
                  </span>
                </div>
              <h4 className="text-xs">No release data found</h4>
              </>
            )}
          </div>
          <Separator />
          <div className="py-5 flex flex-col gap-4">
            <h3 className="font-bold">Packages</h3>
            <p className="text-xs">No packages published</p>
          </div>
          <Separator />
          <div className="py-5 flex flex-col gap-4">
            {contributorsData?.length > 0 ? (
              <>
                <div>
                  <a
                    href={`${repoData?.html_url}/graphs/contributors`}
                    className="font-bold hover:text-[#0969DA]"
                  >
                    Contributors
                  </a>
                  <span className="ml-2">
                    <Badge variant={"secondary"}>
                      {contributorsData?.length}
                    </Badge>
                  </span>
                </div>
                <Contributors
                  contributors={contributorsData}
                  repoName={repo}
                  orgName={org}
                />
              </>
            ) : (
              <h4>No contributros found</h4>
            )}
          </div>
          <Separator />
          {deploymentsData?.length > 0 && (
            <>
              <div className="py-5 flex flex-col gap-4">
                <div>
                  <a
                    href={`${repoData?.html_url}/deployments`}
                    className="font-bold hover:text-[#0969DA]"
                  >
                    Deployments
                  </a>
                  <span className="ml-2">
                    <Badge variant={"secondary"}>
                      {deploymentsData?.length}
                    </Badge>
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <CircleCheck size={20} color="white" fill="green" />
                  <a
                    href={
                      deploymentsData[0]?.performed_via_github_app?.html_url
                    }
                  >
                    <span className="font-bold text-sm">
                      {deploymentsData[0]?.environment}
                    </span>
                    <span
                      title={dayjs(deploymentsData[0]?.created_at).format(
                        "MMM DD, YYYY, hh:mm A [GMT]Z"
                      )}
                      className="text-sm ml-2"
                    >
                      {dayjs().to(dayjs(deploymentsData[0]?.created_at))}
                    </span>
                  </a>
                </div>
                <a
                  href={`${repoData?.html_url}/deployments`}
                  className="underline text-[#0969DA] max-w-fit text-sm font-medium"
                >
                  {" "}
                  + {deploymentsData?.length - 1} deployments
                </a>
              </div>
              <Separator />
            </>
          )}
        </div>
      </div>
    </RepoPageLayout>
  );
}
