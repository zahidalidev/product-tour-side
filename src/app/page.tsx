"use client"

import { useEffect, useRef, useState } from 'react'
import { useTourStore } from '@/stores/tour-store'
import { TourSlider } from '@/components/tour-slider'
import { Button } from '@/components/ui/button'

const StarParticle = ({ style }: { style: React.CSSProperties }) => {
  const colors = [
    'bg-yellow-400',
    'bg-white',
    'bg-primary',
    'bg-secondary',
  ]

  const size = Math.random() * 2.5 + 1 + 'px'

  return (
    <div
      className={`absolute ${colors[Math.floor(Math.random() * colors.length)]} rounded-full opacity-60 animate-diagonal-float twinkle`}
      style={{
        width: size,
        height: size,
        ...style
      }}
    />
  )
}

const BorderLine = () => {
  const colors = ['#ffcb47', '#e34ba9', '#369eff', '#95f3d9']
  const [currentColor, setCurrentColor] = useState(colors[0])

  useEffect(() => {
    let colorIndex = 0
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length
      setCurrentColor(colors[colorIndex])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute animate-border-line"
      style={{
        background: `linear-gradient(var(--gradient-angle, 90deg), 
          transparent 0%, 
          ${currentColor} 30%, 
          ${currentColor} 70%, 
          transparent 100%)`,
        boxShadow: `
          0 0 8px rgba(255,255,255,1),
          0 0 16px rgba(255,255,255,0.9),
          0 0 30px rgba(255,255,255,0.8),
          0 0 50px rgba(161, 18, 255, 0.6)
        `,
        filter: 'brightness(1.5) blur(0.5px)',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        // zIndex: 1000,
      }}
    />
  )
}

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { activeItem, items, completedItems, setCompletedItems, setItems, setActiveItem, handleItemSelect } = useTourStore();

  const stars = Array.from({ length: 700 }).map(() => ({
    style: {
      bottom: `${Math.random() * 200 - 50}%`,
      left: `${Math.random() * 200 - 50}%`,
      animationDuration: `${Math.random() * 20 + 200}s`,
      animationDelay: `-${Math.random() * 60}s`,
    }
  }));

  useEffect(() => {
    const currentIframe = iframeRef.current;
    if (currentIframe) {
      const handleMessage = (event: MessageEvent) => {
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
  }, [iframeRef.current, activeItem.id, items, completedItems, setCompletedItems, setItems, setActiveItem]);

  return (
    <main style={{ backgroundColor: 'black' }} className="flex-1 flex items-center justify-center gap-8 text-foreground relative overflow-hidden px-12">
      {stars.map((star, i) => (
        <StarParticle key={i} style={star.style} />
      ))}
      <TourSlider />
      
      <div className="sl-embed rounded-lg border border-border relative z-10 overflow-hidden" style={{
        position: 'relative',
        width: '60rem',
        height: '38rem',
        transformOrigin: 'bottom center',
        transition: 'all 2s ease-in-out',
        boxShadow: '0 0 7vw -4vw #a112ff'
      }}>
        {activeItem.isStartButton && (
          <div className="absolute inset-0 z-20 flex items-center justify-center z-50s">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Product Tour</h1>
              <p className="text-gray-600 mb-8">Discover the powerful features and capabilities of our platform through this interactive guided tour. Learn how to make the most of our tools and streamline your workflow.</p>
              <Button
                onClick={() => handleItemSelect(items[1])}
                className="bg-gradient-to-r from-primary to-secondary text-white text-xl px-8 py-6 mt-auto"
              >
                Start Tour
              </Button>
            </div>
          </div>
        )}
        <iframe
          key={activeItem.id}
          ref={iframeRef}
          className="sl-demo"
          src={`https://app.storylane.io/demo/${activeItem.demoId}`}
          allow="fullscreen"
          allowFullScreen
          suppressHydrationWarning
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0px 0px 18px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            boxSizing: 'border-box',
            filter: activeItem.isStartButton ? 'blur(1px)' : 'none',
            zIndex: 10

          }}
        />
          <BorderLine />

        {/* <div className="overflow-hidden rounded-lg border" style={{
          position: 'absolute', width: '60rem',
          height: '38rem', borderRadius: '10px',
        }}>
          <BorderLine />
        </div> */}
      </div>
    </main>
  )
}