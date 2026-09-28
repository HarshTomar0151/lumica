import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  Crown,
  Zap,
  ArrowLeft,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { 
    loginUser, 
    setAuthScreen, 
    setIsForgotModalOpen, 
    showToast,
    triggerConfetti
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const userEmail = email.trim() || 'harsh@lumina.luxury';
      // Automatically detect if creator or admin or patron
      const detectedRole = userEmail.includes('creator') ? 'creator' : (userEmail.includes('admin') ? 'admin' : 'subscriber');
      loginUser(userEmail, detectedRole);
      triggerConfetti();
      showToast(`Welcome back to Lumina!`, '✨');
    }, 500);
  };

  const handleQuickDemoLogin = (demoRole) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (demoRole === 'creator') {
        loginUser('creator@lumina.luxury', 'creator');
        showToast('Logged in as Elena Rostova (Creator PRO)', '⚡');
      } else if (demoRole === 'admin') {
        loginUser('admin@lumina.luxury', 'admin');
        showToast('Logged in as Platform Admin (Treasury)', '🛡️');
      } else {
        loginUser('harsh@lumina.luxury', 'subscriber');
        showToast('Logged in as Harsh S. (Patron VIP)', '✨');
      }
    }, 500);
  };

  const handleBiometricAuth = () => {
    setIsProcessing(true);
    showToast('Scanning Face ID / Touch ID...', '🔐');
    setTimeout(() => {
      setIsProcessing(false);
      loginUser('harsh@lumina.luxury', 'subscriber');
      showToast('Biometric Access Granted!', '💎');
    }, 900);
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
            Member Access
          </span>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setAuthScreen('signup')}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 text-xs font-bold text-[#FFB15C] hover:bg-white/10 transition-all shadow-sm"
          >
            Register
          </motion.button>
        </div>

        {/* Brand Monogram & Title */}
        <div className="text-center mb-6 mt-1">
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
            Welcome to <span className="gold-gradient-text font-serif italic text-[26px]">Lumina</span>
          </h1>
          <p className="text-xs text-[#A8A19A] mt-1 font-medium">
            Sign in to access your subscriptions and vault drops
          </p>
        </div>

        {/* Pure & Clean Login Form (No Role Switcher Clutter) */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email Input */}
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
                placeholder="name@lumina.luxury"
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#0E0A07]/90 backdrop-blur-xl border border-white/12 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] focus:shadow-[0_0_15px_rgba(255,154,61,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-1">
              <label className="text-[11px] font-semibold text-[#C5BFB8]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[11px] text-[#FFB15C] hover:text-[#FFD4A3] font-bold transition-colors"
              >
                Forgot Password?
              </button>
            </div>
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

          {/* Remember Me Toggle */}
          <div className="flex items-center justify-between text-xs text-[#8E867E] px-1 pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-[#FF9A3D] w-3.5 h-3.5"
              />
              <span className="text-[#C5BFB8] font-medium text-[11px]">Remember this device</span>
            </label>
          </div>

          {/* Primary Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isProcessing}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#FFE0B2] via-[#FF9A3D] to-[#E87524] text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(255,154,61,0.3)] hover:brightness-105 transition-all mt-3 group"
          >
            {isProcessing ? (
              <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <>
                <span className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
                  Sign In to Lumina
                </span>
                <ArrowRight size={16} strokeWidth={3} className="text-black group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        {/* Biometrics Face ID Button */}
        <div className="mt-3.5">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleBiometricAuth}
            className="w-full h-12 rounded-2xl bg-[#0E0A07]/70 backdrop-blur-xl border border-white/10 hover:border-[#FF9A3D]/40 text-xs font-bold text-white flex items-center justify-center gap-2.5 transition-all shadow-md group"
          >
            <div className="w-7 h-7 rounded-xl bg-[#FF9A3D]/15 text-[#FFB15C] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Fingerprint size={16} />
            </div>
            <span>Sign in with Face ID / Touch ID</span>
          </motion.button>
        </div>

        {/* 1-Tap Quick Demo Logins Section */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.08]">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Zap size={12} className="text-[#FF9A3D]" />
            <span className="text-[10px] text-[#A8A19A] font-mono uppercase tracking-wider font-semibold">
              ⚡ Quick Demo 1-Tap Logins
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleQuickDemoLogin('subscriber')}
              className="py-2 px-2 rounded-xl bg-gradient-to-b from-[#1E140C] to-[#0E0A07] border border-[#FF9A3D]/30 hover:border-[#FF9A3D] text-[10px] font-bold text-[#FFD4A3] flex flex-col items-center justify-center shadow-md transition-all"
            >
              <Crown size={13} className="text-[#FF9A3D] mb-0.5" />
              <span>Patron VIP</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleQuickDemoLogin('creator')}
              className="py-2 px-2 rounded-xl bg-gradient-to-b from-[#0C1A12] to-[#070E0A] border border-emerald-500/30 hover:border-emerald-400 text-[10px] font-bold text-emerald-300 flex flex-col items-center justify-center shadow-md transition-all"
            >
              <Zap size={13} className="text-emerald-400 mb-0.5" />
              <span>Creator PRO</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-2 px-2 rounded-xl bg-gradient-to-b from-[#1C0F12] to-[#0E0708] border border-rose-500/30 hover:border-rose-400 text-[10px] font-bold text-rose-300 flex flex-col items-center justify-center shadow-md transition-all"
            >
              <Shield size={13} className="text-rose-400 mb-0.5" />
              <span>Admin</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Switch to Register */}
      <div className="text-center pt-3 text-xs text-[#8E867E]">
        Don't have an account?{' '}
        <button
          onClick={() => setAuthScreen('signup')}
          className="text-[#FFB15C] font-bold hover:text-[#FFD4A3] underline ml-1 transition-colors"
        >
          Create Lumina Account
        </button>
      </div>
    </div>
  );
}
