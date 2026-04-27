import React, { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntroAnimation, HERO_REVEAL_MS } from "./components/IntroAnimation"
import { RevealText } from "./components/RevealText"

import { MobileNav } from "./components/MobileNav"


import { Tag } from "./components/Tag"
import GlobalAILayer from "./components/GlobalAILayer"
import FloatingAIObjects from "./components/FloatingAIObjects"

import { lazy, Suspense } from "react"

// Lazy load heavy components
const Services = lazy(() => import("./components/Services"))
const About = lazy(() => import("./components/About"))
const Projects = lazy(() => import("./components/Projects"))
const Products = lazy(() => import("./components/Products"))
const Careers = lazy(() => import("./components/Careers"))
const Contact = lazy(() => import("./components/Contact"))
const Chatbot = lazy(() => import("./components/Chatbot"))

const LoadingSection = () => <div className="h-96 w-full flex items-center justify-center opacity-10"><div className="w-12 h-12 border-2 border-black rounded-full animate-pulse" /></div>

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
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

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()
  
  useEffect(() => {
    if (!inView) return
    let start = null
    const duration = 1500
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(animate)
  }, [inView, end])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}



function App() {
  const [heroReady, setHeroReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [hoveredPlatform, setHoveredPlatform] = useState(false)


  const handleIntroDone = useCallback(() => {
    setHeroReady(true)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), HERO_REVEAL_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <GlobalAILayer />
      <IntroAnimation onDone={handleIntroDone} />
      {/* ── PRE-HERO / HERO REVEAL ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MobileNav />

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section id="home" className="relative h-screen overflow-hidden bg-[#F5F4F0]">
          <video
            autoPlay
            loop
            muted
            playsInline
            fetchPriority="high"
            poster="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agentic-hero-9yW3wnTNMfn2U6lsVhTTZSJFEvAoSj.mp4"
            style={{
              transform: videoReady ? "scale(1.05)" : "scale(0.85)",
              transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
              contain: 'layout paint'
            }}
          />
          <FloatingAIObjects section="hero" />
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "65%", background: "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 18%, rgba(245,244,240,0.85) 35%, rgba(245,244,240,0.5) 55%, rgba(245,244,240,0.15) 75%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "30%", background: "linear-gradient(to top, #F5F4F0 0%, transparent 100%)" }} />
          
          <div className="relative z-30 flex flex-col justify-end h-full px-6 md:px-12 pb-12 max-w-4xl mx-auto">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-light text-[#111] leading-[1.0] tracking-tight mb-10"
              style={{
                opacity: heroReady ? 1 : 0,
                filter: heroReady ? "none" : "blur(20px)",
                transform: heroReady ? "translateY(0px)" : "translateY(20px)",
                transition: "opacity 0.8s ease-out, filter 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              The ultimate<br />orchestrator for<br /><span className="italic font-normal">AI Agents.</span>
            </h1>
            <div className="flex flex-wrap gap-12 mt-4" style={{ opacity: heroReady ? 1 : 0, transition: "opacity 1s ease 400ms" }}>
              <div>
                <div className="text-3xl font-light"><Counter end={15} suffix="" /></div>
                <div className="text-[10px] tracking-widest text-black/35 uppercase mt-1">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-light"><Counter end={98} suffix="%" /></div>
                <div className="text-[10px] tracking-widest text-black/35 uppercase mt-1">Task Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-light"><Counter end={1.5} suffix="+" /></div>
                <div className="text-[10px] tracking-widest text-black/35 uppercase mt-1">Years Experience</div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>



      {/* ── MAIN CONTENT REVEAL ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* ── BENTO GRID ───────────────────────────────────────────────────── */}


        {/* ── REAL REDDOT SERVICES ────────────────────────────────────────── */}
        {/* ── REAL REDDOT SERVICES ────────────────────────────────────────── */}
        <div className="flex flex-col">
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Services />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Products />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <About />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Careers />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Contact />
          </Suspense>
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="py-20 px-6 border-t border-white/[0.05] bg-black text-center relative z-10">
          <div className="mb-12 flex justify-center items-center gap-2">
            <img src="/reddot logo.png" alt="REDDOT" className="h-8 object-contain invert opacity-50" />
            <span className="font-pixel text-xs tracking-[0.4em] text-white/20">REDDOT INNOVATIVE SOLUTIONS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto text-left mb-20">
            <div>
              <h4 className="text-[10px] tracking-widest text-white/20 uppercase mb-6 font-mono">RedDot</h4>
              <div className="flex flex-col gap-3">
                {['Home', 'Services', 'Projects', 'Products'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">{l}</a>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] tracking-widest text-white/20 uppercase mb-6 font-mono">Connect</h4>
              <div className="flex flex-col gap-3">
                {['About', 'Careers', 'Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors">{l}</a>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] tracking-widest text-white/20 uppercase mb-6 font-mono">Legal</h4>
              <div className="flex flex-col gap-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => <a key={l} href="#" className="text-sm text-white/40 hover:text-white transition-colors">{l}</a>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] tracking-widest text-white/20 uppercase mb-6 font-mono">Social</h4>
              <div className="flex flex-col gap-3">
                {['Twitter', 'GitHub', 'LinkedIn'].map(l => <a key={l} href="#" className="text-sm text-white/40 hover:text-white transition-colors">{l}</a>)}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-white/10 font-mono tracking-wider uppercase">© {new Date().getFullYear()} REDDOT INNOVATIVE SOLUTIONS. ALL RIGHTS RESERVED.</p>
        </footer>
      </motion.div>
    </div>
  )
}

export default App
