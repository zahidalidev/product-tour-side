import { create } from 'zustand'
import ChatIcon from '@/assets/icons/chat.svg'
import AutocompleteIcon from '@/assets/icons/autocomplete.svg'
import ContextIcon from '@/assets/icons/context.svg'
import PromptsIcon from '@/assets/icons/prompts.svg'

export const sidebarItems = [
  {
    id: 1,
    title: 'Chat',
    icon: ChatIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: true,
  },
  {
    id: 2,
    title: 'Autocomplete',
    icon: AutocompleteIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: false,
  },
  {
    id: 3,
    title: 'Context',
    icon: ContextIcon,
    demoId: '6ly0v9tfnmsr',
    isActive: false,
  },
  {
    id: 4,
    title: 'Prompts',
    icon: PromptsIcon,
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
