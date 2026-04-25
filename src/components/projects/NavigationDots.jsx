import React from "react"
import { motion } from "framer-motion"

export function NavigationDots({ total, current, onSelect, colors }) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative w-8 h-1 group"
        >
          <div className="absolute inset-0 bg-black/10 rounded-full" />
          {i === current && (
            <motion.div
              layoutId="activeDot"
              className="absolute inset-0 bg-black rounded-full"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
