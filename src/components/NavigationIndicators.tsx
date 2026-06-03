import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SectionData } from '../types';

interface NavigationIndicatorsProps {
  sections: SectionData[];
}

export default function NavigationIndicators({ sections }: NavigationIndicatorsProps) {
  const [activeSectionId, setActiveSectionId] = useState<number>(1);

  useEffect(() => {
    const sectionIds = sections.map(s => s.sectionId);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) {
            setActiveSectionId(index + 1);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (idName: string) => {
    const el = document.getElementById(idName);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-5 items-end">
      {sections.map((section, idx) => {
        const isActive = activeSectionId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.sectionId)}
            className="group flex items-center gap-3 cursor-pointer outline-none select-none text-right"
          >
            <span
              className={`text-[9px] font-mono tracking-[0.25em] uppercase transition-all duration-300 transform ${
                isActive 
                  ? 'opacity-100 text-white translate-x-0' 
                  : 'opacity-0 text-zinc-500 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              CH {idx + 1} // {section.title.split(' ')[0]}
            </span>

            <div className="relative w-5 h-5 flex items-center justify-center">
              {isActive && (
                <motion.div
                  layoutId="activeIndicatorHalo"
                  className="absolute inset-0 rounded-full border border-white/40"
                  transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                />
              )}
              <div
                className={`w-[4px] h-[4px] rounded-full transition-all duration-300 ${
                  isActive ? 'bg-white scale-150' : 'bg-zinc-600 group-hover:bg-zinc-300 scale-100'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
