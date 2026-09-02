"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SquareTerminal,
  Menu,
  Star,
  MapPin,
  BookMarked,
  GitCommitHorizontal,
  Search,
  ChevronDown,
  AppWindow,
  Plus,
  Settings,
  BookUp,
  Building2,
  Computer,
  ChevronsLeftRight,
  GitPullRequest,
  CircleDot,
  Bell,
  Users,
  Code,
  PlayCircle,
  GitFork,
  Tag,
  GitBranch,
  Eye,
  LinkIcon,
  Activity,
} from "lucide-react";
import { TooltipComponent } from "./TooltipComponent";
import { Separator } from "./ui/separator";
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import type { RepoData } from "@/types/github";

export type HeaderProps = {
  orgName: string;
  repoName: string;
  repoUrl: string;
  orgUrl: string;
  forksCount: string;
  repoData: RepoData;
  visibility: string;
  branchCount: string;
  tagsCount: string;
  starGazersCount: string;
  ownerDetails: {
    avatarUrl: string;
    displayName: string;
    repoCount?: string;
    about?: string;
    location?: string;
    ownerUrl: string;
  };
  orgType: "Organization" | "User";
  // children: React.ReactNode;
};

type UserTypeHoverCardProps = {
  avatarUrl: string;
  displayName: string;
  name: string;
  about?: string;
  location?: string;
  ownerUrl: string;
};
type OrganizationTypeHoverCardProps = {
  avatarUrl: string;
  displayName: string;
  name: string;
  repoCount: string;
  about?: string;
  location?: string;
  ownerUrl: string;
};

function UserTypeHoverCard({
  avatarUrl,
  displayName,
  name,
  about,
  location,
  ownerUrl,
}: UserTypeHoverCardProps) {
  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <Avatar className={"w-12 h-12 rounded-full"}>
              <AvatarImage src={avatarUrl} alt={"profileImage"} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </div>
          <Button variant={"secondary"} size={"default"}>
            Follow
          </Button>
        </div>
        <div className="flex items-center gap-1 w-full mt-2">
          <a
            href={`${ownerUrl}`}
            className="scroll-m-20 text-base font-medium tracking-tight hover:text-blue-500 cursor-pointer"
          >
            {name}
          </a>
          <a
            href={`${ownerUrl}`}
            className="scroll-m-20 text-base text-gray-400 font-normal tracking-tight hover:text-blue-500 cursor-pointer"
          >
            {displayName}
          </a>
        </div>
        {about && (
          <p className="leading-5 [&:not(:first-child)]:mt-1">{about}</p>
        )}
        <div className="flex items-center gap-1 w-full mt-2">
          <Star size={"20"} strokeWidth={"1.5"} />
          <Badge variant={"outline"}>PRO</Badge>
        </div>
        {location && (
          <div className="flex items-center gap-1 w-full mt-2">
            <MapPin size={"20"} strokeWidth={"1.5"} />
            <small className="text-small font-normal">India</small>
          </div>
        )}
        <div className="flex items-center gap-1 w-full mt-2">
          <BookMarked size={"20"} strokeWidth={"1.5"} />
          <small className="text-small font-normal">Owns this repository</small>
        </div>
        <div className="flex items-center gap-1 w-full mt-2">
          <GitCommitHorizontal size={"20"} strokeWidth={"1.5"} />
          <small className="text-small font-normal">
            Committed to this repository
          </small>
        </div>
      </div>
    </>
  );
}

function OrganizationTypeHoverCard({
  avatarUrl,
  displayName,
  name,
  ownerUrl,
  about,
  repoCount,
  location,
}: OrganizationTypeHoverCardProps) {
  return (
    <>
      <div className="flex gap-2 w-full p-4">
        <div>
          <Avatar className={"w-12 h-12 rounded-lg"}>
            <AvatarImage src={avatarUrl} alt={"profileImage"} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 w-full">
              <a
                href={`${ownerUrl}`}
                className="scroll-m-20 text-base font-medium tracking-tight hover:text-blue-500 cursor-pointer"
              >
                {displayName}
              </a>
              <a
                href={`${ownerUrl}`}
                className="scroll-m-20 text-base text-gray-600 font-normal tracking-tight hover:text-blue-500 cursor-pointer"
              >
                {name}
              </a>
            </div>
            <Badge
              variant={"outline"}
              className="border-green-600 text-green-600"
            >
              verified
            </Badge>
          </div>
          {about && (
            <p className="leading-7 [&:not(:first-child)]:mt-1 text-gray-600">
              {about}
            </p>
          )}
          {location && (
            <div className="flex items-center gap-1 w-full mt-1">
              <MapPin size={"20"} strokeWidth={"1.5"} />
              <small className="text-sm font-normal text-gray-600">
                {location}
              </small>
            </div>
          )}
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-2 w-full px-4 py-2">
        <div className="flex items-center gap-1 w-full">
          <BookMarked size={"20"} strokeWidth={"1.5"} />
          <small className="text-small font-normal">
            {repoCount} repositories
          </small>
        </div>
        <div className="flex items-center gap-1 w-full">
          <Users size={"20"} strokeWidth={"1.5"} />
          <small className="text-small font-normal">333 members</small>
        </div>
      </div>
    </>
  );
}

