import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Sparkles, TrendingUp, Flame, SlidersHorizontal, Lock, CheckCircle2, Crown, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StoryRail from '../components/StoryRail';
import CreatorCard from '../components/CreatorCard';
import PostCard from '../components/PostCard';

export default function Home() {
  const { 
    currentUser, 
    creators, 
    posts, 
    userSubscriptions,
    setIsNotificationOpen, 
    navigateTo, 
    isCreatorMode, 
    setIsCreatorMode,
    isLoggedIn,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const [feedFilter, setFeedFilter] = useState('all'); // all | subscribed

  const filteredPosts = posts.filter(p => {
    if (feedFilter === 'subscribed') {
      return userSubscriptions.includes(p.creatorId);
    }
    return true;
  });

  return (
    <div className="w-full min-h-full pb-3 text-white">
      {/* Top Header */}
      <header className="px-5 pt-2 pb-2.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A3D]" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#FFB15C]">
              Lumina Patron
            </span>
          </div>
          <span className="text-xs text-[#A8A19A] block font-medium mt-0.5">Good morning,</span>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans leading-tight">
            <span className="gold-gradient-text font-serif italic text-2xl">{currentUser.name.split(' ')[0]}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsNotificationOpen(true)}
            className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#EBE6DF] hover:text-[#FFB15C] transition-colors relative shadow-sm"
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF9A3D] shadow-[0_0_8px_#FF9A3D]" />
          </motion.button>

          {/* User Avatar */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigateTo('profile')}
            className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFB15C] via-[#FF9A3D] to-[#E87524] shadow-md shadow-[#FF9A3D]/20 cursor-pointer"
            aria-label="View user profile"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
            />
          </motion.button>
        </div>
      </header>

      {/* Stories Carousel */}
      <section className="mb-3.5" aria-label="Stories">
        <StoryRail />
      </section>

      {/* Mode Switcher Shortcut Card */}
      <div className="px-4 mb-4">
        <div 
          onClick={() => {
            const next = !isCreatorMode;
            setIsCreatorMode(next);
            navigateTo(next ? 'dashboard' : 'home');
          }}
          className="p-3 rounded-2xl bg-gradient-to-r from-[#FF9A3D]/18 via-[#E87524]/10 to-transparent border border-[#FF9A3D]/30 flex items-center justify-between cursor-pointer hover:border-[#FF9A3D]/50 transition-all group shadow-lg shadow-[#FF9A3D]/05"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFB15C] to-[#E87524] flex items-center justify-center text-black font-bold shadow">
              <Zap size={16} fill="black" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-[#FFB15C] transition-colors">
                {isCreatorMode ? 'Switch to Patron Feed' : 'Creator Business Studio'}
              </div>
              <div className="text-[10px] text-[#A8A19A]">
                {isCreatorMode ? 'Browse as patron' : 'Manage $12,840 earnings & publications'}
              </div>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#FF9A3D]/20 text-[#FFB15C] border border-[#FF9A3D]/35 font-bold">
            {isCreatorMode ? 'Feed' : 'Switch'}
          </span>
        </div>
      </div>

      {/* Trending Creators Section */}
      <section className="mb-5">
        <div className="px-5 mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame size={15} className="text-[#FF9A3D]" />
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#EBE6DF]">
              Trending Creators
            </h2>
          </div>
          <button
            onClick={() => navigateTo('discover')}
            className="text-[11px] text-[#FFB15C] font-bold hover:underline"
          >
            Explore All
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar px-4 flex gap-3 pb-1">
          {creators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* Main Feed Section with Subscribed Filter */}
      <section className="px-4">
        <div className="px-1 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                feedFilter === 'all'
                  ? 'bg-gradient-to-r from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] text-black shadow-md shadow-[#FF9A3D]/20'
                  : 'bg-white/[0.04] border border-white/10 text-[#8E867E] hover:text-white'
              }`}
            >
              All Drops
            </button>
            <button
              onClick={() => setFeedFilter('subscribed')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                feedFilter === 'subscribed'
                  ? 'bg-gradient-to-r from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] text-black shadow-md shadow-[#FF9A3D]/20'
                  : 'bg-white/[0.04] border border-white/10 text-[#8E867E] hover:text-white'
              }`}
            >
              <CheckCircle2 size={12} />
              <span>Subscribed ({userSubscriptions.length})</span>
            </button>
          </div>

          <span className="text-[10px] text-[#77716B] font-mono">{filteredPosts.length} posts</span>
        </div>

        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center text-xs text-[#77716B]">
              No posts in this feed yet. Explore trending creators to subscribe!
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
