import { useState, useEffect } from "react"
import { extractColors } from "../lib/color-utils"
import { DEFAULT_COLORS } from "../lib/constants"

export function useColorExtraction(items, currentIndex) {
  const [colors, setColors] = useState({})

  useEffect(() => {
    // Only extract colors for current, next, and previous
    const indicesToProcess = [currentIndex, currentIndex + 1, currentIndex - 1]
      .filter(i => i >= 0 && i < items.length)

    indicesToProcess.forEach((index) => {
      if (colors[index]) return // Skip if already extracted

      extractColors(items[index].image).then((extractedColors) => {
        setColors((prev) => ({ ...prev, [index]: extractedColors }))
      })
    })
  }, [items, currentIndex, colors])

  return colors
}

export function useCurrentColors(colors, currentIndex) {
  return colors[currentIndex] || [...DEFAULT_COLORS]
}
