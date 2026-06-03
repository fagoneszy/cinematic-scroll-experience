import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gainNodeRef.current = gain;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      // Gentle fade in
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3.0);

      const filter = ctx.createBiquadFilter();
      filterNodeRef.current = filter;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      // Deep cinematic drone notes (D1, A1, D2 with slight detunings)
      const frequencies = [73.42, 110.00, 146.83];
      
      const oscs = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle'; // Soft organic warm tone
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        // Add lush detune chorus effect
        osc.detune.setValueAtTime((i % 2 === 0 ? 5 : -5) * (Math.random() + 0.5), ctx.currentTime);
        
        osc.connect(filter);
        osc.start();
        return osc;
      });
      oscillatorsRef.current = oscs;

      filter.connect(gain);
      gain.connect(ctx.destination);

      // Dynamic sweep loop matching standard slow breathing
      let direction = true;
      intervalRef.current = setInterval(() => {
        if (!filterNodeRef.current || !audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const targetFreq = direction ? 380 : 200;
        filterNodeRef.current.frequency.exponentialRampToValueAtTime(targetFreq, now + 8.5);
        direction = !direction;
      }, 10000);

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio API not supported or barred in this domain.", e);
    }
  };

  const stopSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    
    if (ctx && gain) {
      // Elegant fade out
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch(e){}
        });
        oscillatorsRef.current = [];
        try { ctx.close(); } catch(e){}
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  // Safe fallback to close audio context on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
    };
  }, []);

  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 font-mono text-[10px] tracking-[0.2em] text-zinc-400">
      <span className="opacity-60 hidden sm:inline">AMBIENT SOUNDSCAPE:</span>
      
      {/* Animated waves while sound generates */}
      {isPlaying && (
        <div className="flex gap-0.5 items-end h-3 w-4">
          <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-white" />
          <motion.div animate={{ height: [8, 4, 8] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-white/75" />
          <motion.div animate={{ height: [3, 10, 3] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-white/50" />
        </div>
      )}

      <button
        onClick={toggleSound}
        className="flex items-center gap-2 text-zinc-300 hover:text-white transition-all cursor-pointer outline-none focus:ring-1 focus:ring-white/30 px-1 py-0.5 rounded"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-white">ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500">MUTED</span>
          </>
        )}
      </button>
    </div>
  );
}
