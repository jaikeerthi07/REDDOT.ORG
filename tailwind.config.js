/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'Courier Prime', 'monospace'],
        pixel: ['Courier Prime', 'monospace'],
      },
      colors: {
        'reddot-dark': '#0a0a0a',
        'reddot-blue': '#00d2ff',
        'reddot-purple': '#9d50bb',
        'neon-blue': '#00f3ff',
        'neon-purple': '#bc00ff',
        'template-bg': '#F5F4F0',
        'template-text': '#111',
      },
      animation: {
        'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee-left': 'marqueeLeft 28s linear infinite',
        'marquee-right': 'marqueeRight 22s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
          '50%': { opacity: 0.7, filter: 'brightness(1.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marqueeLeft: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-33.333%)' },
        },
        marqueeRight: {
          from: { transform: 'translateX(-33.333%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
    },
  },
  plugins: [],
}
