import { useScroll, useSpring, motion } from 'motion/react';
import { SECTIONS_DATA } from './data';
import { SPRING_CONFIG_GLOBAL } from './constants';
import HeroSection from './components/HeroSection';
import CircleRevealSection from './components/CircleRevealSection';
import ParallaxSection from './components/ParallaxSection';
import ZoomSection from './components/ZoomSection';
import FinalSection from './components/FinalSection';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  // Track global scroll progression
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING_CONFIG_GLOBAL);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/10 selection:text-white">
      
      {/* 1. Global Slim Scrolling Indicator Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50 pointer-events-none"
      />

      {/* 2. Premium Fixed Header Bar (Mix blend difference so it reads beautifully on light backgrounds too!) */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 flex justify-between items-center pointer-events-none select-none">
        
        {/* Typographic Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 border border-white flex items-center justify-center">
            <span className="font-mono text-xs font-semibold leading-none">A</span>
            <span className="absolute bottom-[-1px] right-[-1px] w-[3px] h-[3px] bg-white" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-[0.4em] uppercase text-white font-sans">
            AETHERIS
          </span>
        </div>

      </header>

      <ErrorBoundary>
      {/* 5. The Cinematic Timeline Sections */}
      <main className="w-full">
        {/* Section 1: Hero Scene (Parallax intro, starts from full darkness) */}
        <HeroSection data={SECTIONS_DATA[0]} />

        {/* Section 2: Circle Expansion Transition reveal */}
        <CircleRevealSection data={SECTIONS_DATA[1]} />

        {/* Section 3: Classical Parallax offset scene */}
        <ParallaxSection data={SECTIONS_DATA[2]} />

        {/* Section 4: Fluid tunnel scale progression scene */}
        <ZoomSection data={SECTIONS_DATA[3]} />

        {/* Section 5: Endless quiet Ocean & Footer reveal */}
        <FinalSection data={SECTIONS_DATA[4]} />
      </main>
      </ErrorBoundary>

    </div>
  );
}
