import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Send, Globe } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import FloatingAIObjects from './FloatingAIObjects'

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
      <FloatingAIObjects section="contact" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Tag>GET IN TOUCH</Tag>
          <RevealText className="mt-6 text-4xl md:text-5xl font-light tracking-tight leading-[1.1]">
            Let's <span className="italic font-normal">Connect</span>
          </RevealText>
          <p className="mt-8 text-lg text-black/45 font-light leading-relaxed">
            Have a project in mind or want to learn more? Reach out and we'll get back to you shortly.
          </p>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="mt-12 space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "reddot.org123@gmail.com" },
              { icon: Phone, label: "Phone", value: "8072163133, 80150 24729" },
              { icon: MapPin, label: "Location", value: "IIT Madras Research Park, Chennai" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full border border-black/[0.05] bg-black/[0.02] flex items-center justify-center text-black/30 group-hover:text-black group-hover:scale-110 group-hover:bg-black/5 transition-all duration-300">
                  <item.icon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-black/30 uppercase font-mono group-hover:text-black/50 transition-colors duration-300">{item.label}</p>
                  <p className="text-sm font-medium text-black/70 group-hover:text-black transition-colors duration-300">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 pt-12 border-t border-black/[0.05] flex gap-4">
            {[Linkedin, Twitter, Globe].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "#000", color: "#fff", borderColor: "#000" }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-black/[0.05] flex items-center justify-center text-black/30 transition-colors duration-300"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <BentoCard className="p-8 md:p-10 group/form border-dashed">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative group/input">
                  <label className="text-[10px] tracking-widest text-black/40 uppercase font-mono ml-1 transition-colors group-focus-within/input:text-black">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-black/[0.02] border-b-2 border-transparent rounded-t-xl px-5 py-4 focus:outline-none focus:bg-black/[0.04] transition-all text-sm relative z-10 peer"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-black w-0 peer-focus:w-full transition-all duration-300 ease-out z-20" />
                  </div>
                </div>
                <div className="space-y-2 relative group/input">
                  <label className="text-[10px] tracking-widest text-black/40 uppercase font-mono ml-1 transition-colors group-focus-within/input:text-black">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-black/[0.02] border-b-2 border-transparent rounded-t-xl px-5 py-4 focus:outline-none focus:bg-black/[0.04] transition-all text-sm relative z-10 peer"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-black w-0 peer-focus:w-full transition-all duration-300 ease-out z-20" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative group/input">
                <label className="text-[10px] tracking-widest text-black/40 uppercase font-mono ml-1 transition-colors group-focus-within/input:text-black">Message</label>
                <div className="relative">
                  <textarea
                    rows="5"
                    placeholder="Tell us about your project..."
                    className="w-full bg-black/[0.02] border-b-2 border-transparent rounded-t-xl px-5 py-4 focus:outline-none focus:bg-black/[0.04] transition-all resize-none text-sm relative z-10 peer"
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-black w-0 peer-focus:w-full transition-all duration-300 ease-out z-20" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-black text-white text-[11px] tracking-[0.2em] uppercase font-sans rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                type="button"
              >
                {/* Button background animation */}
                <motion.div 
                  className="absolute inset-0 bg-white/10 origin-bottom"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Airplane icon animation */}
                <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                  <Send size={14} className="absolute transition-transform duration-500 group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                  <Send size={14} className="absolute transition-transform duration-500 -translate-x-8 translate-y-8 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                </div>
                
                <span className="relative z-10">Send Message</span>
              </motion.button>
            </form>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

export default Contact
