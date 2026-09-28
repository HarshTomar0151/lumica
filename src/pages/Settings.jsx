import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Bell, CreditCard, Building, Lock, Globe, Trash2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { navigateTo, showToast } = useApp();
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
    <div className="w-full min-h-full pb-2 text-white">
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
            Settings
          </h1>
          <p className="text-xs text-[#8E867E]">Security, Payouts & Preferences</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Security & Authentication */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] px-1 mb-2">
            Security & Authentication
          </h3>
          <div className="rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] divide-y divide-white/[0.06] overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-white">
                  <Shield size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Face ID / Biometric Passkey</span>
                  <span className="text-[10px] text-[#77716B]">Prompt on app unlock & transfers</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setFaceIdEnabled(!faceIdEnabled);
                  showToast(faceIdEnabled ? 'Face ID disabled' : 'Face ID activated', '🔐');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                  faceIdEnabled ? 'bg-[#FF9A3D]' : 'bg-white/20'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${faceIdEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div 
              onClick={() => showToast('2FA settings updated', '🔑')}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-white">
                  <Lock size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Two-Factor Authentication</span>
                  <span className="text-[10px] text-emerald-400">Enabled (Authenticator App)</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#77716B]" />
            </div>
          </div>
        </div>

        {/* Payout & Billing */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] px-1 mb-2">
            Payout & Financial
          </h3>
          <div className="rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] divide-y divide-white/[0.06] overflow-hidden">
            <div 
              onClick={() => navigateTo('wallet')}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#FF9A3D]">
                  <Building size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Stripe Connect Settings</span>
                  <span className="text-[10px] text-[#77716B]">Chase Private Client (••4821)</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#77716B]" />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] px-1 mb-2">
            Notification Preferences
          </h3>
          <div className="rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-white">
                <Bell size={16} />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Instant Push Notifications</span>
                <span className="text-[10px] text-[#77716B]">Drop alerts, tips, and direct chats</span>
              </div>
            </div>
            <button
              onClick={() => {
                setPushNotifs(!pushNotifs);
                showToast(pushNotifs ? 'Notifications muted' : 'Notifications enabled', '🔔');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                pushNotifs ? 'bg-[#FF9A3D]' : 'bg-white/20'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-black transition-transform ${pushNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-2">
          <button
            onClick={() => showToast('Account export requested to email', '📦')}
            className="w-full p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/15 transition-all"
          >
            <Trash2 size={15} />
            <span>Close Lumina Account & Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
