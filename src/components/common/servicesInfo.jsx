import React, { useState, useRef, useEffect } from 'react'
import { useLocalization } from '../../context/LocalizationContext'

const ServicesInfo = () => {
  const { subscriptionPrices, isLocalizing } = useLocalization()
  
  const images = [
    { src: "/home/dog-1.jpeg", alt: "Dog with tag" },
    { src: "/home/dog-3.jpeg", alt: "Second dog with tag" },
    { src: "/home/dog-2.jpeg", alt: "Cat with tag" }
  ]
  
  // Duplicate images for seamless loop
  const allImages = [...images, ...images, ...images]
  
  const scrollContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const animationFrameRef = useRef(null)
  const lastTranslateRef = useRef(0)
  // Calculate speed: 33.333% of one set in 20s = ~21.6px per second = ~0.36px per frame at 60fps
  const animationSpeed = 0.36 // pixels per frame
  
  // Calculate one set width (3 images with padding)
  const imageWidth = 400 // w-[400px]
  const padding = 32 // px-8 = 32px (16px each side)
  const oneSetWidth = (imageWidth + padding) * images.length
  
  // Manual animation when not dragging
  useEffect(() => {
    if (isDragging || isPaused) return
    
    const animate = () => {
      if (scrollContainerRef.current) {
        let newTranslate = lastTranslateRef.current - animationSpeed
        
        // Reset to maintain seamless loop (when we've moved one set width)
        if (Math.abs(newTranslate) >= oneSetWidth) {
          newTranslate = newTranslate % oneSetWidth
        }
        
        lastTranslateRef.current = newTranslate
        scrollContainerRef.current.style.transform = `translateX(${newTranslate}px)`
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDragging, isPaused, oneSetWidth])
  
  // Handle touch start
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setIsPaused(true)
    const touch = e.touches[0]
    setStartX(touch.clientX)
    // Get current transform value
    const style = window.getComputedStyle(scrollContainerRef.current)
    const matrix = new DOMMatrix(style.transform)
    const translateX = matrix.e || lastTranslateRef.current
    setCurrentTranslate(translateX)
    lastTranslateRef.current = translateX
  }
  
  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const touch = e.touches[0]
    const diff = touch.clientX - startX
    const newTranslate = currentTranslate + diff
    
    // Normalize to maintain seamless loop
    let normalizedTranslate = newTranslate
    if (normalizedTranslate > 0) {
      normalizedTranslate = normalizedTranslate % oneSetWidth - oneSetWidth
    } else if (Math.abs(normalizedTranslate) >= oneSetWidth) {
      normalizedTranslate = normalizedTranslate % oneSetWidth
    }
    
    lastTranslateRef.current = normalizedTranslate
    scrollContainerRef.current.style.transform = `translateX(${normalizedTranslate}px)`
  }
  
  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false)
    // Resume auto-scroll after a short delay
    setTimeout(() => {
      setIsPaused(false)
    }, 300)
  }
  
  // Handle mouse drag (for desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.clientX)
    const style = window.getComputedStyle(scrollContainerRef.current)
    const matrix = new DOMMatrix(style.transform)
    const translateX = matrix.e || lastTranslateRef.current
    setCurrentTranslate(translateX)
    lastTranslateRef.current = translateX
  }
  
  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const diff = e.clientX - startX
    const newTranslate = currentTranslate + diff
    
    // Normalize to maintain seamless loop
    let normalizedTranslate = newTranslate
    if (normalizedTranslate > 0) {
      normalizedTranslate = normalizedTranslate % oneSetWidth - oneSetWidth
    } else if (Math.abs(normalizedTranslate) >= oneSetWidth) {
      normalizedTranslate = normalizedTranslate % oneSetWidth
    }
    
    lastTranslateRef.current = normalizedTranslate
    scrollContainerRef.current.style.transform = `translateX(${normalizedTranslate}px)`
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => {
      setIsPaused(false)
    }, 300)
  }
  
  const handleMouseLeave = () => {
    setIsDragging(false)
    setTimeout(() => {
      setIsPaused(false)
    }, 300)
  }
  
  return (
    <div className="max-w-9xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[957px] mx-auto bg-[#4CB2E2] rounded-[8px] px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <h2 className="font-helvetica-neue font-semibold text-[16px] sm:text-[22px] md:text-[20px] text-white text-center sm:text-left mb-2">
         Setting up your Digital Tail smart tag
        </h2>
        <p className="font-helvetica-neue text-[16px]  text-white text-center sm:text-left capitalize">
        {isLocalizing 
          ? 'Loading pricing information...' 
          : `Once your tag arrives, simply scan it to create your pet's profile! For just ${subscriptionPrices.monthly.symbol}${subscriptionPrices.monthly.amount.toFixed(2)} per month or ${subscriptionPrices.yearly.symbol}${subscriptionPrices.yearly.amount.toFixed(2)} a year, you'll unlock all features and keep your pet safe and connected.`
        }
        </p>  
      </div>
      
      <div className="mt-20 max-w-[1200px] mx-auto overflow-hidden relative">
        <style>{`
          .scroll-container {
            cursor: grab;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            transition: none;
          }
          .scroll-container.dragging {
            cursor: grabbing;
          }
          .scroll-container:hover {
            cursor: grab;
          }
        `}</style>
        
        <div 
          ref={scrollContainerRef}
          className={`flex scroll-container ${isDragging ? 'dragging' : ''}`}
          style={{ width: 'max-content', touchAction: 'pan-x' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {allImages.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 px-8">
              <img 
                src={img.src}
                alt={img.alt}
                className="w-[400px] h-auto rounded-lg object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesInfo;
