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

import Logo from '@/assets/icons/logo-theme-dark.svg'
import { motion } from "framer-motion"
import { Button } from "./Button"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    items,
    activeItem,
    activeSubItem,
    handleItemSelect,
    setActiveSubItem,
    setCurrentStep,
    setIsVideoPlaying
  } = useTourStore()
  const [isMoving, setIsMoving] = React.useState(false)


  const handleSubItemClick = (item: typeof items[0], subItem: typeof activeItem.subItems[0]) => {
    // First, set the main item as active
    handleItemSelect(item);

    // Then set the specific sub-item (instead of the default first one)
    setActiveSubItem(subItem);
    setCurrentStep(item.subItems.indexOf(subItem));

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
              <Image src={Logo} alt="cody" width={200} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="relative">
        {/* {activeSubItem && (
          <motion.div
            className="absolute left-[12px] z-10"
            initial={false}
            layoutId="submenu-indicator"
            animate={{
              top: `${(() => {
                const activeItemIndex = items.findIndex(item => item.id === activeItem.id)
                const activeSubItemIndex = activeItem.subItems.findIndex(subItem => subItem.id === activeSubItem.id)

                const subOffset = activeItemIndex == 0 ? 31 : 30.5
                const previousItemsOffset = items
                  .slice(0, activeItemIndex)
                  .reduce((acc, item) => acc + (item.subItems?.length || 0) * subOffset, 0)
                const mainItemsOffset = activeItemIndex * 40
                const currentSubItemOffset = activeSubItemIndex * subOffset

                const baseOffset = 45
                return baseOffset + mainItemsOffset + previousItemsOffset + currentSubItemOffset
              })()}px`
            }}
            onAnimationStart={() => setIsMoving(true)}
            onAnimationComplete={() => setIsMoving(false)}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.5
            }}
          >
            <div className="w-2 h-2 bg-link rounded-full" />
            {!isMoving && <motion.div
              className="absolute w-2 h-2 rounded-full border border-link opacity-60"
              animate={{
                opacity: [0.6, 0],
                scale: [1, 3]
              }}
              transition={{
                duration: 2.5,
                times: [0, 1],
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0
              }}
              style={{
                top: 0,
                left: 0
              }}
            />}
          </motion.div>
        )} */}
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.id} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleMainItemClick(item)}
                  className={`
                    flex hover:bg-[#200302] items-center gap-3 px-4 py-2 text-dark-text-primary
                    ${activeItem.id === item.id
                      ? 'bg-[#200302] text-dark-text-primary'
                      : ''
                    }
                  `}
                >
                  <Image alt="cody" className="size-5" src={item.icon} />
                  <span className="flex-1 truncate text-[0.9rem]">{item.title}</span>
                </SidebarMenuButton>
                {item.subItems?.length && (
                  <>
                    <CollapsibleContent>
                      <SidebarMenuSub>
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
