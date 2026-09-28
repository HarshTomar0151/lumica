import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles, Check, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, loginUser, registerUser, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('subscriber'); // subscriber | creator
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isResetSent, setIsResetSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (authMode === 'login') {
        loginUser(email || 'harsh@lumina.luxury', role);
        showToast('Welcome back to Lumina!', '✨');
      } else if (authMode === 'register') {
        registerUser({ name: name || 'Harsh S.', email: email || 'harsh@lumina.luxury', role });
        showToast('Account created & verified!', '💎');
      } else if (authMode === 'forgot') {
        setIsResetSent(true);
        showToast('Password reset link dispatched!', '📧');
      }
    }, 800);
  };

  const handleGoogleAuth = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      loginUser('harsh.google@lumina.luxury', role);
      showToast('Authenticated via Google Single Sign-On', '⚡');
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[92vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>

          {/* Mode Tabs */}
          <div className="flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 mb-4 mt-2">
            <button
              onClick={() => { setAuthMode('login'); setIsResetSent(false); }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black font-bold shadow'
                  : 'text-[#8E867E] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setIsResetSent(false); }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                authMode === 'register'
                  ? 'bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black font-bold shadow'
                  : 'text-[#8E867E] hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="overflow-y-auto no-scrollbar pb-6">
            {authMode === 'forgot' ? (
              <div>
                <div className="text-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF9A3D]/20 border border-[#FF9A3D]/30 flex items-center justify-center text-[#FFB15C] mx-auto mb-2">
                    <KeyRound size={22} />
                  </div>
                  <h3 className="text-base font-bold text-white">Reset Your Password</h3>
                  <p className="text-xs text-[#8E867E]">We will send an encrypted reset token to your email</p>
                </div>

                {!isResetSent ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative flex items-center">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E867E] pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl amber-gradient-btn text-black font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      {isProcessing ? 'Sending link...' : 'Send Reset Link'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="w-full text-center text-xs text-[#8E867E] hover:text-[#FFB15C]"
                    >
                      Back to Sign In
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-[#EBE6DF]">
                    <Check size={28} className="text-emerald-400 mx-auto mb-2" />
                    <p className="font-bold text-white mb-1">Check Your Inbox</p>
                    <p className="text-[#A8A19A] mb-3">A secure password reset link has been dispatched to {email || 'your email'}.</p>
                    <button
                      onClick={() => setAuthMode('login')}
                      className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs"
                    >
                      Return to Sign In
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Role Switcher in Auth */}
                <div className="mb-4">
                  <label className="text-[11px] text-[#A8A19A] block mb-1.5 font-medium">Select Your Account Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      onClick={() => setRole('subscriber')}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        role === 'subscriber'
                          ? 'bg-[#FF9A3D]/20 border-[#FF9A3D] text-white font-bold'
                          : 'bg-white/[0.03] border-white/10 text-[#8E867E]'
                      }`}
                    >
                      <span className="text-xs block">Subscriber</span>
                      <span className="text-[9px] text-[#A8A19A]">Explore & Back</span>
                    </div>

                    <div
                      onClick={() => setRole('creator')}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        role === 'creator'
                          ? 'bg-[#FF9A3D]/20 border-[#FF9A3D] text-white font-bold'
                          : 'bg-white/[0.03] border-white/10 text-[#8E867E]'
                      }`}
                    >
                      <span className="text-xs block">Content Creator</span>
                      <span className="text-[9px] text-[#A8A19A]">Monetize & Drop</span>
                    </div>
                  </div>
                </div>

                {/* Google One-Tap */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full py-3 rounded-xl bg-white/[0.06] border border-white/15 hover:bg-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 mb-3.5 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-3 my-3 text-[10px] text-[#77716B] font-mono">
                  <div className="flex-1 h-[1px] bg-white/10" />
                  <span>OR WITH EMAIL</span>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {authMode === 'register' && (
                    <div className="relative flex items-center">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E867E] pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Legal / Stage Name"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
                      />
                    </div>
                  )}

                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E867E] pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E867E] pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (min 8 chars)"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
                    />
                  </div>

                  {authMode === 'login' ? (
                    <div className="flex items-center justify-between text-[11px] text-[#8E867E]">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded accent-[#FF9A3D]" />
                        <span>Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[#FFB15C] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-[10px] text-[#8E867E]">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 accent-[#FF9A3D]"
                      />
                      <span>
                        I accept the <strong className="text-white">Terms of Service</strong> and understand subscription billing auto-renews until cancelled.
                      </span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing || (authMode === 'register' && !agreeTerms)}
                    className="w-full py-4 rounded-2xl amber-gradient-btn text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30 transition-all disabled:opacity-50 mt-2"
                  >
                    {isProcessing ? (
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>{authMode === 'login' ? 'Enter Lumina' : 'Create Account'}</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
