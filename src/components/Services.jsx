import React from 'react'
import { motion } from 'framer-motion'
import {
  Bot, Layers, Globe, Sparkles,
  BrainCircuit, Database, Cpu, GraduationCap
} from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import { PixelIcon } from './PixelIcon'

const services = [
  { title: "REDDOT & Automation", description: "Intelligent autonomous REDDOT that streamline complex workflows and business processes.", icon: Bot, type: "agents" },
  { title: "SaaS Application Development", description: "Scalable, secure, and multi-tenant cloud architectures built for high performance.", icon: Layers, type: "platform" },
  { title: "Website & Mobile App Development", description: "Cutting-edge digital experiences with focus on performance, UX, and modern aesthetics.", icon: Globe, type: "workflow" },
  { title: "Generative AI", description: "Custom Large Language Models and creative AI solutions tailored to your unique data.", icon: Sparkles, type: "agents" },
  { title: "Machine Learning & Deep Learning", description: "Advanced predictive modeling and neural networks to unlock insights from complex data.", icon: BrainCircuit, type: "platform" },
  { title: "Data Science & Data Analysis", description: "Transforming raw data into actionable intelligence through rigorous statistical analysis.", icon: Database, type: "workflow" },
  { title: "Embedded Systems & IoT", description: "Hardware-software integration for smart devices and industrial automation systems.", icon: Cpu, type: "platform" },
  { title: "Internship Program", description: "Nurturing the next generation of engineers through hands-on AI and software training.", icon: GraduationCap, type: "agents" }
]

import ThreeDParallax from './ThreeDParallax'

const Services = () => {
  return (
    <section id="services" className="bg-black">
      <ThreeDParallax bgImage="/images/bg/services.png" theme="services">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-20">
          <div className="mb-20 text-center md:text-left">
            <Tag><span className="text-white/60">WHAT WE DO</span></Tag>
            <RevealText className="mt-6 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white">
              Explore Our <span className="font-normal italic text-white/80">Services</span>
            </RevealText>
            <p className="mt-8 text-lg text-white/45 font-light leading-relaxed max-w-2xl">
              We provide end-to-end technology solutions to help businesses thrive in the era of intelligence and automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const waLink = `https://wa.me/918072163133?text=${encodeURIComponent(`Hi REDDOT, I'm interested in your ${service.title} service. Could you please provide more details?`)}`
              
              return (
                <BentoCard 
                  key={service.title} 
                  delay={index * 100} 
                  className="p-8 flex flex-col justify-between min-h-[320px] bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white cursor-pointer group"
                  onClick={() => window.open(waLink, '_blank')}
                >
                  <div>
                    <PixelIcon type={service.type} />
                    <h3 className="mt-8 text-xl font-light text-white group-hover:text-white transition-colors">{service.title}</h3>
                    <p className="mt-4 text-sm text-white/45 leading-relaxed group-hover:text-white/70 transition-colors">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <service.icon size={14} className="text-white/40 group-hover:text-black" />
                    </div>
                    <span className="text-[10px] tracking-widest text-white/20 font-mono uppercase group-hover:text-white/40 transition-colors">0{index + 1}</span>
                  </div>
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
