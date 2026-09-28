import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OnboardingWalkthrough({ onFinish }) {
  const { setIsAuthModalOpen, setAuthMode } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const slides = [
    {
      id: 0,
      titlePrefix: 'Connect',
      titleSuffix: 'With Creators',
      description: 'Engage with exclusive content and build meaningful relationships.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
      alt: 'Camera gear and lenses'
    },
    {
      id: 1,
      titlePrefix: 'Unlock',
      titleSuffix: 'Private Vaults',
      description: 'Access uncompressed 4K master files, RAW lookbooks, and modular audio stems.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      alt: 'Haute couture editorial drop'
    },
    {
      id: 2,
      titlePrefix: 'Monetize',
      titleSuffix: 'Your Craft',
      description: 'Generate predictable recurring subscription revenue and direct tips with Stripe payouts.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
      alt: 'Synthesizer audio production'
    }
  ];

  const currentSlide = slides[currentStep];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-[140] bg-[#050403] flex flex-col justify-between p-6 pt-12 pb-8 text-white select-none overflow-hidden rounded-[47px]"
    >
      {/* Background Soft Golden Waves / Amber Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/luxury-bg.jpg"
          alt="Luxury background"
          className="w-full h-full object-cover opacity-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050403]/65 via-[#050403]/30 to-[#050403]/85" />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#FF9A3D]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-[#E87524]/15 rounded-full blur-[90px]" />
      </div>

      {/* Top Header with Progress Bars & Skip Button */}
      <div className="relative z-20 pt-3">
        <div className="flex items-center justify-between gap-3 mb-6">
          {/* 3 Step Progress Bars */}
          <div className="flex-1 flex items-center gap-2 h-[3px]">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className="flex-1 h-full rounded-full overflow-hidden bg-white/15"
              >
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    idx <= currentStep
                      ? 'bg-gradient-to-r from-[#FFD4A3] to-[#FF9A3D] shadow-[0_0_8px_#FF9A3D]'
                      : 'bg-transparent'
                  }`}
                  style={{ width: idx <= currentStep ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>

          {/* Skip Button (Golden Italic Serif) */}
          <button
            onClick={handleSkip}
            className="text-sm italic font-serif text-[#FFB15C] hover:text-[#FFD4A3] transition-colors pr-1 focus:outline-none"
          >
            Skip
          </button>
        </div>

        {/* Title & Description with Amber Vertical Accent */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mb-4"
          >
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex flex-wrap items-baseline gap-2 mb-2.5">
              <span>{currentSlide.titlePrefix}</span>
              <span className="italic font-serif gold-gradient-text text-[26px]">
                {currentSlide.titleSuffix}
              </span>
            </h1>

            <div className="flex items-start gap-2.5">
              {/* Amber Vertical Accent Bar */}
              <div className="w-[2px] h-9 bg-gradient-to-b from-[#FFB15C] to-[#E87524] rounded-full flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#A8A19A] leading-relaxed max-w-[280px] font-sans">
                {currentSlide.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center Image Card (Exact Match to Design Reference with Luxury Sheen) */}
      <div className="relative z-20 flex-1 flex items-center justify-center my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -15 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            className="w-full max-h-[380px] aspect-[4/5] rounded-[32px] p-[1.5px] bg-gradient-to-b from-[#FFB15C]/40 via-white/10 to-[#E87524]/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,154,61,0.2)] relative"
          >
            <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#0A0705] relative">
              <img
                src={currentSlide.image}
                alt={currentSlide.alt}
                className="w-full h-full object-cover brightness-95"
              />
              {/* Subtle dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
              {/* Top light reflection */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="relative z-20 pt-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full h-14 rounded-full bg-gradient-to-b from-[#2A1D13] via-[#1A120B] to-[#0E0A07] border border-[#FF9A3D]/70 shadow-[0_12px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(255,154,61,0.3)] text-[#FFD4A3] hover:text-white font-bold text-sm tracking-wide flex items-center justify-center transition-all group"
        >
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{currentStep === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight size={18} className="ml-1 text-[#FF9A3D] group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}
