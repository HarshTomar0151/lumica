import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Plus, Trash2, Download, AlertTriangle, CheckCircle2, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_INVOICES } from '../data/creators';

export default function SubscriberBilling() {
  const { navigateTo, userSubscriptions, creators, handleCancelSubscription, showToast } = useApp();
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [cancellingCreator, setCancellingCreator] = useState(null);
  const [paymentCards, setPaymentCards] = useState([
    { id: 'c_1', brand: 'Apple Pay', last4: '9421', exp: '10/28', default: true },
    { id: 'c_2', brand: 'Visa', last4: '4821', exp: '04/27', default: false },
  ]);

  const activeCreators = creators.filter(c => userSubscriptions.includes(c.id));

  const onConfirmCancel = () => {
    if (!cancellingCreator) return;
    handleCancelSubscription(cancellingCreator.id);
    showToast(`Subscription to ${cancellingCreator.name} cancelled`, 'ℹ️');
    setCancellingCreator(null);
  };

  const handleAddCard = () => {
    const newCard = {
      id: `c_${Date.now()}`,
      brand: 'Mastercard',
      last4: `${Math.floor(1000 + Math.random() * 9000)}`,
      exp: '12/29',
      default: false
    };
    setPaymentCards(prev => [...prev, newCard]);
    showToast('New payment card added!', '💳');
  };

  const handleRemoveCard = (cardId) => {
    if (paymentCards.length <= 1) {
      showToast('You must maintain at least one active payment method', '⚠️');
      return;
    }
    setPaymentCards(prev => prev.filter(c => c.id !== cardId));
    showToast('Payment method removed', '🗑️');
  };

  return (
    <div className="w-full min-h-full pb-36 text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigateTo('profile')}
          className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center text-white/80 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">
            Subscriptions & Billing
          </h1>
          <p className="text-xs text-[#8E867E]">Manage auto-renewals & payment cards</p>
        </div>
      </div>

      <div className="px-4 space-y-5">
        {/* Active Subscriptions Section */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E]">
              Active Subscriptions ({activeCreators.length})
            </h3>
            <span className="text-[10px] text-[#FFB15C] font-mono">Auto-renews monthly</span>
          </div>

          <div className="space-y-2.5">
            {activeCreators.length === 0 ? (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center text-xs text-[#77716B]">
                No active subscriptions currently.
              </div>
            ) : (
              activeCreators.map(creator => (
                <div
                  key={creator.id}
                  className="p-3.5 rounded-2xl bg-[#0E0A07]/90 border border-white/[0.08] flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          {creator.name}
                        </h4>
                        <span className="text-[10px] text-[#FFB15C]">${creator.monthlyPrice}/month</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <RefreshCw size={10} className="animate-spin-slow" /> Auto-Renews
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-[#8E867E]">
                    <span>Next billing: Oct 28, 2026</span>
                    <button
                      onClick={() => setCancellingCreator(creator)}
                      className="text-rose-400 hover:underline font-semibold"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payment Methods Section */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E]">
              Payment Methods
            </h3>
            <button
              onClick={handleAddCard}
              className="text-[11px] text-[#FFB15C] font-semibold flex items-center gap-1 hover:underline"
            >
              <Plus size={13} />
              <span>Add Card</span>
            </button>
          </div>

          <div className="space-y-2">
            {paymentCards.map(card => (
              <div
                key={card.id}
                className="p-3 rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#FF9A3D]">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{card.brand} (••••{card.last4})</span>
                      {card.default && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/10 text-white font-mono">Default</span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#77716B]">Expires {card.exp}</span>
                  </div>
                </div>

                {!card.default && (
                  <button
                    onClick={() => handleRemoveCard(card.id)}
                    className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Invoices History Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] mb-2 px-1">
            Billing Receipts & Invoices
          </h3>

          <div className="space-y-2">
            {invoices.map(inv => (
              <div
                key={inv.id}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-white">{inv.creator}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">{inv.status}</span>
                  </div>
                  <span className="text-[10px] text-[#77716B]">{inv.id} • {inv.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white font-mono">{inv.amount}</span>
                  <button
                    onClick={() => showToast(`Invoice ${inv.id} downloaded as PDF`, '📄')}
                    className="p-1.5 rounded-lg bg-white/[0.05] text-white/80 hover:text-white"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      <AnimatePresence>
        {cancellingCreator && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancellingCreator(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-[320px] rounded-3xl bg-[#140E0A] border border-white/15 p-5 text-white shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Cancel Auto-Renewal?</h3>
              <p className="text-xs text-[#A8A19A] mb-4">
                You will retain patron access to {cancellingCreator.name}’s exclusive vault until the current cycle ends.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCancellingCreator(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-xs font-semibold text-white"
                >
                  Keep Active
                </button>
                <button
                  onClick={onConfirmCancel}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 text-xs font-bold text-white shadow"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
