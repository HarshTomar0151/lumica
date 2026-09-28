import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  Users, 
  Grid, 
  Lock, 
  Heart, 
  MessageCircle, 
  DollarSign, 
  Check, 
  ShieldCheck,
  Send,
  Crown,
  Download,
  FolderLock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';

export default function CreatorProfile({ creator }) {
  const { 
    closeCreatorProfile, 
    openSubscribeSheet, 
    openTipSheet, 
    openChat, 
    conversations,
    userSubscriptions, 
    posts, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('feed'); // feed, grid, vault, about
  const isSubscribed = userSubscriptions.includes(creator.id);

  const creatorPosts = posts.filter(p => p.creatorId === creator.id);

  const handleOpenDM = () => {
    const existingChat = conversations.find(c => c.creatorId === creator.id) || {
      id: `conv_${creator.id}`,
      creatorId: creator.id,
      name: creator.name,
      handle: creator.handle,
      avatar: creator.avatar,
      online: true,
      messages: [
        {
          id: 'init_msg',
          sender: 'creator',
          text: `Hi Harsh! Thanks for visiting my patron page. Feel free to ask anything about my recent publications!`,
          time: 'Just now'
        }
      ]
    };
    openChat(existingChat);
  };

  return (
    <div className="w-full min-h-full pb-2 text-white bg-[#050403]">
      {/* Top Cover Banner */}
      <div className="relative h-60 w-full">
        <img
          src={creator.coverImage || creator.avatar}
          alt={creator.name}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-black/40 to-black/60" />

        {/* Top Floating Nav */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <button
            onClick={closeCreatorProfile}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition-colors shadow-lg"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Creator profile link copied!', '🔗')}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition-colors shadow-lg"
            >
              <Share2 size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Bio Section */}
      <div className="px-5 -mt-18 relative z-10">
        {/* Avatar & Action Button Row */}
        <div className="flex items-end justify-between mb-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-[30px] p-[2.5px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-2xl shadow-black">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-full h-full rounded-[27px] object-cover"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={handleOpenDM}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 shadow"
            >
              <Send size={13} />
              <span>DM</span>
            </button>

            <button
              onClick={() => openTipSheet({ creator })}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF9A3D]/20 to-[#E87524]/20 border border-[#FF9A3D]/40 text-xs font-bold text-[#FFB15C] hover:bg-[#FF9A3D]/30 transition-colors flex items-center gap-1.5 shadow"
            >
              <DollarSign size={13} />
              <span>Tip</span>
            </button>
          </div>
        </div>

        {/* Creator Name & Category */}
        <div className="mb-2.5">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-white font-sans">{creator.name}</h1>
            {creator.verified && (
              <span className="w-4 h-4 rounded-full bg-[#FF9A3D] text-black text-[10px] font-black flex items-center justify-center">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs text-[#8E867E]">@{creator.handle} • <span className="text-[#FFB15C] font-semibold">{creator.category}</span></p>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#C5BFB8] leading-relaxed mb-4 font-sans">
          {creator.bio}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center mb-4">
          <div>
            <span className="text-sm font-extrabold text-white block">{creator.followers}</span>
            <span className="text-[10px] text-[#77716B]">Audience</span>
          </div>
          <div className="border-x border-white/[0.06]">
            <span className="text-sm font-extrabold text-white block">{creator.postsCount}</span>
            <span className="text-[10px] text-[#77716B]">Drops</span>
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#FFB15C] block font-mono">{creator.subscribersFormatted}</span>
            <span className="text-[10px] text-[#77716B]">Patrons</span>
          </div>
        </div>

        {/* Main Subscribe CTA Banner */}
        <div className="mb-5">
          {isSubscribed ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FF9A3D]/20 to-[#E87524]/10 border border-[#FF9A3D]/40 flex items-center justify-between shadow-lg shadow-[#FF9A3D]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FF9A3D] text-black flex items-center justify-center font-bold shadow">
                  <Crown size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">VIP Membership Active</span>
                  <span className="text-[10px] text-[#FFB15C]">Full master vault access unlocked</span>
                </div>
              </div>
              <button
                onClick={() => openTipSheet({ creator })}
                className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white"
              >
                Send Tip
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openSubscribeSheet(creator)}
              className="w-full py-4 rounded-2xl amber-gradient-btn text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF9A3D]/30"
            >
              <Sparkles size={18} />
              <span>Subscribe • ${creator.monthlyPrice} / month</span>
            </motion.button>
          )}
        </div>

        {/* Content Tabs (Feed, Grid, Vault, Perks) */}
        <div className="flex border-b border-white/[0.08] mb-4">
          {[
            { id: 'feed', label: 'Feed Drops' },
            { id: 'grid', label: 'Gallery' },
            { id: 'vault', label: 'Master Vault' },
            { id: 'about', label: 'Perks' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 pb-2.5 text-xs font-bold tracking-tight transition-all relative ${
                activeTab === tab.id ? 'text-[#FFB15C]' : 'text-[#77716B] hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="profileTabLine"
                  className="absolute bottom-0 inset-x-3 h-[2px] bg-gradient-to-r from-[#FFB15C] to-[#E87524]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'feed' && (
          <div className="space-y-4">
            {creatorPosts.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#77716B]">No publications yet.</div>
            ) : (
              creatorPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        )}

        {activeTab === 'grid' && (
          <div className="grid grid-cols-2 gap-2 pb-4">
            {creatorPosts.map(post => (
              <div 
                key={post.id}
                onClick={() => isSubscribed ? setActiveTab('feed') : openSubscribeSheet(creator)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 cursor-pointer group"
              >
                <img src={post.image} alt="Grid thumbnail" className={`w-full h-full object-cover group-hover:scale-105 transition-transform ${post.isLocked && !isSubscribed ? 'blur-md opacity-40' : ''}`} />
                {post.isLocked && !isSubscribed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={18} className="text-[#FF9A3D]" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] text-[#FFB15C] font-semibold">
                  {post.likes} likes
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="space-y-3 pb-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">4K Hasselblad Lookbook RAW (.TIFF)</span>
                <span className="text-[10px] text-[#FFB15C] font-mono">1.4 GB</span>
              </div>
              <p className="text-[11px] text-[#8E867E] mb-3">Complete high-res master files and lighting diagrams from Milan Serbelloni.</p>
              <button 
                onClick={() => isSubscribed ? showToast('Downloading master package...', '💾') : openSubscribeSheet(creator)}
                className="w-full py-2.5 rounded-xl bg-white/[0.06] text-xs font-bold text-white hover:bg-white/10 flex items-center justify-center gap-1.5"
              >
                {isSubscribed ? <><Download size={14} /> Download Vault Asset</> : <><Lock size={14} className="text-[#FF9A3D]" /> Unlock with Subscription</>}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">DaVinci Resolve Cinema LUT Pack</span>
                <span className="text-[10px] text-[#FFB15C] font-mono">120 MB</span>
              </div>
              <p className="text-[11px] text-[#8E867E] mb-3">Custom color-grading curves tailored for cinematic low-light tones.</p>
              <button 
                onClick={() => isSubscribed ? showToast('Downloading LUT package...', '💾') : openSubscribeSheet(creator)}
                className="w-full py-2.5 rounded-xl bg-white/[0.06] text-xs font-bold text-white hover:bg-white/10 flex items-center justify-center gap-1.5"
              >
                {isSubscribed ? <><Download size={14} /> Download Vault Asset</> : <><Lock size={14} className="text-[#FF9A3D]" /> Unlock with Subscription</>}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-3 pb-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                <Crown size={15} className="text-[#FF9A3D]" />
                Patron Membership Includes:
              </h3>
              <ul className="space-y-2.5 text-xs text-[#B8B1AA]">
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#FF9A3D] flex-shrink-0" />
                  <span>Access to all 148+ historical publications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#FF9A3D] flex-shrink-0" />
                  <span>Uncompressed RAW files & LUT downloads</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#FF9A3D] flex-shrink-0" />
                  <span>Direct 1-on-1 VIP chat channel</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-[#FF9A3D] flex-shrink-0" />
                  <span>Early access to limited live streams & studio sessions</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
