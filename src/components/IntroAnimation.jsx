import React, { useEffect, useState } from "react"

const LETTERS = ["R", "E", "D", "D", "O", "T"]
const LETTER_IN_STAGGER  = 70
const LETTER_IN_DUR      = 500
const HOLD_DURATION      = 200
const LETTERS_IN_TOTAL   = LETTER_IN_STAGGER * (LETTERS.length - 1) + LETTER_IN_DUR + HOLD_DURATION
const LETTER_OUT_STAGGER = 40
const LETTER_OUT_DUR     = 350
const LETTERS_OUT_TOTAL  = LETTER_OUT_STAGGER * (LETTERS.length - 1) + LETTER_OUT_DUR
const CURTAIN_DELAY      = LETTERS_IN_TOTAL + 50
const CURTAIN_DURATION   = 800
const ANIM_TOTAL         = CURTAIN_DELAY + LETTERS_OUT_TOTAL + 800

export const INTRO_DURATION_MS = CURTAIN_DELAY + CURTAIN_DURATION
export const HERO_REVEAL_MS = CURTAIN_DELAY + CURTAIN_DURATION - 100

export function IntroAnimation({ onDone }) {
  const [phase, setPhase] = useState("idle")
  const [curtainUp, setCurtainUp] = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("in"), 80)
    const t1 = setTimeout(() => setPhase("out"), LETTERS_IN_TOTAL)
    const t2 = setTimeout(() => setCurtainUp(true), CURTAIN_DELAY)
    const t3 = setTimeout(() => onDone(), HERO_REVEAL_MS)
    const t4 = setTimeout(() => setPhase("done"), ANIM_TOTAL)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onDone])

  if (phase === "done") return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-0"
        style={{
          bottom: curtainUp ? "100%" : "0%",
          transition: curtainUp ? "bottom 0.8s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          background: "#f5f4f1",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex" style={{ gap: "0.06em" }}>
          {LETTERS.map((letter, i) => {
            const inDelay  = i * LETTER_IN_STAGGER
            const outDelay = i * LETTER_OUT_STAGGER
            const isIdle = phase === "idle"
            const isIn   = phase === "in"
            const isOut  = phase === "out"
            const opacity    = isIdle ? 0 : isIn ? 1 : 0
            const blur       = isIdle ? 36 : isIn ? 0 : 24
            const translateY = isIdle ? 48 : isIn ? 0 : -20
            const transition = isOut
              ? `opacity ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${outDelay}ms,
                 transform ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${outDelay}ms`
              : isIn
              ? `opacity ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${inDelay}ms,
                 transform ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${inDelay}ms`
              : "none"
            return (
              <span
                key={i}
                className="font-sans font-bold text-[#111] leading-none select-none"
                style={{
                  fontSize: `calc((100vw - 64px) / ${LETTERS.length})`,
                  letterSpacing: "0.05em",
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  transition,
                  willChange: "opacity, transform",
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
