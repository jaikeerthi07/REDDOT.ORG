import React, { useRef, useEffect } from "react"
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uBgTexture;
  uniform sampler2D uFrTexture;
  uniform float uTime;
  uniform float uWaveY;
  uniform float uWaveWidth;
  uniform float uIntensity;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float distFromWave = (1.0 - uv.y) - (1.0 - uWaveY);
    float bandTop = 1.0 - uWaveY;
    float bandBottom = bandTop + uWaveWidth;
    float inBand = step(bandTop, 1.0 - uv.y) * step(1.0 - uv.y, bandBottom);
    float trailFade = clamp(distFromWave / 0.4, 0.0, 1.0);
    float trailActive = step(0.0, distFromWave) * (1.0 - trailFade);
    float glitchStrength = inBand * 1.0 + trailActive * 0.35;
    glitchStrength *= uIntensity;
    vec4 bgCol = texture2D(uBgTexture, uv);
    vec4 frCol = texture2D(uFrTexture, uv);
    vec4 baseColor = mix(bgCol, frCol, 0.7);
    if (glitchStrength > 0.001) {
      float sliceSize = 0.04 + rand(vec2(floor(uv.y / 0.04), uTime)) * 0.06;
      float sliceId  = floor(uv.y / sliceSize);
      float sliceRand = rand(vec2(sliceId, floor(uTime * 8.0)));
      float shift = 0.0;
      if (sliceRand > 0.5) shift = (sliceRand - 0.5) * 0.12 * glitchStrength;
      float ca = 0.006 * glitchStrength;
      vec4 colR = mix(texture2D(uBgTexture, vec2(uv.x + shift + ca, uv.y)), texture2D(uFrTexture, vec2(uv.x + shift + ca, uv.y)), 0.7);
      vec4 colG = mix(texture2D(uBgTexture, vec2(uv.x + shift,      uv.y)), texture2D(uFrTexture, vec2(uv.x + shift,      uv.y)), 0.7);
      vec4 colB = mix(texture2D(uBgTexture, vec2(uv.x + shift - ca, uv.y)), texture2D(uFrTexture, vec2(uv.x + shift - ca, uv.y)), 0.7);
      float tearLine = step(0.98, rand(vec2(floor(uTime * 12.0), floor(uv.y / 0.002))));
      shift += tearLine * 0.08 * glitchStrength;
      gl_FragColor = vec4(colR.r, colG.g, colB.b, 1.0);
    } else {
      gl_FragColor = baseColor;
    }
  }
`

function GlitchScene({ isHovered }) {
  const { scene, camera, size } = useThree()
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const waveState = useRef({ active: false, waveY: 1.0, speed: 0.55, cooldown: 0.0, nextCooldown: 2.0 + Math.random() * 2.0 })
  const defaultTexture = useLoader(THREE.TextureLoader, "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-nature-RN8PX1dGhZlLMsI4flnWQM6uInZYY1.png")
  const hoverTexture = useLoader(THREE.TextureLoader, "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fr-nature-lWxWsWzCM2kVPeHafi3LHqb0fM4DPL.png")

  useEffect(() => {
    const imageAspect = defaultTexture.image.width / defaultTexture.image.height
    const screenAspect = size.width / size.height
    const frustumSize = 1
    camera.left = -frustumSize * screenAspect; camera.right = frustumSize * screenAspect; camera.top = frustumSize; camera.bottom = -frustumSize; camera.near = 0.1; camera.far = 1000; camera.updateProjectionMatrix(); camera.position.z = 1
    const scale = Math.max((2 * frustumSize * screenAspect) / (imageAspect * 2 * frustumSize), 1)
    const planeWidth = imageAspect * 2 * frustumSize * scale; const planeHeight = 2 * frustumSize * scale
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
    const material = new THREE.ShaderMaterial({ uniforms: { uBgTexture: { value: defaultTexture }, uFrTexture: { value: hoverTexture }, uTime: { value: 0 }, uWaveY: { value: 1.0 }, uWaveWidth: { value: 0.07 }, uIntensity: { value: 0.0 } }, vertexShader, fragmentShader })
    materialRef.current = material
    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh; scene.add(mesh)
    return () => { scene.remove(mesh); geometry.dispose(); material.dispose() }
  }, [size.width, size.height])

  useEffect(() => { if (materialRef.current) { materialRef.current.uniforms.uBgTexture.value = defaultTexture; materialRef.current.uniforms.uFrTexture.value = hoverTexture } })
  useEffect(() => { if (isHovered && materialRef.current) { materialRef.current.uniforms.uIntensity.value = 0.0; waveState.current.active = false } }, [isHovered])

  useFrame((state, delta) => {
    if (!materialRef.current || isHovered) return
    const mat = materialRef.current; const ws = waveState.current
    mat.uniforms.uTime.value = state.clock.elapsedTime
    if (!ws.active) { ws.cooldown -= delta; if (ws.cooldown <= 0) { ws.active = true; ws.waveY = 1.0; ws.nextCooldown = 1.5 + Math.random() * 2.5 } }
    else { ws.waveY -= ws.speed * delta; mat.uniforms.uWaveY.value = ws.waveY; mat.uniforms.uIntensity.value = 1.0; if (ws.waveY < -0.15) { ws.active = false; ws.cooldown = ws.nextCooldown; mat.uniforms.uIntensity.value = 0.0 } }
  })
  return null
}

export function GlitchBackground({ isHovered }) {
  return (
    <div className="absolute inset-0">
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} gl={{ alpha: false, antialias: true }} style={{ width: "100%", height: "100%" }}>
        <GlitchScene isHovered={isHovered} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, black 0%, black 15%, transparent 60%)" }} />
    </div>
  )
}
