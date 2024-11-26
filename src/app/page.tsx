"use client"

import { useEffect, useMemo, useRef } from 'react'
import { useTourStore } from '@/stores/tour-store'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from 'next/image'

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { activeItem, items, completedItems, setCompletedItems, setItems, setActiveItem, setActiveSubItem, setCurrentStep, activeSubItem } = useTourStore();

  useEffect(() => {
    const currentIframe = iframeRef.current;
    if (currentIframe) {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.payload?.event === 'step_view') {
          const step = event.data.payload?.step?.index;
          if (typeof step === 'number' && activeItem?.subItems[step - 1]) {
            setActiveSubItem(activeItem.subItems[step - 1]);
            setCurrentStep(step);
          }
        }

        if (event.data.payload?.event === 'flow_end') {
          const currentIndex = items.findIndex(item => item.id === activeItem.id);
          const newCompletedItems = [...completedItems];

          if (!newCompletedItems.includes(activeItem.id)) {
            newCompletedItems.push(activeItem.id);
            setCompletedItems(newCompletedItems);
          }

          if (currentIndex === items.length - 1) {
            const firstItem = items[0];
            setActiveItem(firstItem);
            setItems(items.map((item, idx) => ({
              ...item,
              isActive: idx === 0 || newCompletedItems.includes(item.id)
            })));
          } else if (currentIndex < items.length - 1) {
            const nextItem = items[currentIndex + 1];
            setActiveItem(nextItem);
            setItems(items.map((item, idx) => ({
              ...item,
              isActive: idx === currentIndex + 1 || newCompletedItems.includes(item.id)
            })));
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
        if (currentIframe) {
          currentIframe.src = 'about:blank';
        }
      };
    }
  }, [activeItem.id]);

  return (
    <SidebarProvider style={{
      "--sidebar-width": "21.25rem",
      "--sidebar-width-mobile": "15rem",
    } as React.CSSProperties} className="dark p-2" >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>
                    <div className="flex items-center gap-2">
                      <Image alt="cody" className="size-4" src={activeItem.icon} />
                      {activeItem.title}
                    </div>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeSubItem?.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-[94%] mx-auto justify-center">
          <div className="h-[82vh] rounded-xl bg-muted/50">
            {useMemo(() => (
              <iframe
                key={activeItem.id}
                ref={iframeRef}
                className="sl-demo"
                src={`https://app.storylane.io/demo/${activeItem.demoId}`}
                allow="fullscreen"
                allowFullScreen
                suppressHydrationWarning
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            ), [activeItem.id, activeItem.demoId])}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}