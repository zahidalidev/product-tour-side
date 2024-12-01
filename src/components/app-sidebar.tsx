"use client"

import * as React from "react"
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
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import Image from "next/image"

import CodyLogo from '@/assets/icons/codyIconWithText.svg'
import { Button } from "./ui/button"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { items, activeItem, activeSubItem, handleItemSelect } = useTourStore()


  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid flex-1 text-sm leading-tight justify-start items-center">
              <Image src={CodyLogo} alt="cody" width={100} />
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
                    {/* <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger> */}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              className={`
                                  hover:bg-transparent active:bg-transparent ${activeSubItem?.id === subItem.id && activeItem.id === item.id
                                  ? 'text-current hover:text-current'
                                  : 'text-[#444444] hover:text-[#444444] active:text-[#444444]'}
                                `
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
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}