import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Crown, 
  Zap, 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SignupPage() {
  const { 
    registerUser, 
    setAuthScreen, 
    showToast,
    triggerConfetti 
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      registerUser({
        name: name.trim() || 'Harshvardhan S.',
        email: email.trim() || 'harsh@lumina.luxury',
        role: 'subscriber'
      });
      triggerConfetti();
      showToast('Lumina VIP account activated!', '💎');
    }, 500);
  };

  return (
    <div className="w-full min-h-full pb-8 px-5 pt-2 text-white flex flex-col justify-between select-none">
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setAuthScreen('landing')}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/12 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all shadow-md"
            aria-label="Back"
          >
            <ArrowLeft size={17} />
          </motion.button>

          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#FFB15C] font-bold">
            New Membership
          </span>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setAuthScreen('login')}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 text-xs font-bold text-[#FFB15C] hover:bg-white/10 transition-all shadow-sm"
          >
            Sign In
          </motion.button>
        </div>

        {/* Brand Monogram & Title */}
        <div className="mb-6 text-center mt-1">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="w-16 h-16 rounded-[22px] p-[2px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] mx-auto mb-3 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(255,154,61,0.3)] flex items-center justify-center"
          >
            <div className="w-full h-full rounded-[20px] bg-[#0A0705] flex items-center justify-center font-serif text-3xl font-black text-[#FFD4A3] drop-shadow-[0_2px_8px_rgba(255,154,61,0.4)]">
              L
            </div>
          </motion.div>

          <h1 className="text-2xl font-black tracking-tight text-white font-sans">
            Join <span className="gold-gradient-text font-serif italic text-[26px]">Lumina</span>
          </h1>
          <p className="text-xs text-[#A8A19A] mt-1 font-medium">
            Create your account to unlock private 4K vaults & exclusive drops
          </p>
        </div>

        {/* Pure & Clean Signup Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-[11px] font-semibold text-[#C5BFB8] block mb-1.5 px-1">
              Full Legal / Display Name
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#FFB15C]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Harshvardhan S."
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#0E0A07]/90 backdrop-blur-xl border border-white/12 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] focus:shadow-[0_0_15px_rgba(255,154,61,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-[11px] font-semibold text-[#C5BFB8] block mb-1.5 px-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#FFB15C]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#0E0A07]/90 backdrop-blur-xl border border-white/12 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] focus:shadow-[0_0_15px_rgba(255,154,61,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-semibold text-[#C5BFB8] block mb-1.5 px-1">
              Passphrase (min 8 characters)
            </label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#FFB15C]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 pl-11 pr-11 rounded-2xl bg-[#0E0A07]/90 backdrop-blur-xl border border-white/12 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] focus:shadow-[0_0_15px_rgba(255,154,61,0.2)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 text-[#8E867E] hover:text-white p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-[10px] text-[#8E867E] pt-0.5 px-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 accent-[#FF9A3D] w-3.5 h-3.5"
            />
            <span className="text-[#A8A19A] leading-relaxed">
              I agree to Lumina's <strong className="text-white">Terms of Vault Membership</strong> and Stripe Connect billing agreements.
            </span>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isProcessing || !agreeTerms}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#FFE0B2] via-[#FF9A3D] to-[#E87524] text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(255,154,61,0.3)] hover:brightness-105 transition-all disabled:opacity-50 mt-3 group"
          >
            {isProcessing ? (
              <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <>
                <Sparkles size={16} className="text-black" />
                <span className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
                  Create Lumina Account
                </span>
                <ArrowRight size={16} strokeWidth={3} className="text-black group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Bottom Switch to Login */}
      <div className="text-center pt-3 text-xs text-[#8E867E]">
        Already a registered member?{' '}
        <button
          onClick={() => setAuthScreen('login')}
          className="text-[#FFB15C] font-bold hover:text-[#FFD4A3] underline ml-1 transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
