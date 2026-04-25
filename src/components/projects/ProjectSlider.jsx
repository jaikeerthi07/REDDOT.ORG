import React, { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard } from "./ProjectCard"
import { NavigationDots } from "./NavigationDots"
import { useSliderNavigation } from "../../hooks/useSliderNavigation"
import { useSliderDrag } from "../../hooks/useSliderDrag"
import { useSliderWheel } from "../../hooks/useSliderWheel"
import { useColorExtraction, useCurrentColors } from "../../hooks/useColorExtraction"

const projects = [
  { id: 1, title: "Jarvis AI", description: "A sophisticated personal AI assistant capable of managing schedules, controlling smart homes, and performing complex web research.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", tag: "AI AGENTS" },
  { id: 2, title: "Universal Scraper", description: "An autonomous agent that can navigate any website, extract structured data, and handle dynamic content using LLM parsing.", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80", tag: "AUTOMATION" },
  { id: 3, title: "AI Travel Planner", description: "Personalized itinerary generation based on user preferences, real-time flight data, and social media trends.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80", tag: "MOBILE APP" },
  { id: 4, title: "Dynamic Spectrum", description: "An ML-driven system for optimizing wireless communication bandwidth in real-time for industrial IoT environments.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80", tag: "EMBEDDED" },
  { id: 5, title: "Customized LLM", description: "Domain-specific Large Language Models fine-tuned on proprietary corporate data for secure internal knowledge management.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80", tag: "GEN AI" },
  { id: 6, title: "Silent Emergency", description: "A wearable embedded system for hospitals that detects emergencies silently and alerts staff instantly.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80", tag: "IOT" }
]

export function ProjectSlider() {
  const sliderRef = useRef(null)

  const { currentIndex, goToNext, goToPrev, goToSlide } = useSliderNavigation({
    totalSlides: projects.length,
  })

  const { isDragging, dragX, handleDragStart, handleDragMove, handleDragEnd } = useSliderDrag({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
  })

  useSliderWheel({
    sliderRef,
    onScrollLeft: goToNext,
    onScrollRight: goToPrev,
  })

  const colors = useColorExtraction(projects, currentIndex)
  const currentColors = useCurrentColors(colors, currentIndex)

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-[48px] bg-black/5 border border-black/[0.05] mb-20">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, ${currentColors[0]}33 0%, transparent 70%),
              radial-gradient(circle at 80% 70%, ${currentColors[1]}33 0%, transparent 70%),
              linear-gradient(to bottom, #F5F4F0, #E5E4E0)
            `
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 backdrop-blur-3xl opacity-50" />

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="relative h-full w-full cursor-grab items-center active:cursor-grabbing flex overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="flex items-center gap-8 px-[calc(50%-160px)] md:px-[calc(50%-225px)]"
          animate={{
            x: -currentIndex * (window.innerWidth > 768 ? 482 : 352) + dragX,
          }}
          transition={isDragging ? { duration: 0 } : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={index === currentIndex}
              dragOffset={dragX}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </motion.div>
      </div>

      <NavigationDots total={projects.length} current={currentIndex} onSelect={goToSlide} colors={currentColors} />
      
      {/* Counter */}
      <div className="absolute top-12 right-12 flex items-center gap-4 text-black/20 font-mono text-sm tracking-widest">
        <span>{String(currentIndex + 1).padStart(2, '0')}</span>
        <div className="w-8 h-[1px] bg-black/10" />
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
