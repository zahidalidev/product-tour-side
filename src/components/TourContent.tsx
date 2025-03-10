import { motion, AnimatePresence } from "framer-motion"
import { useTourStore } from "@/stores/tour-store"
import React, { useRef, useEffect, useState } from "react"

export function TourContent() {
  const {
    activeItem,
    setActiveItem,
    items,
    activeSubItem,
    setActiveSubItem,
    isVideoPlaying,
    setIsVideoPlaying
  } = useTourStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // const [videoEnded, setVideoEnded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextFocusPoint, setNextFocusPoint] = useState<{ xPercent: number, yPercent: number, description: string } | null>(null)
  const [debug, setDebug] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(0)

  // Calculate actual pixel positions from percentages
  const [focusPointPosition, setFocusPointPosition] = useState({ x: 0, y: 0 })
  const [nextFocusPointPosition, setNextFocusPointPosition] = useState({ x: 0, y: 0 })

  // Calculate pixel positions whenever container size changes or active sub-item changes
  const calculatePositions = () => {
    if (!containerRef.current || !activeSubItem?.focusPoints?.length) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const { width, height } = rect;

    // Calculate current focus point position
    const currentPoint = activeSubItem.focusPoints[0];
    setFocusPointPosition({
      x: (currentPoint.xPercent / 100) * width,
      y: (currentPoint.yPercent / 100) * height
    });

    // Calculate next focus point position if transitioning
    if (nextFocusPoint) {
      setNextFocusPointPosition({
        x: (nextFocusPoint.xPercent / 100) * width,
        y: (nextFocusPoint.yPercent / 100) * height
      });
    }
  };

  // Recalculate positions on window resize
  useEffect(() => {
    calculatePositions();

    const handleResize = () => {
      calculatePositions();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSubItem?.id, nextFocusPoint]);

  // Debug mode toggle with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setDebug(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Video setup and cleanup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      setIsVideoPlaying(false)
      // setVideoEnded(true)
    }

    // Clean and reset video and states when active sub-item changes
    video.currentTime = 0
    video.pause()
    // setVideoEnded(false)
    setNextFocusPoint(null)

    // Reset the transitioning state when changing sub-items
    setIsTransitioning(false)

    // Add event listeners
    video.addEventListener('ended', handleVideoEnd)

    return () => {
      // Remove event listeners on cleanup
      video.removeEventListener('ended', handleVideoEnd)
    }
  }, [activeSubItem?.id, setIsVideoPlaying]);

  // Move to the next point or item
  const moveToNextPoint = () => {
    // Find current sub-item index in the active item's subitems
    const currentSubItemIndex = activeItem.subItems.findIndex(
      subItem => subItem.id === activeSubItem?.id
    )

    // If there's a next sub-item in the current active item
    if (currentSubItemIndex < activeItem.subItems.length - 1) {
      setActiveSubItem(activeItem.subItems[currentSubItemIndex + 1])
    } else {
      // Move to the next main item
      const nextItemIndex = items.findIndex(item => item.id === activeItem.id) + 1
      if (nextItemIndex < items.length) {
        setActiveItem(items[nextItemIndex])
      }
    }
  }

  const handlePointClick = () => {
    // Prevent rapid consecutive clicks (debounce)
    const now = Date.now();
    if (now - lastClickTime < 500) return; // Ignore clicks less than 500ms apart
    setLastClickTime(now);

    // Don't proceed if video is already playing
    if (isVideoPlaying) {
      if (debug) console.log("Click ignored: Video is already playing");
      return;
    }

    // Don't proceed if we're in the middle of a transition
    if (isTransitioning) {
      if (debug) console.log("Click ignored: Transition in progress");
      return;
    }

    // Find the next point or item
    const currentSubItemIndex = activeItem.subItems.findIndex(
      subItem => subItem.id === activeSubItem?.id
    )

    let nextSubItem = null;
    if (currentSubItemIndex < activeItem.subItems.length - 1) {
      nextSubItem = activeItem.subItems[currentSubItemIndex + 1];
    } else {
      const nextItemIndex = items.findIndex(item => item.id === activeItem.id) + 1;
      if (nextItemIndex < items.length) {
        nextSubItem = items[nextItemIndex].subItems[0];
      }
    }

    // Play the current video when focus point is clicked
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => {
          setIsVideoPlaying(true);
          // setVideoEnded(false);

          // If keepFocusPointVisible is true and we have a next item
          if (activeSubItem?.keepFocusPointVisible && nextSubItem) {
            // Set next focus point for animation
            if (nextSubItem.focusPoints && nextSubItem.focusPoints.length > 0) {
              setNextFocusPoint(nextSubItem.focusPoints[0]);
              setIsTransitioning(true);

              // Calculate position for the next focus point
              if (containerRef.current) {
                const container = containerRef.current;
                const rect = container.getBoundingClientRect();
                const { width, height } = rect;

                setNextFocusPointPosition({
                  x: (nextSubItem.focusPoints[0].xPercent / 100) * width,
                  y: (nextSubItem.focusPoints[0].yPercent / 100) * height
                });
              }

              // Use the configured delay or default to 2000ms
              const delay = activeSubItem?.transitionDelay ?? 2000;

              // Move to next point after the configured delay
              const timerId = setTimeout(() => {
                if (nextSubItem.id.split('-')[0] !== activeSubItem?.id.split('-')[0]) {
                  // Moving to a different main item
                  const nextItemIndex = items.findIndex(item => item.id === activeItem.id) + 1;
                  setActiveItem(items[nextItemIndex]);
                } else {
                  // Moving to next sub-item in same main item
                  setActiveSubItem(nextSubItem);
                }
                // Make sure to reset transitioning state
                setIsTransitioning(false);
                setNextFocusPoint(null);
              }, delay);

              // Safety fallback: If for some reason the transition doesn't complete,
              // reset the transition state after delay + 1000ms
              setTimeout(() => {
                setIsTransitioning(false);
              }, delay + 1000);

              return () => clearTimeout(timerId);
            }
          }
        })
        .catch(err => {
          console.error("Video playback failed:", err);
          // Reset states if video fails to play
          setIsVideoPlaying(false);
          setIsTransitioning(false);
        });
    }
  }

  const handleVideoEnd = () => {
    // First, ensure video playing state is updated
    setIsVideoPlaying(false);

    // Only move to next point if not in transitioning state
    if (!isTransitioning) {
      moveToNextPoint();
    } else if (debug) {
      console.log("Auto-navigation after video end skipped: transition in progress");
    }
  }

  if (!activeSubItem) return null

  // Debug coordinates handler
  const handleDebugClick = (e: React.MouseEvent) => {
    if (!debug) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Calculate percentages
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);

    const debugEl = document.getElementById('debug-coords');
    if (debugEl) {
      debugEl.innerHTML += `<div>x: ${x}px (${xPercent}%), y: ${y}px (${yPercent}%)</div>`;
      console.log(`{ xPercent: ${xPercent}, yPercent: ${yPercent}, description: 'Your description here' },`);
    }
  };

  // Determine whether to show focus point based on video playing state and keepFocusPointVisible property
  const shouldShowFocusPoint =
    (activeSubItem.keepFocusPointVisible || !isVideoPlaying) &&
    activeSubItem.focusPoints &&
    activeSubItem.focusPoints.length > 0;

  // Calculate transition duration based on whether we're moving to a new point
  const transitionDuration = nextFocusPoint ?
    ((activeSubItem.transitionDelay ?? 2000) / 1000) * 0.75 : // Use 75% of the delay time for the animation
    0.5;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden"
      onClick={handleDebugClick}
    >
      {debug && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-80 text-white p-2 z-[9999]">
          <p>Debug Mode: Click anywhere to get coordinates</p>
          <p className="text-xs mt-1">States: {isVideoPlaying ? 'Playing' : 'Paused'},
            {isTransitioning ? 'Transitioning' : 'Not Transitioning'}</p>
          <div className="mt-2 text-xs" id="debug-coords"></div>
        </div>
      )}
      <AnimatePresence>
        {shouldShowFocusPoint && (
          <motion.div
            className="absolute z-50 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: nextFocusPoint ? nextFocusPointPosition.x : focusPointPosition.x,
              y: nextFocusPoint ? nextFocusPointPosition.y : focusPointPosition.y
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: transitionDuration,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handlePointClick();
            }}
          >
            <div className="relative">
              {/* Focus point indicator */}
              <div className="w-6 h-6 bg-vermilion-07 rounded-full" />
              <motion.div
                className="absolute top-0 left-0 w-6 h-6 rounded-full border-4 border-vermilion-07"
                animate={{
                  scale: [1, 1.5],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Tooltip Card */}
              <div className="absolute left-12 top-[-42px] z-50">
                <div className="relative">
                  {/* Tooltip Arrow */}

                  <svg
                    width="16"
                    height="24"
                    viewBox="0 0 12 20"
                    fill="none"
                    className="absolute left-[-13px] top-[50%] transform translate-y-[-50%]"
                  >
                    <path
                      d="M0 10L12 2L12 18L0 10Z"
                      fill="#FFF3F0"
                    />
                  </svg>

                  {/* Tooltip Card Body */}
                  <div className="bg-gradient-to-r from-vermilion-11 to-vermilion-11 text-vermilion-00 rounded-md py-2 px-5 shadow-lg min-w-[311px] min-h-[105px] flex flex-col justify-center">
                    <h4 className="text-lg font-bold my-1">Focus Point</h4>
                    <p className="text-sm font-base leading-tight">
                      {nextFocusPoint ? nextFocusPoint.description : activeSubItem.focusPoints[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={activeSubItem.videoSrc}
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  )
}

