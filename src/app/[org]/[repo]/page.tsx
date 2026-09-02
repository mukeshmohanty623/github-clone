import RepoPageLayout from "@/components/layouts/RepoPageLauyout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  BookOpen,
  CircleCheck,
  Eye,
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
import { MainHeader } from "@/components/MainHeader";
import { CodeTreeTable } from "@/components/CodeTreeTable";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contributors } from "@/components/Contributors";
import { Metadata } from "next";
import { getRepo } from "@/api/octokit";
import { getRepoViewModel } from "@/api/get-repo-view-model";

dayjs.extend(relativeTime);

type Props = {
  params: Promise<{ org: string; repo: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { org, repo } = await params;
  const repoData = await getRepo(org, repo);
  return {
    title: repoData
      ? `${org}/${repo}: ${repoData.description ?? ""}`
      : `${org}/${repo}`,
  };
}

export default async function RepoPage({ params }: Props) {
  const { org, repo } = await params;

  const vm = await getRepoViewModel(org, repo);
  if (vm.notFound) {
    return <div>404 not found</div>;
  }

  const { repoData, releases, contributors, deployments, docs } = vm;

  return (
    <RepoPageLayout headerData={vm.header}>
      <div className="grid md:grid-cols-[75%_25%] grid-cols-[1fr] xl:max-w-[1280px] max-w-full px-4 xl:mr-auto xl:ml-auto py-2 gap-2 lg:gap-6">
        <div className="min-w-0 box-border">
          <MainHeader {...vm.mainHeader} />
          <CodeTreeTable {...vm.codeTree} />
          <div className="mt-6 border rounded border-gray-300 max-w-full">
            <Tabs defaultValue="readme" className="w-full relative">
              <TabsList className="sticky top-0 z-10 bg-white">
                <TabsTrigger value="readme">
                  <BookOpen size={18} /> README
                </TabsTrigger>
                {docs.codeOfConduct && (
                  <TabsTrigger value="code-of-conduct">
                    <HeartHandshake size={18} /> Code of conduct
                  </TabsTrigger>
                )}
                {docs.license && (
                  <TabsTrigger value="license" className="hidden md:inline-flex">
                    <Scale size={18} />{" "}
                    {docs.licenseName == "Other" ? "License" : docs.licenseName}
                  </TabsTrigger>
                )}
                {docs.security && (
                  <TabsTrigger value="security" className="hidden md:inline-flex">
                    <Scale size={18} /> Security
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="readme" className="px-8">
                <MarkdownRenderer contents={vm.readme.contents} />
              </TabsContent>
              {docs.codeOfConduct && (
                <TabsContent value="code-of-conduct" className="px-8">
                  <MarkdownRenderer contents={docs.codeOfConduct} />
                </TabsContent>
              )}
              {docs.license && (
                <TabsContent value="license" className="px-8">
                  <pre className="whitespace-pre-wrap text-sm">{docs.license}</pre>
                </TabsContent>
              )}
              {docs.security && (
                <TabsContent value="security" className="px-8">
                  <MarkdownRenderer contents={docs.security} />
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
                href={vm.readme.url ?? undefined}
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
                  {vm.header.starGazersCount}
                </span>{" "}
                stars
              </a>
              <a
                href={`${repoData?.html_url}/watchers`}
                className="flex items-center text-sm font-medium gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <Eye size={17} />
                <span className="font-bold text-sm">
                  {repoData.watchers_count > 999
                    ? `${(repoData.watchers_count / 1000)
                        .toString()
                        .substring(0, 4)}k`
                    : repoData.watchers_count}
                </span>{" "}
                watching
              </a>
              <a
                href={`${repoData?.html_url}/forks`}
                className="flex items-center text-sm font-medium gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
              >
                <GitFork size={17} />
                <span className="font-bold text-sm">
                  {vm.header.forksCount}
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
            {releases?.length > 0 ? (
              <>
                <div>
                  <a
                    href={`${repoData?.html_url}/releases`}
                    className="font-bold hover:text-[#0969DA]"
                  >
                    Releases
                  </a>
                  <span className="ml-2">
                    <Badge variant={"secondary"}>{releases?.length}</Badge>
                  </span>
                </div>
                <a
                  href={`${releases[0]?.html_url}`}
                  className="flex gap-2 hover:text-[#0969DA] max-w-fit"
                >
                  <Tag size={20} color="green" className="mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">{releases[0]?.name}</h3>
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
                      title={dayjs(releases[0]?.published_at).format(
                        "MMM DD, YYYY, hh:mm A [GMT]Z"
                      )}
                      className="text-sm"
                    >
                      {dayjs().to(dayjs(releases[0]?.published_at))}
                    </h5>
                  </div>
                </a>
                <a
                  href={`${repoData?.html_url}/releases`}
                  className="hover:underline text-[#0969DA] max-w-fit text-sm font-medium"
                >
                  {" "}
                  + {releases?.length - 1} releases
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
                    {releases?.length > 0 && (
                      <Badge variant={"secondary"}>{releases?.length}</Badge>
                    )}
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
            {contributors?.length > 0 ? (
              <>
                <div>
                  <a
                    href={`${repoData?.html_url}/graphs/contributors`}
                    className="font-bold hover:text-[#0969DA]"
                  >
                    Contributors
                  </a>
                  <span className="ml-2">
                    <Badge variant={"secondary"}>{contributors?.length}</Badge>
                  </span>
                </div>
                <Contributors
                  contributors={contributors}
                  repoName={repo}
                  orgName={org}
                />
              </>
            ) : (
              <h4>No contributros found</h4>
            )}
          </div>
          <Separator />
          {deployments?.length > 0 && (
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
                    <Badge variant={"secondary"}>{deployments?.length}</Badge>
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <CircleCheck size={20} color="white" fill="green" />
                  <a
                    href={deployments[0]?.performed_via_github_app?.html_url}
                  >
                    <span className="font-bold text-sm">
                      {deployments[0]?.environment}
                    </span>
                    <span
                      title={dayjs(deployments[0]?.created_at).format(
                        "MMM DD, YYYY, hh:mm A [GMT]Z"
                      )}
                      className="text-sm ml-2"
                    >
                      {dayjs().to(dayjs(deployments[0]?.created_at))}
                    </span>
                  </a>
                </div>
                <a
                  href={`${repoData?.html_url}/deployments`}
                  className="underline text-[#0969DA] max-w-fit text-sm font-medium"
                >
                  {" "}
                  + {deployments?.length - 1} deployments
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
