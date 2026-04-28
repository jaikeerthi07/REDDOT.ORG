import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Linkedin, ArrowRight } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import FloatingAIObjects from './FloatingAIObjects'
import ThreeDParallax from './ThreeDParallax'

const founders = [
  {
    name: "Jaikeerthi R",
    role: "AI Engineer",
    specialty: "Specialized in Agentic AI, Generative AI, and automation",
    image: "/images/founder2.png",
    objectPosition: "object-center",
    scale: "scale-110",
    portfolio: "https://ether-dream-recreate.vercel.app/",
    linkedin: "https://www.linkedin.com/in/jaikeerthi-r-03931b341"
  },
  {
    name: "Jagadish K",
    role: "Embedded Systems Engineer",
    specialty: "Expert in VLSI and hardware-software integration",
    image: "/images/founder1.jpg",
    objectPosition: "object-top",
    scale: "scale-110",
    portfolio: "https://jd-arc.vercel.app/",
    linkedin: "#"
  }
]

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-black">
      <ThreeDParallax bgImage="/images/bg/about.png" theme="about">
        <div className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <FloatingAIObjects section="about" />
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <Tag>WHO WE ARE</Tag>
                <RevealText className="mt-6 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white">
                  About <span className="italic font-normal">REDDOT</span>
                </RevealText>
                <p className="mt-8 text-lg text-white/45 font-light leading-relaxed max-w-md">
                  RedDot is an advanced technology company focused on AI, software, and embedded systems. We bridge the gap between complex engineering and real-world utility.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Our Mission", text: "Build intelligent and scalable solutions for a smarter tomorrow.", icon: Target, color: "from-blue-500/20" },
                  { label: "Our Vision", text: "Become a global leader in AI and industrial automation.", icon: Eye, color: "from-purple-500/20" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`p-6 rounded-3xl border border-white/[0.05] bg-gradient-to-br ${item.color} to-transparent backdrop-blur-md flex gap-5 group hover:border-white/10 transition-all`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/90">{item.label}</h4>
                      <p className="mt-1 text-sm text-white/50 leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {founders.map((founder, i) => (
                <BentoCard key={founder.name} delay={i * 100} className="p-8 flex flex-col items-center text-center bg-white/[0.02] border-white/10 backdrop-blur-xl group hover:bg-white/[0.04]">
                  <a
                    href={founder.portfolio || "#"}
                    target={founder.portfolio ? "_blank" : "_self"}
                    rel={founder.portfolio ? "noopener noreferrer" : ""}
                    className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/[0.05] bg-white/[0.02] mb-8 block transition-all duration-500 ${founder.portfolio ? 'cursor-pointer hover:border-white/20 group/img' : 'cursor-default'}`}
                  >
                    <img
                      src={founder.image}
                      alt={founder.name}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=f5f4f0&color=111&size=200&bold=true&font-size=0.4`
                      }}
                      className={`w-full h-full object-cover ${founder.objectPosition} ${founder.scale} grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-[8px] font-mono tracking-widest text-white uppercase">View Portfolio</span>
                    </div>
                  </a>

                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-light text-white">{founder.name}</h4>
                    <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-mono">{founder.role}</p>
                  </div>

                  <p className="mt-6 text-sm text-white/50 leading-relaxed px-2">
                    {founder.specialty}
                  </p>

                  <div className="mt-8 flex gap-4">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/[0.07] flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </BentoCard>
              ))}

              <BentoCard className="sm:col-span-2 p-10 flex flex-col md:flex-row items-center justify-between border-dashed bg-white/[0.01] border-white/[0.1] gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3">
                    <img src="/reddot logo.png" alt="Logo" className="w-full h-full object-contain opacity-50 invert" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-mono">ESTABLISHED 2024</p>
                    <h5 className="text-white/60 text-sm font-light mt-1">Innovating at the edge of possibility.</h5>
                  </div>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-mono"
                >
                  Join our mission <ArrowRight size={14} />
                </motion.button>
              </BentoCard>
            </div>
          </div>
        </div>
      </ThreeDParallax>
    </section>
  )
}

export default About

