import React, { useEffect, useRef } from 'react'

/**
 * Neural Network Canvas — optimized for performance.
 * - Reduced to 30 nodes (was 60) → O(n²) checks cut by 75%
 * - MAX_DIST reduced to 110 (was 140) → fewer connections drawn
 * - Removed per-node radial gradient → simple fill only
 * - Skips connection draw every other frame → 50% fewer draw calls
 */
const NeuralCanvas = ({ nodeCount = 30, color = '#00f3ff' }) => {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }))

    const MAX_DIST = 110
    let frame = 0

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.025

        if (n.x < 0) n.x = canvas.width
        if (n.x > canvas.width) n.x = 0
        if (n.y < 0) n.y = canvas.height
        if (n.y > canvas.height) n.y = 0
      })

      // Draw connections every other frame (halves draw-call load)
      if (frame % 2 === 0) {
        ctx.lineWidth = 0.6
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x
            const dy = nodes[i].y - nodes[j].y
            // Use squared distance to avoid sqrt on every pair
            const distSq = dx * dx + dy * dy
            if (distSq < MAX_DIST * MAX_DIST) {
              const dist = Math.sqrt(distSq)
              const alpha = (1 - dist / MAX_DIST) * 0.3
              ctx.beginPath()
              ctx.strokeStyle = `rgba(0,210,255,${alpha.toFixed(2)})`
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.lineTo(nodes[j].x, nodes[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Draw nodes removed to eliminate neon dots effect
      /*
      nodes.forEach((n, i) => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5
        const r = n.r + pulse * 1.2
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = i % 7 === 0
          ? `rgba(188,0,255,${(0.6 + pulse * 0.3).toFixed(2)})`
          : `rgba(0,243,255,${(0.5 + pulse * 0.3).toFixed(2)})`
        ctx.fill()
      })
      */

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [nodeCount, color])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  )
}

export default NeuralCanvas
