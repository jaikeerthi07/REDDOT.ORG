import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Particles = ({ count = 2000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50
      p[i * 3 + 1] = (Math.random() - 0.5) * 50
      p[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return p
  }, [count])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.001
      ref.current.position.z += 0.02
      if (ref.current.position.z > 20) ref.current.position.z = 0
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00f3ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

const Tunnel = () => {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.005
    }
  })

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      <meshPhongMaterial color="#00f3ff" wireframe transparent opacity={0.05} />
    </mesh>
  )
}

const Scene = ({ mouse, isMobile }) => {
  const { viewport } = useThree()
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current && !isMobile) {
      const x = (mouse.current.x * viewport.width) / 10
      const y = (mouse.current.y * viewport.height) / 10
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      <Particles count={isMobile ? 500 : 2000} />
      <Tunnel />
    </group>
  )
}

const StarfieldBackground = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e) => {
    if (isMobile) return
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene mouse={mouse} isMobile={isMobile} />
        </Canvas>
      </div>
      <div className="relative z-10 w-full h-full pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  )
}

export default StarfieldBackground
