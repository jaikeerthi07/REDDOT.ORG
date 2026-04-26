import React, { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"

export function ProjectCard({ project, isActive, dragOffset, index, currentIndex }) {
  const isPast = index < currentIndex
  const isFuture = index > currentIndex
  
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])
  
  const innerX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"])
  const innerY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"])

  const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["5px", "-5px"])
  const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["5px", "-5px"])

  const handleMouseMove = (e) => {
    if (!isActive || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 w-[320px] md:w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden bg-black/5 cursor-pointer"
      style={{
        zIndex: isActive ? 10 : 0,
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : (isPast ? 15 : -15),
        perspective: "1000px",
      }}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="absolute inset-0 group">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          loading="lazy"
          decoding="async"
          style={{
            x: isActive ? innerX : 0,
            y: isActive ? innerY : 0,
          }}
          animate={{
            scale: isActive ? 1.15 : 1,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <motion.div
            initial={false}
            style={{
              x: isActive ? contentX : 0,
              y: isActive ? contentY : 0,
            }}
            animate={{
              y: isActive ? 0 : 20,
              opacity: isActive ? 1 : 0,
            }}
          >
            <span className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-[9px] tracking-widest uppercase font-mono mb-4 inline-block">
              {project.tag}
            </span>
            <h3 className="text-3xl font-light tracking-tight mb-2">{project.title}</h3>
            <p className="text-sm text-white/60 line-clamp-2 mb-6 font-light">{project.description}</p>
            
            <button className="flex items-center gap-2 text-[10px] tracking-widest text-white/40 hover:text-white transition-colors uppercase font-mono font-bold">
              View Project <ExternalLink size={10} />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
