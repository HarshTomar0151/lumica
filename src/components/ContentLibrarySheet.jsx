import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Layers, Heart, MessageCircle, DollarSign, Trash2, Edit2, Lock, Eye, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ContentLibrarySheet() {
  const { isContentLibraryOpen, setIsContentLibraryOpen, posts, setPosts, setIsCreateModalOpen, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  if (!isContentLibraryOpen) return null;

  const handleDelete = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Publication deleted from vault', '🗑️');
  };

  const filteredPosts = posts.filter(p => {
    const matches = p.caption.toLowerCase().includes(search.toLowerCase()) ||
                    p.category?.toLowerCase().includes(search.toLowerCase());
    return matches;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsContentLibraryOpen(false)}
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

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#FF9A3D]/20 border border-[#FF9A3D]/30 flex items-center justify-center text-[#FFB15C]">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Content Library</h3>
                <p className="text-xs text-[#8E867E]">{posts.length} published assets in vault</p>
              </div>
            </div>
            <button
              onClick={() => setIsContentLibraryOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search & New Drop button */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1 flex items-center">
              <Search size={15} className="absolute left-3 text-[#8E867E]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search publications..."
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
              />
            </div>
            <button
              onClick={() => {
                setIsContentLibraryOpen(false);
                setIsCreateModalOpen(true);
              }}
              className="h-10 px-3 rounded-xl amber-gradient-btn text-black font-bold text-xs flex items-center gap-1 shadow"
            >
              <Plus size={14} />
              <span>New</span>
            </button>
          </div>

          {/* Posts List */}
          <div className="overflow-y-auto no-scrollbar pb-6 space-y-3">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex gap-3 items-center"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 relative">
                  <img src={post.image} alt="Thumbnail" className="w-full h-full object-cover" />
                  {post.isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock size={12} className="text-[#FF9A3D]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-[#FFB15C] font-semibold">{post.category || 'Editorial'}</span>
                    <span className="text-[9px] text-[#77716B]">{post.timeAgo}</span>
                  </div>
                  <p className="text-xs font-semibold text-white truncate mb-1">{post.caption}</p>
                  <div className="flex items-center gap-3 text-[10px] text-[#8E867E]">
                    <span className="flex items-center gap-1"><Heart size={10} className="text-rose-400" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><DollarSign size={10} className="text-emerald-400" /> {post.totalTips || '$0'}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> 1.2K</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => showToast('Edit publication options', '✏️')}
                    className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/80 hover:text-[#FF9A3D]"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
