import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Check, Heart, Sparkles, Send, ShieldCheck, Coins } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TipSheet() {
  const { isTipModalOpen, closeTipSheet, tipTarget, handleSendTip, triggerConfetti } = useApp();
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isTipModalOpen || !tipTarget) return null;

  const creator = tipTarget.creator;
  const presets = [5, 15, 25, 50, 100];

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
  const adminCommission = (finalAmount * 0.085).toFixed(2);
  const creatorTakehome = (finalAmount - parseFloat(adminCommission)).toFixed(2);

  const onConfirm = () => {
    if (!finalAmount || finalAmount <= 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      triggerConfetti();
      setTimeout(() => {
        handleSendTip(finalAmount, note);
        setIsSuccess(false);
      }, 1600);
    }, 850);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-end justify-center pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeTipSheet}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-gradient-to-b from-[#18110B] via-[#0E0A07] to-[#070503] border-t border-x border-[#FF9A3D]/35 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(255,154,61,0.2)] p-6 pt-3 text-white overflow-hidden max-h-[88vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <button
            onClick={closeTipSheet}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={17} />
          </button>

          {!isSuccess ? (
            <div className="overflow-y-auto no-scrollbar pb-5">
              {/* Creator Target Header */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-xl shadow-[#FF9A3D]/25">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FF9A3D] text-black flex items-center justify-center shadow-md">
                    <Heart size={13} fill="black" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">Send Direct Tip</h3>
                <p className="text-xs text-[#8E867E]">To <strong className="text-[#FFD4A3]">{creator.name}</strong> • Instant Stripe settlement</p>
              </div>

              {/* Amount Presets with Gold Foil Highlights */}
              <div className="grid grid-cols-5 gap-2 mb-3.5">
                {presets.map(amt => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] text-black shadow-lg shadow-[#FF9A3D]/30 font-extrabold scale-105'
                          : 'bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      ${amt}
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-3">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 z-10 text-[#FFB15C] font-bold text-sm">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Or enter custom amount (e.g. 75)"
                    className="w-full h-12 pl-8 pr-4 rounded-2xl bg-[#0E0A07]/90 backdrop-blur-xl border border-white/12 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] focus:shadow-[0_0_15px_rgba(255,154,61,0.2)] transition-all"
                  />
                </div>
              </div>

              {/* Client Spec: 8.5% Platform Admin Commission Breakdown */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] mb-4 text-[11px] text-[#A8A19A] flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold">Creator Receives (91.5%):</span>
                  <span className="text-emerald-400 font-mono font-bold ml-1.5">${creatorTakehome}</span>
                </div>
                <div className="text-[10px] text-[#77716B]">
                  Platform Fee (8.5%): <span className="text-[#FFB15C] font-mono">${adminCommission}</span>
                </div>
              </div>

              {/* Note / Message */}
              <div className="mb-4">
                <label className="text-[11px] text-[#C5BFB8] block mb-1 font-semibold px-1">
                  Add a Patron Note (optional)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Loved your latest masterclass breakdown! Keep creating..."
                  className="w-full p-3 rounded-2xl bg-[#0E0A07]/90 backdrop-blur-xl border border-white/12 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D] resize-none"
                />
              </div>

              {/* Primary Tip CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                disabled={isProcessing || !finalAmount}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#FFE0B2] via-[#FF9A3D] to-[#E87524] text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(255,154,61,0.35)] transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Processing Tip...</span>
                  </div>
                ) : (
                  <>
                    <Coins size={18} className="text-black" />
                    <span>Send ${finalAmount || 0} Direct Tip</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            /* Deluxe Success State with Floating Particles */
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFE0B2] via-[#FF9A3D] to-[#E87524] flex items-center justify-center text-black mb-4 shadow-2xl shadow-[#FF9A3D]/50"
              >
                <Check size={42} strokeWidth={3.5} />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-1 font-sans">Tip Transferred!</h3>
              <p className="text-xs text-[#B8B1AA] max-w-[260px] mb-4 leading-relaxed">
                Your <strong className="text-emerald-400">${finalAmount}</strong> contribution has been deposited to {creator.name}’s Stripe Wallet.
              </p>

              {note && (
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-[#FFD4A3] italic max-w-[280px]">
                  "{note}"
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
