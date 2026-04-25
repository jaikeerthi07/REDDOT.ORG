# 🌟 REDDOT – Corporate Technology Website

REDDOT is a technology-driven company specializing in artificial intelligence, automation, software development, and embedded systems. This repository contains the front-end codebase for the official REDDOT website.

## 🎨 Recent Design Overhaul (Light Theme Redesign)

The website recently underwent a massive architectural and design overhaul, transitioning from a dark "Obsidian & Neon" aesthetic to a **Premium Light Corporate Theme**. 

### Key Features of the Redesign:
- **Clean Aesthetic:** Transitioned to a pristine white and light-gray background (`#fafafa`) with high-contrast, dark typography (`text-gray-900`) to maximize readability and exude a professional corporate identity.
- **Advanced Glassmorphism:** Maintained the futuristic glass-card UI but updated it for light mode (using semi-transparent white overlays, subtle gray borders, and soft drop-shadows).
- **AI-Generated Art:** Integrated custom 8K 3D abstract imagery across the Hero and Services sections (e.g., robotic AI hands, neural networks, data streams, and floating SaaS clouds).
- **Subtle Neon Accents:** Retained the signature Cyan (`#00f3ff`) and Purple (`#bc00ff`) brand colors as hover states, gradients, and subtle accents to maintain the high-tech AI vibe without overwhelming the bright layout.

## 🚀 Performance Optimizations

During the redesign, we significantly improved rendering performance to achieve a solid 60FPS across all devices:
- **GPU Acceleration:** All Framer Motion animations (`x`, `y`, `scale`, `rotate`) are backed by `will-change: transform` to force hardware acceleration.
- **Removed Heavy CSS Filters:** Eliminated expensive CSS `backdrop-filter: blur()` properties on large background elements. We replaced them with static, pre-rendered radial gradients which cut GPU load drastically.
- **Canvas Optimization:** The background `NeuralCanvas` was optimized by removing complex radial gradients per node, reducing node counts, and halving draw calls.
- **Distraction-Free:** Removed excessive bouncing "neon dots" from the global background to maintain a cleaner, more professional aesthetic.

## 🛠 Tech Stack

- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Canvas:** HTML5 Canvas API (for Neural Networks)

## 💻 Running Locally

To run this project on your local machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View in browser:**
   Open [http://localhost:5173](http://localhost:5173) in your web browser.

---
*Built with precision for the future of AI and Engineering.*
