import React, { useState } from "react"

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Products", href: "#products" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
]

const NAV_STYLE = {
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  background: "rgba(245,244,240,0.6)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.02)",
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="fixed top-4 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl">
        <nav className="flex items-center justify-between px-6 py-3 rounded-2xl border border-black/[0.04]" style={NAV_STYLE}>
          <div className="flex items-center gap-3">
             <img src="/reddot logo.png" alt="REDDOT" className="h-10 object-contain mix-blend-multiply" />
             <span className="font-pixel text-[12px] tracking-[0.3em] text-black/60 uppercase">REDDOT</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-[11px] font-medium text-black/50 hover:text-black transition-colors duration-200 tracking-widest uppercase">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="text-[10px] font-bold px-5 py-2.5 rounded-xl bg-black text-white hover:bg-black/80 transition-all duration-200 tracking-widest uppercase hidden sm:block" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>Get Started</a>
            <button onClick={() => setOpen(v => !v)} className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-xl hover:bg-black/[0.03] transition-colors" aria-label={open ? "Close menu" : "Open menu"}>
              <span className="block h-px bg-black/70 transition-all duration-300 origin-center" style={{ width: "20px", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
              <span className="block h-px bg-black/70 transition-all duration-300" style={{ width: "20px", opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
              <span className="block h-px bg-black/70 transition-all duration-300 origin-center" style={{ width: "20px", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>

        <div className="lg:hidden mt-2 overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: open ? "450px" : "0px", opacity: open ? 1 : 0 }}>
          <div className="rounded-2xl border border-black/[0.04] px-3 py-3 flex flex-col gap-1" style={NAV_STYLE}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={close} className="px-5 py-3.5 text-xs font-bold text-black/50 hover:text-black hover:bg-black/[0.03] rounded-xl transition-all tracking-widest uppercase" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>{l.label}</a>
            ))}
            <div className="mt-2 px-3 pb-2">
              <a href="#contact" onClick={close} className="w-full text-[10px] font-bold px-5 py-3.5 rounded-xl bg-black text-white hover:bg-black/80 transition-all duration-200 tracking-widest uppercase flex justify-center" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
