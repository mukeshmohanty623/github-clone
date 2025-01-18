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
import { Button } from "./ui/button";
import {
  ChevronDown,
  Code,
  GitBranch,
  Plus,
  Search,
  Tags,
  Upload,
} from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export type MainHeaderProps = {
  branchUrl: string;
  tagsUrl: string;
  newFileUrl: string;
  uploadFileUrl: string;
  branchCount: string;
  tagsCount: string;
};

export function MainHeader({
  branchUrl,
  tagsUrl,
  newFileUrl,
  uploadFileUrl,
  branchCount,
  tagsCount,
}: MainHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full py-4">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="flex items-center mr-1">
              <GitBranch size={0.5} />
              <span>main</span>
              <ChevronDown size={0.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {/* TODO: add dropdown component for branch and tags list */}
            <DropdownMenuLabel>Switch branches/tags</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <a href={branchUrl} aria-label="github" className="hidden md:block">
          <Button variant={"ghost"} className="gap-1 px-2">
            <GitBranch size={1} />
            <div>
              {branchCount} <span className="text-gray-500">Branches</span>
            </div>
          </Button>
        </a>
        <a href={tagsUrl} aria-label="github" className="hidden md:block">
          <Button variant={"ghost"} className="gap-1 px-2">
            <Tags size={1} />
            <div>
              {tagsCount} <span className="text-gray-500">Tags</span>
            </div>
          </Button>
        </a>
      </div>
      <div className="flex items-center gap-1">
        <Input
          className="focus-within:border-[#0969DA] focus-within:border-2 hidden md:flex"
          startContent={<Search size={20} />}
          placeholder="Go to file"
          endContent={<Badge variant={"secondary"}>t</Badge>}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="items-center mr-1 hidden md:flex">
              <span className="font-semibold">Add file</span>
              <ChevronDown size={0.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <a href={newFileUrl}>
                <DropdownMenuItem>
                  <Plus size={20} />
                  <h4 className="text-base">Create new file</h4>
                </DropdownMenuItem>
              </a>

              <a href={uploadFileUrl}>
                <DropdownMenuItem>
                  <Upload size={20} />
                  <h4 className="text-base">Upload files</h4>
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"success"} className="flex items-center mr-1">
              <Code size={0.5} />
              <span className="font-semibold">Code</span>
              <ChevronDown size={0.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {/* TODO: add dropdown component for codespaces and gitclone */}
            <DropdownMenuGroup>
              <a href={newFileUrl}>
                <DropdownMenuItem>
                  <Plus size={20} />
                  <h4 className="text-base">Create new file</h4>
                </DropdownMenuItem>
              </a>

              <a href={uploadFileUrl}>
                <DropdownMenuItem>
                  <Upload size={20} />
                  <h4 className="text-base">Upload files</h4>
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
