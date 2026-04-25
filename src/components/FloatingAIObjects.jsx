import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * FloatingAIObjects — autonomous AI-themed floating objects
 * that drift, pulse, orbit, and spin independently across the page.
 * Used as an overlay layer behind content on any section.
 */

// A single floating AI orb/node that moves in a unique Lissajous-like pattern
const FloatingOrb = ({ size, color, top, left, delay, duration, amplitude, seed }) => {
  const x1 = amplitude * (seed % 3 === 0 ? 1 : -1)
  const y1 = amplitude * 0.6 * (seed % 2 === 0 ? 1 : -1)
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        willChange: 'transform',
        // Removed filter:blur — too expensive on animated elements
      }}
      animate={{
        x: [0, x1, -x1 * 0.5, x1 * 0.3, 0],
        y: [0, y1 * 0.5, y1, -y1 * 0.4, 0],
        opacity: [0.6, 0.9, 0.5, 0.85, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  )
}

// A spinning ring that orbits like a satellite
const OrbitRing = ({ size, top, left, duration, delay, color }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ width: size, height: size, top, left, willChange: 'transform' }}
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
  >
    <div
      className="w-full h-full rounded-full border"
      style={{ borderColor: color, opacity: 0.25 }}
    />
    {/* Dot on the ring */}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 6,
        height: 6,
        background: color,
        top: -3,
        left: '50%',
        transform: 'translateX(-50%)',
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  </motion.div>
)

// Floating data packet — a small rect/line moving diagonally
const DataPacket = ({ top, left, delay, duration, dx, dy, color }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top, left, willChange: 'transform' }}
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{ opacity: [0, 1, 1, 0], x: dx, y: dy }}
    transition={{ duration, delay, repeat: Infinity, repeatDelay: 2.5 }}
  >
    <div
      className="rounded-sm"
      style={{ width: 20, height: 3, background: color, opacity: 0.7, boxShadow: `0 0 8px ${color}` }}
    />
  </motion.div>
)

// Pulsing hexagonal/diamond node icon (AI agent node)
const AgentNode = ({ top, left, delay, size, color }) => (
  <motion.div
    className="absolute pointer-events-none flex items-center justify-center"
    style={{ top, left, width: size, height: size, willChange: 'transform' }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.9, 0.4],
    }}
    transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {/* Hexagon shape via CSS clip */}
    <div
      style={{
        width: size,
        height: size,
        background: color,
        opacity: 0.6,
        clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  </motion.div>
)

// Scanning horizontal line (like radar sweep)
const ScanLine = ({ top, color, duration, delay }) => (
  <motion.div
    className="absolute left-0 right-0 pointer-events-none"
    style={{ top, height: 1, background: `linear-gradient(to right, transparent, ${color}, transparent)`, opacity: 0 }}
    animate={{ opacity: [0, 0.5, 0], y: [0, 60, 0] }}
    transition={{ duration, delay, repeat: Infinity, repeatDelay: 4 }}
  />
)

// Circuit trace — animated horizontal dashed line
const CircuitTrace = ({ top, left, width, color, delay }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top, left, width, height: 1, overflow: 'hidden' }}
  >
    <motion.div
      style={{ height: '100%', background: `linear-gradient(to right, transparent, ${color} 30%, ${color} 70%, transparent)`, opacity: 0.3 }}
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />
  </motion.div>
)

