import { create } from 'zustand'

import ChatIcon from '@/assets/icons/chat.svg'
import AutocompleteIcon from '@/assets/icons/autocomplete.svg'
import ContextIcon from '@/assets/icons/context.svg'
import PromptsIcon from '@/assets/icons/prompts.svg'

export type FocusPoint = {
  xPercent: number // Percentage from left (0-100)
  yPercent: number // Percentage from top (0-100)
  description: string
}

export type SubItem = {
  id: string
  title: string
  description: string
  videoSrc: string
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

// Main sidebar items with videos assigned to each sub-item - with percentage-based coordinates
export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    title: 'Chat',
    description: "Experience Cody's chat capabilities for faster coding",
    icon: ChatIcon,
    isActive: true,
    subItems: [
      {
        id: '1-1',
        title: 'LLM Selection',
        description: 'Choose your preferred language model',
        videoSrc: '/product-tour/assets/demo/demo_1.mp4',
        focusPoints: [
          { xPercent: 53, yPercent: 30, description: 'Select your model from the dropdown' },
        ],
        transitionDelay: 4000, // 4 seconds
        keepFocusPointVisible: true,
        initialDuration: 3.5,
        transitionDuration: 1.8,
      },
      {
        id: '1-2',
        title: 'Inline Edits',
        description: 'Make quick code modifications directly',
        videoSrc: '/product-tour/assets/demo/demo_2.mp4',
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Edit code inline with Cody' }],
        transitionDelay: 36000, // 36 seconds
        initialDuration: 2,
        transitionDuration: 0,
      },
      {
        id: '1-3',
        title: 'Inline Bug Fix',
        description: 'Fix bugs without leaving your editor',
        videoSrc: '/product-tour/assets/demo/demo_3.mp4',
        focusPoints: [{ xPercent: 56, yPercent: 40, description: 'Fix bugs instantly' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '1-4',
        title: 'Smart Apply/Execute',
        description: 'Intelligent code execution and application',
        videoSrc: '/product-tour/assets/demo/demo_4.mp4',
        focusPoints: [{ xPercent: 24, yPercent: 42, description: 'Apply changes with one click' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
    ],
  },
  {
    id: 2,
    title: 'Autocomplete',
    description: 'Code faster with AI-powered autocompletion',
    icon: AutocompleteIcon,
    isActive: true,
    subItems: [
      {
        id: '2-1',
        title: 'Smart Predictions',
        description: 'AI-powered code suggestions',
        videoSrc: '/product-tour/assets/demo/demo_5.mp4',
        focusPoints: [
          { xPercent: 31, yPercent: 24, description: 'Get intelligent code suggestions' },
        ],
        keepFocusPointVisible: true,
        transitionDelay: 2000, // 2 seconds
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '2-2',
        title: 'Natural Language Code Generation',
        description: 'Generate code from plain English',
        videoSrc: '/product-tour/assets/demo/demo_6.mp4',
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
    title: 'Context',
    description: 'Cody understands your codebase context',
    icon: ContextIcon,
    isActive: true,
    subItems: [
      {
        id: '3-1',
        title: 'Multi-Repo Context',
        description: 'Access code across repositories',
        videoSrc: '/product-tour/assets/demo/demo_1.mp4',
        focusPoints: [
          { xPercent: 52, yPercent: 30, description: 'See multi-repo context in action' },
        ],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '3-2',
        title: '@-mention',
        description: 'Reference code and developers easily',
        videoSrc: '/product-tour/assets/demo/demo_2.mp4',
        focusPoints: [{ xPercent: 38, yPercent: 16, description: 'Mention code entities with @' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '3-3',
        title: 'OpenCTX',
        description: 'Open context integration',
        videoSrc: '/product-tour/assets/demo/demo_3.mp4',
        focusPoints: [{ xPercent: 56, yPercent: 40, description: 'Integrate with OpenCTX' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
    ],
  },
  {
    id: 4,
    title: 'Prompts',
    description: 'Enhance productivity with prompt templates',
    icon: PromptsIcon,
    isActive: true,
    subItems: [
      {
        id: '4-1',
        title: 'Prompts & Props Library',
        description: 'Access pre-built prompts and properties',
        videoSrc: '/product-tour/assets/demo/demo_4.mp4',
        focusPoints: [{ xPercent: 30, yPercent: 24, description: 'Browse the prompt library' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
      },
      {
        id: '4-2',
        title: 'Prompt Library',
        description: 'Browse and use community prompts',
        videoSrc: '/product-tour/assets/demo/demo_5.mp4',
        focusPoints: [{ xPercent: 32, yPercent: 86, description: 'Use community-created prompts' }],
        initialDuration: 3.5,
        transitionDuration: 4.0,
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
        currentStep: 0, // Reset focus point index when changing items
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
        // If it's a different subItem, set it as active first
        return {
          activeSubItem: subItem,
          isVideoPlaying: true,
        }
      }
      // Same subItem, just play
      return {
        isVideoPlaying: true,
      }
    })
  },
}))
