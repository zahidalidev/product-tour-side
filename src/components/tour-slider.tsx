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
    <div className="w-[500px] bg-black p-8 flex flex-col gap-3 mr-4">
      <div className="flex items-center gap-3">
        <Image className="w-10 h-10" alt={activeItem.title} src={activeItem.icon} />
        <h1 className="text-center text-5xl lg:text-6xl font-medium">
          {activeItem.title}
        </h1>
      </div>
      <p className="text-balance text-white mx-auto mt-5 max-w-xl text-left text-sm  sm:text-base md:text-xl lg:mt-2 lg:max-w-2xl">
        {activeItem.description}
      </p>
      <div className="flex items-center justify-between mt-8 lg:mt-10">
        <div className="flex gap-2">
          {items
            .filter(item => !item.isStartButton)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemSelect(item)}
                className={`h-3 w-3 rounded-full transition-colors ${item.id === activeItem.id
                  ? 'bg-secondary'
                  : completedItems.includes(item.id)
                    ? 'bg-gray-400'
                    : 'bg-gray-600'
                  }`}
              />
            ))}
        </div>
        <div className={`flex ${activeItem?.isStartButton ? 'w-full justify-center' : 'gap-2'}`}>
          {!activeItem?.isStartButton && (
            <Button
              onClick={handleBack}
              disabled={activeItem.id === items[0].id}
              variant="outline"
              className="btn btn-secondary-dark w-full max-w-[356px] px-5 sm:w-fit sm:px-6"
            >
              Back
            </Button>)}
          <button
            type="button"
            className="btn btn-primary-dark w-full max-w-[356px] px-5 sm:w-fit sm:px-6 disabled:opacity-50"
            onClick={handleNext}
            disabled={activeItem.id === items[items.length - 1].id}
          >
            {activeItem?.isStartButton ? 'Start Tour' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}