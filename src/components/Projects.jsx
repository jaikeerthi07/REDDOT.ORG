import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'

const projects = [
  { title: "Jarvis AI", description: "A sophisticated personal AI assistant capable of managing schedules, controlling smart homes, and performing complex web research.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", tag: "AI REDDOT" },
  { title: "Universal Web Scraper REDDOT", description: "An autonomous REDDOT that can navigate any website, extract structured data, and handle dynamic content using LLM-based parsing.", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80", tag: "Automation" },
  { title: "AI Travel Planning App", description: "Personalized itinerary generation based on user preferences, real-time flight data, and social media trends.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80", tag: "Mobile App" },
  { title: "Dynamic Spectrum Allocation", description: "An ML-driven system for optimizing wireless communication bandwidth in real-time for industrial IoT environments.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80", tag: "Embedded" },
  { title: "Customized LLM", description: "Domain-specific Large Language Models fine-tuned on proprietary corporate data for secure internal knowledge management.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80", tag: "Gen AI" },
  { title: "Medical Silent Emergency System", description: "A wearable embedded system for hospitals that detects emergencies silently and alerts staff instantly via private mesh networks.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80", tag: "IoT" }
]

import { ProjectSlider } from './projects/ProjectSlider'

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-xl">
          <Tag>WHAT WE'VE BUILT</Tag>
          <RevealText className="mt-6 text-4xl md:text-5xl font-light tracking-tight leading-[1.1]">
            Featured <span className="italic font-normal">Projects</span>
          </RevealText>
          <p className="mt-8 text-lg text-black/45 font-light leading-relaxed">
            Real-world solutions built using advanced AI and embedded engineering.
          </p>
        </div>
      </div>

      <ProjectSlider />
    </section>
  )
}

export default Projects
