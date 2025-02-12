import { Icons } from "./icons/icons";
import {
  CircleDot,
  Computer,
  Menu,
  MessageSquareCode,
  MessagesSquare,
  Search,
  Shield,
  SquareCode,
  Workflow,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export function NavBar({className}:{className?:string}) {
  return (
    <div className={cn("flex justify-between items-center px-5 py-4 bg-[#25292f] text-white",className)}>
      <div className="lg:flex gap-2 items-center hidden">
        <a href="https://www.github.com" aria-label="github" className="ml-2">
          <Icons.gitHub
            title="github"
            // @ts-ignore
            width={"32"}
            height={"32"}
            fill={"#ffffff"}
          />
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Product
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-4 border-r pr-8">
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        {/* @ts-ignore */}
                        <Icons.copilot width={"25"} height={"25"} />
                        <div>
                          <p className="font-bold">Github Copilot </p>
                          <div className="text-sm">
                            Write your code with AI{" "}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <Shield size={25} />
                        <div>
                          <p className="font-bold">Security</p>
                          <div className="text-sm">
                            Find and fix vulnerabilities{" "}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <Workflow size={25} />
                        <div>
                          <p className="font-bold">Actions </p>
                          <div className="text-sm">Autoamte any workflow </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <Computer width={"25"} height={"25"} />
                        <div>
                          <p className="font-bold">Codespaces </p>
                          <div className="text-sm">
                            Instant dev environments{" "}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <CircleDot width={"25"} height={"25"} />
                        <div>
                          <p className="font-bold">Issues </p>
                          <div className="text-sm">Plan and track work </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <MessageSquareCode width={"25"} height={"25"} />
                        <div>
                          <p className="font-bold">Code Review </p>
                          <div className="text-sm">manage code changes </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <MessagesSquare width={"25"} height={"25"} />
                        <div>
                          <p className="font-bold">Discussions</p>
                          <div className="text-sm">
                            Collabrate outside of code{" "}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hover:text-[#0969DA] cursor-pointer">
                        <SquareCode width={"25"} height={"25"} />
                        <div>
                          <p className="font-bold">Code Search</p>
                          <div className="text-sm">Find more, search less </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-bold">Explore</div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        All features
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Documentaions
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Github Skills
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Blog
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 border-r pr-8">
                      <div className="font-bold">By company size</div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Enterprises
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Small and medium teams
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Startups
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Nonprofits
                      </div>
                      <div className="font-bold">By use case</div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        DevOps
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        CI/CD
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        View all use cases
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-bold">By industry</div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Healthcare
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Financial services
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Manufacturing
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Government
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        View all industries
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 border-r pr-8">
                      <div className="font-bold">Topics</div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        AI
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        DevOps
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Security
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Software Development
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        View all
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-bold">Explore</div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Learning Pathways
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Events & Webinars
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Ebooks & Whitepapers
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Customer Stories
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Partners
                      </div>
                      <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                        Executive Insights
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden lg:block">
              <NavigationMenuTrigger className="bg-transparent">
                Open Source
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-6">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="flex flex-col gap-4">
                      <div className="hover:text-[#0969DA] cursor-pointer">
                        <div className="font-bold">Github Sponsors</div>
                        <div className="text-sm">
                          Fund open source developers
                        </div>
                      </div>
                      <Separator />
                      <div className="hover:text-[#0969DA] cursor-pointer">
                        <div className="font-bold">The ReadME Project</div>
                        <div className="text-sm">GitHub community articles</div>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-2">
                        <div className="font-bold">Repositories</div>
                        <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                          Topics
                        </div>
                        <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                          Trendings
                        </div>
                        <div className="text-sm hover:text-[#0969DA] cursor-pointer">
                          Collections
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hover:text-gray-200 cursor-pointer">Pricing</div>
      </div>
      <div className="lg:flex gap-2 items-center hidden">
        <div className="xl:flex xl:w-64 h-8 hidden rounded-md gap-2 px-2 border-gray-300 border items-center">
          <Search size={20} strokeWidth={1} />
          Search
        </div>
        <Button
          size={"icon"}
          variant={"outline"}
          className="md:flex xl:hidden xs:hidden  bg-[#25292f] text-white"
        >
          <Search size={20} strokeWidth={1} />
        </Button>
        <Button
          variant={"ghost"}
          className="hover:bg-inherit hover:text-gray-200"
        >
          Sign in
        </Button>
        <Button
          variant={"outline"}
          className="hover:bg-inherit hover:text-gray-200 bg-inherit"
          size={"sm"}
        >
          Sign up
        </Button>
      </div>
      <Button
        size={"icon"}
        variant={"outline"}
        className="lg:hidden bg-[#25292f] text-white"
      >
        <Menu size={30} />
      </Button>
      <a
        href="https://www.github.com"
        aria-label="github"
        className="ml-2 lg:hidden"
      >
        <Icons.gitHub
          title="github"
          // @ts-ignore
          width={"32"}
          height={"32"}
          fill={"#ffffff"}
        />
      </a>
      <Button
        variant={"outline"}
        className="hover:bg-inherit hover:text-gray-200 bg-inherit lg:hidden"
        size={"sm"}
      >
        Sign in
      </Button>
    </div>
  );
}
