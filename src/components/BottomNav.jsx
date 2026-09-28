import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Plus, 
  MessageSquare, 
  User, 
  LayoutDashboard, 
  TrendingUp, 
  Wallet,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { 
    activeTab, 
    navigateTo, 
    isCreatorMode, 
    setIsCreateModalOpen,
    conversations,
    selectedCreator,
    selectedChat
  } = useApp();

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const subscriberNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'create', label: 'Create', icon: Plus, isAction: true },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const creatorNavItems = [
    { id: 'dashboard', label: 'Studio', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'create', label: 'Create', icon: Plus, isAction: true },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Account', icon: User },
  ];

  const items = isCreatorMode ? creatorNavItems : subscriberNavItems;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none pb-5 pt-2 px-3">
      {/* Background Opaque Barrier to prevent any content bleedthrough under the dock */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070503] via-[#070503]/95 to-transparent pointer-events-none" />

      {/* Floating Bespoke Obsidian Luxury Island Dock */}
      <nav 
        aria-label="Mobile Navigation"
        className="pointer-events-auto relative w-full rounded-[30px] bg-[#0E0905]/95 backdrop-blur-3xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,154,61,0.18)] px-2.5 py-1.5 flex items-center justify-between select-none"
      >
        {/* Subtle Top Specular Metallic Edge Line */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#FFD4A3]/50 to-transparent pointer-events-none" />

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && !selectedCreator && !selectedChat;
          const isCreateAction = item.isAction;

          // Centerpiece Action Button (Perfect Center Alignment)
          if (isCreateAction) {
            return (
              <div key={item.id} className="relative flex items-center justify-center px-1">
                {/* Luminous Pulsating Amber Halo Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF9A3D]/30 via-[#E87524]/15 to-transparent blur-md pointer-events-none" />

                <motion.button
                  onClick={() => setIsCreateModalOpen(true)}
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFE4C4] via-[#FF9A3D] to-[#E87524] shadow-[0_4px_15px_rgba(0,0,0,0.8),0_0_15px_rgba(255,154,61,0.35)] flex items-center justify-center focus:outline-none group cursor-pointer"
                  aria-label="Create New Drop"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#24170E] via-[#160E08] to-[#0A0604] flex items-center justify-center border border-white/20">
                    <Plus size={18} strokeWidth={2.8} className="text-[#FFD4A3] group-hover:scale-110 transition-transform" />
                  </div>
                </motion.button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="relative flex-1 flex flex-col items-center justify-center py-1.5 transition-all duration-200 group focus:outline-none"
            >
              {/* Luminous Liquid Light Capsule Backdrop for Active Tab */}
              {isActive && (
                <motion.div
                  layoutId="dockActiveBackdrop"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 mx-1 rounded-2xl bg-gradient-to-b from-[#FF9A3D]/18 to-[#E87524]/08 border border-[#FF9A3D]/30 shadow-[0_0_15px_rgba(255,154,61,0.2)]"
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Container */}
                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-[#FFB15C] drop-shadow-[0_0_10px_rgba(255,177,92,0.8)] scale-110' 
                        : 'text-[#8E867E] group-hover:text-white group-hover:scale-105'
                    }`}
                  />

                  {/* Unread Luxury Amber Gem Badge */}
                  {item.badge > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] rounded-full bg-gradient-to-tr from-[#FF9A3D] to-[#E87524] text-[9px] font-black text-black flex items-center justify-center px-1 border border-[#0A0604] shadow-[0_0_8px_#FF9A3D]"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[9.5px] mt-0.5 font-sans tracking-tight transition-all duration-300 ${
                    isActive ? 'text-white font-extrabold tracking-wide' : 'text-[#77716B] group-hover:text-[#A8A19A] font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
