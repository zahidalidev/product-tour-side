"use client"

import { useEffect, useRef, useState } from 'react'
import { useTourStore } from '@/stores/tour-store'
import backgroundImage from '@/assets/images/lite-metallic.png'

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
        backgroundColor: currentColor,
        boxShadow: `
          0 0 8px rgba(255,255,255,1),
          0 0 16px rgba(255,255,255,0.9),
          0 0 30px rgba(255,255,255,0.8),
          0 0 50px rgba(161, 18, 255, 0.6)
        `,
        filter: 'brightness(1.5) blur(0.5px)',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
      }}
    />
  )
}

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { activeItem, items, completedItems, setCompletedItems, setItems, setActiveItem } = useTourStore();

  const stars = Array.from({ length: 700 }).map((_, i) => ({
    style: {
      bottom: `${Math.random() * 200 - 50}%`,
      left: `${Math.random() * 200 - 50}%`,
      animationDuration: `${Math.random() * 20 + 200}s`,
      animationDelay: `-${Math.random() * 60}s`,
    }
  }));

  useEffect(() => {
    let currentIframe = iframeRef.current;
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
    <main style={{ backgroundColor: 'black' }} className="flex-1 flex items-center justify-center text-foreground relative overflow-hidden">
      {stars.map((star, i) => (
        <StarParticle key={i} style={star.style} />
      ))}
      <div className="sl-embed rounded-lg border border-border relative z-10 overflow-hidden" style={{
        position: 'relative', width: '68.5rem', height: '45rem',
        transformOrigin: 'bottom center',
        transition: 'all 2s ease-in-out',
        boxShadow: '0 0 7vw -4vw #a112ff'
      }}>
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
            boxSizing: 'border-box'
          }}
        />
      </div>
      <div className="overflow-hidden rounded-lg border" style={{
        position: 'absolute', width: '68.5rem', height: '45rem',  borderRadius: '10px',
      }}>
        <BorderLine />
      </div>
    </main>
  )
}