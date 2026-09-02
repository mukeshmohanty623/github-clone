"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Check,
  ChevronDown,
  CircleHelp,
  Code,
  Copy,
  FileArchive,
  GitBranch,
  MonitorDown,
  Plus,
  Search,
  SquareTerminal,
  Tag,
  Tags,
  Upload,
} from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Tabs,
  TabsList,
  CustomTabsTrigger,
  TabsTrigger,
  CustomTabsList,
} from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { TooltipComponent } from "./TooltipComponent";

export type MainHeaderProps = {
  branchUrl: string;
  tagsUrl: string;
  newFileUrl: string;
  uploadFileUrl: string;
  branchCount: string;
  tagsCount: string;
  branches: string[];
  tags: string[];
  defaultBranch: string;
  orgName: string;
  repoName: string;
};

export function MainHeader({
  branchUrl,
  tagsUrl,
  newFileUrl,
  uploadFileUrl,
  branchCount,
  tagsCount,
  branches,
  tags,
  defaultBranch,
  orgName,
  repoName,
}: MainHeaderProps) {
  const [selectedTab, setSelectedTab] = useState<string>("branches");
  const [copied, setCopied] = useState(false);
  const handleOnValueChangeTabs = (value: string) => {
    setSelectedTab(value);
  };

  const handleCopy = (text: string) => {
    console.log("clicked");
    navigator.clipboard.writeText(text as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex items-center justify-between w-full py-4">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center mr-1"
            >
              {selectedTab == "branches" ? (
                <GitBranch size={0.5} />
              ) : (
                <Tag size={0.5} />
              )}
              <span>{defaultBranch}</span>
              <ChevronDown size={0.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 px-0">
            <DropdownMenuLabel>Switch branches/tags</DropdownMenuLabel>
            <Command>
              <CommandInput
                placeholder={
                  selectedTab == "branches"
                    ? "Find a branch..."
                    : "Find a tag..."
                }
              />
              <DropdownMenuSeparator />
              <Tabs
                defaultValue="branches"
                className="w-full border-b border-gray-200 mt-1"
                onValueChange={handleOnValueChangeTabs}
              >
                <CustomTabsList className="bg-white">
                  <CustomTabsTrigger value="branches">
                    Branches
                  </CustomTabsTrigger>
                  <CustomTabsTrigger value="tags">Tags</CustomTabsTrigger>
                </CustomTabsList>
                <TabsContent value="branches" className="border-t">
                  <CommandList className="max-h-80 overflow-y-auto overflow-x-hidden px-3 py-2">
                    <CommandEmpty>Nothing to show</CommandEmpty>
                    {branches.map((branch,index) => (
                      <CommandItem key={index} className="border-b border-b-slate-200 text-black block">
                        <a
                          href={`/${orgName}/${repoName}/tree/${branch}`}
                          className="flex justify-between"
                        >
                          <div className="flex items-center gap-1">
                            {defaultBranch == branch ? (
                              <Check size={10} className={"visible"} />
                            ) : (
                              <Check size={10} className={"invisible"} />
                            )}

                            {branch}
                          </div>
                          {branch === defaultBranch && (
                            <Badge variant={"outline"}>default</Badge>
                          )}
                        </a>
                      </CommandItem>
                    ))}
                  </CommandList>
                  <DropdownMenuSeparator className="" />
                  <DropdownMenuItem>View all branches</DropdownMenuItem>
                </TabsContent>
                <TabsContent value="tags" className="border-t">
                  <CommandList className="max-h-80 overflow-y-auto overflow-x-hidden px-3 py-2">
                    <CommandEmpty>Nothing to show</CommandEmpty>
                    {tags.map((tag,index) => (
                      <CommandItem key={index} className="text-black block">
                        <a
                          href={`/${orgName}/${repoName}/tree/${tag}`}
                          className="flex justify-between"
                        >
                          <div className="flex items-center gap-1">
                            {defaultBranch == tag ? (
                              <Check size={10} className={"visible"} />
                            ) : (
                              <Check size={10} className={"invisible"} />
                            )}

                            {tag}
                          </div>
                        </a>
                      </CommandItem>
                    ))}
                  </CommandList>
                  <DropdownMenuSeparator className="" />
                  <DropdownMenuItem>View all tags</DropdownMenuItem>
                </TabsContent>
              </Tabs>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
        <a href={branchUrl} aria-label="github" className="hidden md:block">
          <Button
            title="branches"
            variant={"ghost"}
            size={"sm"}
            className="gap-1 px-2"
          >
            <GitBranch size={1} />
            <div className="hidden xl:block">
              {branchCount} <span className="text-gray-500">Branches</span>
            </div>
          </Button>
        </a>
        <a href={tagsUrl} aria-label="github" className="hidden md:block">
          <Button
            title="tags"
            variant={"ghost"}
            size={"sm"}
            className="gap-1 px-2"
          >
            <Tags size={1} />
            <div className="hidden xl:block">
              {tagsCount} <span className="text-gray-500">Tags</span>
            </div>
          </Button>
        </a>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant={"outline"}
          size={"sm"}
          className="hidden md:block lg:hidden"
        >
          Go to file
        </Button>
        <Input
          className="focus-within:border-[#0969DA] focus-within:border-2 hidden lg:flex py-0 h-8"
          startContent={<Search size={15} />}
          placeholder="Go to file"
          endContent={<Badge variant={"secondary"}>t</Badge>}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className="items-center mr-1 hidden md:flex"
            >
              <span className="font-semibold hidden xl:inline">Add file</span>
              <ChevronDown size={0.5} className="hidden xl:block" />
              <Plus size={0.5} className="hidden md:block xl:hidden" />
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
            <Button
              variant={"success"}
              size={"sm"}
              className="flex items-center mr-1"
            >
              <Code size={0.5} />
              <span className="font-semibold">Code</span>
              <ChevronDown size={0.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-48 w-[400px]">
            {/* TODO: add dropdown component for codespaces and gitclone */}
            <DropdownMenuLabel className="flex items-center justify-between">
              <div className="flex gap-1">
                <SquareTerminal size={17} />
                Clone
              </div>
              <TooltipComponent
                tooltipContent={"Which remote url should i use?"}
                side="left"
              >
                <a
                  href={`https://docs.github.com/articles/which-remote-url-should-i-use`}
                >
                  <CircleHelp size={17} className="hover:text-[#0969DA]" />
                </a>
              </TooltipComponent>
            </DropdownMenuLabel>
            <DropdownMenuGroup className="px-2">
              <Tabs defaultValue={"https"}>
                <TabsList>
                  <TabsTrigger value="https" className="font-bold">
                    HTTPS
                  </TabsTrigger>
                  <TabsTrigger value="cli" className="font-bold">
                    GitHub Cli
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="https">
                  <div className="flex my-2 gap-2 w-full">
                    <p className="border text-nowrap rounded font-mono text-xs text-center bg-gray-200 py-1 px-2 overflow-auto no-scrollbar">
                      {`https://github.com/${orgName}/${repoName}.git`}
                    </p>
                    <TooltipComponent
                      tooltipContent={copied ? "Copied" : "Copy to clipboard"}
                    >
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => {
                          handleCopy(
                            `https://github.com/${orgName}/${repoName}.git`
                          );
                        }}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </TooltipComponent>
                  </div>
                  <p className="text-sm mb-3">Clone using the web URL.</p>
                </TabsContent>
                <TabsContent value="cli">
                  <div className="flex my-2 gap-2 w-full">
                    <p className="border text-nowrap rounded font-mono text-xs text-center bg-gray-200 py-1 px-2 overflow-auto no-scrollbar">
                      {`gh repo clone ${orgName}/${repoName}`}
                    </p>
                    <TooltipComponent
                      tooltipContent={copied ? "Copied" : "Copy to clipboard"}
                    >
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => {
                          handleCopy(
                            `gh repo clone ${orgName}/${repoName}`
                          );
                        }}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </TooltipComponent>
                  </div>
                  <p className="text-sm mb-3">Work fast with our official CLI. <a className="inline text-[#0969DA] underline" href="https://cli.github.com/" >Learn more</a></p>
                </TabsContent>
              </Tabs>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="https://github.com/apps/desktop" className="flex gap-2 items-center py-2">
              
              <MonitorDown size={20} />
              <h4 className="text-sm" >Open the Github Desktop</h4>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href={`https://github.com/${orgName}/${repoName}/archive/refs/heads/${defaultBranch}.zip`}className="flex gap-2 items-center py-2">
              <FileArchive size={20} />
              <h4 className="text-sm" >Download ZIP</h4>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
