import React from 'react'
import { motion } from 'framer-motion'
import {
  Bot, Layers, Globe, Sparkles,
  BrainCircuit, Database, Cpu, GraduationCap,
  ArrowUpRight
} from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import { PixelIcon } from './PixelIcon'
import ThreeDParallax from './ThreeDParallax'

const services = [
  { title: "REDDOT & Automation", description: "Intelligent autonomous agents that streamline complex workflows and business processes.", icon: Bot, type: "agents" },
  { title: "SaaS Application Development", description: "Scalable, secure, and multi-tenant cloud architectures built for high performance.", icon: Layers, type: "platform" },
  { title: "Website & Mobile App Development", description: "Cutting-edge digital experiences with focus on performance, UX, and modern aesthetics.", icon: Globe, type: "workflow" },
  { title: "Generative AI", description: "Custom Large Language Models and creative AI solutions tailored to your unique data.", icon: Sparkles, type: "agents" },
  { title: "Machine Learning & Deep Learning", description: "Advanced predictive modeling and neural networks to unlock insights from complex data.", icon: BrainCircuit, type: "platform" },
  { title: "Data Science & Data Analysis", description: "Transforming raw data into actionable intelligence through rigorous statistical analysis.", icon: Database, type: "workflow" },
  { title: "Embedded Systems & IoT", description: "Hardware-software integration for smart devices and industrial automation systems.", icon: Cpu, type: "platform" },
  { title: "Internship Program", description: "Nurturing the next generation of engineers through hands-on AI and software training.", icon: GraduationCap, type: "agents" }
]

const Services = () => {
  return (
    <section id="services" className="bg-black relative overflow-hidden">
      <ThreeDParallax bgImage="/images/bg/services.png" theme="services">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-24 md:py-32">
          <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Tag><span className="text-white/60">WHAT WE DO</span></Tag>
              <RevealText className="mt-6 text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white">
                Engineering the <br /><span className="font-normal italic text-white/80">Future of AI</span>
              </RevealText>
              <p className="mt-8 text-lg md:text-xl text-white/45 font-light leading-relaxed">
                We provide end-to-end technology solutions to help businesses thrive in the era of intelligence and automation.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex flex-col items-end gap-2 text-[10px] tracking-[0.3em] text-white/20 uppercase font-mono">
                <span>Core Capabilities</span>
                <div className="w-24 h-[1px] bg-white/10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => {
              const waLink = `https://wa.me/918072163133?text=${encodeURIComponent(`Hi REDDOT, I'm interested in your ${service.title} service. Could you please provide more details?`)}`
              
              return (
                <BentoCard 
                  key={service.title} 
                  delay={index * 50} 
                  className="p-8 flex flex-col justify-between min-h-[340px] bg-white/[0.03] border-white/10 hover:bg-white/5 hover:border-white/20 text-white cursor-pointer group relative overflow-hidden"
                  onClick={() => window.open(waLink, '_blank')}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <PixelIcon type={service.type} />
                      <motion.div 
                        whileHover={{ rotate: 45 }}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight size={18} className="text-white/60" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-white transition-colors">{service.title}</h3>
                    <p className="mt-4 text-sm text-white/40 leading-relaxed group-hover:text-white/70 transition-colors">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <service.icon size={16} className="text-white/40 group-hover:text-black" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] text-white/10 font-mono uppercase group-hover:text-white/30 transition-colors">0{index + 1}</span>
                  </div>

                  {/* Decorative background glow on hover */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </BentoCard>
              )
            })}
          </div>
        </div>
      </ThreeDParallax>
    </section>
  )
}

export default Services

