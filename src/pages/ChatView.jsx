import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Image, DollarSign, Mic, MoreVertical, CheckCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ChatView({ conversation }) {
  const { closeChat, openTipSheet, creators, showToast } = useApp();
  const [messages, setMessages] = useState(conversation.messages || []);
  const [inputText, setInputText] = useState('');

  const creator = creators.find(c => c.id === conversation.creatorId) || {
    id: conversation.creatorId,
    name: conversation.name,
    avatar: conversation.avatar
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: 'Just now',
      isMedia: false
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Mock quick creator response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `m_rep_${Date.now()}`,
          sender: 'creator',
          text: `Thanks for the note, Harsh! I'll be sharing the complete behind-the-scenes recording tonight. ✨`,
          time: 'Just now',
          isMedia: false
        }
      ]);
      showToast(`${conversation.name} replied!`, '💬');
    }, 1800);
  };

  const handleSendPhotoMock = () => {
    const photoMsg = {
      id: `m_photo_${Date.now()}`,
      sender: 'user',
      text: 'Sharing my color grade attempt on your Milan preset:',
      mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      time: 'Just now',
      isMedia: true
    };
    setMessages(prev => [...prev, photoMsg]);
    showToast('Photo attachment sent', '📸');
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#050403] text-white select-none">
      {/* Top Header */}
      <header className="px-4 py-3 bg-[#0D0906]/90 backdrop-blur-2xl border-b border-white/[0.08] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={closeChat}
            className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center text-white/80 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFB15C] to-[#E87524]">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {conversation.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black" />
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1 leading-tight">
                {conversation.name}
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono">
                {conversation.online ? 'Online' : 'Active today'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openTipSheet({ creator })}
            className="px-2.5 py-1 rounded-full bg-[#FF9A3D]/15 border border-[#FF9A3D]/30 text-[#FFB15C] text-[11px] font-semibold flex items-center gap-1"
          >
            <DollarSign size={12} />
            <span>Tip</span>
          </button>

          <button 
            onClick={() => showToast('Chat options', '⚙️')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#77716B] hover:text-white"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </header>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3.5 pb-20">
        {/* Date separator */}
        <div className="text-center my-2">
          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] text-[#77716B] font-mono">
            Direct VIP Patron Channel
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSystemTip = msg.sender === 'system_tip';

          if (isSystemTip) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="p-2.5 rounded-2xl bg-[#FF9A3D]/10 border border-[#FF9A3D]/30 text-center max-w-[280px]">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#FFB15C] mb-0.5">
                    <Sparkles size={12} />
                    {msg.amount} Tip Sent
                  </div>
                  <p className="text-[10px] text-[#B8B1AA]">{msg.text}</p>
                </div>
              </div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-[#FF9A3D]/25 to-[#E87524]/20 border border-[#FF9A3D]/40 text-white rounded-br-sm shadow-md'
                    : 'bg-[#140E0A] border border-white/10 text-[#EBE6DF] rounded-bl-sm shadow'
                }`}
              >
                {msg.isMedia && msg.mediaUrl && (
                  <div className="rounded-xl overflow-hidden mb-2 border border-white/10">
                    <img src={msg.mediaUrl} alt="Attached media" className="w-full h-auto object-cover max-h-48" />
                  </div>
                )}

                <p>{msg.text}</p>

                <div className={`flex items-center gap-1 mt-1 text-[9px] ${isUser ? 'justify-end text-[#FFB15C]/80' : 'text-[#77716B]'}`}>
                  <span>{msg.time}</span>
                  {isUser && <CheckCheck size={11} className="text-[#FF9A3D]" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fixed Composer Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#0D0906]/95 backdrop-blur-2xl border-t border-white/[0.08] z-30">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSendPhotoMock}
            className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#A8A19A] hover:text-[#FF9A3D] transition-colors flex-shrink-0"
            title="Attach Photo"
          >
            <Image size={17} />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message patron channel..."
            className="flex-1 h-10 px-4 rounded-full bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60"
          />

          {inputText.trim() ? (
            <button
              type="submit"
              className="w-10 h-10 rounded-full amber-gradient-btn text-black flex items-center justify-center shadow-lg shadow-[#FF9A3D]/30 flex-shrink-0"
            >
              <Send size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => showToast('Voice note recorded (0:04)', '🎙️')}
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#A8A19A] hover:text-white flex-shrink-0"
            >
              <Mic size={17} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
