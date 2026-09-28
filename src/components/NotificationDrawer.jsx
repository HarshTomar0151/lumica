import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, DollarSign, Bell, ArrowUpRight, CheckCircle2, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationDrawer() {
  const { isNotificationOpen, setIsNotificationOpen, openCreatorProfile, creators } = useApp();

  if (!isNotificationOpen) return null;

  const notifications = [
    {
      id: 'n1',
      type: 'sub',
      title: 'New VIP Subscriber',
      desc: 'Sarah Montgomery subscribed to your Inner Circle VIP tier ($39.99/mo).',
      time: '4m ago',
      unread: true,
      icon: Sparkles,
      color: 'text-[#FFB15C]',
      bg: 'bg-[#FF9A3D]/20'
    },
    {
      id: 'n2',
      type: 'tip',
      title: 'Tip Received',
      desc: 'Alex Rivera sent a $25.00 tip on "Palazzo Serbelloni Lighting Breakdown".',
      time: '18m ago',
      unread: true,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20'
    },
    {
      id: 'n3',
      type: 'payout',
      title: 'Withdrawal Completed',
      desc: 'Your instant transfer of $4,500.00 to Chase Bank (••4821) was cleared by Stripe.',
      time: '2h ago',
      unread: false,
      icon: ArrowUpRight,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20'
    },
    {
      id: 'n4',
      type: 'like',
      title: 'Post Trending',
      desc: 'Dmitri V. and 142 others liked your latest architectural drop.',
      time: '5h ago',
      unread: false,
      icon: Heart,
      color: 'text-rose-400',
      bg: 'bg-rose-500/20'
    },
    {
      id: 'n5',
      type: 'renewal',
      title: 'Subscription Renewed',
      desc: 'Your monthly access to Julian Vance (Electronic Music) renewed for $9.99.',
      time: '1d ago',
      unread: false,
      icon: CheckCircle2,
      color: 'text-[#FF9A3D]',
      bg: 'bg-[#FF9A3D]/15'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsNotificationOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-[390px] rounded-t-[36px] bg-[#0E0A07]/95 backdrop-blur-3xl border-t border-x border-[#FF9A3D]/30 shadow-2xl p-5 pt-3 text-white overflow-hidden max-h-[85vh] flex flex-col"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FF9A3D]/20 border border-[#FF9A3D]/30 flex items-center justify-center text-[#FFB15C]">
                <Bell size={16} />
              </div>
              <h3 className="text-base font-bold text-white">Notifications</h3>
            </div>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto no-scrollbar space-y-2.5 pb-6">
            {notifications.map(notif => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    notif.unread
                      ? 'bg-gradient-to-r from-[#FF9A3D]/10 to-transparent border-[#FF9A3D]/30'
                      : 'bg-white/[0.03] border-white/[0.06]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl ${notif.bg} flex items-center justify-center ${notif.color} flex-shrink-0 mt-0.5`}>
                    <Icon size={17} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                      <span className="text-[10px] text-[#77716B] font-mono">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-[#B8B1AA] leading-relaxed">{notif.desc}</p>
                  </div>
                  {notif.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#FF9A3D] flex-shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
