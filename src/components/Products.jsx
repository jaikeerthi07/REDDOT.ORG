import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Users, Shield, Zap, Bell, History } from 'lucide-react'
import { Tag } from './Tag'
import { RevealText } from './RevealText'
import { BentoCard } from './BentoCard'
import FloatingAIObjects from './FloatingAIObjects'

const features = [
  { text: "Event discovery and registration", icon: Calendar },
  { text: "Team formation", icon: Users },
  { text: "Hackathon management", icon: Shield },
  { text: "Event tracking", icon: Zap },
  { text: "Notifications", icon: Bell },
  { text: "Participation history", icon: History }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
}

import ThreeDParallax from './ThreeDParallax'

const Products = () => {
  return (
    <section id="products" className="relative overflow-hidden bg-black">
      <ThreeDParallax bgImage="/images/bg/careers.png" theme="products">
        <div className="relative py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <FloatingAIObjects section="products" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Tag>OUR FEATURED PRODUCT</Tag>
              <a
                href="https://sem-pro.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 mt-6 group/link cursor-pointer"
              >
                <img src="/icon.svg" alt="SEM" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/link:scale-110 transition-transform duration-300" />
                <RevealText className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
                  SEM — Student <br /><span className="italic font-normal text-white/80 group-hover/link:text-white transition-colors duration-300">Event Management</span>
                </RevealText>
              </a>
              <p className="mt-8 text-lg text-white/60 font-light leading-relaxed">
                A comprehensive platform designed to manage and streamline student participation in hackathons, technical events, and competitions.
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12"
              >
                {features.map((feature, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-center gap-4 group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-white/5 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                      <feature.icon size={14} />
                    </div>
                    <span className="text-sm text-white/50 group-hover:text-white/90 transition-colors duration-300">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-16">
                <motion.a
                  href="https://sem-pro.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-10 py-4 bg-white text-black text-[11px] tracking-[0.2em] uppercase font-sans rounded-full shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More About SEM</span>
                  <motion.div
                    className="absolute inset-0 bg-black/20 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-6" style={{ perspective: "1000px" }}>
              <a
                href="https://sem-pro.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotateX: 2, rotateY: -2, z: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <BentoCard className="aspect-square md:aspect-[4/3] lg:aspect-square flex flex-col p-1 shadow-2xl shadow-white/[0.03] hover:shadow-white/[0.1] transition-shadow duration-500">
                    <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl overflow-hidden relative m-2 border border-white/[0.06]">
                      {/* Mock Interface Background Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Mock Interface Content */}
                      <div className="absolute inset-0 p-4 sm:p-8 flex flex-col gap-6 relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                          <div className="flex items-center gap-3">
                            <img src="/icon.svg" alt="" className="w-5 h-5 opacity-80" />
                            <motion.div
                              className="h-4 bg-white/[0.08] rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: 100 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                          <div className="flex gap-2">
                            <motion.div className="h-2 w-8 bg-white/[0.05] rounded-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} />
                            <motion.div className="h-2 w-8 bg-white/[0.05] rounded-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
                          </div>
                        </div>

                        {/* Featured Poster & Activity */}
                        <div className="grid grid-cols-12 gap-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="col-span-8 aspect-[4/3] bg-black/40 rounded-xl border border-white/[0.1] overflow-hidden relative group/poster shadow-lg"
                          >
                            <img
                              src="/images/sem_poster.png"
                              alt="SEM Event Poster"
                              className="w-full h-full object-cover opacity-80 group-hover/poster:opacity-100 group-hover/poster:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                              <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">Featured Event</span>
                              <span className="text-[10px] font-medium text-white/90">Global AI Summit 2026</span>
                            </div>
                          </motion.div>

                          <div className="col-span-4 flex flex-col gap-4">
                            {[1, 2].map(i => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                                className="flex-1 bg-white/[0.03] rounded-lg border border-white/[0.05] relative overflow-hidden"
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i }}
                                />
                                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                                  <div className="h-1 w-8 bg-white/20 rounded-full mb-1" />
                                  <div className="h-1 w-12 bg-white/10 rounded-full" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Main Panel */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="flex-1 bg-white/10 border border-white/10 rounded-xl shadow-md p-6 relative overflow-hidden group"
                        >
                          <div className="flex items-start justify-between mb-8">
                            <div>
                              <motion.div
                                className="h-3 bg-white/[0.1] rounded-full mb-3"
                                initial={{ width: 0 }} whileInView={{ width: 160 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}
                              />
                              <motion.div
                                className="h-2 bg-white/[0.05] rounded-full"
                                initial={{ width: 0 }} whileInView={{ width: 96 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.2 }}
                              />
                            </div>
                            <motion.div
                              animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                              className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center border-t-white/20"
                            />
                          </div>

                          {/* Animated List */}
                          <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="flex items-center gap-3">
                                <motion.div
                                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 1.2 + (i * 0.1) }}
                                  className={`w-4 h-4 rounded border ${i < 3 ? 'border-green-500/30 bg-green-500/10' : 'border-white/[0.1]'} flex items-center justify-center`}
                                >
                                  {i < 3 && <CheckCircle size={10} className="text-green-500" />}
                                </motion.div>
                                <div className="h-2 rounded-full bg-white/[0.03] flex-1 overflow-hidden">
                                  <motion.div
                                    className="h-full bg-white/[0.15]"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.random() * 40 + 30}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 1.4 + (i * 0.1), ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Overlay Glow */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 70%)" }}
                          />
                        </motion.div>
                      </div>

                      {/* Decorative floating blurred orb */}
                      <motion.div
                        animate={{
                          x: [0, 20, -10, 0],
                          y: [0, -15, 10, 0],
                          scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-8 right-8 w-32 h-32 bg-blue-400/[0.03] blur-2xl rounded-full pointer-events-none"
                      />
                    </div>

                    <div className="px-8 py-6 flex items-center justify-between">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                            className="w-1 h-1 rounded-full bg-white/40"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] tracking-widest text-white/20 font-mono uppercase">REDDOT_SEM_PROX_V.1.0</span>
                    </div>
                  </BentoCard>
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </ThreeDParallax>
    </section>
  )
}

export default Products
