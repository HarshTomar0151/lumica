import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Video, Sparkles, Lock, Globe, Camera, Layers, Check, UploadCloud } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreatePostSheet() {
  const { isCreateModalOpen, setIsCreateModalOpen, handleCreatePost } = useApp();
  const [contentType, setContentType] = useState('photo'); // photo, video, gallery, text
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Haute Couture');
  const [isSubscribersOnly, setIsSubscribersOnly] = useState(true);
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop');

  if (!isCreateModalOpen) return null;

  const sampleImages = [
    { label: 'Milan Fashion', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Studio Synth', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Editorial Dark', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' }
  ];

  const categories = ['Haute Couture', 'Electronic Music', 'Biohacking', 'Private Equity', 'Spatial Design'];

  const onSubmit = () => {
    handleCreatePost({
      image: selectedImage,
      caption: caption || 'Private editorial publication for Lumina VIP patrons.',
      category: category,
      isLocked: isSubscribersOnly
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCreateModalOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Create Publication</h3>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto no-scrollbar space-y-4 pb-6">
            {/* Format Type Selector */}
            <div className="grid grid-cols-4 gap-2 p-1 rounded-2xl bg-white/[0.04] border border-white/10">
              {[
                { id: 'photo', label: 'Photo', icon: Image },
                { id: 'video', label: 'Video', icon: Video },
                { id: 'gallery', label: 'Vault', icon: Layers },
                { id: 'text', label: 'Memo', icon: Sparkles },
              ].map(tab => {
                const Icon = tab.icon;
                const isSelected = contentType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setContentType(tab.id)}
                    className={`py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black font-bold shadow-md'
                        : 'text-[#8E867E] hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-[10px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Media Upload / Selection Area */}
            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-1.5 font-medium">Select Media Asset</label>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/15 bg-black/50 mb-2">
                <img
                  src={selectedImage}
                  alt="Upload Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5 text-white">
                    <Camera size={14} className="text-[#FF9A3D]" />
                    <span>4K Hasselblad RAW</span>
                  </div>
                </div>
              </div>

              {/* Sample presets */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {sampleImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.url)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 relative ${
                      selectedImage === img.url ? 'border-[#FF9A3D]' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-1 font-medium">Caption & Editorial Context</label>
              <textarea
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Share technical settings, creative notes, or download links for patrons..."
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF9A3D]/60 resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[11px] text-[#A8A19A] block mb-1.5 font-medium">Category</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                      category === cat
                        ? 'bg-[#FF9A3D]/25 border border-[#FF9A3D] text-[#FFB15C]'
                        : 'bg-white/[0.04] border border-white/10 text-[#8E867E] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSubscribersOnly ? 'bg-[#FF9A3D]/20 text-[#FFB15C]' : 'bg-white/10 text-white'}`}>
                  {isSubscribersOnly ? <Lock size={16} /> : <Globe size={16} />}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isSubscribersOnly ? 'Subscribers Only' : 'Public Drop'}
                  </span>
                  <span className="text-[10px] text-[#8E867E]">
                    {isSubscribersOnly ? 'Gated for paying patrons' : 'Visible to all discover users'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSubscribersOnly(!isSubscribersOnly)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  isSubscribersOnly ? 'bg-[#FF9A3D]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transition-transform ${
                    isSubscribersOnly ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/10"
              >
                Save Draft
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSubmit}
                className="flex-[2] py-3.5 rounded-xl amber-gradient-btn text-black font-bold text-xs tracking-wide shadow-lg shadow-[#FF9A3D]/25"
              >
                Publish Drop
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
