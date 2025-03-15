import { motion, AnimatePresence } from "framer-motion"
import React, { useRef, useEffect, useState } from "react"
import { useTourStore } from "@/stores/tour-store"

// Animation parameters that you can adjust
const ANIMATION_CONFIG = {
  // Animation type - choose "spring" or "tween"
  animationType: "tween", // "tween" for precise timing, "spring" for bouncy physics

  // Initial appearance parameters
  initialDuration: 5, // seconds for initial appearance (higher = slower)
  initialDelay: 0.6, // delay before initial appearance
  initialStartScale: 0.5, // starting scale for initial appearance
  initialStartOpacity: 0, // starting opacity for initial appearance

  // Transition parameters
  transitionDuration: 3.0, // seconds for transition between points

  // Spring physics parameters (only used if animationType = "spring")
  springStiffness: 8, // lower = more elastic/slower (extremely low for very slow animations)
  springDamping: 4, // lower = more bounce
  springMass: 8, // higher = more inertia/slower

  // Initial position (from center of screen instead of corner)
  initialOffsetX: 19, // percentage from left
  initialOffsetY: 6, // percentage from top

  // Easing functions
  initialEasing: [0.23, 1, 0.32, 1], // cubic-bezier for initial appearance (slow start, slow end)
  transitionEasing: [0.12, 0, 0.39, 0], // cubic-bezier for transitions (super slow start)

  // Tooltip animation
  tooltipFadeDuration: 0.2, // Duration for tooltip fade-in animation
  tooltipDelay: 0.15, // Small delay before tooltip appears
};

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
  const [initialAppearance, setInitialAppearance] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false) // New state to track animation completion
  const [tooltipVisible, setTooltipVisible] = useState(false) // State to control tooltip visibility

  // Check if this is the first sub-item of the first menu item
  const isFirstSubItem = activeItem.id === 1 && activeSubItem?.id === '1-1';

  // Calculate actual pixel positions from percentages
  const [focusPointPosition, setFocusPointPosition] = useState({ x: 0, y: 0 })
  const [nextFocusPointPosition, setNextFocusPointPosition] = useState({ x: 0, y: 0 })
  const [initialCenterPosition, setInitialCenterPosition] = useState({
    x: 0,
    y: 0
  });


  // Then add this useEffect to set the initial position after component mounts
  useEffect(() => {
    // This code only runs in the browser after the component mounts
    const width = window.innerWidth;
    const height = window.innerHeight;
    setInitialCenterPosition({
      x: (ANIMATION_CONFIG.initialOffsetX / 100) * width,
      y: (ANIMATION_CONFIG.initialOffsetY / 100) * height
    });
  }, []);

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

    // Calculate the center position for initial appearances
    setInitialCenterPosition({
      x: (ANIMATION_CONFIG.initialOffsetX / 100) * width,
      y: (ANIMATION_CONFIG.initialOffsetY / 100) * height
    });

    // Calculate next focus point position if transitioning
    if (nextFocusPoint) {
      setNextFocusPointPosition({
        x: (nextFocusPoint.xPercent / 100) * width,
        y: (nextFocusPoint.yPercent / 100) * height
      });
    }
  };

  // Set initial appearance to true whenever activeSubItem changes
  useEffect(() => {
    // For the first sub-item, we don't want any initial animation
    if (isFirstSubItem) {
      setInitialAppearance(false);
      setAnimationComplete(true); // Set animation as complete immediately
      setTooltipVisible(true); // Show tooltip immediately
    } else {
      setInitialAppearance(true);
      setAnimationComplete(false); // Reset animation complete state when subitem changes
      setTooltipVisible(false); // Hide tooltip when changing subitems

      // Delay setting to false to ensure animation plays properly
      const timer = setTimeout(() => {
        setInitialAppearance(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSubItem?.id, isFirstSubItem]);

  // Show tooltip with a delay after animation completes
  useEffect(() => {
    // Skip for first sub-item as we handle it separately
    if (isFirstSubItem) return;

    if (animationComplete && !isTransitioning) {
      const timer = setTimeout(() => {
        setTooltipVisible(true);
      }, ANIMATION_CONFIG.tooltipDelay * 1000);
      return () => clearTimeout(timer);
    } else {
      setTooltipVisible(false);
    }
  }, [animationComplete, isTransitioning, isFirstSubItem]);

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
          setTooltipVisible(false); // Hide tooltip when video starts playing
          // setVideoEnded(false);

          // If keepFocusPointVisible is true and we have a next item
          if (activeSubItem?.keepFocusPointVisible && nextSubItem) {
            // Set next focus point for animation
            if (nextSubItem.focusPoints && nextSubItem.focusPoints.length > 0) {
              setNextFocusPoint(nextSubItem.focusPoints[0]);
              setIsTransitioning(true);
              setAnimationComplete(false); // Reset animation complete state when transitioning

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

  // Calculate transition configuration based on animation type
  const getTransitionConfig = () => {
    // For the first sub-item's initial appearance, use instant transition
    // But for transitions to next points, use normal animation
    if (isFirstSubItem && !nextFocusPoint) {
      return {
        type: "tween",
        duration: 0,
        delay: 0
      };
    }

    if (ANIMATION_CONFIG.animationType === "spring") {
      // Spring configuration
      return {
        type: "spring",
        stiffness: ANIMATION_CONFIG.springStiffness,
        damping: ANIMATION_CONFIG.springDamping,
        mass: ANIMATION_CONFIG.springMass,
        // No duration for true spring physics
      };
    } else {
      // Tween configuration
      return {
        type: "tween",
        duration: nextFocusPoint
          ? (activeSubItem.transitionDuration ?? ANIMATION_CONFIG.transitionDuration)
          : (activeSubItem.initialDuration ?? ANIMATION_CONFIG.initialDuration),
        ease: nextFocusPoint
          ? ANIMATION_CONFIG.transitionEasing
          : ANIMATION_CONFIG.initialEasing,
        delay: initialAppearance ? ANIMATION_CONFIG.initialDelay : 0,
      };
    }
  };

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
            {isTransitioning ? 'Transitioning' : 'Not Transitioning'},
            {animationComplete ? 'Animation Complete' : 'Animating'},
            {tooltipVisible ? 'Tooltip Visible' : 'Tooltip Hidden'},
            {isFirstSubItem ? 'First Sub-Item' : 'Not First Sub-Item'}</p>
          <div className="mt-2 text-xs" id="debug-coords"></div>
          <div className="mt-2 text-xs">
            <p>Animation Config:</p>
            {Object.entries(ANIMATION_CONFIG).map(([key, value]) => (
              <div key={key}>{key}: {value}</div>
            ))}
          </div>
        </div>
      )}
      <AnimatePresence>
        {shouldShowFocusPoint && (
          <motion.div
            className="absolute z-50 cursor-pointer"
            initial={{
              opacity: isFirstSubItem ? 1 : ANIMATION_CONFIG.initialStartOpacity,
              scale: isFirstSubItem ? 1 : ANIMATION_CONFIG.initialStartScale,
              x: isFirstSubItem
                ? focusPointPosition.x
                : (initialAppearance
                  ? initialCenterPosition.x
                  : (nextFocusPoint ? nextFocusPointPosition.x : focusPointPosition.x)),
              y: isFirstSubItem
                ? focusPointPosition.y
                : (initialAppearance
                  ? initialCenterPosition.y
                  : (nextFocusPoint ? nextFocusPointPosition.y : focusPointPosition.y))
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: nextFocusPoint ? nextFocusPointPosition.x : focusPointPosition.x,
              y: nextFocusPoint ? nextFocusPointPosition.y : focusPointPosition.y
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={getTransitionConfig()}
            onAnimationStart={() => {
              if (!isFirstSubItem) {
                setAnimationComplete(false);
              }
            }}
            onAnimationComplete={() => setAnimationComplete(true)}
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
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0.1,
                  ease: [0.33, 0, 0.67, 1], // Custom easing
                  times: [0, 1]
                }}
                style={{
                  willChange: "transform, opacity", // Performance optimization
                  backfaceVisibility: "hidden", // Reduce flickering
                }}
              />

              {/* Tooltip Card - With AnimatePresence for smooth transitions */}
              <AnimatePresence>
                {tooltipVisible && (
                  <motion.div
                    className="absolute left-12 top-[-42px] z-50"
                    initial={isFirstSubItem ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -10 }}
                    transition={{
                      duration: isFirstSubItem ? 0 : ANIMATION_CONFIG.tooltipFadeDuration,
                      ease: "easeOut"
                    }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
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

