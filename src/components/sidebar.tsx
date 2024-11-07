"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useTourStore } from "@/stores/tour-store"

export function ProductTourSidebar() {
  const { items, activeItem, completedItems, handleItemSelect } = useTourStore()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isCompleted = completedItems.includes(item.id)
                const isActive = activeItem.id === item.id

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => handleItemSelect(item)}
                    >
                      <button
                        className={`
                          ${isCompleted ? 'text-green-500' : ''}
                          ${isActive ? 'bg-blue-100' : ''}
                        `}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}