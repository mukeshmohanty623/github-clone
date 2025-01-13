import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow
} from "@/components/ui/hover-card"
import type { ReactNode } from "react";

export function HoverCardComponent({title,children,className }:{title:string;children:ReactNode;className:string}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild >
        <Button variant="ghost"><small className="text-sm font-normal leading-none">{title}</small></Button>
      </HoverCardTrigger>
      <HoverCardContent className={className} align="start" sideOffset={10} arrowPadding={10} side="bottom">
      <HoverCardArrow fill="lightGray"/>
        {children}
      </HoverCardContent>
    </HoverCard>
  )
}
