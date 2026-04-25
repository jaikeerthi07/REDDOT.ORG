import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Linkedin, Twitter, Mail } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import JellyfishBackground from './JellyfishBackground'

const founders = [
  {
    name: "Jaikeerthi R",
    role: "AI Engineer",
    specialty: "Specialized in REDDOT AI, Generative AI, and automation",
    image: "/images/founder2.png",
    objectPosition: "object-center",
    scale: "scale-110",
    portfolio: "https://ether-dream-recreate.vercel.app/"
  },
  {
    name: "Jagadish K",
    role: "Embedded Systems Engineer",
    specialty: "Expert in VLSI and hardware-software integration",
    image: "/images/founder1.jpg",
    objectPosition: "object-top",
    scale: "scale-110"
  }
]

const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#00050f]">
      <JellyfishBackground />
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Tag>WHO WE ARE</Tag>
          <RevealText className="mt-6 text-4xl md:text-5xl font-light tracking-tight leading-[1.1] text-white">
            About <span className="italic font-normal text-blue-400">REDDOT</span>
          </RevealText>
          <p className="mt-8 text-lg text-white/60 font-light leading-relaxed">
            RedDot is an advanced technology company focused on AI, software, and embedded systems. We bridge the gap between complex engineering and real-world utility.
          </p>

          <div className="mt-12 space-y-4">
            {[
              { label: "Our Mission", text: "Build intelligent and scalable solutions for a smarter tomorrow.", icon: Target },
              { label: "Our Vision", text: "Become a global leader in AI and industrial automation.", icon: Eye }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm flex gap-4">
                <item.icon className="text-white/30 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-white/80">{item.label}</h4>
                  <p className="mt-1 text-sm text-white/50">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {founders.map((founder, i) => (
            <BentoCard key={founder.name} delay={i * 100} className="p-8 flex flex-col items-center text-center bg-white/[0.05] border-white/[0.1] backdrop-blur-md">
              <a 
                href={founder.portfolio || "#"} 
                target={founder.portfolio ? "_blank" : "_self"}
                rel={founder.portfolio ? "noopener noreferrer" : ""}
                className={`relative w-32 h-32 rounded-full overflow-hidden border border-black/[0.05] bg-black/[0.02] mb-6 block ${founder.portfolio ? 'cursor-pointer hover:border-black/20 group' : 'cursor-default'}`}
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=f5f4f0&color=111&size=200&bold=true&font-size=0.4`
                  }}
                  className={`w-full h-full object-cover ${founder.objectPosition} ${founder.scale} grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700`}
                  loading="lazy"
                  fetchPriority="low"
                />
              </a>
              
              <h4 className="text-xl font-light text-white/90">{founder.name}</h4>
              <p className="mt-1 text-[10px] tracking-widest text-blue-400/60 uppercase font-mono">{founder.role}</p>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                {founder.specialty}
              </p>

              <div className="mt-8 flex gap-3">
                {[Linkedin, Twitter, Mail].map((Icon, j) => (
                  <a
                    key={j}
                    href="#"
                    className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </BentoCard>
          ))}
          
          <BentoCard className="md:col-span-2 p-8 flex items-center justify-center border-dashed bg-white/[0.02] border-white/[0.1]">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center mx-auto mb-4">
                <img src="/reddot logo.png" alt="Logo" className="h-6 object-contain opacity-50 brightness-0 invert" />
              </div>
              <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-mono">ESTABLISHED 2024</p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

export default About
