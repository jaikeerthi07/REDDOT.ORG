import React, { useEffect, useRef, useMemo } from 'react'

/**
 * Neural Network Canvas — highly optimized for performance.
 * - Batched drawing: Uses opacity buckets to minimize stroke() calls (O(buckets) vs O(n²))
 * - Fixed node count for predictable performance
 * - Uses squared distance checks for speed
 */
const NeuralCanvas = ({ nodeCount = 30, color = '#00f3ff' }) => {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (canvas.width / window.devicePixelRatio),
      y: Math.random() * (canvas.height / window.devicePixelRatio),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const MAX_DIST = 110
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST
    
    // Opacity buckets for batching
    const BUCKETS = 5
    const bucketPaths = Array.from({ length: BUCKETS }, () => new Path2D())

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio
      ctx.clearRect(0, 0, w, h)

      // Update node positions
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy

        if (n.x < 0) n.x = w
        if (n.x > w) n.x = 0
        if (n.y < 0) n.y = h
        if (n.y > h) n.y = 0
      })

      // Reset buckets
      bucketPaths.forEach(p => (p = new Path2D()))
      const paths = Array.from({ length: BUCKETS }, () => new Path2D())

      // Fill buckets
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          
          if (distSq < MAX_DIST_SQ) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / MAX_DIST)
            const bucketIndex = Math.floor(alpha * (BUCKETS - 1))
            
            const path = paths[bucketIndex]
            path.moveTo(nodes[i].x, nodes[i].y)
            path.lineTo(nodes[j].x, nodes[j].y)
          }
        }
      }

      // Draw buckets
      ctx.lineWidth = 0.8
      paths.forEach((path, i) => {
        const alpha = ((i + 1) / BUCKETS) * 0.25
        ctx.strokeStyle = `rgba(0, 210, 255, ${alpha.toFixed(2)})`
        ctx.stroke(path)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [nodeCount])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4, contain: 'strict' }}
    />
  )
}

export default NeuralCanvas

