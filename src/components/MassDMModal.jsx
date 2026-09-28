import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Users, Sparkles, Image, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MassDMModal() {
  const { isMassDMOpen, setIsMassDMOpen, analytics, showToast, triggerConfetti } = useApp();
  const [message, setMessage] = useState('');
  const [tierTarget, setTierTarget] = useState('all'); // all | vip | standard
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isMassDMOpen) return null;

  const subscriberCount = analytics.revenueSummary.activeSubscribers || '2,481';

  const handleSend = () => {
    if (!message.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      triggerConfetti();
      showToast(`Broadcast delivered to ${subscriberCount} subscribers!`, '📢');
      setTimeout(() => {
        setIsSent(false);
        setMessage('');
        setIsMassDMOpen(false);
      }, 1500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMassDMOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <button
            onClick={() => setIsMassDMOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>

          {!isSent ? (
            <div className="overflow-y-auto no-scrollbar pb-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FF9A3D]/20 border border-[#FF9A3D]/30 flex items-center justify-center text-[#FFB15C]">
                  <Send size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Broadcast Mass DM</h3>
                  <p className="text-xs text-[#8E867E]">Deliver direct inbox alert to {subscriberCount} patrons</p>
                </div>
              </div>

              {/* Target Segment */}
              <div>
                <label className="text-[11px] text-[#A8A19A] block mb-1.5 font-medium">Target Audience</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'all', label: 'All Subs (2.4K)' },
                    { id: 'vip', label: 'VIP Only (640)' },
                    { id: 'standard', label: 'Standard (1.8K)' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTierTarget(t.id)}
                      className={`py-2 rounded-xl text-[10px] font-semibold transition-all ${
                        tierTarget === t.id
                          ? 'bg-[#FF9A3D]/25 border border-[#FF9A3D] text-[#FFB15C]'
                          : 'bg-white/[0.04] border border-white/10 text-[#8E867E]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Composer */}
              <div>
                <label className="text-[11px] text-[#A8A19A] block mb-1 font-medium">Broadcast Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey everyone! I just published the unreleased Milan master tape. Click to listen..."
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF9A3D]/60 resize-none"
                />
              </div>

              {/* Info Note */}
              <div className="flex items-center gap-2 text-[10px] text-[#77716B]">
                <ShieldCheck size={13} className="text-[#FF9A3D]" />
                <span>Messages will appear in each subscriber's direct VIP chat.</span>
              </div>

              {/* Action */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSend}
                disabled={isSending || !message.trim()}
                className="w-full py-4 rounded-2xl amber-gradient-btn text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30 disabled:opacity-50"
              >
                {isSending ? (
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Mass Broadcast</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFB15C] to-[#E87524] flex items-center justify-center text-black mb-4 shadow-xl shadow-[#FF9A3D]/40">
                <Check size={36} strokeWidth={3} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Broadcast Dispatched</h3>
              <p className="text-xs text-[#B8B1AA]">Sent to {subscriberCount} subscribers instantly.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
