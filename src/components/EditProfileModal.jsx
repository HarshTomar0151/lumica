import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Image, Sparkles, Check, DollarSign, User, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EditProfileModal() {
  const { isEditProfileOpen, setIsEditProfileOpen, currentUser, updateCurrentUser, showToast } = useApp();
  
  const [name, setName] = useState(currentUser.name);
  const [handle, setHandle] = useState(currentUser.handle);
  const [bio, setBio] = useState(currentUser.creatorProfile?.bio || 'Art director & cinematic creator.');
  const [category, setCategory] = useState(currentUser.creatorProfile?.category || 'Cinematic Visuals');
  const [monthlyPrice, setMonthlyPrice] = useState(currentUser.creatorProfile?.monthlyPrice || 14.99);
  const [vipPrice, setVipPrice] = useState(currentUser.creatorProfile?.vipPrice || 39.99);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [coverImage, setCoverImage] = useState(currentUser.creatorProfile?.coverImage || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop');

  if (!isEditProfileOpen) return null;

  const handleSave = (e) => {
    e?.preventDefault();
    updateCurrentUser({
      name,
      handle,
      avatar,
      creatorProfile: {
        ...currentUser.creatorProfile,
        name,
        handle,
        bio,
        category,
        monthlyPrice: parseFloat(monthlyPrice),
        vipPrice: parseFloat(vipPrice),
        coverImage
      }
    });
    showToast('Profile & pricing updated successfully!', '✨');
    setIsEditProfileOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEditProfileOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[92vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Edit Profile & Pricing</h3>
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="overflow-y-auto no-scrollbar pb-6 space-y-4">
            {/* Cover & Avatar Upload Preview */}
            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-1.5 font-medium">Cover & Avatar Banner</label>
              <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/40 mb-3">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => showToast('Cover image updated', '🖼️')}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1"
                >
                  <Camera size={12} />
                  <span>Change Cover</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pl-2">
                <div className="relative">
                  <img src={avatar} alt="Avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FF9A3D]" />
                  <button
                    type="button"
                    onClick={() => showToast('Avatar updated', '📷')}
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FF9A3D] text-black flex items-center justify-center shadow"
                  >
                    <Camera size={11} />
                  </button>
                </div>
                <div className="text-xs text-[#8E867E]">
                  <span>Tap to upload high-res photo</span>
                </div>
              </div>
            </div>

            {/* Display Name & Handle */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-[#A8A19A] block mb-1 font-medium">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:border-[#FF9A3D]/60 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#A8A19A] block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:border-[#FF9A3D]/60 focus:outline-none"
                />
              </div>
            </div>

            {/* Category & Bio */}
            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-1 font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:border-[#FF9A3D]/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-1 font-medium">Biography & Credentials</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:border-[#FF9A3D]/60 focus:outline-none resize-none"
              />
            </div>

            {/* Pricing Controls */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <DollarSign size={14} className="text-[#FF9A3D]" />
                Subscription Tier Pricing
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] text-[#8E867E] block mb-1">Standard Tier ($/mo)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-bold text-[#FFB15C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#8E867E] block mb-1">Inner Circle VIP ($/mo)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={vipPrice}
                    onChange={(e) => setVipPrice(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-bold text-[#FFB15C] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-2xl amber-gradient-btn text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30"
            >
              <Check size={16} strokeWidth={3} />
              <span>Save & Publish Changes</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
