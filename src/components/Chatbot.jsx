import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react'

const SYSTEM_PROMPT = `You are Ben, a professional AI chatbot for REDDOT AI SYSTEMS.

Your role is to:
- Answer user queries about services, products, founders, and company details
- Help users explore offerings
- Assist in booking appointments
- Provide career and internship information
- Capture leads when relevant

---

COMPANY DETAILS:

Services:
- AI Agents & Automation
- Generative AI
- Machine Learning & Deep Learning
- Data Science & Analytics
- Embedded Systems & IoT
- SaaS Development
- Web & Mobile App Development

Products:
- Jarvis AI Assistant
- Universal Web Scraper Agent
- Dynamic Spectrum Allocation
- Customized LLM Systems
- Medical Emergency Wearable System
- AI Travel Planner
- Student Event Platform

Founders:
- Jaikeerthi R: Agentic AI, Generative AI, Automation
- Jagadish K: VLSI & Hardware-Software Integration

Contact:
- Email: careers@reddot.com, contact@reddot.com
- Phone: +91 98765 43210
- Location: IIT Madras Research Park, Chennai

Careers:
- AI/ML Engineer
- Full Stack Developer
- Embedded Systems Engineer
- Data Scientist
- Internships available

---

BEHAVIOR RULES:

1. Be concise, professional, and helpful
2. Suggest next steps (e.g., “Would you like to book a demo?”)
3. If user shows interest → ask for name/email
4. If booking requested → collect:
   - Name
   - Email
   - Preferred time
5. If unsure → politely ask for clarification
6. Never hallucinate unknown info

---

GOAL:
Convert users into leads, clients, or applicants while providing accurate information.`

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Ben. How can I assist you with our AI systems, careers, or booking a demo today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  const getAIResponse = async (userMsg, history) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const text = userMsg.toLowerCase()
        if (text.includes('book') || text.includes('appointment') || text.includes('demo')) {
          resolve("I'd be happy to help you book a demo or appointment! Could you please provide your Name, Email, and Preferred Time?")
        } else if (text.includes('founder') || text.includes('who started')) {
          resolve("REDDOT was founded by Jaikeerthi R (specializing in Agentic & Gen AI) and Jagadish K (VLSI & Hardware-Software Integration). Would you like to learn more about their work?")
        } else if (text.includes('career') || text.includes('job') || text.includes('internship')) {
          resolve("We have several openings for AI/ML Engineers, Full Stack Developers, and more. We also offer internships! You can reach us at careers@reddot.com. Would you like to share your email so we can reach out?")
        } else if (text.includes('product') || text.includes('jarvis')) {
          resolve("Our products include Jarvis AI Assistant, Universal Web Scraper, and AI Travel Planner among others. Which one interests you most?")
        } else {
          resolve("REDDOT specializes in AI Agents, Automation, and GenAI. We are located at IIT Madras Research Park. Would you like to book a demo to see our systems in action?")
        }
      }, 1000)
    })
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const responseText = await getAIResponse(input, messages)
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble processing that request. Please try again or contact us at contact@reddot.com." }])
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Ben — REDDOT Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">AI Agent Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F4F0]/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-white border border-black/[0.05] text-black/70 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-black/[0.05] p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-black/20" />
                    <span className="text-xs text-black/40">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-black/[0.05] bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about REDDOT..."
                  className="w-full bg-[#F5F4F0] border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-black/10 transition-all outline-none pr-12"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg hover:bg-black/80 disabled:opacity-30 transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black rounded-full shadow-2xl flex items-center justify-center text-white relative group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="relative z-10">
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.button>
    </div>
  )
}

export default Chatbot
