import React from "react"

export const Tag = React.memo(({ children, className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-white/50 bg-white/10 border border-white/5 backdrop-blur-sm uppercase ${className}`}>
      {children}
    </span>
  )
})
