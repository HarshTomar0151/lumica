import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Bell, 
  Send, 
  Share2, 
  Plus, 
  Layers, 
  Edit3, 
  UserCheck, 
  Zap, 
  Eye,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreatorDashboard() {
  const { 
    currentUser, 
    analytics, 
    setIsWithdrawModalOpen, 
    setIsCreateModalOpen, 
    setIsMassDMOpen,
    setIsShareLinkOpen,
    setIsEditProfileOpen,
    setIsSubManagerOpen,
    setIsContentLibraryOpen,
    navigateTo, 
    switchToPatronFeed,
    logoutUser,
    handleCompleteChallenge,
    setIsNotificationOpen,
    showToast 
  } = useApp();

  const revenueSummary = analytics.revenueSummary;

  return (
    <div className="w-full min-h-full pb-3 text-white">
      {/* Top Bar with Mode Switcher and Quick Actions */}
      <header className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF9A3D]/15 text-[#FFB15C] border border-[#FF9A3D]/30 font-bold uppercase tracking-wider">
              Creator Studio
            </span>
            <button
              onClick={switchToPatronFeed}
              className="text-[10px] text-[#A8A19A] hover:text-[#FFB15C] font-semibold transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <span>• Switch to Feed ➔</span>
            </button>
          </div>
          <span className="text-xs text-[#A8A19A] block font-medium">Good morning,</span>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans leading-tight">
            <span className="gold-gradient-text font-serif italic text-2xl">{currentUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-[11px] text-[#8E867E] mt-0.5">Your creator business at a glance</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsNotificationOpen(true)}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/12 flex items-center justify-center text-[#EBE6DF] hover:text-[#FFB15C] hover:bg-white/10 transition-all relative shadow-sm"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF9A3D] shadow-[0_0_8px_#FF9A3D]" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={logoutUser}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/12 flex items-center justify-center text-[#8E867E] hover:text-rose-400 hover:bg-rose-500/10 transition-all shadow-sm"
            title="Log Out"
          >
            <LogOut size={17} />
          </motion.button>
        </div>
      </header>

      {/* Hero Revenue Card with Animated Chart */}
      <div className="px-4 mb-4">
        <div className="relative rounded-[30px] bg-gradient-to-b from-[#1E140C] to-[#0D0906] border border-[#FF9A3D]/35 p-5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF9A3D]/15 blur-3xl pointer-events-none rounded-full" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#B8B1AA] flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#FF9A3D]" /> Total Earnings
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
              {revenueSummary.revenueGrowth} this month
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-3xl font-extrabold text-white font-sans tracking-tight">
              {revenueSummary.totalEarnings}
            </h2>
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="px-3 py-1.5 rounded-xl amber-gradient-btn text-black font-bold text-xs flex items-center gap-1 shadow-md shadow-[#FF9A3D]/25"
            >
              <ArrowUpRight size={13} />
              <span>Withdraw</span>
            </button>
          </div>

          {/* Animated SVG Sparkline */}
          <div className="w-full h-24 relative mb-2">
            <svg viewBox="0 0 320 80" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9A3D" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FF9A3D" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,65 Q40,50 80,55 T160,35 T240,20 T320,8 L320,80 L0,80 Z"
                fill="url(#revenueGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.path
                d="M0,65 Q40,50 80,55 T160,35 T240,20 T320,8"
                fill="none"
                stroke="#FFB15C"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <circle cx="320" cy="8" r="4" fill="#FF9A3D" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] text-[#77716B] font-mono border-t border-white/[0.06] pt-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span className="text-[#FFB15C] font-bold">Sun ($2,350)</span>
          </div>
        </div>
      </div>

      {/* Creator Growth & Monetization Action Suite (Section 4.1 Features) */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          {/* Create Post */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF9A3D]/40 flex flex-col items-center gap-1.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF9A3D]/20 text-[#FFB15C] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={16} />
            </div>
            <span className="text-[11px] font-bold text-white">Create Post</span>
            <span className="text-[9px] text-[#77716B]">New 4K drop</span>
          </button>

          {/* Mass DM */}
          <button
            onClick={() => setIsMassDMOpen(true)}
            className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF9A3D]/40 flex flex-col items-center gap-1.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF9A3D]/20 text-[#FFB15C] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send size={15} />
            </div>
            <span className="text-[11px] font-bold text-white">Mass DM</span>
            <span className="text-[9px] text-[#77716B]">Broadcast 2.4K</span>
          </button>

          {/* Share Your Link */}
          <button
            onClick={() => setIsShareLinkOpen(true)}
            className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF9A3D]/40 flex flex-col items-center gap-1.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF9A3D]/20 text-[#FFB15C] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Share2 size={15} />
            </div>
            <span className="text-[11px] font-bold text-white">Share Link</span>
            <span className="text-[9px] text-[#77716B]">Custom URL</span>
          </button>
        </div>
      </div>

      {/* Creator Management Quick Rows */}
      <div className="px-4 mb-4 grid grid-cols-3 gap-2">
        <button
          onClick={() => setIsSubManagerOpen(true)}
          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-left hover:border-white/20"
        >
          <div className="flex items-center gap-1.5 text-[10px] text-[#FFB15C] font-semibold mb-0.5">
            <UserCheck size={12} /> Subscribers
          </div>
          <span className="text-xs font-bold text-white">2,481 Active</span>
        </button>

        <button
          onClick={() => setIsContentLibraryOpen(true)}
          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-left hover:border-white/20"
        >
          <div className="flex items-center gap-1.5 text-[10px] text-[#FFB15C] font-semibold mb-0.5">
            <Layers size={12} /> Library
          </div>
          <span className="text-xs font-bold text-white">148 Drops</span>
        </button>

        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-left hover:border-white/20"
        >
          <div className="flex items-center gap-1.5 text-[10px] text-[#FFB15C] font-semibold mb-0.5">
            <Edit3 size={12} /> Pricing
          </div>
          <span className="text-xs font-bold text-white">$14.99/mo</span>
        </button>
      </div>

      {/* Four KPI Cards Grid */}
      <div className="px-4 grid grid-cols-2 gap-2.5 mb-5">
        <div 
          onClick={() => navigateTo('analytics')}
          className="p-3.5 rounded-2xl bg-[#0E0A07]/80 backdrop-blur-xl border border-white/[0.07] hover:border-[#FF9A3D]/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#8E867E]">Monthly MRR</span>
            <span className="text-[9px] text-emerald-400 font-semibold">{revenueSummary.revenueGrowth}</span>
          </div>
          <div className="text-base font-bold text-white">{revenueSummary.monthlyRevenue}</div>
          <div className="text-[9px] text-[#77716B] mt-1">Recurring revenue</div>
        </div>

        <div 
          onClick={() => setIsSubManagerOpen(true)}
          className="p-3.5 rounded-2xl bg-[#0E0A07]/80 backdrop-blur-xl border border-white/[0.07] hover:border-[#FF9A3D]/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#8E867E]">Active Subs</span>
            <span className="text-[9px] text-emerald-400 font-semibold">{revenueSummary.subscribersGrowth}</span>
          </div>
          <div className="text-base font-bold text-[#FFB15C]">{revenueSummary.activeSubscribers}</div>
          <div className="text-[9px] text-[#77716B] mt-1">Paying patrons</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0E0A07]/80 backdrop-blur-xl border border-white/[0.07]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#8E867E]">Followers</span>
            <span className="text-[9px] text-emerald-400 font-semibold">+5.4%</span>
          </div>
          <div className="text-base font-bold text-white">34.2K</div>
          <div className="text-[9px] text-[#77716B] mt-1">Total audience</div>
        </div>

        <div 
          onClick={() => setIsWithdrawModalOpen(true)}
          className="p-3.5 rounded-2xl bg-[#0E0A07]/80 backdrop-blur-xl border border-white/[0.07] hover:border-[#FF9A3D]/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#8E867E]">Pending Payout</span>
            <span className="text-[9px] text-[#FFB15C] font-semibold">Stripe</span>
          </div>
          <div className="text-base font-bold text-white">{revenueSummary.pendingPayout}</div>
          <div className="text-[9px] text-[#77716B] mt-1">Rolling tomorrow</div>
        </div>
      </div>

      {/* Daily Challenges Card */}
      <div className="px-4 mb-5">
        <div className="p-4 rounded-[26px] bg-[#120D09]/90 border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Zap size={15} className="text-[#FF9A3D]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#EBE6DF]">
                Today’s Challenges
              </h3>
            </div>
            <span className="text-[10px] text-[#FFB15C] font-mono font-bold">2/3 Done</span>
          </div>

          <div className="space-y-2.5">
            {analytics.dailyChallenges.map((ch) => (
              <div
                key={ch.id}
                onClick={() => !ch.completed && handleCompleteChallenge(ch.id)}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  ch.completed
                    ? 'bg-white/[0.02] border-white/[0.04] opacity-75'
                    : 'bg-[#FF9A3D]/10 border-[#FF9A3D]/30 hover:border-[#FF9A3D]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold ${ch.completed ? 'text-[#77716B]' : 'text-[#FF9A3D]'}`}>
                    {ch.number}
                  </span>
                  <div>
                    <h4 className={`text-xs font-bold ${ch.completed ? 'line-through text-[#8E867E]' : 'text-white'}`}>
                      {ch.title}
                    </h4>
                    <span className="text-[10px] text-[#8E867E]">{ch.reward}</span>
                  </div>
                </div>

                {ch.completed ? (
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#FF9A3D] flex items-center justify-center text-[10px] text-[#FF9A3D] font-bold">
                    +
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E]">
            Recent Activity
          </h3>
          <button onClick={() => navigateTo('wallet')} className="text-[11px] text-[#FFB15C] font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-2">
          {analytics.recentActivity.map(act => (
            <div
              key={act.id}
              className="p-3 rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-white">
                    <strong>{act.user}</strong> <span className="text-[#A8A19A] font-normal">{act.action}</span>
                  </div>
                  <span className="text-[10px] text-[#77716B] font-mono">{act.time}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#FFB15C] font-mono">
                {act.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
