import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CornerRightDown } from 'lucide-react';
import { SectionData } from '../types';

interface ParallaxSectionProps {
  data: SectionData;
}

export default function ParallaxSection({ data }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this container on screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background moves slower than standard scrolling (-15% to 15%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.05]);

  // Content moves slightly faster or upward, fading in as it enters and out as it leaves
  const contentY1 = useTransform(scrollYProgress, [0.05, 0.5, 0.95], [60, 0, -60]);
  const contentOpacity1 = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      id={data.sectionId}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {/* Slow Moving Parallax Background Image */}
      <motion.div
        style={{
          y: backgroundY,
          scale: backgroundScale,
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-[124%] top-[-12%] pointer-events-none"
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </motion.div>

      {/* Main Narrative - Fades & Translates upwards */}
      <motion.div
        style={{
          y: contentY1,
          opacity: contentOpacity1,
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-[80vh]"
      >

        {/* Narrative layout splits - extremely high-end editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
          <div className="lg:col-span-8">
            <p className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase mb-4">
              {data.subtitle}
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-sans font-light tracking-tight text-white uppercase leading-[0.95]">
              {data.title.split(' ').map((word, i) => (
                <span key={i} className="block last:font-normal font-sans">
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-12 text-zinc-400 text-sm md:text-base font-sans font-light leading-relaxed border-l border-white/10 pl-6 lg:pl-10">
            <div className="flex flex-col gap-4">
              <CornerRightDown className="w-5 h-5 text-zinc-600 mb-2" />
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
