"use client"

import { useEffect, useRef } from 'react'
import { useTourStore } from '@/stores/tour-store'

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { activeItem, items, completedItems, setCompletedItems, setItems, setActiveItem } = useTourStore();

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
  }, [iframeRef.current, activeItem.id]);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to Product Tour</h1>
        <div className="sl-embed" style={{ position: 'relative', width: '70rem', height: '45rem' }}>
          <iframe
            key={activeItem.id}
            ref={iframeRef}
            className="sl-demo"
            src={`https://app.storylane.io/demo/${activeItem.demoId}`}
            allow="fullscreen"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: '1px solid rgba(63,95,172,0.35)',
              boxShadow: '0px 0px 18px rgba(26, 19, 72, 0.15)',
              borderRadius: '10px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </div>
  )
}