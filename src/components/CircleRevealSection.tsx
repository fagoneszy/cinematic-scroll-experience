import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionData } from '../types';
import { ChevronRight } from 'lucide-react';

interface CircleRevealSectionProps {
  data: SectionData;
}

export default function CircleRevealSection({ data }: CircleRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipRadius = useTransform(scrollYProgress, [0, 0.6], [0, 100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const contentY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [50, 0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      id={data.sectionId}
      className="relative h-screen w-full overflow-hidden bg-black font-sans select-none flex items-center justify-center"
    >
      {/* Background Image with Circle Reveal clip-path */}
      <motion.div
        style={{
          scale: backgroundScale,
          clipPath: useTransform(clipRadius, (r) => `circle(${r}% at 50% 50%`),
          willChange: 'transform, clip-path',
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]" />
      </motion.div>

      {/* Full-screen dark overlay that fades out as circle expands */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-[2] pointer-events-none"
      />

      {/* Narrative Card */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-[80vh] pointer-events-none"
      >
        <div className="max-w-3xl py-12">
          <p className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase mb-3">
            {data.subtitle}
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-sans font-light tracking-tight text-white uppercase leading-[0.95]">
            {data.title}
          </h2>
          <div className="mt-8 text-zinc-300 text-sm md:text-base leading-relaxed font-light max-w-xl flex items-center gap-3 border-l border-white/10 pl-6">
            <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />
            <p className="font-sans">{data.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
