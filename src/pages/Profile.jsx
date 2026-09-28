import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CreditCard, 
  Receipt, 
  Bell, 
  Shield, 
  ChevronRight, 
  Layers, 
  Heart, 
  Bookmark, 
  LogOut,
  Zap,
  CheckCircle2,
  Edit3,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { 
    currentUser, 
    isCreatorMode, 
    setIsCreatorMode, 
    navigateTo, 
    creators, 
    userSubscriptions,
    setIsEditProfileOpen,
    logoutUser,
    showToast 
  } = useApp();

  const activeSubscribedCreators = creators.filter(c => userSubscriptions.includes(c.id));

  return (
    <div className="w-full min-h-full pb-3 text-white">
      {/* Header / Avatar Banner */}
      <div className="px-5 pt-2 pb-3 flex flex-col items-center text-center">
        <div className="relative mb-2.5">
          <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-xl shadow-[#FF9A3D]/25">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {currentUser.verified && (
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#FF9A3D] text-black text-[10px] font-black flex items-center justify-center border-2 border-[#070503] shadow">
              ✓
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <h1 className="text-lg font-bold text-white font-sans">{currentUser.name}</h1>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <Edit3 size={12} />
          </button>
        </div>
        <p className="text-xs text-[#8E867E]">@{currentUser.handle} • Patron VIP</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mt-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div>
            <span className="text-sm font-extrabold text-white block">{currentUser.followingCount}</span>
            <span className="text-[10px] text-[#77716B]">Following</span>
          </div>
          <div className="border-x border-white/[0.06]">
            <span className="text-sm font-extrabold text-[#FFB15C] block font-mono">{userSubscriptions.length}</span>
            <span className="text-[10px] text-[#77716B]">Subscriptions</span>
          </div>
          <div>
            <span className="text-sm font-extrabold text-white block">{currentUser.savedCount}</span>
            <span className="text-[10px] text-[#77716B]">Saved Drops</span>
          </div>
        </div>
      </div>

      {/* Creator Mode Switcher Banner */}
      <div className="px-4 mb-4">
        <div
          onClick={() => {
            const nextMode = !isCreatorMode;
            setIsCreatorMode(nextMode);
            navigateTo(nextMode ? 'dashboard' : 'home');
            showToast(nextMode ? 'Switched to Creator Mode' : 'Switched to Subscriber Mode', '✨');
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FF9A3D]/25 via-[#E87524]/15 to-transparent border border-[#FF9A3D]/40 cursor-pointer shadow-lg shadow-[#FF9A3D]/10 hover:border-[#FF9A3D]/70 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black flex items-center justify-center font-bold shadow">
              <Zap size={18} fill="black" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                Creator Business Portal
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#FF9A3D] text-black font-extrabold uppercase">PRO</span>
              </div>
              <p className="text-[10px] text-[#C5BFB8]">
                {isCreatorMode ? 'Currently Active • Tap to exit' : 'Manage $12,840 earnings & publications'}
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[#FF9A3D]" />
        </div>
      </div>

      {/* Active Subscriptions Preview */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E]">
            Active Subscriptions ({activeSubscribedCreators.length})
          </h3>
          <button
            onClick={() => navigateTo('billing')}
            className="text-[11px] text-[#FFB15C] font-semibold hover:underline"
          >
            Manage All
          </button>
        </div>

        <div className="space-y-2">
          {activeSubscribedCreators.map(creator => (
            <div
              key={creator.id}
              className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {creator.name}
                  </h4>
                  <span className="text-[10px] text-[#FFB15C]">${creator.monthlyPrice}/month • Auto-renews</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings Menu List */}
      <div className="px-4 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] px-1 mb-1">
          Preferences & Billing
        </h3>

        {[
          { label: 'Subscriptions & Auto-Renew', sub: 'Manage tier cancellations & renewals', icon: UserCheck, action: () => navigateTo('billing') },
          { label: 'Payment Methods & Cards', sub: 'Apple Pay & Visa (••9421)', icon: CreditCard, action: () => navigateTo('billing') },
          { label: 'Billing Invoices', sub: 'Download PDF tax receipts', icon: Receipt, action: () => navigateTo('billing') },
          { label: 'Edit Profile & Details', sub: 'Change name, handle & bio', icon: Edit3, action: () => setIsEditProfileOpen(true) },
          { label: 'Security & Preferences', sub: '2FA biometric authentication', icon: Shield, action: () => navigateTo('settings') },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else showToast(`${item.label} opened`, '⚙️');
              }}
              className="p-3 rounded-2xl bg-[#0E0A07]/80 backdrop-blur-xl border border-white/[0.06] hover:border-white/20 flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#B8B1AA]">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{item.label}</span>
                  <span className="text-[10px] text-[#77716B]">{item.sub}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#77716B]" />
            </div>
          );
        })}

        {/* Logout */}
        <div className="pt-2">
          <button
            onClick={logoutUser}
            className="w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-[#8E867E] hover:text-white flex items-center justify-center gap-2 hover:bg-white/[0.06]"
          >
            <LogOut size={15} />
            <span>Sign Out of Lumina</span>
          </button>
        </div>
      </div>
    </div>
  );
}
