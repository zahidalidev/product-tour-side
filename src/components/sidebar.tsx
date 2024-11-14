"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useTourStore } from "@/stores/tour-store"
import { Button } from "./ui/button"

import CodyLogo from '@/assets/icons/codyIconWithText.svg'
import Image from "next/image"

export function ProductTourSidebar() {
  const { items, activeItem, completedItems, handleItemSelect } = useTourStore()

  return (
    <Sidebar className="bg-black border-r border-border w-[340px]">
      <div className="flex pt-6 p-2 pl-4 items-start justify-start">
        <Image width={200} alt="cody" src={CodyLogo} />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-4">
              {items.map((item) => {
                const isCompleted = completedItems.includes(item.id)
                const isActive = activeItem.id === item.id

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => handleItemSelect(item)}
                      className="hover:bg-[#6112a305]"
                    >
                      <button
                        className={`
                          w-full rounded-lg px-4 py-3 transition-all duration-200
                          ${isCompleted ? 'text-accent' : ''}
                          ${isActive
                            ? 'text-foreground shadow-lg'
                            : 'text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Image alt="cody" src={item.icon} />
                          <span className="text-balance mx-auto max-w-xl text-center text-sm sm:text-base md:text-xl lg:max-w-2xl">{item.title}</span>
                        </div>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="w-full mt-auto p-8 flex justify-center">
        <Button
          className="w-[180px] bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity
          py-6 rounded-lg font-normal shadow-lg"
        >
          Contact Sales
        </Button>
      </div>
    </Sidebar>
  )
}