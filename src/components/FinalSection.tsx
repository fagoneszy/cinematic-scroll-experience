import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp, Award, RefreshCw } from 'lucide-react';
import { SectionData } from '../types';

interface FinalSectionProps {
  data: SectionData;
}

export default function FinalSection({ data }: FinalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track progress of this closing section as it enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Background remains beautifully visible
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 0.7]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.10]);

  // Fade and translate for closing statement
  const textY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);

  // Fade and translate for the credit footer
  const footerOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0.5, 1]);
  const footerY = useTransform(scrollYProgress, [0.3, 0.8], [30, 0]);

  const handleRestart = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      ref={containerRef}
      id={data.sectionId}
      className="relative min-h-screen w-full bg-zinc-950 font-sans text-white select-none flex flex-col justify-between"
    >
      {/* Background Image (Absolute, covers container) */}
      <motion.div
        style={{
          opacity: backgroundOpacity,
          scale: backgroundScale,
          willChange: 'transform, opacity',
         }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/75" />
      </motion.div>

      {/* Spacer to push text down */}
      <div className="h-20" />

      {/* Closing Focal Statement */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center pointer-events-none my-16"
      >
        <p className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase mb-4">
          {data.subtitle}
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-extralight tracking-tight text-white uppercase leading-[0.95] max-w-3xl">
          {data.title}
        </h1>
        <p className="mt-8 text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-2xl font-sans">
          {data.description}
        </p>
      </motion.div>

      {/* Breathtaking Minimalist Agency Footer (Placed at bottom of relative flow) */}
      <motion.div
        style={{
          opacity: footerOpacity,
          y: footerY,
         }}
        className="relative z-20 w-full bg-black/95 backdrop-blur-md border-t border-white/5 py-12 md:py-16 flex flex-col gap-10 mt-auto"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Directorial Brand credit */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-zinc-400" />
              <span className="font-sans font-light tracking-[0.2em] text-sm text-white uppercase">
                POESIA DO MOVIMENTO
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-xs font-sans font-light leading-relaxed">
              Fiz com preguiça, então bluh, tem erro pra caramba, entao foda-se e quer saber, é nois paé, obrigado por ter chegado até aqui, depois eu revolvo o problema do scroll.
            </p>
          </div>

          {/* Creators credits */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-600 uppercase tracking-wider text-[10px]">fi dum caderante</span>
              <span className="text-zinc-300">ALMA CONDENSADA</span>
              <span className="text-zinc-500 font-sans font-light text-[11px] mt-1">usuario perigoso</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 font-sans font-light text-[11px] mt-1">Versos for LOUD poha</span>
            </div>
          </div>

          {/* Restart Actions */}
          <div className="md:col-span-3 flex justify-start md:justify-end items-center">
            <button
              onClick={handleRestart}
              className="group flex items-center gap-3 bg-white text-black hover:bg-neutral-200 transition-colors duration-300 font-mono text-xs font-medium tracking-[0.2em] uppercase px-5 py-3 rounded pointer-events-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 transition-transform duration-700 group-hover:rotate-180" />
              <span>rever tudin</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Copyright, Time metadata, and coordinate system lines */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-zinc-600 tracking-[0.15em] gap-4">
          <div>
            © 2026 O POEMA INFINITO // TODOS OS VERSOS SÃO LIVRES.
          </div>
          <div className="flex items-center gap-4">
            <span>LAT: {data.coordinates || "00.00°"}</span>
            <span className="hidden sm:inline">|</span>
            <span>ESPAÇO POÉTICO // ∞</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
