import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Link } from 'react-scroll'
import { ChevronRight, ArrowDown } from 'lucide-react'

const Hero = () => {
  const ref = useRef(null)

  // ── Scroll parallax ──────────────────────────────────────────
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])

  // ── Mouse parallax ───────────────────────────────────────────
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const h = e => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const sX = useSpring(mouseX, { stiffness: 40, damping: 15 })
  const sY = useSpring(mouseY, { stiffness: 40, damping: 15 })

  // Depth layers: negative = opposite to mouse = depth illusion
  const d1x = useTransform(sX, v => v * -35)
  const d1y = useTransform(sY, v => v * -35)
  const d2x = useTransform(sX, v => v * -65)
  const d2y = useTransform(sY, v => v * -65)
  const d3x = useTransform(sX, v => v * -105)
  const d3y = useTransform(sY, v => v * -105)
  // Foreground: moves WITH mouse
  const d4x = useTransform(sX, v => v * 40)
  const d4y = useTransform(sY, v => v * 40)

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* ── Layer 0: Parallax photo bg ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-[#fafafa] z-10" />
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/hero_light_bg.png")' }} />
        </motion.div>
      </motion.div>

      {/* ── Layer 1: Grid (scroll scale) ── */}
      <motion.div
        style={{ y: bgY, scale: gridScale }}
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:44px_44px] z-[1] will-change-transform pointer-events-none"
      />

      {/* ── Simplified Layers for Performance ── */}
      <motion.div style={{ x: d2x, y: d2y }} className="absolute inset-0 z-[3] pointer-events-none will-change-transform opacity-30">
        <div className="absolute top-[12%] left-[6%] w-[420px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,243,255,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[8%] right-[4%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(188,0,255,0.06) 0%, transparent 70%)' }} />
      </motion.div>

      {/* ── Layer 7: AI scan line (periodic sweep) ── */}
      <motion.div
        animate={{ y: ['-100%', '110vh'], opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 10 }}
        className="absolute left-0 right-0 h-[1px] top-0 z-[9] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(0,243,255,0.5) 50%, transparent 100%)' }}
      />

      {/* ── Layer 8: Content ── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 text-center max-w-4xl px-6 will-change-transform">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}>
          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-full">
            Engineering the Future
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-gray-900">
            {['Innovative', 'AI &', 'Engineering', 'Solutions', 'for the Future'].map((word, i) => (
              <motion.span key={word} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
                className={`inline-block mr-4 ${i >= 1 && i <= 2 ? 'bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple' : ''}`}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            RedDot is a technology-driven company specializing in artificial intelligence, automation, software development, and embedded systems. We build intelligent, scalable solutions for real-world problems.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="services" smooth={true}
              className="group px-8 py-4 bg-gray-900 text-white font-bold rounded-full flex items-center hover:bg-neon-blue hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center shadow-lg">
              Explore Services
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="contact" smooth={true}
              className="px-8 py-4 bg-transparent text-gray-900 font-bold rounded-full border border-gray-300 hover:border-neon-blue hover:bg-neon-blue/5 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center shadow-sm">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gray-500 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase font-bold">Scroll</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  )
}

export default Hero
