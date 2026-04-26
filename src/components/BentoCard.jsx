import React, { useRef, useEffect, useState } from "react"

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export const BentoCard = React.memo(({ children, className = "", delay = 0, ...props }) => {
  const { ref, inView } = useInView(0.1)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      {...props}
      className={`group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05), transparent 80%)" }}
      />
      {children}
    </div>
  )
})
