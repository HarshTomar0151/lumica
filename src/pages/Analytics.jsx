import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Sparkles, Layers, Eye, Award, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Analytics() {
  const { analytics } = useApp();
  const [activeTab, setActiveTab] = useState('revenue'); // revenue, subscribers, posts, stories
  const [timeRange, setTimeRange] = useState('7D');

  const chartData = analytics.revenueChart7D;
  const maxRev = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className="w-full min-h-full pb-36 text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Analytics
        </h1>
        <p className="text-xs text-[#8E867E]">Performance intelligence & growth metrics</p>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex p-1 rounded-2xl bg-white/[0.04] border border-white/10">
          {[
            { id: 'revenue', label: 'Revenue' },
            { id: 'subscribers', label: 'Subscribers' },
            { id: 'posts', label: 'Top Posts' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black font-bold shadow'
                  : 'text-[#8E867E] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Card */}
      {activeTab === 'revenue' && (
        <div className="px-4 mb-4">
          <div className="p-4 rounded-[28px] bg-[#110C08]/90 border border-[#FF9A3D]/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] text-[#8E867E] uppercase font-bold tracking-wider">Weekly Revenue Growth</span>
                <div className="text-xl font-bold text-white mt-0.5">$11,540 <span className="text-xs text-emerald-400 font-normal">+18.4%</span></div>
              </div>

              {/* Time Range Pills */}
              <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                {['7D', '30D', '1Y'].map(r => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      timeRange === r ? 'bg-[#FF9A3D] text-black' : 'text-[#8E867E]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart Visualizer */}
            <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2">
              {chartData.map((bar, idx) => {
                const heightPercent = (bar.revenue / maxRev) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="w-full flex items-end justify-center h-28 relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-1.5 py-0.5 rounded text-[9px] text-[#FFB15C] font-mono border border-white/10 pointer-events-none whitespace-nowrap">
                        ${bar.revenue}
                      </div>

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.08 }}
                        className="w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-[#E87524] to-[#FFB15C] shadow-md shadow-[#FF9A3D]/20 group-hover:brightness-125 transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-[#8E867E] font-mono">{bar.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscribers' && (
        <div className="px-4 mb-4">
          <div className="p-4 rounded-[28px] bg-[#110C08]/90 border border-[#FF9A3D]/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] text-[#8E867E] uppercase font-bold tracking-wider">Subscriber Inflow</span>
                <div className="text-xl font-bold text-[#FFB15C] mt-0.5">2,481 <span className="text-xs text-emerald-400 font-normal">+12.8%</span></div>
              </div>
            </div>

            <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2">
              {chartData.map((bar, idx) => {
                const heightPercent = (bar.subscribers / 45) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="w-full flex items-end justify-center h-28 relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.08 }}
                        className="w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-md group-hover:brightness-125 transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-[#8E867E] font-mono">{bar.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Top Performing Publications */}
      <div className="px-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E867E] mb-2.5 px-1">
          Top Earning Publications
        </h3>

        <div className="space-y-2.5">
          {analytics.topPerformingPosts.map((post, idx) => (
            <div
              key={post.id}
              className="p-3.5 rounded-2xl bg-[#0E0A07]/80 border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black font-extrabold flex items-center justify-center text-xs">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 max-w-[170px]">{post.title}</h4>
                  <span className="text-[10px] text-[#77716B]">{post.views} views • {post.subscribersGained} new subs</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#FFB15C] block font-mono">{post.revenue}</span>
                <span className="text-[9px] text-emerald-400 font-medium">{post.engagement} eng</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
