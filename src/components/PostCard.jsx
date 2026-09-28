import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  DollarSign, 
  Lock, 
  Sparkles, 
  Bookmark, 
  MoreHorizontal,
  Send,
  Check,
  Volume2,
  Play,
  Pause,
  Download,
  Music
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PostCard({ post }) {
  const { 
    userSubscriptions, 
    handleToggleLike, 
    openSubscribeSheet, 
    openTipSheet, 
    openCreatorProfile, 
    creators, 
    showToast 
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState(post.comments || []);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(32); // percentage

  // Check if user is subscribed or post is not locked
  const isSubscribed = userSubscriptions.includes(post.creatorId);
  const isLocked = post.isLocked && !isSubscribed;
  const isAudioPost = post.category === 'Electronic Music' || post.tags?.some(t => t.toLowerCase().includes('synth') || t.toLowerCase().includes('stems'));

  // Audio simulation timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio && !isLocked) {
      interval = setInterval(() => {
        setAudioProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, isLocked]);

  const creator = creators.find(c => c.id === post.creatorId) || {
    id: post.creatorId,
    name: post.creatorName,
    handle: post.creatorHandle,
    avatar: post.creatorAvatar,
    monthlyPrice: post.price || 9.99
  };

  // Double tap to like
  const handleDoubleTap = () => {
    if (!post.hasLiked) {
      handleToggleLike(post.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleAddComment = (e) => {
    e?.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: `cm_${Date.now()}`,
      user: 'Harshvardhan S.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      text: commentInput.trim(),
      timeAgo: 'Just now',
      likes: 0
    };

    setCommentsList(prev => [...prev, newComment]);
    setCommentInput('');
    showToast('Comment published!', '💬');
  };

  const handleShare = () => {
    showToast('Publication link copied!', '🔗');
  };

  return (
    <article className="w-full rounded-[30px] bg-[#0E0A07]/90 border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden mb-4 transition-all">
      {/* Editorial Header */}
      <div className="p-3.5 pb-2.5 flex items-center justify-between gap-2">
        <div 
          onClick={() => openCreatorProfile(creator)}
          className="flex items-center gap-2.5 cursor-pointer group min-w-0 flex-1"
        >
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full p-[1.8px] bg-gradient-to-tr from-[#FFB15C] via-[#FF9A3D] to-[#E87524] shadow-md group-hover:shadow-[0_0_12px_rgba(255,154,61,0.5)] transition-all">
              <img
                src={post.creatorAvatar}
                alt={post.creatorName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs font-bold text-[#F5F1EC] group-hover:text-[#FFB15C] transition-colors leading-tight font-sans truncate">
                {post.creatorName}
              </span>
              {post.verified && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF9A3D] text-black text-[9px] font-black flex items-center justify-center flex-shrink-0">
                  ✓
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#8E867E] truncate">
              <span className="truncate">@{post.creatorHandle}</span>
              <span className="flex-shrink-0">•</span>
              <span className="flex-shrink-0">{post.timeAgo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Category Tag (Single line, luxury glass chip) */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md whitespace-nowrap">
            <Sparkles size={10} className="text-[#FFB15C] flex-shrink-0" />
            <span className="text-[10px] font-semibold text-[#FFB15C] whitespace-nowrap">
              {post.category || 'Editorial'}
            </span>
          </div>

          <button 
            onClick={() => showToast('Post options', '⚙️')}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#77716B] hover:text-white transition-colors flex-shrink-0"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Cinematic Media Area (Instagram 4:5 Portrait Aspect Ratio) */}
      <div 
        onDoubleClick={handleDoubleTap}
        className="relative w-full aspect-[4/5] bg-[#050403] overflow-hidden cursor-pointer select-none"
      >
        <img
          src={post.image}
          alt="Post media"
          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
            isLocked ? 'blur-2xl scale-115 opacity-25 pointer-events-none' : ''
          }`}
        />

        {/* Double Tap Floating Heart Burst */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 1 }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="w-24 h-24 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-rose-500/40 shadow-2xl">
                <Heart size={54} fill="#FF4D6D" className="text-[#FF4D6D] drop-shadow-[0_0_20px_#FF4D6D]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Locked Post Glass Shield */}
        {isLocked && (
          <div className="absolute inset-0 bg-[#070503]/85 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-14 h-14 rounded-3xl p-3.5 bg-gradient-to-tr from-[#FF9A3D]/25 to-[#E87524]/10 border border-[#FF9A3D]/40 text-[#FFB15C] mb-3.5 shadow-2xl shadow-[#FF9A3D]/20">
              <Lock size={26} className="mx-auto" />
            </div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#FFB15C] mb-1">
              Patron Vault Drop
            </span>
            <h4 className="text-sm font-bold text-white mb-1.5 tracking-tight">
              Exclusive to {post.creatorName}’s Subscribers
            </h4>
            <p className="text-[11px] text-[#A8A19A] max-w-[240px] mb-5 leading-relaxed">
              Unlock complete 4K uncompressed photo sets, RAW files, and behind-the-scenes recording.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.stopPropagation();
                openSubscribeSheet(creator);
              }}
              className="px-6 py-3 rounded-2xl amber-gradient-btn text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-xl shadow-[#FF9A3D]/30"
            >
              <Sparkles size={14} />
              <span>Unlock for ${creator.monthlyPrice}/mo</span>
            </motion.button>
          </div>
        )}

        {/* Audio Equalizer Overlay for Music/Audio Drops */}
        {isAudioPost && !isLocked && (
          <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl z-20">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingAudio(!isPlayingAudio);
                  showToast(isPlayingAudio ? 'Audio paused' : 'Playing 24-bit 96kHz analog master stem 🎧');
                }}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] text-black flex items-center justify-center shadow-lg shadow-[#FF9A3D]/40 flex-shrink-0"
              >
                {isPlayingAudio ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-0.5" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px] text-[#FFB15C] font-mono font-bold mb-1">
                  <span className="flex items-center gap-1">
                    <Music size={10} /> Track 04 • Master Stem
                  </span>
                  <span>{isPlayingAudio ? '01:48' : '00:00'} / 04:32</span>
                </div>

                {/* Animated Waveform Equalizer */}
                <div className="flex items-end gap-[3px] h-6 bg-white/[0.04] p-1 rounded-lg border border-white/5">
                  {[40, 75, 55, 90, 30, 85, 60, 100, 45, 70, 95, 35, 80, 65, 50, 85, 30, 70, 90, 40].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full bg-gradient-to-t from-[#E87524] to-[#FFD4A3]"
                      animate={{
                        height: isPlayingAudio ? [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] : '20%',
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: isPlayingAudio ? Infinity : 0,
                        repeatType: 'reverse',
                        delay: i * 0.03,
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showToast('Downloading FLAC multi-track stems (128 MB)...', '⬇️');
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center flex-shrink-0 transition-colors"
                title="Download RAW Stems"
              >
                <Download size={14} />
              </button>
            </div>

            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FFB15C] to-[#E87524] h-full transition-all duration-300"
                style={{ width: isPlayingAudio ? `${audioProgress}%` : '0%' }}
              />
            </div>
          </div>
        )}

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Post Actions & Caption */}
      <div className="p-3.5">
        {/* Action Row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-3.5">
            {/* Heart */}
            <motion.button
              whileTap={{ scale: 0.78 }}
              onClick={() => handleToggleLike(post.id)}
              className={`flex items-center gap-1.5 text-xs font-semibold transition-all ${
                post.hasLiked ? 'text-[#FF4D6D]' : 'text-[#A8A19A] hover:text-white'
              }`}
            >
              <Heart 
                size={20} 
                fill={post.hasLiked ? '#FF4D6D' : 'none'} 
                className={post.hasLiked ? 'drop-shadow-[0_0_8px_#FF4D6D]' : ''} 
              />
              <span className="font-mono">{post.likes.toLocaleString()}</span>
            </motion.button>

            {/* Comment */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#A8A19A] hover:text-white transition-colors"
            >
              <MessageCircle size={19} />
              <span className="font-mono">{commentsList.length}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1 rounded-full text-[#A8A19A] hover:text-white transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Tip Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openTipSheet({ creator, post })}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF9A3D]/20 to-[#E87524]/20 border border-[#FF9A3D]/40 text-[#FFB15C] hover:bg-[#FF9A3D]/30 transition-all text-xs font-bold shadow-sm"
            >
              <DollarSign size={13} />
              <span>Tip Creator</span>
            </motion.button>

            {/* Bookmark */}
            <button
              onClick={() => {
                setIsSaved(!isSaved);
                showToast(isSaved ? 'Removed from saved' : 'Saved to vault 🔖');
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isSaved ? 'text-[#FF9A3D]' : 'text-[#77716B] hover:text-white'
              }`}
            >
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Caption */}
        <p className="text-xs text-[#EBE6DF] leading-relaxed mb-2">
          <strong className="text-white font-bold mr-1.5">{post.creatorName}</strong>
          {post.caption}
        </p>

        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] text-[#FFB15C]/85 font-mono">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Expandable Comments Drawer */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-white/[0.06] overflow-hidden"
            >
              <div className="space-y-2.5 max-h-48 overflow-y-auto no-scrollbar pr-1 mb-2.5">
                {commentsList.length === 0 ? (
                  <p className="text-[11px] text-[#77716B] text-center py-2">No comments yet. Be the first!</p>
                ) : (
                  commentsList.map(comment => (
                    <div key={comment.id} className="flex items-start gap-2 text-xs">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-6 h-6 rounded-full object-cover mt-0.5"
                      />
                      <div className="flex-1 bg-white/[0.03] p-2 rounded-xl border border-white/[0.05]">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-[11px] text-[#EBE6DF]">{comment.user}</span>
                          <span className="text-[9px] text-[#77716B]">{comment.timeAgo}</span>
                        </div>
                        <p className="text-[11px] text-[#B8B1AA]">{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex items-center gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Add a respectful patron note..."
                  className="flex-1 h-8 px-3 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF9A3D]/60"
                />
                <button
                  type="submit"
                  disabled={!commentInput.trim()}
                  className="w-8 h-8 rounded-full bg-[#FF9A3D] text-black flex items-center justify-center disabled:opacity-40"
                >
                  <Send size={13} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
