import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Users, Sparkles, CheckCircle2, XCircle, Clock, DollarSign, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_SUBSCRIBERS_LIST } from '../data/creators';

export default function SubscriberManagerSheet() {
  const { isSubManagerOpen, setIsSubManagerOpen, openChat, showToast } = useApp();
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS_LIST);
  const [filter, setFilter] = useState('all'); // all | active | expired | cancelled
  const [search, setSearch] = useState('');

  if (!isSubManagerOpen) return null;

  const filtered = subscribers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.handle.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && s.status === filter;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSubManagerOpen(false)}
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
                <Users size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Subscriber Directory</h3>
                <p className="text-xs text-[#8E867E]">{subscribers.length} total patron records</p>
              </div>
            </div>
            <button
              onClick={() => setIsSubManagerOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex items-center mb-3">
            <Search size={15} className="absolute left-3 text-[#8E867E]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patron name or @username..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
            {['all', 'active', 'expired', 'cancelled'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize transition-all ${
                  filter === tab
                    ? 'bg-[#FF9A3D]/25 border border-[#FF9A3D] text-[#FFB15C]'
                    : 'bg-white/[0.03] border border-white/[0.06] text-[#8E867E]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Subscribers List */}
          <div className="overflow-y-auto no-scrollbar pb-6 space-y-2">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#77716B]">No subscribers found.</div>
            ) : (
              filtered.map(sub => (
                <div
                  key={sub.id}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={sub.avatar} alt={sub.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">{sub.name}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          sub.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : (sub.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-[#8E867E]')
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#FFB15C] block">{sub.tier} ({sub.price})</span>
                      <span className="text-[9px] text-[#77716B]">Total spent: {sub.totalSpent} • Joined {sub.joinedDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubManagerOpen(false);
                      openChat({
                        id: `conv_${sub.id}`,
                        name: sub.name,
                        handle: sub.handle,
                        avatar: sub.avatar,
                        online: true,
                        messages: [
                          { id: 'm_init', sender: 'creator', text: `Hi ${sub.name.split(' ')[0]}! Thanks for backing my patron vault.`, time: 'Just now' }
                        ]
                      });
                    }}
                    className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80 hover:text-[#FF9A3D]"
                  >
                    <Mail size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
