import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dropdown-menu"
import type { ReactNode } from "react"

type DropdownMenuComponentProps = {
  dropdownMenuTrigger: ReactNode
  dropdownContent: ReactNode
  className?:string
}

export function DropdownMenuComponent({dropdownMenuTrigger,dropdownContent,className}:DropdownMenuComponentProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {dropdownMenuTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        {dropdownContent}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
