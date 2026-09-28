import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send, Lock, Sparkles, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StoryViewer() {
  const { 
    activeStory, 
    setActiveStory, 
    openSubscribeSheet, 
    openTipSheet, 
    userSubscriptions,
    showToast 
  } = useApp();

  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState('');

  const creator = activeStory?.creator;
  const storyItem = activeStory?.storyItem;
  const isSubscribed = creator?.id ? userSubscriptions.includes(creator.id) : true;
  const isLocked = storyItem?.locked && !isSubscribed;

  useEffect(() => {
    if (!activeStory || isLocked) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveStory(null);
          return 100;
        }
        return prev + 1.25;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [activeStory, isLocked]);

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim() || !creator) return;
    showToast(`Reply sent to ${creator.name}!`, '💌');
    setReplyText('');
  };

  return (
    <AnimatePresence>
      {activeStory && (
        <motion.div
          key="story-viewer-modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="absolute inset-0 z-[120] bg-black flex flex-col justify-between overflow-hidden rounded-[47px] pointer-events-auto select-none"
        >
          {/* Story Background Image */}
          <div className="absolute inset-0">
            <img
              src={storyItem?.mediaUrl || creator?.coverImage || creator?.avatar}
              alt="Story Media"
              className={`w-full h-full object-cover ${isLocked ? 'blur-2xl scale-110 opacity-40' : ''}`}
            />
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          </div>

          {/* Top Header Bar */}
          <div className="relative z-30 pt-10 px-4 flex flex-col gap-3">
            {/* Progress Bars */}
            <div className="w-full flex items-center gap-1.5 h-1">
              <div className="flex-1 h-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFB15C] to-[#FF9A3D] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Creator Info & Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFB15C] to-[#FF9A3D]">
                  <img
                    src={creator?.avatar}
                    alt={creator?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                    {creator?.name}
                    {creator?.verified && (
                      <span className="w-3 h-3 rounded-full bg-[#FF9A3D] text-black text-[8px] font-bold flex items-center justify-center">✓</span>
                    )}
                  </span>
                  <span className="text-[10px] text-white/70 font-mono">
                    {storyItem?.timestamp || '1h ago'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Middle Area / Locked Overlay */}
          <div className="relative z-30 flex-1 flex flex-col items-center justify-center px-6 text-center">
            {isLocked ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-[320px] rounded-3xl p-6 bg-[#0E0A07]/90 backdrop-blur-2xl border border-[#FF9A3D]/40 shadow-2xl flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF9A3D]/20 to-[#E87524]/20 border border-[#FF9A3D]/40 flex items-center justify-center text-[#FF9A3D] mb-4 shadow-lg shadow-[#FF9A3D]/20">
                  <Lock size={26} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Subscriber Exclusive</h3>
                <p className="text-xs text-[#B8B1AA] mb-5 leading-relaxed">
                  Unlock {creator?.name}’s private behind-the-scenes stories, raw audio masters, and editorial vaults.
                </p>
                <button
                  onClick={() => {
                    setActiveStory(null);
                    openSubscribeSheet(creator);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl amber-gradient-btn text-black font-semibold text-xs tracking-wide flex items-center justify-center gap-2"
                >
                  <Sparkles size={15} />
                  Unlock for ${creator?.monthlyPrice}/mo
                </button>
              </motion.div>
            ) : (
              storyItem?.caption && (
                <div className="absolute bottom-20 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-left">
                  <p className="text-xs text-white/90 leading-snug">{storyItem.caption}</p>
                </div>
              )
            )}
          </div>

          {/* Bottom Interactive Bar */}
          {!isLocked && (
            <div className="relative z-30 pb-8 pt-3 px-4 flex items-center gap-2.5">
              <form onSubmit={handleSendReply} className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Send reply to ${creator?.name?.split(' ')[0]}...`}
                  className="w-full h-11 px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#FF9A3D]/60 focus:bg-white/15 transition-all"
                />
                {replyText.trim() && (
                  <button
                    type="submit"
                    className="w-11 h-11 rounded-full bg-[#FF9A3D] text-black flex items-center justify-center shadow-lg flex-shrink-0"
                  >
                    <Send size={16} />
                  </button>
                )}
              </form>

              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  if (!isLiked) showToast('Loved story! ❤️');
                }}
                className={`w-11 h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all ${
                  isLiked 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                    : 'bg-white/10 border-white/15 text-white'
                }`}
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              </button>

              {creator?.id && (
                <button
                  onClick={() => openTipSheet({ creator })}
                  className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF9A3D]/20 to-[#E87524]/20 backdrop-blur-xl border border-[#FF9A3D]/40 text-[#FFB15C] flex items-center justify-center shadow-md"
                >
                  <DollarSign size={18} />
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
