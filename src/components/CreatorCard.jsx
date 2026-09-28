import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Check, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreatorCard({ creator, variant = 'horizontal' }) {
  const { openCreatorProfile, openSubscribeSheet, userSubscriptions } = useApp();
  const isSubscribed = userSubscriptions.includes(creator.id);

  if (variant === 'horizontal') {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => openCreatorProfile(creator)}
        className="w-[205px] flex-shrink-0 rounded-[28px] bg-gradient-to-b from-[#16100B] to-[#0D0906] backdrop-blur-2xl border border-white/[0.1] shadow-2xl shadow-black/80 overflow-hidden cursor-pointer flex flex-col group relative"
      >
        {/* Cover / Portrait Banner with Editorial Depth */}
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={creator.coverImage || creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16100B] via-black/40 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-semibold text-[#FFB15C] truncate max-w-[150px]">
            {creator.category.split('&')[0]}
          </div>
        </div>

        {/* Profile Avatar Overlap */}
        <div className="px-3.5 pb-3.5 pt-0 relative flex flex-col items-center text-center -mt-9">
          <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-xl shadow-black mb-1.5">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex items-center gap-1 mb-0.5">
            <h4 className="text-xs font-bold text-white group-hover:text-[#FFB15C] transition-colors truncate max-w-[140px] font-sans">
              {creator.name}
            </h4>
            {creator.verified && (
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF9A3D] text-black text-[9px] font-black flex items-center justify-center">
                ✓
              </span>
            )}
          </div>

          <p className="text-[10px] text-[#8E867E] mb-2.5 font-mono">
            {creator.subscribersFormatted} patrons
          </p>

          {/* Quick Subscribe Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isSubscribed) {
                openCreatorProfile(creator);
              } else {
                openSubscribeSheet(creator);
              }
            }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
              isSubscribed
                ? 'bg-white/10 text-white border border-white/15 hover:bg-white/15'
                : 'amber-gradient-btn text-black shadow-lg shadow-[#FF9A3D]/25'
            }`}
          >
            {isSubscribed ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                <span>Subscribed</span>
              </>
            ) : (
              <>
                <span>${creator.monthlyPrice}/mo</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    );
  }

  // Large Discover Grid / Vertical Magazine Card
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openCreatorProfile(creator)}
      className="w-full rounded-[28px] bg-gradient-to-b from-[#140E0A] to-[#0A0705] backdrop-blur-2xl border border-white/[0.09] shadow-2xl overflow-hidden cursor-pointer relative group flex flex-col mb-4"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={creator.coverImage || creator.avatar}
          alt={creator.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-black/40 to-transparent" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#FFB15C]">
          {creator.category}
        </div>

        {creator.location && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white/90">
            {creator.location}
          </div>
        )}
      </div>

      <div className="p-4 pt-0 relative flex items-end justify-between -mt-8">
        <div className="flex items-end gap-3">
          <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-2xl shadow-black">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col mb-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white group-hover:text-[#FFB15C] transition-colors font-sans">
                {creator.name}
              </h3>
              {creator.verified && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF9A3D] text-black text-[9px] font-black flex items-center justify-center">
                  ✓
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#8E867E]">@{creator.handle}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-right mb-1">
          <div className="text-sm font-extrabold text-[#FFB15C] font-mono">${creator.monthlyPrice}</div>
          <div className="text-[9px] text-[#77716B]">monthly access</div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="text-xs text-[#B8B1AA] line-clamp-2 leading-relaxed mb-3">
          {creator.bio}
        </p>

        <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 text-[11px] text-[#8E867E]">
            <span className="flex items-center gap-1">
              <Users size={12} className="text-[#FF9A3D]" />
              <strong className="text-white font-bold">{creator.subscribersFormatted}</strong> patrons
            </span>
            <span>•</span>
            <span><strong className="text-white font-bold">{creator.postsCount}</strong> drops</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isSubscribed) {
                openCreatorProfile(creator);
              } else {
                openSubscribeSheet(creator);
              }
            }}
            className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSubscribed
                ? 'bg-white/10 text-white border border-white/15'
                : 'amber-gradient-btn text-black shadow-lg shadow-[#FF9A3D]/25'
            }`}
          >
            {isSubscribed ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                <span>Subscribed</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
