import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ReactNode } from "react"


type TooltipComponentProps = {
  children: ReactNode,
  tooltipContent: ReactNode
}

export function TooltipComponent({children,tooltipContent}:TooltipComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger >
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
            {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

