"use client"

import { ComponentProps } from "react"
import Image from "next/image"

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
import Logo from '@/assets/icons/logo-theme-dark.svg'
import { Button } from "./Button"

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const {
    items,
    activeItem,
    activeSubItem,
    handleItemSelect,
    setActiveSubItem,
    setCurrentStep,
    setIsVideoPlaying
  } = useTourStore()

  const handleSubItemClick = (item: typeof items[0], subItem: typeof activeItem.subItems[0]) => {
    // First, set the main item as active
    handleItemSelect(item);

    // Then set the specific sub-item (instead of the default first one)
    setActiveSubItem(subItem);
    setCurrentStep(item.subItems.indexOf(subItem));

    // Only attempt to play video if the content type is video
    if (subItem.mediaContent.type === 'video') {
      // Play the video after a short delay to ensure the video element is properly updated
      setTimeout(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play()
            .then(() => {
              setIsVideoPlaying(true);
            })
            .catch(err => console.error("Video playback failed:", err));
        }
      }, 50);
    }
  };

  const handleMainItemClick = (item: typeof items[0]) => {
    handleItemSelect(item);

    // Reset video state when changing main items
    setIsVideoPlaying(false);
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid flex-1 my-5 text-sm leading-tight justify-start items-center">
              <Image src={Logo} alt="cody" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="relative hide-scrollbar">
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.id} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleMainItemClick(item)}
                  className={`
                    flex hover:bg-[#200302] items-center justify-center gap-3 px-4 py-2 text-dark-text-primary
                    ${activeItem.id === item.id
                      ? 'bg-[#200302] text-dark-text-primary'
                      : ''
                    }
                  `}
                >
                  <Image alt="cody" className="size-[18px]" src={item.icon} />
                  <span className="flex-1 truncate text-[0.9rem]">{item.title}</span>
                </SidebarMenuButton>
                {item.subItems?.length && (
                  <>
                    <CollapsibleContent>
                      <SidebarMenuSub className="border-none">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              onClick={() => handleSubItemClick(item, subItem)}
                              className={`hover:bg-transparent cursor-pointer active:bg-transparent text-[0.9rem] ${activeSubItem?.id === subItem.id && activeItem.id === item.id
                                ? 'text-link hover:text-link'
                                : 'text-[#444444] hover:text-[#444444] active:text-[#444444]'}`}
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
                className="w-[180px] bg-vermilion-07 text-black hover:opacity-90 transition-opacity px-12 rounded-sm shadow-lg text-sm flex-grow flex items-center justify-center"
                href="/cody"
                variant="primary"
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
