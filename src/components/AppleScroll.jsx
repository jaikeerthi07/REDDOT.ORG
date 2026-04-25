import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FRAME_COUNT = 192;
const IMAGE_PATH = "/frames/";

function getFramePath(index) {
  const paddedIndex = index.toString().padStart(5, "0");
  return `${IMAGE_PATH}${paddedIndex}.jpg`;
}

export const AppleScroll = ({ onLoaded }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      let loadedCount = 0;

      const handleImageLoad = () => {
        loadedCount++;
        const progress = Math.floor((loadedCount / FRAME_COUNT) * 100);
        setLoadingProgress(progress);
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
          if (onLoaded) onLoaded();
        }
      };

      const handleImageError = (index) => {
        console.warn(`Failed to load frame: ${getFramePath(index)}`);
        handleImageLoad(); // Skip and continue
      };

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.onload = handleImageLoad;
        img.onerror = () => handleImageError(i);
        img.src = getFramePath(i);
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, [onLoaded]);

  // ── Scroll Progress ─────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // ── Smooth Rendering ────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const render = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!context || !canvas) return;

      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame];
      
      if (img && img.complete) {
        // Clear and draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Center contain logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const unsubscribe = frameIndex.on("change", render);
    render(); // Initial render

    return () => unsubscribe();
  }, [isLoaded, images, frameIndex]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#F5F4F0] z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {!isLoaded && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F5F4F0] z-[100]">
            <div className="w-48 h-1 bg-black/5 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-[10px] font-mono tracking-widest text-black/40 uppercase">Preloading Sequence {loadingProgress}%</p>
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.05) brightness(1.02)" }}
        />
        
        {/* Floating Text Overlays */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-[11px] tracking-[0.4em] text-black/30 uppercase mb-4 font-mono">The Future of Interaction</span>
            <h2 className="text-4xl md:text-7xl font-light text-[#111] max-w-4xl tracking-tight leading-[1.1]">
              Engineering Excellence through <br /><span className="text-black font-medium italic">Autonomous Intelligence.</span>
            </h2>
          </motion.div>

          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [20, 0, 0, -20])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-[11px] tracking-[0.4em] text-black/30 uppercase mb-4 font-mono">Global Capabilities</span>
            <h2 className="text-4xl md:text-7xl font-light text-[#111] max-w-4xl tracking-tight leading-[1.1]">
              Scalable systems designed <br />for <span className="text-black font-medium italic">Global Impact.</span>
            </h2>
          </motion.div>

          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [20, 0, 0, -20])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-[11px] tracking-[0.4em] text-black/30 uppercase mb-4 font-mono">Hardware & Software</span>
            <h2 className="text-4xl md:text-7xl font-light text-[#111] max-w-4xl tracking-tight leading-[1.1]">
              Bridging the gap between <br /><span className="text-black font-medium italic">atoms and bits.</span>
            </h2>
          </motion.div>

          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]),
              scale: useTransform(scrollYProgress, [0.85, 0.9], [0.95, 1])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-[11px] tracking-[0.4em] text-black/30 uppercase mb-4 font-mono">RedDot Innovative Solutions</span>
            <h2 className="text-4xl md:text-7xl font-light text-[#111] max-w-5xl tracking-tight leading-[1.1]">
              Building what's <br /><span className="text-black font-medium italic">Next.</span>
            </h2>
          </motion.div>
        </div>

        {/* Scroll Progress Indicator (Internal) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
           <div className="w-32 h-[1px] bg-black/10 relative overflow-hidden">
             <motion.div 
               style={{ scaleX: scrollYProgress }} 
               className="absolute inset-0 bg-black origin-left"
             />
           </div>
           <span className="text-[9px] font-mono tracking-widest text-black/40 uppercase">Sequence Progress</span>
        </div>
      </div>
    </div>
  );
};

export default AppleScroll;
