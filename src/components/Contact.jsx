import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Send, Globe, MessageCircle, CheckCircle2 } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import FloatingAIObjects from './FloatingAIObjects'

import ThreeDParallax from './ThreeDParallax'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate API call and storage
    setTimeout(() => {
      // Logic: Save to localStorage (can be exported to CSV)
      const enquiries = JSON.parse(localStorage.getItem('reddot_enquiries') || '[]')
      enquiries.push({ ...formData, date: new Date().toISOString() })
      localStorage.setItem('reddot_enquiries', JSON.stringify(enquiries))

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  const openWhatsApp = () => {
    const waLink = `https://wa.me/918072163133?text=${encodeURIComponent("Hi REDDOT, I have a general enquiry. Could you please help me?")}`
    window.open(waLink, '_blank')
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-black">
      <ThreeDParallax bgImage="/images/bg/contact.png" theme="contact">
        <div className="relative py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <FloatingAIObjects section="contact" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Tag>GET IN TOUCH</Tag>
          <RevealText className="mt-6 text-4xl md:text-5xl font-light tracking-tight leading-[1.1] text-white">
            Let's <span className="italic font-normal text-white/80">Connect</span>
          </RevealText>
          <p className="mt-8 text-lg text-white/60 font-light leading-relaxed">
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
              { icon: Mail, label: "Email", value: "reddot.org.123@gmail.com" },
              { icon: Phone, label: "Phone", value: "8072163133, 80150 24729" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full border border-white/[0.05] bg-white/[0.02] flex items-center justify-center text-white/30 group-hover:text-white group-hover:scale-110 group-hover:bg-white/5 transition-all duration-300">
                  <item.icon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-white/30 uppercase font-mono group-hover:text-white/50 transition-colors duration-300">{item.label}</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openWhatsApp}
            className="mt-12 flex items-center gap-3 px-6 py-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium tracking-wide uppercase">WhatsApp Enquiry</span>
          </motion.button>

          <div className="mt-12 pt-12 border-t border-white/10 flex gap-4">
            {[Linkedin, Twitter, Globe].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "#fff", color: "#000", borderColor: "#fff" }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center text-white/30 transition-colors duration-300"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <BentoCard className="p-8 md:p-10 group/form border-dashed">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40 font-light">Thank you for reaching out. We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative group/input">
                      <label className="text-[10px] tracking-widest text-white/40 uppercase font-mono ml-1 transition-colors group-focus-within/input:text-white">Name</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-white/[0.02] border-b-2 border-transparent rounded-t-xl px-5 py-4 focus:outline-none focus:bg-white/[0.04] transition-all text-sm relative z-10 peer text-white"
                        />
                        <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 peer-focus:w-full transition-all duration-300 ease-out z-20" />
                      </div>
                    </div>
                    <div className="space-y-2 relative group/input">
                      <label className="text-[10px] tracking-widest text-white/40 uppercase font-mono ml-1 transition-colors group-focus-within/input:text-white">Email</label>
                      <div className="relative">
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full bg-white/[0.02] border-b-2 border-transparent rounded-t-xl px-5 py-4 focus:outline-none focus:bg-white/[0.04] transition-all text-sm relative z-10 peer text-white"
                        />
                        <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 peer-focus:w-full transition-all duration-300 ease-out z-20" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 relative group/input">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase font-mono ml-1 transition-colors group-focus-within/input:text-white">Message</label>
                    <div className="relative">
                      <textarea
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project..."
                        className="w-full bg-white/[0.02] border-b-2 border-transparent rounded-t-xl px-5 py-4 focus:outline-none focus:bg-white/[0.04] transition-all resize-none text-sm relative z-10 peer text-white"
                      ></textarea>
                      <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 peer-focus:w-full transition-all duration-300 ease-out z-20" />
                    </div>
                  </div>

                  <motion.button
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-white text-black text-[11px] tracking-[0.2em] uppercase font-sans rounded-xl shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn disabled:opacity-50"
                    type="submit"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-black/10 origin-bottom"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                      <Send size={14} className={`absolute transition-transform duration-500 ${status === 'submitting' ? 'translate-x-10 -translate-y-10' : 'group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8'}`} />
                      <Send size={14} className="absolute transition-transform duration-500 -translate-x-8 translate-y-8 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                    </div>
                    
                    <span className="relative z-10">{status === 'submitting' ? 'SENDING...' : 'Send Message'}</span>
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </BentoCard>
        </div>
      </div>
        </div>
      </ThreeDParallax>
    </section>
  )
}

export default Contact
