import { create } from 'zustand'
import ChatIcon from '@/assets/icons/chat.svg'
import AutocompleteIcon from '@/assets/icons/autocomplete.svg'
import ContextIcon from '@/assets/icons/context.svg'
import PromptsIcon from '@/assets/icons/prompts.svg'

export const sidebarItems = [
  {
    id: 1,
    title: 'Chat',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: ChatIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
    subItems: [
      { id: '1-1', title: 'LLM Selection', description: 'Choose your preferred language model' },
      { id: '1-2', title: 'Inline Edits', description: 'Make quick code modifications directly' },
      { id: '1-3', title: 'Inline Bug Fix', description: 'Fix bugs without leaving your editor' },
      {
        id: '1-4',
        title: 'Smart Apply/Execute',
        description: 'Intelligent code execution and application',
      },
    ],
  },
  {
    id: 2,
    title: 'Autocomplete',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: AutocompleteIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
    subItems: [
      { id: '2-1', title: 'Smart Predictions', description: 'AI-powered code suggestions' },
      {
        id: '2-2',
        title: 'Natural Language Code Generation',
        description: 'Generate code from plain English',
      },
    ],
  },
  {
    id: 3,
    title: 'Context',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: ContextIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
    subItems: [
      { id: '3-1', title: 'Multi-Repo Context', description: 'Access code across repositories' },
      { id: '3-2', title: '@-mention', description: 'Reference code and developers easily' },
      { id: '3-3', title: 'OpenCTX', description: 'Open context integration' },
    ],
  },
  {
    id: 4,
    title: 'Prompts',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: PromptsIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
    subItems: [
      {
        id: '4-1',
        title: 'Prompts & Props Library',
        description: 'Access pre-built prompts and properties',
      },
      { id: '4-2', title: 'Prompt Library', description: 'Browse and use community prompts' },
    ],
  },
]

type SubItem = {
  id: string
  title: string
  description: string
}

type SidebarItem = {
  id: number
  title: string
  description: string
  icon: string
  demoId: string
  isActive: boolean
  subItems: SubItem[]
}

type TourStore = {
  items: SidebarItem[]
  activeItem: SidebarItem
  activeSubItem: SubItem | null
  completedItems: number[]
  currentStep: number
  setActiveItem: (item: SidebarItem) => void
  setActiveSubItem: (subItem: SubItem | null) => void
  setCurrentStep: (step: number) => void
  setCompletedItems: (ids: number[]) => void
  setItems: (items: SidebarItem[]) => void
  handleItemSelect: (item: SidebarItem) => void
}

export const useTourStore = create<TourStore>((set) => ({
  items: sidebarItems,
  activeItem: sidebarItems[0],
  activeSubItem: sidebarItems[0].subItems[0],
  currentStep: 0,
  completedItems: [],
  setCurrentStep: (step) => set({ currentStep: step }),
  setActiveItem: (item) =>
    set({
      activeItem: item,
      activeSubItem: item.subItems[0],
      currentStep: 0,
    }),
  setActiveSubItem: (subItem) => set({ activeSubItem: subItem }),
  setCompletedItems: (ids) => set({ completedItems: ids }),
  setItems: (items) => set({ items }),
  handleItemSelect: (item) => {
    set((state) => {
      return {
        activeItem: item,
        items: state.items.map((menuItem) => ({
          ...menuItem,
          isActive: menuItem.id === item.id || state.completedItems.includes(menuItem.id),
        })),
      }
    })
  },
}))
