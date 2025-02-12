import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import type { ReactNode } from "react"
  
  
  type TooltipComponentProps = {
    children: ReactNode,
    tooltipContent: ReactNode,
    side?: "top" | "right" | "bottom" | "left"
  }
  
  export function TooltipComponent({children,tooltipContent,side}:TooltipComponentProps) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white" side={side}>
              {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
    