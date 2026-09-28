import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, SlidersHorizontal, Flame, Award, Filter, Crown, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CreatorCard from '../components/CreatorCard';

export default function Discover() {
  const { creators, openCreatorProfile } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Trending',
    'Haute Couture',
    'Electronic Music',
    'Biohacking & Fitness',
    'Private Equity',
    'Architecture'
  ];

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Trending') return matchesSearch && creator.subscribers > 10000;
    return matchesSearch && creator.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="w-full min-h-full pb-3 text-white">
      {/* Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Compass size={14} className="text-[#FF9A3D]" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#FFB15C]">
              Curated Vaults
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white font-sans">
            Discover
          </h1>
        </div>

        <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] text-[#B8B1AA] font-mono">
          {creators.length} Featured
        </div>
      </div>

      {/* Frosted Glass Search Bar */}
      <div className="px-4 mb-3.5">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 text-[#8E867E] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators, drops, audio stems, LUTs..."
            className="w-full h-11 pl-10 pr-10 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 text-xs text-white placeholder-[#77716B] focus:outline-none focus:border-[#FF9A3D]/60 focus:bg-white/[0.06] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#8E867E] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="w-full overflow-x-auto no-scrollbar px-4 flex items-center gap-2 mb-4 pb-1">
        {categories.map(category => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] text-black font-bold shadow-md shadow-[#FF9A3D]/25'
                  : 'bg-white/[0.04] border border-white/[0.08] text-[#A8A19A] hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Editorial Spotlight Banner */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="px-4 mb-5">
          <div 
            onClick={() => openCreatorProfile(creators[0])}
            className="relative rounded-[30px] overflow-hidden bg-gradient-to-tr from-[#1E140C] to-[#0A0705] border border-[#FF9A3D]/35 p-4 shadow-2xl cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF9A3D]/15 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FFB15C] uppercase tracking-wider mb-2">
              <Crown size={13} />
              Editorial Spotlight • Milan Fashion Week
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#FFB15C] transition-colors">
              Elena Rostova Lookbook Vault
            </h3>
            <p className="text-xs text-[#B8B1AA] mb-3 leading-relaxed">
              24 new color-graded film masters and uncompressed medium format TIFF files available for subscribers.
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
              <span className="text-xs font-extrabold text-[#FF9A3D] font-mono">$14.99 / month</span>
              <span className="text-[11px] text-white/90 underline font-semibold flex items-center gap-1">
                Explore Vault →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Creator Grid List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-[#FF9A3D]" />
            <span className="text-xs font-bold tracking-wider uppercase text-[#EBE6DF]">
              Featured Creators ({filteredCreators.length})
            </span>
          </div>
        </div>

        {filteredCreators.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-xs text-[#77716B]">No creators found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div>
            {filteredCreators.map(creator => (
              <CreatorCard key={creator.id} creator={creator} variant="discover" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
