import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Check, Building, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WithdrawalSheet() {
  const { isWithdrawModalOpen, setIsWithdrawModalOpen, handleRequestPayout, analytics } = useApp();
  const [amount, setAmount] = useState('4500');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isWithdrawModalOpen) return null;

  const availableBalance = 8420.50;
  const numAmount = parseFloat(amount) || 0;
  const fee = 0; // 0% on Lumina VIP
  const creatorReceives = Math.max(0, numAmount - fee);

  const onConfirm = () => {
    if (numAmount <= 0 || numAmount > availableBalance) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleRequestPayout(numAmount);
        setIsSuccess(false);
      }, 1400);
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
          onClick={() => setIsWithdrawModalOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[88vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <button
            onClick={() => setIsWithdrawModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>

          {!isSuccess ? (
            <div className="overflow-y-auto no-scrollbar pb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#FF9A3D]/20 border border-[#FF9A3D]/30 flex items-center justify-center text-[#FFB15C]">
                  <ArrowUpRight size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Withdraw Funds</h3>
                  <p className="text-xs text-[#8E867E]">Instant transfer to verified bank</p>
                </div>
              </div>

              {/* Available Balance Display */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-4">
                <span className="text-[11px] text-[#A8A19A] block mb-1">Available for instant withdrawal</span>
                <div className="text-2xl font-extrabold text-white">
                  ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-[#EBE6DF]">Withdrawal Amount</label>
                  <button
                    onClick={() => setAmount(availableBalance.toString())}
                    className="text-[11px] text-[#FFB15C] font-semibold hover:underline"
                  >
                    Max Amount
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#FF9A3D] font-bold text-base">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 rounded-xl bg-white/[0.04] border border-white/15 text-sm font-bold text-white focus:outline-none focus:border-[#FF9A3D]/60"
                  />
                </div>
              </div>

              {/* Payout Destination */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Building size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Chase Private Client</span>
                    <span className="text-[10px] text-[#8E867E]">Checking account ••4821 (Stripe Connect)</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                  Active
                </span>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-1.5 p-3 rounded-xl bg-black/40 border border-white/[0.05] text-xs text-[#A8A19A] mb-5">
                <div className="flex justify-between">
                  <span>Gross Payout</span>
                  <span className="text-white font-mono">${numAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (0% Creator VIP)</span>
                  <span className="text-emerald-400 font-mono">-$0.00</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-white/10 text-white font-bold">
                  <span>Estimated Net Deposit</span>
                  <span className="text-[#FFB15C] font-mono">${creatorReceives.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                disabled={isProcessing || numAmount <= 0 || numAmount > availableBalance}
                className="w-full py-4 rounded-2xl amber-gradient-btn text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Initiating Stripe Transfer...</span>
                  </div>
                ) : (
                  <>
                    <Zap size={16} fill="black" />
                    <span>Request Payout of ${numAmount.toFixed(2)}</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFB15C] to-[#E87524] flex items-center justify-center text-black mb-5 shadow-xl shadow-[#FF9A3D]/40"
              >
                <Check size={42} strokeWidth={3} />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-1">Transfer Initiated!</h3>
              <p className="text-xs text-[#B8B1AA] max-w-[260px] mb-4">
                ${numAmount.toFixed(2)} is en route to Chase Private Client (••4821). Funds will arrive in 30 minutes.
              </p>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-[#FFB15C] font-mono">
                Stripe Payout Ref #STR-9821-X
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
