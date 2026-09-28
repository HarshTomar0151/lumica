import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, ShieldCheck, Zap, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SubscriptionSheet() {
  const { isSubscribeModalOpen, closeSubscribeSheet, subscribeTarget, handleSubscribe } = useApp();
  const [selectedTier, setSelectedTier] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSubscribeModalOpen || !subscribeTarget) return null;

  const tiers = subscribeTarget.tiers || [
    {
      id: 'standard',
      name: 'Standard Access',
      price: subscribeTarget.monthlyPrice || 9.99,
      benefits: [
        'Exclusive 4K posts & editorial drops',
        'Subscriber-only story access & BTS',
        'Direct priority messaging',
        'Raw master downloads & vault access'
      ]
    },
    {
      id: 'vip',
      name: 'Inner Circle VIP',
      price: subscribeTarget.vipPrice || 29.99,
      badge: 'Best Value',
      benefits: [
        'All Standard Tier benefits',
        'Direct 1-on-1 monthly video review',
        'VIP WhatsApp community access',
        'Personalized shoutouts in drop credits'
      ]
    }
  ];

  const activeTierObj = tiers.find(t => t.id === selectedTier) || tiers[0];

  const onConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleSubscribe(subscribeTarget, activeTierObj.name, activeTierObj.price);
        setIsSuccess(false);
      }, 1500);
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
          onClick={closeSubscribeSheet}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Bottom Sheet Modal */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[88vh] flex flex-col"
        >
          {/* Top Notch Indicator */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          {/* Close Button */}
          <button
            onClick={closeSubscribeSheet}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>

          {!isSuccess ? (
            <div className="overflow-y-auto no-scrollbar pb-6">
              {/* Creator Profile Mini Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#FFB15C] to-[#E87524] shadow-lg shadow-[#FF9A3D]/20">
                  <img
                    src={subscribeTarget.avatar}
                    alt={subscribeTarget.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-white">{subscribeTarget.name}</h3>
                    {subscribeTarget.verified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FF9A3D] text-black text-[9px] font-bold flex items-center justify-center">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-[#8E867E]">@{subscribeTarget.handle}</p>
                  <div className="text-[10px] text-[#FFB15C] font-semibold flex items-center gap-1 mt-0.5">
                    <Sparkles size={11} /> Unlock Premium Access
                  </div>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2.5 mb-4">
                {tiers.map(tier => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'bg-gradient-to-r from-[#FF9A3D]/20 to-[#E87524]/10 border-[#FF9A3D] shadow-lg shadow-[#FF9A3D]/15' 
                          : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      {tier.badge && (
                        <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFB15C] to-[#E87524] text-black text-[9px] font-bold uppercase tracking-wider shadow">
                          {tier.badge}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#FF9A3D] bg-[#FF9A3D]' : 'border-white/30'}`}>
                            {isSelected && <Check size={11} className="text-black stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold text-white">{tier.name}</span>
                        </div>
                        <span className="text-sm font-extrabold text-[#FFB15C]">${tier.price}<span className="text-[10px] font-normal text-[#B8B1AA]">/mo</span></span>
                      </div>

                      {/* Tier Benefits */}
                      <div className="space-y-1 pl-6">
                        {tier.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#C5BFB8]">
                            <Check size={11} className="text-[#FF9A3D] flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Security & Guarantees */}
              <div className="flex items-center justify-between text-[10px] text-[#8E867E] px-1 mb-4">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#FF9A3D]" />
                  256-Bit Encrypted
                </span>
                <span>Auto-renews monthly • Cancel anytime</span>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl amber-gradient-btn text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30 transition-all disabled:opacity-75"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Authorizing Apple Pay...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles size={17} />
                    <span>Subscribe • ${activeTierObj.price} / month</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            /* Success State */
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFB15C] to-[#E87524] flex items-center justify-center text-black mb-5 shadow-xl shadow-[#FF9A3D]/40"
              >
                <Check size={42} strokeWidth={3} />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-1">You’re Subscribed!</h3>
              <p className="text-xs text-[#B8B1AA] max-w-[260px] mb-6">
                All of {subscribeTarget.name}’s exclusive drops, stories, and master vaults are now unlocked.
              </p>

              <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-[#FFB15C] font-mono">
                Receipt #LUM-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
