'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "./ui/button";
  import { Check, ChevronDown, Eye, GitFork, Star } from "lucide-react";
  import { Badge } from "./ui/badge";
  import { useState } from "react";
  import { Separator } from "./ui/separator";
  
  export type RepoDetailsProps = {
    watchersCount: string;
    forksCount: string;
    starGazersCount: string;
    repoUrl: string;
  };
  
  export function RepoDetails({
    watchersCount,
    forksCount,
    starGazersCount,
    repoUrl,
  }: RepoDetailsProps) {
    const [isStarClicked, setIsStarClicked] = useState(false);
  
    const handleStartClick = () => {
      setIsStarClicked((prev) => !prev);
    };
    return (
      <>
      <div className="flex items-center gap-2 flex-wrap g">
        {/* <Button variant={"outline"} className="hidden md:flex">
          <Heart size={20} color="pink" />
          Sponsor
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={'xsm'} className="text-xs gap-1">
              <Eye size={20} />
              <div className="hidden md:flex">
                 Watch
              </div>
              <Badge variant={"secondary"} className="hidden md:flex">{watchersCount}</Badge>
              <ChevronDown size={1} className="hidden md:flex"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 h-auto">
            <DropdownMenuGroup className="mb-2">
              <DropdownMenuItem className="items-baseline">
                <Check size={20} />
                <div>
                  <h4 className="font-bold text-sm mb-1">
                    Participating and @mentions
                  </h4>
                  <h4 className="font-light text-xs">
                    Only receive notifications from this repository when
                    participating or @mentioned.
                  </h4>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <Separator />
            <DropdownMenuGroup className="my-2">
              <DropdownMenuItem className="items-baseline">
                <Check size={20} className="invisible" />
                <div>
                  <h4 className="font-bold text-sm mb-1">All Actvity</h4>
                  <h4 className="font-light text-xs">
                    Notified of all notifications on this repository
                  </h4>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <Separator />
            <DropdownMenuGroup className="my-2">
              <DropdownMenuItem className="items-baseline">
                <Check size={20} className="invisible" />
                <div>
                  <h4 className="font-bold text-sm mb-1">Ignore</h4>
                  <h4 className="font-light text-xs">Never be notified</h4>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <Separator />
            <DropdownMenuGroup className="my-2">
              <DropdownMenuItem className="items-baseline">
                <Check size={20} className="invisible" />
                <div>
                  <h4 className="font-bold text-sm mb-1">Custom</h4>
                  <h4 className="font-light text-xs">
                    Select events you want to be notified of in addition to
                    participating and @mentions
                  </h4>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <Separator />
          </DropdownMenuContent>
        </DropdownMenu>
        <a href={`${repoUrl}/forks`}>
          <Button variant={"outline"} size={'xsm'} className="text-xs gap-1">
            <GitFork size={20} />
            <div className="hidden md:flex">
              Fork
              </div>
            <Badge variant={"secondary"} className="hidden md:flex">{forksCount}</Badge>
          </Button>
        </a>
  
        <Button variant={"outline"} onClick={handleStartClick} size={'xsm'} className="text-xs gap-1 bg-muted">
          {isStarClicked ? (
            <Star fill="#eac54f" color="#eac54f" size={20} />
          ) : (
            <Star size={20} />
          )}
          <div className="hidden md:flex">
  
          {isStarClicked ? "Starred" : "Star"}
          </div>
          <Badge variant={"secondary"} className="hidden md:flex">{starGazersCount}</Badge>
        </Button>
      </div>
      </>
    );
  }
  