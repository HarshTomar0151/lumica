import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Users, AlertCircle, CheckCircle2, ArrowUpRight, Check, Eye, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ADMIN_STATS } from '../data/creators';

export default function AdminDashboard() {
  const { showToast, triggerConfetti } = useApp();
  const [stats, setStats] = useState(ADMIN_STATS);
  const [pendingPayouts, setPendingPayouts] = useState([
    { id: 'req_1', creator: 'Elena Rostova', amount: '$4,500.00', bank: 'Chase ••4821', adminFee: '$382.50 (8.5%)', time: '12m ago' },
    { id: 'req_2', creator: 'Julian Vance', amount: '$2,100.00', bank: 'Deutsche Bank ••9912', adminFee: '$178.50 (8.5%)', time: '1h ago' },
    { id: 'req_3', creator: 'Aria Thorne', amount: '$1,850.00', bank: 'UBS Zurich ••3301', adminFee: '$157.25 (8.5%)', time: '3h ago' }
  ]);

  const handleApprove = (reqId) => {
    setPendingPayouts(prev => prev.filter(p => p.id !== reqId));
    triggerConfetti();
    showToast('Withdrawal approved & platform commission deposited to Admin Treasury', '🏛️');
  };

  return (
    <div className="w-full min-h-full pb-24 text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold uppercase tracking-wider flex items-center gap-1">
              <Shield size={11} /> Admin Control
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Platform Treasury
          </h1>
          <p className="text-xs text-[#8E867E]">Global fees, creator moderation & payouts</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Admin Revenue Card */}
        <div className="p-5 rounded-[28px] bg-gradient-to-b from-[#1C130A] to-[#0D0906] border border-[#FF9A3D]/35 shadow-2xl">
          <span className="text-[10px] text-[#8E867E] uppercase font-bold tracking-wider">Admin Commission Collected</span>
          <div className="text-2xl font-extrabold text-[#FFB15C] tracking-tight my-1">
            {stats.adminCommissionEarned}
          </div>
          <p className="text-[11px] text-[#A8A19A]">
            8.5% fee charged on subscriptions, tips & withdrawals
          </p>

          <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-white/[0.08] text-xs">
            <div>
              <span className="text-[10px] text-[#77716B] block">Gross Platform Volume</span>
              <span className="font-bold text-white font-mono">{stats.platformGrossVolume}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#77716B] block">Active Creators</span>
              <span className="font-bold text-white font-mono">{stats.totalActiveCreators}</span>
            </div>
          </div>
        </div>

        {/* Pending Payout Approvals */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E]">
              Pending Creator Withdrawals ({pendingPayouts.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {pendingPayouts.length === 0 ? (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center text-xs text-emerald-400 flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} /> All creator withdrawals processed
              </div>
            ) : (
              pendingPayouts.map(req => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-[#0E0A07]/90 border border-white/[0.08] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{req.creator}</h4>
                      <span className="text-[10px] text-[#8E867E]">{req.bank} • Requested {req.time}</span>
                    </div>
                    <span className="text-xs font-bold text-white font-mono">{req.amount}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px]">
                    <span className="text-emerald-400">Admin Cut: {req.adminFee}</span>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-3 py-1 rounded-lg amber-gradient-btn text-black font-bold flex items-center gap-1 shadow"
                    >
                      <Check size={12} strokeWidth={3} />
                      <span>Approve Payout</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
