import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Send, ArrowRight } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import FloatingAIObjects from './FloatingAIObjects'

const roles = [
  "AI/ML Engineer",
  "Full Stack Developer",
  "Embedded Systems Engineer",
  "Data Scientist",
  "Internship roles"
]

import ThreeDParallax from './ThreeDParallax'

const Careers = () => {
  return (
    <section id="careers" className="relative overflow-hidden bg-black">
      <ThreeDParallax bgImage="/images/bg/careers.png" theme="careers">
        <div className="relative py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <FloatingAIObjects section="careers" />
      <BentoCard className="relative z-10 p-8 md:p-16 border-dashed border-white/20 overflow-hidden group">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <Tag>WE'RE HIRING</Tag>
            <RevealText className="mt-6 text-4xl md:text-5xl font-light tracking-tight leading-[1.1] text-white">
              Build the Future <br />With <span className="italic font-normal text-white/80">REDDOT</span>
            </RevealText>
            <p className="mt-8 text-lg text-white/60 font-light leading-relaxed">
              We're looking for passionate engineers and innovators to join our team in Chennai. If you're excited about AI and cutting-edge software, we want to hear from you.
            </p>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-12 flex items-center gap-4 group/btn cursor-pointer inline-flex p-2 pr-6 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/10 flex items-center justify-center text-white/40 group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300 shadow-sm relative overflow-hidden">
                <Send size={18} className="relative z-10 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 group-hover/btn:scale-90 transition-transform duration-300" />
                <motion.div 
                  className="absolute inset-0 bg-white scale-0 rounded-full origin-center"
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-white/30 uppercase font-mono group-hover/btn:text-white/50 transition-colors">Apply via Email</p>
                <p className="text-sm font-medium text-white/80">careers@reddot.com</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 gap-3 relative"
          >
            {/* Background decorative grid */}
            <div className="absolute inset-0 border border-white/[0.03] rounded-3xl" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.1 }} />
            
            {roles.map((role, i) => (
              <motion.div
                key={role}
                variants={{
                  hidden: { opacity: 0, y: 20, rotateX: -10 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.04] bg-white/[0.05] hover:border-white/[0.15] hover:bg-white/10 hover:shadow-lg hover:shadow-white/[0.03] transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Hover Reveal Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:bg-white/[0.05] group-hover:text-white/60 transition-colors">
                    <Briefcase size={14} />
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{role}</span>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </BentoCard>
        </div>
      </ThreeDParallax>
    </section>
  )
}

export default Careers
