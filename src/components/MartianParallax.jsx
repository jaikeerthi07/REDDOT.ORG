import React, { useState, useEffect, useRef } from "react"

export const MartianParallax = ({ children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)
  const lastUpdateRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // Direct DOM references to bypass React re-render cycles on mouse move
  const layer1Ref = useRef(null)
  const starshipRef = useRef(null)
  const layer2Ref = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 || 'ontouchstart' in window
      setIsMobile(mobile)
      
      // Reset transforms when going to mobile
      if (mobile) {
        if (layer1Ref.current) layer1Ref.current.style.transform = 'none'
        if (starshipRef.current) starshipRef.current.style.transform = 'scale(0.5)'
        if (layer2Ref.current) layer2Ref.current.style.transform = 'none'
        if (textRef.current) textRef.current.style.transform = 'none'
      } else {
        if (starshipRef.current) starshipRef.current.style.transform = 'scale(0.75)'
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    const handleMouseMove = (e) => {
      if (isMobile || !isInView || lastUpdateRef.current) return
      lastUpdateRef.current = true
      requestAnimationFrame(() => {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight
        
        if (layer1Ref.current) {
          layer1Ref.current.style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0)`
        }
        if (starshipRef.current) {
          starshipRef.current.style.transform = `translate3d(${x * 50}px, ${y * 50}px, 0) scale(0.75)`
        }
        if (layer2Ref.current) {
          layer2Ref.current.style.transform = `translate3d(${x * 60}px, ${y * 60}px, 0)`
        }
        if (textRef.current) {
          textRef.current.style.transform = `translate3d(${x * 90}px, ${y * 90}px, 0)`
        }
        
        lastUpdateRef.current = false
      })
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }
    setShouldAnimate(true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener('resize', checkMobile)
      observer.disconnect()
    }
  }, [isInView, isMobile])

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black py-20"
      style={{ contain: 'paint' }}
    >
      {/* Layer 1: Mars Background */}
      <div
        ref={layer1Ref}
        className={`absolute inset-0 ${shouldAnimate ? "zoom-layer-1" : ""}`}
        style={{
          transform: 'none',
          willChange: isMobile ? 'auto' : "transform",
          width: "130%",
          height: "130%",
          left: "-15%",
          top: "-15%",
        }}
      >
        <img src="/images/mars-1.png" alt="Mars" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>

      {/* Layer: Starship */}
      <div
        ref={starshipRef}
        className={`absolute z-5 ${shouldAnimate ? "zoom-layer-starship" : ""}`}
        style={{
          transform: isMobile ? 'scale(0.5)' : 'scale(0.75)',
          willChange: isMobile ? 'auto' : "transform",
          width: isMobile ? "300px" : "800px",
          height: isMobile ? "300px" : "800px",
          left: isMobile ? "50%" : "20px",
          top: isMobile ? "20px" : "20px",
          marginLeft: isMobile ? "-150px" : "0",
        }}
      >
        <img src="/images/starship.png" alt="Starship" className="w-full h-full object-contain" loading="lazy" decoding="async" />
      </div>

      {/* Layer 2: Middle Ground */}
      <div
        ref={layer2Ref}
        className={`absolute inset-0 z-10 ${shouldAnimate ? "zoom-layer-2" : ""}`}
        style={{
          transform: 'none',
          willChange: isMobile ? 'auto' : "transform",
          width: "130%",
          height: "130%",
          left: "-15%",
          top: "-15%",
        }}
      >
        <img src="/images/mars-2.png" alt="Mars Surface" className="w-full h-full object-cover opacity-60" loading="lazy" decoding="async" />
      </div>

      {/* Main Text: REDDOT SERVICES */}
      <div
        ref={textRef}
        className={`absolute inset-0 flex items-center justify-center z-10 px-6 ${shouldAnimate ? "zoom-layer-text" : ""}`}
        style={{
          transform: 'none',
          willChange: isMobile ? 'auto' : "transform",
          perspective: "1000px",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-wrap justify-center text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] leading-none">
            {"REDDOT".split("").map((letter, index) => (
              <span
                key={index}
                className={`font-bold text-white ${shouldAnimate ? "letter-rotate" : ""}`}
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                  animationDelay: `${index * 100}ms`
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-none mt-4">
            {"SERVICES".split("").map((letter, index) => (
              <span
                key={index}
                className={`font-light italic text-white/80 ${shouldAnimate ? "letter-rotate" : ""}`}
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                  animationDelay: `${(index + 6) * 100}ms`
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>


      {/* Content (Services Grid) overlay */}
      <div className="relative z-30 w-full pt-[80vh] pb-32">
        {children}
      </div>
    </div>
  )
}
