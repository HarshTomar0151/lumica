import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, KeyRound, ShieldCheck, Check, ArrowRight, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ForgotPasswordModal() {
  const { isForgotModalOpen, setIsForgotModalOpen, showToast, triggerConfetti } = useApp();
  
  // Step: 1 = Email Input, 2 = OTP Code Verification, 3 = Reset Password, 4 = Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const otpInputsRef = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  if (!isForgotModalOpen) return null;

  const handleSendCode = (e) => {
    e?.preventDefault();
    if (!email) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      setTimer(45);
      setIsTimerActive(true);
      showToast('6-digit security code sent to ' + email, '📧');
    }, 700);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Paste handling
      const pastedCode = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedCode.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pastedCode.length, 5);
      otpInputsRef.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance focus
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      showToast('Please enter full 6-digit code', '⚠️');
      return;
    }
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      showToast('Code verified! Set your new password.', '🔓');
    }, 700);
  };

  const handleResendCode = () => {
    if (timer > 0) return;
    setTimer(45);
    setIsTimerActive(true);
    showToast('New security code dispatched!', '✨');
  };

  const handleResetPassword = (e) => {
    e?.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      showToast('Password must be at least 8 characters', '⚠️');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', '⚠️');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      triggerConfetti();
      showToast('Password updated successfully!', '🎉');
    }, 800);
  };

  const handleClose = () => {
    setIsForgotModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setEmail('');
      setOtp(['', '', '', '', '', '']);
      setNewPassword('');
      setConfirmPassword('');
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center pointer-events-auto p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] sm:rounded-[36px] bg-gradient-to-b from-[#18110B] via-[#0E0A07] to-[#070503] border border-[#FF9A3D]/35 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(255,154,61,0.2)] p-6 text-white overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF9A3D]/15 blur-3xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFB15C]/20 to-[#E87524]/20 border border-[#FF9A3D]/40 flex items-center justify-center text-[#FFB15C] mb-4 shadow-lg shadow-[#FF9A3D]/10">
                <KeyRound size={22} />
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB15C] font-bold">
                  Security Recovery
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5 font-sans">
                  Forgot Password?
                </h2>
                <p className="text-xs text-[#A8A19A] mt-1 leading-relaxed">
                  Enter your registered Lumina email address to receive a secure 6-digit verification PIN.
                </p>
              </div>

              <form onSubmit={handleSendCode} noValidate className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium text-[#C5BFB8] block mb-1.5">
                    Account Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#FFB15C]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. patron@lumina.luxury"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing || !email}
                  className="w-full py-3.5 rounded-xl amber-gradient-btn text-black font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FF9A3D]/25 disabled:opacity-50 transition-all"
                >
                  {isProcessing ? (
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 2: Enter 6-Digit OTP */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFB15C]/20 to-[#E87524]/20 border border-[#FF9A3D]/40 flex items-center justify-center text-[#FFB15C] mb-4 shadow-lg shadow-[#FF9A3D]/10">
                <ShieldCheck size={24} />
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB15C] font-bold">
                  Step 2 of 3
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5 font-sans">
                  Enter 6-Digit Code
                </h2>
                <p className="text-xs text-[#A8A19A] mt-1">
                  We sent a code to <strong className="text-white">{email}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                {/* 6 OTP Input Boxes */}
                <div className="flex justify-between gap-1.5">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputsRef.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-11 h-13 text-center text-lg font-mono font-bold text-white bg-white/[0.05] border border-white/20 rounded-xl focus:outline-none focus:border-[#FF9A3D] focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(255,154,61,0.4)] transition-all"
                    />
                  ))}
                </div>

                {/* Resend Timer */}
                <div className="flex items-center justify-between text-xs text-[#8E867E]">
                  <span>Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={timer > 0}
                    className={`font-semibold flex items-center gap-1 ${
                      timer > 0
                        ? 'text-[#77716B] cursor-not-allowed'
                        : 'text-[#FFB15C] hover:underline'
                    }`}
                  >
                    <RefreshCw size={12} className={timer > 0 ? '' : 'animate-spin-slow'} />
                    <span>{timer > 0 ? `Resend (${timer}s)` : 'Resend Code'}</span>
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing || otp.join('').length < 6}
                  className="w-full py-3.5 rounded-xl amber-gradient-btn text-black font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FF9A3D]/25 disabled:opacity-50 transition-all"
                >
                  {isProcessing ? (
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Verify Code</span>
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Set New Password */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFB15C]/20 to-[#E87524]/20 border border-[#FF9A3D]/40 flex items-center justify-center text-[#FFB15C] mb-4 shadow-lg shadow-[#FF9A3D]/10">
                <Lock size={22} />
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB15C] font-bold">
                  Step 3 of 3
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5 font-sans">
                  Set New Password
                </h2>
                <p className="text-xs text-[#A8A19A] mt-1">
                  Create a strong passphrase to protect your patron vault and subscriptions.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-medium text-[#C5BFB8] block mb-1">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#FFB15C]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 text-[#8E867E] hover:text-white"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#C5BFB8] block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#FFB15C]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing || !newPassword || !confirmPassword}
                  className="w-full py-3.5 rounded-xl amber-gradient-btn text-black font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FF9A3D]/25 disabled:opacity-50 transition-all mt-2"
                >
                  {isProcessing ? (
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Save & Complete Recovery</span>
                      <Check size={15} strokeWidth={3} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Success Screen */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-3.5 shadow-xl shadow-emerald-500/20">
                <Check size={32} strokeWidth={3} />
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight mb-1 font-sans">
                Password Reset Successfully!
              </h2>
              <p className="text-xs text-[#A8A19A] max-w-[260px] mx-auto mb-6 leading-relaxed">
                Your credentials have been securely updated. You can now log into your Lumina account.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full py-3.5 rounded-xl amber-gradient-btn text-black font-bold text-xs tracking-wide shadow-lg shadow-[#FF9A3D]/25"
              >
                Sign In Now
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