const FloatingAIObjects = ({ section = 'hero' }) => {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const cfg = {
    hero: {
      orbs: [
        { size: 180, color: 'rgba(0,243,255,0.35)', top: '10%', left: '5%', delay: 0, duration: 10, amplitude: 50, seed: 1 },
        { size: 260, color: 'rgba(188,0,255,0.2)', top: '60%', left: '75%', delay: 1.5, duration: 13, amplitude: 70, seed: 2 },
        { size: 130, color: 'rgba(0,210,255,0.25)', top: '40%', left: '85%', delay: 0.5, duration: 8, amplitude: 35, seed: 3 },
      ],
      rings: [
        { size: 100, top: '15%', left: '15%', duration: 8, delay: 0, color: '#00f3ff' },
        { size: 70, top: '70%', left: '80%', duration: 12, delay: 1, color: '#bc00ff' },
        { size: 130, top: '50%', left: '40%', duration: 6, delay: 0.5, color: '#00f3ff' },
      ],
      packets: [
        { top: '25%', left: '10%', delay: 0, duration: 2, dx: 80, dy: -30, color: '#00f3ff' },
        { top: '65%', left: '60%', delay: 1, duration: 2.5, dx: -60, dy: 40, color: '#bc00ff' },
        { top: '45%', left: '30%', delay: 2, duration: 1.8, dx: 100, dy: 20, color: '#00f3ff' },
        { top: '80%', left: '45%', delay: 0.5, duration: 3, dx: -80, dy: -50, color: '#00d2ff' },
      ],
      agents: [
        { top: '30%', left: '90%', delay: 0, size: 16, color: '#00f3ff' },
        { top: '80%', left: '10%', delay: 1, size: 12, color: '#bc00ff' },
        { top: '10%', left: '70%', delay: 0.5, size: 14, color: '#00f3ff' },
        { top: '55%', left: '5%', delay: 2, size: 10, color: '#00d2ff' },
      ],
      scans: [
        { top: '30%', color: '#00f3ff', duration: 3, delay: 0 },
        { top: '60%', color: '#bc00ff', duration: 4, delay: 2 },
      ],
      traces: [
        { top: '20%', left: '5%', width: 120, color: '#00f3ff', delay: 0 },
        { top: '70%', left: '60%', width: 80, color: '#bc00ff', delay: 1 },
        { top: '45%', left: '20%', width: 60, color: '#00d2ff', delay: 0.5 },
      ],
    },
    services: {
      orbs: [
        { size: 250, color: 'rgba(0,243,255,0.15)', top: '-5%', left: '-5%', delay: 0, duration: 14, amplitude: 40, seed: 6 },
        { size: 200, color: 'rgba(188,0,255,0.15)', top: '60%', left: '90%', delay: 2, duration: 11, amplitude: 50, seed: 7 },
      ],
      rings: [
        { size: 90, top: '10%', left: '80%', duration: 10, delay: 0, color: '#00f3ff' },
      ],
      packets: [
        { top: '15%', left: '50%', delay: 0, duration: 2, dx: 60, dy: -20, color: '#00f3ff' },
        { top: '85%', left: '20%', delay: 1.5, duration: 2.5, dx: 80, dy: 30, color: '#bc00ff' },
      ],
      agents: [
        { top: '5%', left: '5%', delay: 0, size: 12, color: '#00f3ff' },
        { top: '90%', left: '90%', delay: 1, size: 14, color: '#bc00ff' },
      ],
      scans: [{ top: '50%', color: '#00f3ff', duration: 5, delay: 1 }],
      traces: [
        { top: '10%', left: '30%', width: 100, color: '#00f3ff', delay: 0.5 },
      ],
    },
    products: {
      orbs: [{ size: 200, color: 'rgba(0,243,255,0.1)', top: '10%', left: '80%', delay: 0, duration: 12, amplitude: 40, seed: 10 }],
      rings: [{ size: 80, top: '40%', left: '10%', duration: 9, delay: 0, color: '#00f3ff' }],
      packets: [{ top: '20%', left: '20%', delay: 0, duration: 2, dx: 100, dy: 20, color: '#00f3ff' }],
      agents: [{ top: '15%', left: '85%', delay: 0, size: 12, color: '#bc00ff' }],
      scans: [],
      traces: [],
    },
    careers: {
      orbs: [{ size: 150, color: 'rgba(188,0,255,0.1)', top: '70%', left: '10%', delay: 1, duration: 15, amplitude: 30, seed: 11 }],
      rings: [{ size: 60, top: '20%', left: '70%', duration: 7, delay: 0.5, color: '#bc00ff' }],
      packets: [{ top: '80%', left: '80%', delay: 1, duration: 2.5, dx: -80, dy: -20, color: '#bc00ff' }],
      agents: [{ top: '50%', left: '10%', delay: 2, size: 10, color: '#00f3ff' }],
      scans: [],
      traces: [],
    },
    contact: {
      orbs: [{ size: 180, color: 'rgba(0,210,255,0.1)', top: '50%', left: '50%', delay: 0, duration: 10, amplitude: 20, seed: 12 }],
      rings: [{ size: 120, top: '80%', left: '20%', duration: 10, delay: 0, color: '#00d2ff' }],
      packets: [{ top: '10%', left: '10%', delay: 0, duration: 3, dx: 150, dy: 50, color: '#00d2ff' }],
      agents: [{ top: '90%', left: '80%', delay: 1, size: 14, color: '#bc00ff' }],
      scans: [{ top: '40%', color: '#00f3ff', duration: 4, delay: 0 }],
      traces: [{ top: '30%', left: '20%', width: 200, color: '#00f3ff', delay: 0.5 }],
    }
  }

  const c = cfg[section] || cfg.hero

  if (!isInView && section !== 'hero') return <div ref={containerRef} className="absolute inset-0" />

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {c.orbs?.map((o, i) => <FloatingOrb key={`orb-${i}`} {...o} />)}
      {c.rings?.map((r, i) => <OrbitRing key={`ring-${i}`} {...r} />)}
      {c.packets?.map((p, i) => <DataPacket key={`pkt-${i}`} {...p} />)}
      {c.agents?.map((a, i) => <AgentNode key={`agent-${i}`} {...a} />)}
      {c.scans?.map((s, i) => <ScanLine key={`scan-${i}`} {...s} />)}
      {c.traces?.map((t, i) => <CircuitTrace key={`trace-${i}`} {...t} />)}
    </div>
  )
}


export default FloatingAIObjects

