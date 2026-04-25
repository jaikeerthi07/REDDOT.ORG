export async function extractColors(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        resolve(["#F5F4F0", "#E5E4E0", "#D5D4D0"])
        return
      }

      const sampleSize = 50
      canvas.width = sampleSize
      canvas.height = sampleSize

      ctx.drawImage(img, 0, 0, sampleSize, sampleSize)

      try {
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
        const pixels = imageData.data

        const colorMap = new Map()

        for (let i = 0; i < pixels.length; i += 4) {
          const r = Math.min(255, Math.round(pixels[i] / 32) * 32)
          const g = Math.min(255, Math.round(pixels[i + 1] / 32) * 32)
          const b = Math.min(255, Math.round(pixels[i + 2] / 32) * 32)

          const brightness = (r + g + b) / 3
          if (brightness < 20 || brightness > 240) continue

          const key = `${r},${g},${b}`
          const existing = colorMap.get(key)

          if (existing) {
            existing.count++
          } else {
            colorMap.set(key, { count: 1, r, g, b })
          }
        }

        const sortedColors = Array.from(colorMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        const distinctColors = []
        for (const color of sortedColors) {
          const hex = rgbToHex(color.r, color.g, color.b)

          const isDistinct = distinctColors.every((existing) => {
            const existingRgb = hexToRgb(existing)
            if (!existingRgb) return true
            const distance = Math.sqrt(
              Math.pow(color.r - existingRgb.r, 2) +
                Math.pow(color.g - existingRgb.g, 2) +
                Math.pow(color.b - existingRgb.b, 2),
            )
            return distance > 40
          })

          if (isDistinct && distinctColors.length < 3) {
            distinctColors.push(hex)
          }
        }

        while (distinctColors.length < 3) {
          distinctColors.push(distinctColors[0] || "#F5F4F0")
        }

        resolve(distinctColors)
      } catch (e) {
        resolve(["#F5F4F0", "#E5E4E0", "#D5D4D0"])
      }
    }

    img.onerror = () => {
      resolve(["#F5F4F0", "#E5E4E0", "#D5D4D0"])
    }

    img.src = imageUrl
  })
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}
