import React from 'react'

// Optimized CSS animations for zero main-thread overhead
const CSS_ANIMATIONS = `
  @keyframes floating-shard {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
    50% { transform: translateY(-20px) rotate(5deg); opacity: 0.2; }
  }
  @keyframes diamond-pulse {
    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.05; }
    50% { transform: scale(1.1) translate(10px, -20px); opacity: 0.12; }
  }
  @keyframes hex-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const s = (seed, mul = 1) => ((seed * 1618 + 31) % 100) / 100 * mul

const CrystalShard = ({ seed }) => {
  const size = 60 + s(seed, 100)
  const left = s(seed * 7, 90)
  const top = s(seed * 2, 90)
  const dur = 15 + s(seed * 4, 10)
  
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)',
        zIndex: 0,
        willChange: 'transform, opacity',
        animation: `floating-shard ${dur}s ease-in-out infinite`,
        animationDelay: `${s(seed, 5)}s`
      }}
    />
  )
}

const DiamondNode = ({ seed }) => {
  const size = 6 + s(seed, 6)
  const left = s(seed * 3, 95)
  const top = s(seed * 8, 95)
  const dur = 10 + s(seed, 10)
  const color = seed % 2 === 0 ? '#111' : 'rgba(0,0,0,0.1)'

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        background: color,
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        opacity: 0.05,
        zIndex: 0,
        willChange: 'transform, opacity',
        animation: `diamond-pulse ${dur}s ease-in-out infinite`,
        animationDelay: `${s(seed, 4)}s`
      }}
    />
  )
}

const HexOutline = ({ seed }) => {
  const size = 28 + s(seed * 2, 40)
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${s(seed * 4, 88)}%`,
        top: `${s(seed * 3, 82)}%`,
        zIndex: 0,
        opacity: 0.05,
        willChange: 'transform',
        animation: `hex-spin ${15 + s(seed, 10)}s linear infinite`
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon
          points="50,2 93,26 93,74 50,98 7,74 7,26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

const GlobalAILayer = () => {
  return (
    <>
      <style>{CSS_ANIMATIONS}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Balanced density for premium performance */}
        {[1, 2, 3, 4, 5, 6].map(i => <CrystalShard key={`crystal-${i}`} seed={i} />)}
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <DiamondNode key={`diamond-${i}`} seed={i} />)}
        {[1, 2, 3].map(i => <HexOutline key={`hex-${i}`} seed={i} />)}
      </div>
    </>
  )
}

export default GlobalAILayer

