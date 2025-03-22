import { create } from 'zustand'

import CodeSearch from '@/assets/icons/codeSearch.svg'
import Cody from '@/assets/icons/cody.svg'
import Agents from '@/assets/icons/agents.svg'
import BatchChanges from '@/assets/icons/batchChanges.svg'
import ContextIcon from '@/assets/icons/context.svg'
import PromptsIcon from '@/assets/icons/prompts.svg'

export type FocusPoint = {
  xPercent: number // Percentage from left (0-100)
  yPercent: number // Percentage from top (0-100)
  description: string
}

// Define a type for the media content
export type MediaContent = {
  type: 'video' | 'image'
  src: string
}

export type SubItem = {
  id: string
  title: string
  description: string
  // Replace videoSrc with mediaContent
  mediaContent: MediaContent
  focusPoints: FocusPoint[]
  keepFocusPointVisible?: boolean
  transitionDelay?: number // Time in milliseconds before moving to next point
  initialDuration?: number // Time in seconds for initial appearance animation
  transitionDuration?: number // Time in seconds for transition between points
}

export type SidebarItem = {
  id: number
  title: string
  description: string
  icon: string
  isActive: boolean
  subItems: SubItem[]
}

// Main sidebar items with videos/images assigned to each sub-item - with percentage-based coordinates
export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    title: 'Code Search',
    description: 'Powerful code search across repositories',
    icon: CodeSearch,
    isActive: true,
    subItems: [
      {
        id: '1-1',
        title: 'Basic Search',
        description: 'Search through your codebase',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_1.png',
        },
        focusPoints: [{ xPercent: 53, yPercent: 30, description: 'Enter your search query' }],
        transitionDelay: 0,
        // keepFocusPointVisible: true,
        initialDuration: 3.5,
        transitionDuration: 1.8,
      },
      {
        id: '1-2',
        title: 'Inline Edits',
        description: 'Make quick code modifications directly',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_2.png',
        },
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Edit code inline with Cody' }],
        transitionDelay: 0,
        initialDuration: 2,
        transitionDuration: 0,
      },
      {
        id: '1-3',
        title: 'Inline Bug Fix',
        description: 'Fix bugs without leaving your editor',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_3.png',
        },
        focusPoints: [{ xPercent: 56, yPercent: 40, description: 'Fix bugs instantly' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '1-4',
        title: 'Smart Apply/Execute',
        description: 'Intelligent code execution and application',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_1.png',
        },
        focusPoints: [{ xPercent: 24, yPercent: 42, description: 'Apply changes with one click' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
    ],
  },
  {
    id: 2,
    title: 'Cody — AI Assistant',
    description: 'AI-powered coding assistant',
    icon: Cody,
    isActive: true,
    subItems: [
      {
        id: '2-1',
        title: 'Chat Interface',
        description: 'Interact with Cody',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_2.png',
        },
        focusPoints: [{ xPercent: 31, yPercent: 24, description: 'Start chatting with Cody' }],
        keepFocusPointVisible: true,
        transitionDelay: 0,
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '2-2',
        title: 'Natural Language Code Generation',
        description: 'Generate code from plain English',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_3.png',
        },
        focusPoints: [
          { xPercent: 29, yPercent: 84, description: 'Generate code with natural language' },
        ],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
    ],
  },
  {
    id: 3,
    title: 'Code Navigation',
    description: 'Navigate through your codebase efficiently',
    icon: ContextIcon,
    isActive: true,
    subItems: [
      {
        id: '3-1',
        title: 'Jump to Definition',
        description: 'Quick code navigation',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_1.png',
        },
        focusPoints: [{ xPercent: 52, yPercent: 30, description: 'Navigate code definitions' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '3-2',
        title: '@-mention',
        description: 'Reference code and developers easily',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_2.png',
        },
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Mention code entities with @' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '3-3',
        title: 'OpenCTX',
        description: 'Open context integration',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_3.png',
        },
        focusPoints: [{ xPercent: 56, yPercent: 40, description: 'Integrate with OpenCTX' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
    ],
  },
  {
    id: 4,
    title: 'Code Insights',
    description: 'Analyze code patterns and metrics',
    icon: PromptsIcon,
    isActive: true,
    subItems: [
      {
        id: '4-1',
        title: 'Dashboard',
        description: 'View code analytics',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_1.png',
        },
        focusPoints: [{ xPercent: 30, yPercent: 24, description: 'Explore code insights' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '4-2',
        title: 'Prompt Library',
        description: 'Browse and use community prompts',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_2.png',
        },
        focusPoints: [{ xPercent: 32, yPercent: 86, description: 'Use community-created prompts' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
    ],
  },
  {
    id: 5,
    title: 'Code Monitoring',
    description: 'Track code changes and patterns',
    icon: PromptsIcon,
    isActive: true,
    subItems: [
      {
        id: '5-1',
        title: 'Monitors',
        description: 'Set up code monitors',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_3.png',
        },
        focusPoints: [{ xPercent: 30, yPercent: 24, description: 'Configure monitoring' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '5-2',
        title: 'Inline Edits',
        description: 'Make quick code modifications directly',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_1.png',
        },
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Edit code inline with Cody' }],
        transitionDelay: 0,
        initialDuration: 2,
        transitionDuration: 0,
      },
    ],
  },
  {
    id: 6,
    title: 'Batch Changes',
    description: 'Make large-scale code changes',
    icon: BatchChanges,
    isActive: true,
    subItems: [
      {
        id: '6-1',
        title: 'Create Batch',
        description: 'Initialize batch changes',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_2.png',
        },
        focusPoints: [{ xPercent: 30, yPercent: 24, description: 'Start batch operation' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '6-2',
        title: 'Inline Edits',
        description: 'Make quick code modifications directly',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_3.png',
        },
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Edit code inline with Cody' }],
        transitionDelay: 0,
        initialDuration: 2,
        transitionDuration: 0,
      },
    ],
  },
  {
    id: 7,
    title: 'Agents',
    description: 'Manage automated agents',
    icon: Agents,
    isActive: true,
    subItems: [
      {
        id: '7-1',
        title: 'Agent Overview',
        description: 'View active agents',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_1.png',
        },
        focusPoints: [{ xPercent: 30, yPercent: 24, description: 'Monitor agents' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '7-2',
        title: 'Inline Edits',
        description: 'Make quick code modifications directly',
        mediaContent: {
          type: 'image',
          src: '/product-tour/assets/demo/demo_img_2.png',
        },
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Edit code inline with Cody' }],
        transitionDelay: 0,
        initialDuration: 2,
        transitionDuration: 0,
      },
    ],
  },
]

type TourStore = {
  items: SidebarItem[]
  activeItem: SidebarItem
  activeSubItem: SubItem | null
  completedItems: number[]
  currentStep: number
  isVideoPlaying: boolean
  setActiveItem: (item: SidebarItem) => void
  setActiveSubItem: (subItem: SubItem | null) => void
  setCurrentStep: (step: number) => void
  setCompletedItems: (ids: number[]) => void
  setItems: (items: SidebarItem[]) => void
  setIsVideoPlaying: (isPlaying: boolean) => void
  handleItemSelect: (item: SidebarItem) => void
  playVideo: (subItem: SubItem) => void
}

export const useTourStore = create<TourStore>((set) => ({
  items: sidebarItems,
  activeItem: sidebarItems[0],
  activeSubItem: sidebarItems[0].subItems[0],
  currentStep: 0,
  completedItems: [],
  isVideoPlaying: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  setActiveItem: (item) =>
    set({
      activeItem: item,
      activeSubItem: item.subItems[0],
      currentStep: 0,
      isVideoPlaying: false,
    }),
  setActiveSubItem: (subItem) =>
    set({
      activeSubItem: subItem,
      isVideoPlaying: false,
    }),
  setCompletedItems: (ids) => set({ completedItems: ids }),
  setItems: (items) => set({ items }),
  setIsVideoPlaying: (isPlaying) => set({ isVideoPlaying: isPlaying }),
  handleItemSelect: (item) => {
    set((state) => {
      return {
        activeItem: item,
        activeSubItem: item.subItems[0],
        currentStep: 0,
        isVideoPlaying: false,
        items: state.items.map((menuItem) => ({
          ...menuItem,
          isActive: menuItem.id === item.id || state.completedItems.includes(menuItem.id),
        })),
      }
    })
  },
  playVideo: (subItem) => {
    set((state) => {
      if (subItem.id !== state.activeSubItem?.id) {
        return {
          activeSubItem: subItem,
          isVideoPlaying: true,
        }
      }
      return {
        isVideoPlaying: true,
      }
    })
  },
}))