export function Header({
  ownerDetails,
  orgName,
  forksCount,
  visibility,
  repoData,
  starGazersCount,
  orgUrl,
  repoUrl,
  repoName,
  orgType,
  branchCount,
  tagsCount
}: // children,
HeaderProps) {
  const userTypeHoverCard: UserTypeHoverCardProps = {
    avatarUrl: ownerDetails?.avatarUrl,
    displayName: ownerDetails?.displayName,
    name: orgName,
    about: ownerDetails?.about,
    location: ownerDetails?.location,
    ownerUrl: ownerDetails?.ownerUrl,
  };
  const orgTypeHoverCard: OrganizationTypeHoverCardProps = {
    avatarUrl: ownerDetails?.avatarUrl,
    displayName: ownerDetails?.displayName,
    name: orgName,
    about: ownerDetails?.about,
    location: ownerDetails?.location,
    ownerUrl: ownerDetails?.ownerUrl,
    repoCount: ownerDetails?.repoCount!,
  };
  const [isStarClicked, setIsStarClicked] = useState(false);

  const handleStartClick = () => {
    setIsStarClicked((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-between items-center px-4  py-3 w-full">
        <div className="flex flex-wrap ml-1 items-center">
          <div className="flex items-center">
            <HoverCard>
              <HoverCardTrigger asChild>
                <a
                  href={orgUrl}
                  aria-label="github"
                  className="hover:underline text-[#0969DA] rounded-md py-1 truncate max-w-24 md:max-w-full"
                >
                  <small className="text-lg font-normal leading-none">
                    {orgName}
                  </small>
                </a>
              </HoverCardTrigger>
              <HoverCardContent
                className={"w-96 p-0"}
                align="start"
                sideOffset={10}
                arrowPadding={10}
                side="bottom"
              >
                <HoverCardArrow fill="lightGray" />
                {orgType == "User" && (
                  <UserTypeHoverCard {...userTypeHoverCard} />
                )}
                {orgType == "Organization" && (
                  <OrganizationTypeHoverCard {...orgTypeHoverCard} />
                )}
              </HoverCardContent>
            </HoverCard>
            <Icons.slash title="slash" />
          </div>
          <a
            href={repoUrl}
            aria-label="github"
            className="hover:underline text-[#0969DA] rounded-md  py-1"
          >
            <h6 className="font-bold text-lg">{repoName}</h6>
          </a>
          <Badge variant={"outline"} className="capitalize ml-1">
            {visibility}
          </Badge>
        </div>
        <div className="md:flex items-center gap-1 flex-wrap  hidden">
          <TooltipComponent
            side="bottom"
            tooltipContent={
              "You must be signed in to change notification settings"
            }
          >
            <Button variant={"outline"} size={"xsm"} className="text-xs gap-1">
              <Bell size={20} />
              <div className="hidden md:flex">Notifications</div>
            </Button>
          </TooltipComponent>
          <a href={`${repoUrl}/forks`}>
            <Button variant={"outline"} size={"xsm"} className="text-xs gap-1">
              <GitFork size={20} />
              <div className="hidden md:flex">Fork</div>
              <Badge variant={"secondary"} className="hidden md:flex">
                {forksCount}
              </Badge>
            </Button>
          </a>
          <Button
            variant={"outline"}
            onClick={handleStartClick}
            size={"xsm"}
            className="text-xs gap-1 bg-muted"
          >
            {isStarClicked ? (
              <Star fill="#eac54f" color="#eac54f" size={20} />
            ) : (
              <Star size={20} />
            )}
            <div className="hidden md:flex">
              {isStarClicked ? "Starred" : "Star"}
            </div>
            <Badge variant={"secondary"} className="hidden md:flex">
              {starGazersCount}
            </Badge>
          </Button>
        </div>
      </div>
      <div className="md:hidden px-5">
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
                {branchCount}
              </span>{" "}
              Branches
            </a>
            <a
              href={`${repoData?.html_url}/tags`}
              className="flex items-center gap-2 hover:text-[#0969DA] text-gray-600 max-w-fit"
            >
              <Tag size={15} />
              <span className="font-bold text-sm text-gray-600 hover:text-[#0969DA]">
                {tagsCount}
              </span>{" "}
              Tags
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
        <div className="md:hidden items-center justify-center gap-1 flex-wrap   flex">
          <TooltipComponent
            side="bottom"
            tooltipContent={
              "You must be signed in to change notification settings"
            }
          >
            <Button variant={"outline"} size={"xsm"} className="text-xs gap-1 flex-1">
              <Bell size={20} />
              <div className="flex">Notifications</div>
            </Button>
          </TooltipComponent>
          <Button
            variant={"outline"}
            onClick={handleStartClick}
            size={"xsm"}
            className="text-xs gap-1 bg-muted flex-1"
          >
            {isStarClicked ? (
              <Star fill="#eac54f" color="#eac54f" size={20} />
            ) : (
              <Star size={20} />
            )}
            <div className="flex">
              {isStarClicked ? "Starred" : "Star"}
            </div>
            <Badge variant={"secondary"} className="flex">
              {starGazersCount}
            </Badge>
          </Button>
        </div>
      </div>
      <div className="hidden justify-between items-center px-2 lg:px-3 py-3 w-full">
        <div className="flex items-center">
          <Button variant="outline" size="icon">
            <Menu size={10} />
          </Button>
          <a href="/" aria-label="github" className="ml-2">
            {/* @ts-ignore */}
            <Icons.gitHub title="github" width={"32"} height={"32"} />
          </a>
          <div className="flex flex-wrap ml-1 items-center">
            <div className="flex items-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a
                    href={orgUrl}
                    aria-label="github"
                    className="hover:bg-gray-200 rounded-md px-3 py-1 truncate max-w-24 md:max-w-full"
                  >
                    <small className="text-sm font-normal leading-none truncate max-w-20 xl:max-w-fit">
                      {orgName}
                    </small>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent
                  className={"w-96 p-0"}
                  align="start"
                  sideOffset={10}
                  arrowPadding={10}
                  side="bottom"
                >
                  <HoverCardArrow fill="lightGray" />
                  {orgType == "User" && (
                    <UserTypeHoverCard {...userTypeHoverCard} />
                  )}
                  {orgType == "Organization" && (
                    <OrganizationTypeHoverCard {...orgTypeHoverCard} />
                  )}
                </HoverCardContent>
              </HoverCard>
              <Icons.slash title="slash" />
            </div>
            <a
              href={repoUrl}
              aria-label="github"
              className="hover:bg-gray-200 rounded-md px-3 py-1"
            >
              <h6 className="font-bold text-sm truncate max-w-24 xl:max-w-fit">
                {repoName}
              </h6>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 flex-wrap flex-shrink-0">
          <div className="lg:flex lg:w-64 h-8 hidden rounded-md gap-2 px-2 border-gray-300 border items-center">
            <Search size={20} strokeWidth={1} />
            Search
          </div>
          <Button size={"icon"} variant={"outline"} className="lg:hidden">
            <Search size={20} strokeWidth={1} />
          </Button>
          <div className="flex border-gray-300 rounded-md items-center">
            <TooltipComponent tooltipContent={"Chat with Copilot"}>
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-r-none rounded-l"
              >
                <Icons.copilot />
              </Button>
            </TooltipComponent>
            <DropdownMenu>
              <TooltipComponent tooltipContent={"Chat with Copilot"}>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-l-none rounded-r w-6 border-l-0"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <ChevronDown size={0.5} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipComponent>
              <DropdownMenuContent
                className="w-56"
                onCloseAutoFocus={(e) => e.preventDefault()}
                align="end"
              >
                <DropdownMenuLabel>New Coversation in</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <AppWindow size={20} />
                    <h4 className="text-base">Immersive</h4>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-300" />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icons.copilot />
                      <h4 className="text-base">Open with</h4>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot">
                            <div className="flex items-center justify-cente gap-2">
                              {/* @ts-ignore */}
                              <Icons.vscode
                                title="vscode"
                                // @ts-ignore
                                width={"16"}
                                height={"16"}
                              />
                              Visual Studio Code
                            </div>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://visualstudio.microsoft.com/github-copilot/">
                            <div className="flex items-center justify-cente gap-2">
                              {/* @ts-ignore */}
                              <Icons.visualstudio
                                title="visualcode"
                                // @ts-ignore
                                width={"16"}
                                height={"16"}
                              />
                              Visual Studio
                            </div>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://github.com/github/CopilotForXcode">
                            <div className="flex items-center justify-cente gap-2">
                              {/* @ts-ignore */}
                              <Icons.xcode
                                title="xcode"
                                // @ts-ignore
                                width={"16"}
                                height={"16"}
                              />
                              Xcode
                            </div>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://plugins.jetbrains.com/plugin/17718-github-copilot">
                            <div className="flex items-center justify-cente gap-2">
                              <Icons.jetbrains
                                title="jetbrains"
                                // @ts-ignore
                                width={"16"}
                                height={"16"}
                              />
                              JetBrains
                            </div>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://github.com/github/copilot.vim">
                            <div className="flex items-center justify-cente gap-2">
                              <img
                                src="https://github.githubassets.com/assets/neovim-3301f23c4307.png"
                                alt="neovim.png"
                                width={16}
                                height={16}
                              />
                              Neovim
                            </div>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://learn.microsoft.com/en-us/azure-data-studio/extensions/github-copilot-extension-overview">
                            <div className="flex items-center justify-cente gap-2">
                              {/* @ts-ignore */}
                              <Icons.azure
                                title="azure"
                                // @ts-ignore
                                width={"16"}
                                height={"16"}
                              />
                              Azure Data Studio
                            </div>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <a href="https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-github-copilot-in-the-cli">
                            <div className="flex items-center justify-cente gap-2">
                              {/* @ts-ignore */}
                              <SquareTerminal size={16} />
                              CLI
                            </div>
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Settings size={20} />
                    <h4 className="text-base">Settings</h4>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="lg:block md:block  hidden">
            <DropdownMenu>
              <TooltipComponent tooltipContent={"Create new..."}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="border-gray-300"
                  >
                    <Plus size={0.5} />
                    <ChevronDown size={0.5} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipComponent>
              <DropdownMenuContent
                className="w-56"
                onCloseAutoFocus={(e) => e.preventDefault()}
                align="start"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BookMarked size={20} />
                    <h4 className="text-base">New Repository</h4>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookUp size={20} />
                    <h4 className="text-base">Import Repository</h4>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-300" />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Computer size={20} />
                    <h4 className="text-base">New CodeSpace</h4>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ChevronsLeftRight size={20} />
                    <h4 className="text-base">New Gist</h4>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-300" />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Building2 size={20} />
                    <h4 className="text-base">New Organization</h4>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="lg:block md:block hidden">
            <TooltipComponent tooltipContent={"Your issues"}>
              <Button variant={"outline"} size={"icon"}>
                <CircleDot size={0.5} />
              </Button>
            </TooltipComponent>
          </div>
          <div className="lg:block md:block hidden">
            <TooltipComponent tooltipContent={"Your pull requests"}>
              <Button variant={"outline"} size={"icon"}>
                <GitPullRequest size={0.5} />
              </Button>
            </TooltipComponent>
          </div>
          <TooltipComponent
            tooltipContent={"You have no unread notuifications"}
          >
            <Button variant={"outline"} size={"icon"}>
              <Bell size={0.5} />
            </Button>
          </TooltipComponent>
          <Avatar className={"w-8 h-8 rounded-full"}>
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt={"profileImage"}
            />
            <AvatarFallback>{"HC"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Tabs defaultValue="code" className="w-ful px-5">
        <TabsList>
          <TabsTrigger value="code">
            <Code size={18} /> Code
          </TabsTrigger>
          <TabsTrigger value="issues" disabled>
            <CircleDot size={18} /> Issues
          </TabsTrigger>
          <TabsTrigger value="pull-requests" className="hidden md:flex" disabled>
            <GitPullRequest size={18} /> Pull requests
          </TabsTrigger>
          <TabsTrigger value="actions" className="hidden md:flex" disabled>
            <PlayCircle size={18} /> Actions
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
