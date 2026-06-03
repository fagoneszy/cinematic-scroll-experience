import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CornerDownRight } from 'lucide-react';
import { SectionData } from '../types';

interface HeroSectionProps {
  data: SectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for parallax and fades
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0.1]);
  
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      id={data.sectionId}
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {/* Background Image Container with Parallax & Scaling */}
      <motion.div
        style={{
          y: backgroundY,
          scale: backgroundScale,
          opacity: backgroundOpacity,
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Subtle noise/vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Intro Black Screen Reveal Overlay */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black z-30 pointer-events-none"
      />

      {/* Main Content Overlay */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-[80vh]"
      >

        {/* Dynamic Typography Centered Statement */}
        <div className="my-auto py-12">
          <div className="overflow-hidden mb-4">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs md:text-sm font-mono tracking-[0.4em] text-zinc-400 uppercase"
            >
              {data.subtitle}
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-sans font-light tracking-tight text-white uppercase leading-[0.95]"
            >
              {data.title}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="mt-8 max-w-xl flex items-start gap-4 text-zinc-400 text-sm md:text-base font-light leading-relaxed font-sans"
          >
            <CornerDownRight className="w-5 h-5 text-zinc-600 shrink-0 mt-1" />
            <p>{data.description}</p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
