import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, ArrowRight, Flame, Check, Lock, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CreatorCard from '../components/CreatorCard';

export default function PublicLanding() {
  const { creators, setIsAuthModalOpen, setAuthMode, setAuthScreen, openCreatorProfile } = useApp();

  return (
    <div className="w-full min-h-full pb-20 text-white select-none">
      {/* Top Welcome Brand Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black flex items-center justify-center font-black text-sm shadow-md">
            L
          </div>
          <span className="font-extrabold text-base tracking-widest uppercase text-white font-sans">LUMINA</span>
        </div>

        <button
          onClick={() => setAuthScreen('login')}
          className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-white hover:bg-white/10"
        >
          Sign In
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-5 pt-4 pb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9A3D]/10 border border-[#FF9A3D]/30 text-[10px] font-bold text-[#FFB15C] uppercase tracking-wider mb-3">
          <Sparkles size={11} />
          The Private Subscription Network
        </div>

        <h1 className="text-2xl font-black text-white leading-tight mb-2 tracking-tight">
          Direct Access to <br />
          <span className="gold-gradient-text">World-Class Creators</span>
        </h1>

        <p className="text-xs text-[#A8A19A] max-w-[280px] mx-auto mb-5 leading-relaxed">
          Subscribe to exclusive lookbooks, 4K film masters, modular synth stems, and private macro research memos.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col gap-2.5 max-w-[280px] mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAuthScreen('signup')}
            className="w-full py-3.5 rounded-2xl amber-gradient-btn text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30"
          >
            <span>Join Lumina Network</span>
            <ArrowRight size={14} strokeWidth={3} />
          </motion.button>

          <button
            onClick={() => setAuthScreen('login')}
            className="w-full py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white hover:bg-white/[0.08]"
          >
            I Already Have an Account
          </button>
        </div>
      </div>

      {/* Trending Creators (Curiosity Generator) */}
      <div className="mb-6">
        <div className="px-5 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame size={15} className="text-[#FF9A3D]" />
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#EBE6DF]">
              Trending Creators
            </h2>
          </div>
          <span className="text-[10px] text-[#77716B]">Preview public vault</span>
        </div>

        <div className="overflow-x-auto no-scrollbar px-4 flex gap-3 pb-1">
          {creators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} variant="horizontal" />
          ))}
        </div>
      </div>

      {/* Value Proposition Glass Cards */}
      <div className="px-4 space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] px-1">
          Platform Guarantees
        </h3>

        <div className="p-3.5 rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF9A3D]/20 text-[#FFB15C] flex items-center justify-center flex-shrink-0">
            <Lock size={17} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">100% Subscriber Gated</h4>
            <p className="text-[11px] text-[#A8A19A]">High-fidelity uncompressed media only visible to patrons.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Shield size={17} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Stripe Verified Billing</h4>
            <p className="text-[11px] text-[#A8A19A]">Encrypted payments with automatic renewal and 1-tap cancel.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
