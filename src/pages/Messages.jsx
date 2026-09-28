import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, MessageSquare, CheckCheck, Users, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ChatView from './ChatView';

export default function Messages() {
  const { conversations, selectedChat, openChat } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  if (selectedChat) {
    return <ChatView conversation={selectedChat} />;
  }

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-full pb-2 text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Messages
          </h1>
          <p className="text-xs text-[#8E867E] font-medium tracking-tight mt-0.5">
            Direct VIP Patron Channels
          </p>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-[#FF9A3D]/10 border border-[#FF9A3D]/30 text-[11px] font-semibold text-[#FFB15C] flex items-center gap-1">
          <Shield size={12} />
          <span>Encrypted</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 text-[#8E867E] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
          />
        </div>
      </div>

      {/* Online Creators Quick Row */}
      <div className="px-4 mb-4">
        <span className="text-[10px] font-bold text-[#8E867E] uppercase tracking-wider block mb-2 px-1">
          Active Now
        </span>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {conversations.filter(c => c.online).map(c => (
            <div
              key={c.id}
              onClick={() => openChat(c)}
              className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFB15C] to-[#E87524] group-hover:scale-105 transition-transform">
                  <img src={c.avatar} alt={c.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
              </div>
              <span className="text-[10px] text-[#C5BFB8] truncate max-w-[50px]">
                {c.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Thread List */}
      <div className="px-4">
        <span className="text-[10px] font-bold text-[#8E867E] uppercase tracking-wider block mb-2 px-1">
          Recent Conversations
        </span>

        <div className="space-y-2">
          {filteredConversations.map(conv => {
            const lastMsg = conv.messages[conv.messages.length - 1];

            return (
              <motion.div
                key={conv.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openChat(conv)}
                className="p-3.5 rounded-2xl bg-[#0E0A07]/80 backdrop-blur-xl border border-white/[0.06] hover:border-[#FF9A3D]/30 flex items-center gap-3 cursor-pointer transition-all"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFB15C] to-[#E87524] flex-shrink-0">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 truncate">
                      <h4 className="text-xs font-bold text-white truncate">{conv.name}</h4>
                      {conv.verified && (
                        <span className="w-3 h-3 rounded-full bg-[#FF9A3D] text-black text-[8px] font-bold flex items-center justify-center">✓</span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#77716B] font-mono flex-shrink-0">
                      {lastMsg?.time || '10:14 AM'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-[#A8A19A] truncate max-w-[200px]">
                      {lastMsg?.isMedia ? '📷 Shared photo asset' : (lastMsg?.text || 'Start conversation')}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#FF9A3D] text-black text-[9px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
