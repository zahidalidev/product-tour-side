"use client"

import { useTourStore } from "@/stores/tour-store"
import { Button } from "./ui/button"
import Image from "next/image"

export function TourSlider() {
  const { items, activeItem, completedItems, handleItemSelect } = useTourStore()

  const handleNext = () => {
    const currentIndex = items.findIndex(item => item.id === activeItem.id)
    if (currentIndex === 0) {
      // If it's the start button, jump to the second item
      handleItemSelect(items[1])
    } else if (currentIndex < items.length - 1) {
      handleItemSelect(items[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = items.findIndex(item => item.id === activeItem.id)
    if (currentIndex > 0) {
      handleItemSelect(items[currentIndex - 1])
    }
  }

  if (completedItems.includes(0) && activeItem.id !== 0)
    return null

  return (
    <div className="w-[400px] bg-black p-8 flex flex-col gap-3 mr-4">
      <div className="flex items-center gap-3">
        <Image className="w-6 h-6" alt={activeItem.title} src={activeItem.icon} />
        <h2 className="text-left text-xl tracking-tight md:text-3xl md:leading-tight   text-white">{activeItem.title}</h2>
      </div>

      <p className="text-gray-400 text-left text-lg md:text-xl">
        {activeItem.description}
      </p>

      <div className="flex items-center justify-between mt-8  lg:mt-24">
        <div className="flex gap-2">
          {!activeItem.isStartButton && items.filter(item => !item.isStartButton).map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className={`w-3 h-3 rounded-full transition-colors ${item.id === activeItem.id
                ? 'bg-secondary'
                : completedItems.includes(item.id)
                  ? 'bg-gray-400'
                  : 'bg-gray-600'
                }`}
            />
          ))}
        </div>

        <div className={`flex ${activeItem.isStartButton ? 'w-full justify-start' : 'gap-2'}`}>
          {!activeItem.isStartButton && (
            <Button
              onClick={handleBack}
              disabled={activeItem.id === items[1].id}
              variant="outline"
              className="text-white hover:bg-primary text-md px-6 py-4"
            >
              Back
            </Button>)}
          <Button
            onClick={handleNext}
            disabled={activeItem.id === items[items.length - 1].id}
            className={`bg-gradient-to-r from-primary to-secondary text-white ${activeItem.isStartButton ? 'text-lg px-8 py-6' : 'text-md px-6 py-4'}`}
          >
            {activeItem.isStartButton ? 'Start Tour' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}