import React, { useEffect, useRef, useState, useCallback } from "react"

const defaultPositions = [
  { x: 0.1, y: 0.15, scale: 1 },
  { x: 0.8, y: 0.2, scale: 1.2 },
  { x: 0.05, y: 0.6, scale: 0.7 },
  { x: 0.75, y: 0.5, scale: 0.85 },
  { x: 0.6, y: 0.75, scale: 0.6 },
]

const vertexShaderSource = `#version 300 es
in vec4 a_position;
void main() { gl_Position = a_position; }`

const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;

vec3 hsv(float h, float s, float v) {
  vec4 t = vec4(1., 2./3., 1./3., 3.);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6. - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0., 1.), s);
}

mat3 rotate3D(float angle, vec3 axis) {
  vec3 a = normalize(axis);
  float s = sin(angle), c = cos(angle);
  float oc = 1.0 - c;
  return mat3(oc*a.x*a.x + c, oc*a.x*a.y + a.z*s, oc*a.z*a.x - a.y*s, oc*a.x*a.y - a.z*s, oc*a.y*a.y + c, oc*a.y*a.z + a.x*s, oc*a.z*a.x + a.y*s, oc*a.y*a.z - a.x*s, oc*a.z*a.z + c);
}

void main() {
  vec2 r = u_resolution;
  vec2 FC = gl_FragCoord.xy;
  float t = u_time;
  vec4 o = vec4(0, 0, 0, 1);
  for (float i = 0., g = 0., e = 0., s = 0.; ++i < 99.; o.rgb += .01 - hsv(.1, g*.016 - e*.3, s/2e2)) {
    vec3 p = vec3((FC.xy - .5*r) / r.y * 5. + vec2(0, 9), g) * rotate3D(-1.1 - cos(t*.15)*.1, vec3(1, 11. + sin(t)*.15, -1.5));
    s = 2.;
    for (int i = 0; i++ < 19; p = vec3(.08, 4, -1) - abs(abs(p)*e - vec3(3, 4, 3))) s *= e = 7.1 / dot(p, p*.51);
    g += p.y / s;
    s = log2(s) / exp(e);
  }
  outColor = vec4(o.rgb * u_intensity * 0.7, 1.0);
}`

function JellyfishSVG({ id, scale = 1 }) {
  return (
    <svg width={200 * scale} height={350 * scale} viewBox="0 0 200 350" className="overflow-visible">
      <defs>
        <radialGradient id={`bellGrad${id}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(220,240,255,0.25)" />
          <stop offset="30%" stopColor="rgba(180,220,255,0.18)" />
          <stop offset="100%" stopColor="rgba(100,160,220,0.05)" />
        </radialGradient>
        <radialGradient id={`innerBell${id}`} cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="rgba(200,230,255,0.15)" />
          <stop offset="100%" stopColor="rgba(150,200,240,0.05)" />
        </radialGradient>
        <radialGradient id={`gonadGrad${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,200,220,0.4)" />
          <stop offset="100%" stopColor="rgba(220,160,180,0.1)" />
        </radialGradient>
        <linearGradient id={`tentGrad${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(180,220,255,0.3)" />
          <stop offset="100%" stopColor="rgba(100,160,220,0)" />
        </linearGradient>
      </defs>
      <g style={{ animation: 'bellPulse 3s ease-in-out infinite' }}>
        <ellipse cx="100" cy="70" rx="85" ry="65" fill={`url(#bellGrad${id})`} stroke="rgba(200,230,255,0.1)" strokeWidth="1" />
        <ellipse cx="100" cy="75" rx="70" ry="50" fill={`url(#innerBell${id})`} />
        <g style={{ animation: 'organPulse 3s ease-in-out infinite' }}>
          <ellipse cx="70" cy="65" rx="18" ry="12" fill={`url(#gonadGrad${id})`} transform="rotate(-20 70 65)" />
          <ellipse cx="130" cy="65" rx="18" ry="12" fill={`url(#gonadGrad${id})`} transform="rotate(20 130 65)" />
        </g>
      </g>
      <g style={{ animation: 'oralArmSway 5s ease-in-out infinite', transformOrigin: 'top' }}>
        <path d="M85,100 Q80,130 75,160 Q70,180 78,200" stroke="rgba(200,230,255,0.2)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M115,100 Q120,130 125,160 Q130,180 122,200" stroke="rgba(200,230,255,0.2)" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <path style={{ animation: 'tentacleWave 4s ease-in-out infinite' }} d="M25,80 Q30,120 22,160 Q18,200 28,240 Q22,280 30,320" stroke={`url(#tentGrad${id})`} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path style={{ animation: 'tentacleWave 4s ease-in-out infinite', animationDelay: '-1s' }} d="M175,80 Q170,120 178,160 Q182,200 172,240 Q178,280 170,320" stroke={`url(#tentGrad${id})`} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export default function JellyfishBackground() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const animationRef = useRef(0)
  const jellyfishRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.1 })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl2")
    if (!gl) return
    glRef.current = gl

    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderSource))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentShaderSource))
    gl.linkProgram(program)
    programRef.current = program

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const posAttrLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posAttrLoc)
    gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    // Initialize jellyfish
    jellyfishRef.current = defaultPositions.map((pos, i) => ({
      id: i,
      x: canvas.clientWidth * pos.x,
      y: canvas.clientHeight * pos.y,
      vx: 0,
      vy: 0,
      scale: pos.scale,
      baseX: canvas.clientWidth * pos.x,
      baseY: canvas.clientHeight * pos.y,
    }))

    const render = (time) => {
      if (isInView) {
        gl.useProgram(program)
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), gl.canvas.width, gl.canvas.height)
        gl.uniform1f(gl.getUniformLocation(program, "u_time"), time * 0.001)
        gl.uniform1f(gl.getUniformLocation(program, "u_intensity"), 1.0)
        gl.drawArrays(gl.TRIANGLES, 0, 6)

        jellyfishRef.current.forEach((jelly) => {
          const dx = mouseRef.current.x - jelly.x
          const dy = mouseRef.current.y - jelly.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 300 && dist > 0) {
            const force = ((300 - dist) / 300) * 0.5
            jelly.vx -= (dx / dist) * force
            jelly.vy -= (dy / dist) * force
          }
          jelly.vx += (jelly.baseX - jelly.x) * 0.01
          jelly.vy += (jelly.baseY - jelly.y) * 0.01
          jelly.vx *= 0.95
          jelly.vy *= 0.95
          jelly.x += jelly.vx
          jelly.y += jelly.vy

          if (jelly.element) {
            jelly.element.style.transform = `translate3d(${jelly.x}px, ${jelly.y}px, 0)`
          }
        })
        animationRef.current = requestAnimationFrame(render)
      }
    }
    if (isInView) {
      animationRef.current = requestAnimationFrame(render)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#00050f]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F4F0]" />
      
      {/* Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animation: `particleFloatUp ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${-Math.random() * 10}s`,
              opacity: 0.1 + Math.random() * 0.2,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {jellyfishRef.current.map((jelly) => (
          <div
            key={jelly.id}
            ref={(el) => (jelly.element = el)}
            className="absolute top-0 left-0 jellyfish-glow"
            style={{ transform: `translate(${jelly.x}px, ${jelly.y}px)` }}
          >
            <JellyfishSVG id={jelly.id} scale={jelly.scale} />
          </div>
        ))}
      </div>
    </div>
  )
}
