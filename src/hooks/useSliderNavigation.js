import { useState, useCallback, useEffect } from "react"

export function useSliderNavigation({ totalSlides, enableKeyboard = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)))
  }, [totalSlides])

  useEffect(() => {
    if (!enableKeyboard) return
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enableKeyboard, goToNext, goToPrev])

  return { currentIndex, goToNext, goToPrev, goToSlide }
}
