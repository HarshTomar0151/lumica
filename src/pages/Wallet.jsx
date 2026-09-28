import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Building, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Wallet() {
  const { analytics, setIsWithdrawModalOpen, showToast } = useApp();
  const [filter, setFilter] = useState('all');

  const stripe = analytics.stripeConnect;
  const transactions = analytics.transactions;

  const filteredTx = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="w-full min-h-full pb-36 text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Earnings Wallet
        </h1>
        <p className="text-xs text-[#8E867E]">Stripe Connect financial terminal</p>
      </div>

      {/* Main Balance Hero Card */}
      <div className="px-4 mb-4">
        <div className="relative rounded-[30px] bg-gradient-to-b from-[#1C130A] to-[#0D0906] border border-[#FF9A3D]/30 p-5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF9A3D]/15 blur-3xl pointer-events-none" />

          <span className="text-xs font-semibold text-[#8E867E] block mb-1">Available for Payout</span>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-4">
            $8,420.50
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08] mb-4">
            <div>
              <span className="text-[10px] text-[#77716B] block">Pending Settlement</span>
              <span className="text-sm font-bold text-white font-mono">$1,240.00</span>
            </div>
            <div>
              <span className="text-[10px] text-[#77716B] block">Lifetime Payouts</span>
              <span className="text-sm font-bold text-[#FFB15C] font-mono">$48,920.40</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsWithdrawModalOpen(true)}
              className="flex-1 py-3 rounded-xl amber-gradient-btn text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF9A3D]/25"
            >
              <ArrowUpRight size={15} />
              <span>Withdraw to Bank</span>
            </motion.button>

            <button
              onClick={() => showToast('Bank account options', '🏦')}
              className="px-3.5 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white hover:bg-white/10 flex items-center gap-1"
            >
              <Plus size={15} />
              <span>Method</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stripe Connect Card */}
      <div className="px-4 mb-4">
        <div className="p-4 rounded-[24px] bg-[#110C08]/90 border border-white/[0.07] shadow-lg">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Building size={16} className="text-[#FF9A3D]" />
              <span className="text-xs font-bold text-white">Stripe Custom Connect</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 size={10} /> Connected
            </span>
          </div>

          <div className="space-y-1 text-xs text-[#A8A19A]">
            <div className="flex justify-between">
              <span>Account:</span>
              <span className="text-white font-medium">{stripe.payoutAccount}</span>
            </div>
            <div className="flex justify-between">
              <span>Verification:</span>
              <span className="text-[#FFB15C] font-medium">{stripe.identityStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Auto-Payout:</span>
              <span className="text-white font-mono text-[11px]">{stripe.nextAutoPayout}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E]">
            Transaction Ledger
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
          {['all', 'subscription', 'tip', 'payout'].map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize transition-all ${
                filter === tag
                  ? 'bg-[#FF9A3D]/25 border border-[#FF9A3D] text-[#FFB15C]'
                  : 'bg-white/[0.03] border border-white/[0.06] text-[#8E867E]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2">
          {filteredTx.map(tx => (
            <div
              key={tx.id}
              className="p-3.5 rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                  {tx.type === 'payout' ? <ArrowUpRight size={16} /> : (tx.type === 'tip' ? <DollarSign size={16} /> : <Sparkles size={16} />)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{tx.title}</h4>
                  <span className="text-[10px] text-[#77716B]">{tx.date} • {tx.source}</span>
                </div>
              </div>

              <span className={`text-xs font-bold font-mono ${tx.positive ? 'text-emerald-400' : 'text-white'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
