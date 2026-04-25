import React from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export function ProjectCard({ project, isActive, dragOffset, index, currentIndex }) {
  const isPast = index < currentIndex
  const isFuture = index > currentIndex

  return (
    <motion.div
      className="relative shrink-0 w-[320px] md:w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden bg-black/5"
      style={{
        zIndex: isActive ? 10 : 0,
      }}
      animate={{
        scale: isActive ? 1 : 0.85,
        rotateY: isActive ? 0 : (isPast ? 15 : -15),
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
          animate={{
            x: isActive ? dragOffset * 0.1 : 0,
            scale: isActive ? 1.1 : 1,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <motion.div
            initial={false}
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
