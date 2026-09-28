import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music2, Radio, CheckCircle, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DynamicIsland() {
  const { isCreatorMode, activeTab } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [liveActivity, setLiveActivity] = useState({
    title: 'Elena Rostova Studio Stream',
    subtitle: 'Live Masterclass • 4K HDR',
    type: 'live'
  });

  return (
    <div className="relative flex justify-center w-full pt-2.5 pb-1 z-50 select-none">
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        layout
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className={`bg-black/95 text-white cursor-pointer border border-white/10 shadow-2xl flex items-center justify-between overflow-hidden ${
          isExpanded
            ? 'w-[92%] py-3 px-4 rounded-[26px] h-20'
            : 'w-[124px] h-[30px] rounded-full px-3'
        }`}
      >
        {!isExpanded ? (
          /* Collapsed Pill */
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9A3D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9A3D]"></span>
              </span>
              <span className="text-[10px] font-mono tracking-tight text-[#FFB15C]">
                {isCreatorMode ? 'LIVE' : '4K'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex gap-[2px] items-end h-2.5">
                <span className="w-[2px] bg-[#FF9A3D] h-2 animate-pulse"></span>
                <span className="w-[2px] bg-[#FF9A3D] h-3 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-[2px] bg-[#FF9A3D] h-1.5 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        ) : (
          /* Expanded Island */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF9A3D] to-[#E87524] p-[1px] flex-shrink-0">
                <div className="w-full h-full bg-[#0D0906] rounded-[11px] flex items-center justify-center text-[#FF9A3D]">
                  {isCreatorMode ? <Zap size={18} /> : <Radio size={18} className="animate-pulse" />}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-[11px] font-medium text-[#FFB15C] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A3D]"></span>
                  {isCreatorMode ? 'Creator Portal Active' : 'Lumina Exclusive Feed'}
                </div>
                <div className="text-xs font-semibold text-white truncate max-w-[170px]">
                  {isCreatorMode ? '$12,840.50 (+18.4% MRR)' : 'Elena Rostova • Private Drop'}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF9A3D]/20 text-[#FFB15C] border border-[#FF9A3D]/30 font-medium">
                {isCreatorMode ? 'PRO' : 'VIP'}
              </span>
              <span className="text-[9px] text-[#B8B1AA]">Tap to close</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
