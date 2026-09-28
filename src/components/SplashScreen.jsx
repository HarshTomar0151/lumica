import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Lock, Crown } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onFinish();
          }, 350);
          return 100;
        }
        // Smooth cinematic acceleration
        const increment = prev < 60 ? 4 : (prev < 90 ? 3 : 5);
        return Math.min(100, prev + increment);
      });
    }, 38);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-[150] bg-[#050403] flex flex-col items-center justify-between p-8 text-white select-none overflow-hidden rounded-[47px]"
    >
      {/* AI Generated Ultra-Luxury Ambient Background (Richly Visible) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1.05, opacity: 0.85 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          src="/luxury-bg.jpg"
          alt="Luxury background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Cinematic Ambient Bokeh Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#FF9A3D]/30 via-[#E87524]/15 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#FFB15C]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Gold Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: 20, 
              x: (i % 3) * 100 - 80 
            }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              y: [-10, -90 - i * 15], 
              scale: [0.6, 1.2, 0.4] 
            }}
            transition={{ 
              duration: 2.5 + i * 0.4, 
              repeat: Infinity, 
              delay: i * 0.35, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD4A3] shadow-[0_0_12px_#FF9A3D]"
          />
        ))}
      </div>

      {/* Top Luxury Access Badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="pt-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#FF9A3D]/30 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(255,154,61,0.15)]"
      >
        <Crown size={12} className="text-[#FFB15C]" />
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#E8DCCF] font-semibold">
          Private Creator Network
        </span>
      </motion.div>

      {/* Center Cinematic Monogram & Typography */}
      <div className="flex flex-col items-center text-center my-auto relative z-10">
        <motion.div
          initial={{ scale: 0.65, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 180, delay: 0.15 }}
          className="relative mb-6 group"
        >
          {/* Pulsating Amber Halo Ring */}
          <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[#FF9A3D]/30 via-[#E87524]/20 to-transparent blur-xl animate-pulse-subtle" />

          {/* Premium Glass Bevel Case */}
          <div className="relative w-28 h-28 rounded-[30px] p-[2.5px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(255,154,61,0.35)] flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-b from-[#18110B] via-[#0E0A07] to-[#070503] rounded-[27px] flex items-center justify-center relative overflow-hidden border border-white/15">
              
              {/* Internal Shimmer Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

              <span className="text-4xl font-black tracking-tighter gold-foil-text font-serif drop-shadow-[0_4px_12px_rgba(255,154,61,0.5)]">
                L
              </span>
            </div>
          </div>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-3xl font-black tracking-[0.25em] font-sans uppercase text-white mb-2"
        >
          L U M I N A
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs text-[#A8A19A] max-w-[240px] leading-relaxed font-medium"
        >
          Editorial Creator Economy & High-Yield Subscription Vault
        </motion.p>
      </div>

      {/* Bottom Progress Bar & State */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="w-full max-w-[240px] pb-6 flex flex-col items-center gap-3 relative z-10"
      >
        <div className="w-full h-[3.5px] bg-white/10 rounded-full overflow-hidden p-[0.5px]">
          <div
            className="h-full bg-gradient-to-r from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] rounded-full transition-all duration-75 shadow-[0_0_10px_#FF9A3D]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[10px] text-[#77716B] font-mono tracking-wider">
          <span className="flex items-center gap-1.5 text-[#B8B1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A3D] animate-ping" />
            INITIALIZING
          </span>
          <span className="text-[#FFB15C] font-bold">{progress}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
