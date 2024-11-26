"use client"

import * as React from "react"
import { Command, ChevronRight, ChevronsUpDown } from "lucide-react"
import { useTourStore } from "@/stores/tour-store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CodyLogo from '@/assets/icons/codyIconWithText.svg'
import Image from "next/image"
import { Button } from "./ui/button"

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { items, activeItem, activeSubItem, completedItems, handleItemSelect, currentStep } = useTourStore()

  console.log('currentStep', currentStep)
  console.log('activeSubItem', activeSubItem)

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid flex-1 text-sm leading-tight justify-center items-center">
              <Image src={CodyLogo} alt="cody" width={150} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.id} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleItemSelect(item)}
                  className={`
                    flex items-center gap-3 px-4 py-2
                    ${activeItem.id === item.id
                      ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                      : ''
                    }
                  `}
                >
                  <Image alt="cody" className="size-4" src={item.icon} />
                  <span className="flex-1 truncate text-sm">{item.title}</span>
                </SidebarMenuButton>
                {item.subItems?.length && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem, index) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              className={`
                                  hover:bg-transparent ${activeSubItem?.id === subItem.id && activeItem.id === item.id
                                  ? 'text-current hover:text-current'
                                  : 'text-gray-400 hover:text-gray-400'}
                                `
                                //   ${index < currentStep && activeItem.id === item.id
                                //     ? 'text-accent'
                                //     : ''}
                                // `
                              }
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full mt-auto p-8 flex justify-center">
              <Button
                className="w-[180px] bg-[linear-gradient(92.92deg,_#ffffffe6,_#ffffffb3)] text-black hover:opacity-90 transition-opacity
          py-6 px-12 rounded-sm shadow-lg text-sm flex-grow flex items-center justify-center"
              >
                Contact Sales
              </Button>
            </div>            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate ">{userData.name}</span>
                    <span className="truncate text-xs">{userData.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}