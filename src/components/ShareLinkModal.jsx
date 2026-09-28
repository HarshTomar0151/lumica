import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, QrCode, Sparkles, Globe, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ShareLinkModal() {
  const { isShareLinkOpen, setIsShareLinkOpen, currentUser, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareLinkOpen) return null;

  const creatorLink = `lumina.app/${currentUser.handle || 'elenarostova'}`;

  const handleCopy = () => {
    setCopied(true);
    showToast('Custom invite link copied!', '🔗');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsShareLinkOpen(false)}
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
            onClick={() => setIsShareLinkOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="overflow-y-auto no-scrollbar pb-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FF9A3D]/20 border border-[#FF9A3D]/30 flex items-center justify-center text-[#FFB15C]">
                <Share2 size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Share Creator Link</h3>
                <p className="text-xs text-[#8E867E]">Attract subscribers with your bio link</p>
              </div>
            </div>

            {/* Simulated QR Code Card */}
            <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
              <div className="w-36 h-36 p-3 rounded-2xl bg-white flex items-center justify-center shadow-2xl mb-3">
                <div className="w-full h-full border-4 border-black p-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-6 h-6 bg-black" />
                    <div className="w-6 h-6 bg-black" />
                  </div>
                  <div className="flex items-center justify-center text-black font-black text-xs font-serif">
                    LUMINA
                  </div>
                  <div className="flex justify-between">
                    <div className="w-6 h-6 bg-black" />
                    <div className="w-3 h-3 bg-black self-end" />
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-white mb-0.5">{creatorLink}</span>
              <span className="text-[10px] text-[#77716B]">Scan to view public profile & subscribe</span>
            </div>

            {/* Copy Link Input Bar */}
            <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 pl-2 truncate">
                <Globe size={14} className="text-[#FF9A3D] flex-shrink-0" />
                <span className="text-xs font-mono text-[#EBE6DF] truncate">{creatorLink}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-xl amber-gradient-btn text-black font-bold text-xs flex items-center gap-1 shadow flex-shrink-0"
              >
                {copied ? <Check size={13} strokeWidth={3} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Quick Social Shares */}
            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-2 font-medium">Quick Share Channel</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: 'Instagram', color: 'bg-rose-500/20 text-rose-300' },
                  { name: 'X / Twitter', color: 'bg-blue-500/20 text-blue-300' },
                  { name: 'Telegram', color: 'bg-sky-500/20 text-sky-300' },
                  { name: 'WhatsApp', color: 'bg-emerald-500/20 text-emerald-300' },
                ].map(s => (
                  <button
                    key={s.name}
                    onClick={() => showToast(`Shared to ${s.name}`, '🚀')}
                    className={`py-2.5 rounded-xl text-[10px] font-semibold ${s.color} border border-white/10 hover:brightness-125 transition-all text-center`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
