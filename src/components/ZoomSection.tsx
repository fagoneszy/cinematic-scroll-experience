import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Activity, CornerDownRight } from 'lucide-react';
import { SectionData } from '../types';

interface ZoomSectionProps {
  data: SectionData;
}

export default function ZoomSection({ data }: ZoomSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track progress of this section as it passes through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background scales continuously from 1.02 to 1.15
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.3, 0.8, 0.8, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Content transition
  const contentY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [60, 0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      id={data.sectionId}
      className="relative h-screen w-full overflow-hidden bg-black font-sans flex items-center justify-center select-none"
    >
      {/* Background Image */}
      <motion.div
        style={{
          scale: backgroundScale,
          opacity: backgroundOpacity,
          y: backgroundY,
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 w-full h-[116%] top-[-8%] pointer-events-none z-0"
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/70" />
      </motion.div>

      {/* Main Narrative - Organized in a clean premium editorial grid */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-[80vh]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
          
          {/* Main Title Col */}
          <div className="lg:col-span-7">
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 mb-3 uppercase block">
              {data.subtitle}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-light tracking-tight text-white uppercase leading-[0.95]">
              {data.title}
            </h1>
          </div>

          {/* Details & Synapsis Col */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:border-l lg:border-white/10 lg:pl-10">
            <div className="text-zinc-400 text-sm md:text-base font-light leading-relaxed font-sans">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">ATRAVESSANDO O TEMPO</span>
              </div>
              <p className="mb-4">
                Cada segundo contém uma eternidade inteira. No instante presente, todas as palavras se encontram e se desfazem para renascer.
              </p>
              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5">
                <CornerDownRight className="w-5 h-5 text-zinc-600 shrink-0 mt-1" />
                <p className="text-zinc-300 text-sm font-light">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
