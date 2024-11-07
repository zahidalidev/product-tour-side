import { create } from 'zustand'
import { MessageSquare, Wand2, Box, MessageSquareDashed } from 'lucide-react'

export const sidebarItems = [
  {
    id: 1,
    title: 'Chat',
    icon: MessageSquare,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
  {
    id: 2,
    title: 'Autocomplete',
    icon: Wand2,
    demoId: '6ly0v9tfnmsr',
    isActive: false,
  },
  {
    id: 3,
    title: 'Context',
    icon: Box,
    demoId: '6ly0v9tfnmsr',
    isActive: false,
  },
  {
    id: 4,
    title: 'Prompts',
    icon: MessageSquareDashed,
    demoId: '6ly0v9tfnmsr',
    isActive: false,
  },
]

type TourStore = {
  items: typeof sidebarItems
  activeItem: (typeof sidebarItems)[0]
  completedItems: number[]
  setActiveItem: (item: (typeof sidebarItems)[0]) => void
  setCompletedItems: (ids: number[]) => void
  setItems: (items: typeof sidebarItems) => void
  handleItemSelect: (item: (typeof sidebarItems)[0]) => void
}

export const useTourStore = create<TourStore>((set) => ({
  items: sidebarItems,
  activeItem: sidebarItems[0],
  completedItems: [],
  previousEvent: '',
  setActiveItem: (item) => set({ activeItem: item }),
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
