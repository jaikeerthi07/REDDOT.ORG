import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { getProject } from '@theatre/core'
import { SheetProvider, editable as e, PerspectiveCamera } from '@theatre/r3f'

const project = getProject('REDDOT_Parallax')

const HeroObject = React.memo(({ theme }) => {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.z += 0.002
    }
  })

  const geometry = useMemo(() => {
    switch(theme) {
      case 'services': return <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      case 'projects': return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'careers': return <icosahedronGeometry args={[1.2, 1]} />
      case 'contact': return <octahedronGeometry args={[1.5, 0]} />
      default: return <sphereGeometry args={[1.2, 32, 32]} />
    }
  }, [theme])

  return (
    <e.group theatreKey="HeroObject" ref={groupRef}>
      <mesh>
        {geometry}
        <meshPhongMaterial 
          color={theme === 'contact' ? '#bc00ff' : '#00f3ff'} 
          emissive={theme === 'contact' ? '#bc00ff' : '#00f3ff'}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <mesh scale={0.9}>
        {geometry}
        <meshPhongMaterial 
          color={theme === 'contact' ? '#bc00ff' : '#00f3ff'} 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </e.group>
  )
})

const Particles = React.memo(({ count = 50 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      p[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return p
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  )
})

const Scene = ({ bgImage, theme, mouse, scrollProgress, isMobile }) => {
  const { viewport } = useThree()
  const texture = useLoader(THREE.TextureLoader, bgImage)
  const meshRef = useRef()
  const nodesRef = useRef([])
  const sheet = useMemo(() => project.sheet(`Theme_${theme}`), [theme])

  useEffect(() => {
    sheet.project.ready.then(() => {
      sheet.sequence.position = scrollProgress * 5
    })
  }, [scrollProgress, sheet])

  useFrame((state, delta) => {
    if (isMobile) return
    
    const x = (mouse.current.x * viewport.width) / 2
    const y = (mouse.current.y * viewport.height) / 2
    
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.05, 0.1)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.05, 0.1)
    }
    
    nodesRef.current.forEach((node, i) => {
      if (node) {
        const factor = (i + 1) * 0.15
        node.position.x = THREE.MathUtils.lerp(node.position.x, x * factor, 0.05)
        node.position.y = THREE.MathUtils.lerp(node.position.y, y * factor, 0.05)
        node.rotation.y += delta * 0.2
      }
    })
  })

  return (
    <SheetProvider sheet={sheet}>
      {!isMobile ? (
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={60} />
      ) : (
        <perspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      )}
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      {!isMobile && (
        <>
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00f3ff" />
          <HeroObject theme={theme} />
          <Particles count={100} />
        </>
      )}
      
      <e.mesh theatreKey="Background" ref={meshRef}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial map={texture} transparent opacity={isMobile ? 0.4 : 0.6} />
      </e.mesh>
      
      {!isMobile && [...Array(4)].map((_, i) => (
        <e.mesh 
          key={i} 
          theatreKey={`Node_${i}`}
          ref={(el) => (nodesRef.current[i] = el)}
        >
          <icosahedronGeometry args={[0.2, 0]} />
          <meshPhongMaterial 
            color={theme === 'contact' ? '#bc00ff' : '#00f3ff'} 
            emissive={theme === 'contact' ? '#bc00ff' : '#00f3ff'}
            emissiveIntensity={1}
            shininess={100}
          />
        </e.mesh>
      ))}
    </SheetProvider>
  )
}

const ThreeDParallax = React.memo(({ bgImage, theme, children }) => {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const ticking = useRef(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    const updateScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const winH = window.innerHeight
      const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH + rect.height)))
      setScrollProgress(progress)
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScroll)
        ticking.current = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    )
    
    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!isInView || isMobile) return
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }, [isInView, isMobile])

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isInView && (
          <Canvas 
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} 
            dpr={isMobile ? 1 : [1, 1.5]}
          >
            <Scene bgImage={bgImage} theme={theme} mouse={mouse} scrollProgress={scrollProgress} isMobile={isMobile} />
          </Canvas>
        )}
      </div>
      
      <div className="relative z-10 w-full h-full pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  )
})

export default ThreeDParallax
