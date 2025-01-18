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
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Star,
  MapPin,
  BookMarked,
  GitCommitHorizontal,
  Search,
  ChevronDown,
  Shell,
  AppWindow,
  Plus,
  Settings,
  BookDown,
  BookUp,
  Building2,
  Computer,
  ChevronsLeftRight,
  GitPullRequest,
  CircleDot,
  Bell,
  Code,
  GitPullRequestArrow,
  CirclePlay,
  PanelsTopLeft,
  ShieldAlert,
  ChartLine,
  Users,
} from "lucide-react";
import { HoverCardComponent } from "./HoverCard";
import { WrappedAvatar } from "./Avatar";
import { TooltipComponent } from "./TooltipComponent";
import { Separator } from "./ui/separator";

export type HeaderProps = {
  orgName: string;
  repoName: string;
  repoUrl: string;
  orgUrl: string;
  ownerDetails: {
    avatarUrl: string;
    displayName: string;
    repoCount?: string;
    about?: string;
    location?: string;
    ownerUrl: string;
  };
  orgType: "Organization" | "User";
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
            <WrappedAvatar
              className="w-12 h-12 rounded-full"
              imageSource={avatarUrl}
              imageAlt="profileImage"
              fallbackValue={name}
            />
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
          <WrappedAvatar
            className="w-12 h-12 rounded-lg"
            imageSource={avatarUrl}
            imageAlt="profileImage"
            fallbackValue={name}
          />
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
  orgUrl,
  repoUrl,
  repoName,
  orgType,
}: HeaderProps) {
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

  return (
    <>
      <div className="flex justify-between items-center px-2 lg:px-3 py-3 w-full">
        <div className="flex items-center flex-wrap">
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
          <a href="https://www.github.com" aria-label="github" className="">
            <Icons.gitHub title="github" />
          </a>
          <a href={orgUrl} aria-label="github">
            <HoverCardComponent title={orgName} className="w-96 p-0">
              {orgType == "User" && (
                <UserTypeHoverCard {...userTypeHoverCard} />
              )}
              {orgType == "Organization" && (
                <OrganizationTypeHoverCard {...orgTypeHoverCard} />
              )}
            </HoverCardComponent>
          </a>
          <Icons.slash title="slash" />
          <a href={repoUrl} aria-label="github">
            <Button variant={"ghost"}>{repoName}</Button>
          </a>
        </div>
        <div className="flex items-center justify-end gap-2 flex-wrap">
          <div className="lg:flex md:flex lg:w-64 h-9 hidden rounded-md gap-2 px-2 border-gray-300 border items-center">
            <Search size={20} strokeWidth={1} />
            Search
          </div>
          <div className="flex border-gray-300 border rounded-md items-center">
            <TooltipComponent tooltipContent={"Chat with Copilot"}>
              <Button className="border-none" size={"sm"} variant={"outline"}>
                <Shell />
              </Button>
            </TooltipComponent>
            <Separator orientation="vertical" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <TooltipComponent tooltipContent={"Chat with Copilot"}>
                  <Button
                    className="border-none w-6"
                    variant={"outline"}
                    size={"sm"}
                  >
                    <ChevronDown size={0.5} />
                  </Button>
                </TooltipComponent>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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
                      <Shell size={20} />
                      <h4 className="text-base">Open with</h4>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
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
              <DropdownMenuTrigger>
                <TooltipComponent tooltipContent={"Create new..."}>
                  <Button variant={"outline"} size={"sm"}>
                    <Plus size={0.5} />
                    <ChevronDown size={0.5} />
                  </Button>
                </TooltipComponent>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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
            <TooltipComponent tooltipContent={"Issues"}>
              <Button variant={"outline"} size={"sm"}>
                <CircleDot size={0.5} />
              </Button>
            </TooltipComponent>
          </div>
          <div className="lg:block md:block hidden">
            <TooltipComponent tooltipContent={"Pull Requests"}>
              <Button variant={"outline"} size={"sm"}>
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
          <WrappedAvatar
            imageSource="https://github.com/shadcn.png"
            imageAlt="profileImage"
            className="w-10 h-10 rounded-full"
            fallbackValue="HC"
          />
        </div>
      </div>
    </>
  );
}
