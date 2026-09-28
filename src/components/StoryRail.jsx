import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, Lock, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StoryRail() {
  const { creators, currentUser, setActiveStory, userSubscriptions } = useApp();

  const creatorsWithStories = creators.filter(c => c.stories && c.stories.length > 0);

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-4 flex items-center gap-3.5 select-none">
      {/* Current User Story / Add Button */}
      <motion.div 
        whileTap={{ scale: 0.94 }}
        className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
        onClick={() => {
          setActiveStory({
            creator: {
              name: 'You',
              handle: currentUser.handle,
              avatar: currentUser.avatar
            },
            storyIndex: 0,
            storyItem: {
              id: 'my-story',
              mediaUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
              caption: 'Morning creative flow in the studio ✨',
              timestamp: 'Just now'
            }
          });
        }}
      >
        <div className="relative">
          <div className="w-[66px] h-[66px] rounded-full p-[2px] bg-white/10 border border-white/15 flex items-center justify-center">
            <img
              src={currentUser.avatar}
              alt="My Avatar"
              className="w-full h-full rounded-full object-cover grayscale-[20%]"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-gradient-to-tr from-[#FFB15C] to-[#E87524] text-black flex items-center justify-center border-2 border-[#090705] shadow-md font-bold">
            <Plus size={13} strokeWidth={3} />
          </div>
        </div>
        <span className="text-[11px] text-[#8E867E] font-medium tracking-tight">Your Story</span>
      </motion.div>

      {/* Creators Stories */}
      {creatorsWithStories.map((creator, idx) => {
        const isSubscribed = userSubscriptions.includes(creator.id);
        const hasLockedStory = creator.stories.some(s => s.locked) && !isSubscribed;
        const isLive = idx === 0;

        return (
          <motion.div
            key={creator.id}
            whileTap={{ scale: 0.94 }}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
            onClick={() => {
              setActiveStory({
                creator: creator,
                storyIndex: 0,
                storyItem: creator.stories[0]
              });
            }}
          >
            <div className="relative">
              {/* Instagram-style Conic Amber Ring with dynamic luxury pulse */}
              <div className="w-[68px] h-[68px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#FFD4A3] via-[#FF9A3D] to-[#E87524] shadow-[0_0_15px_rgba(255,154,61,0.35)] group-hover:shadow-[0_0_25px_rgba(255,154,61,0.65)] group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full rounded-full p-[2px] bg-[#070503]">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* LIVE / Locked Badge */}
              {isLive ? (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#E87524] text-[8px] font-black tracking-wider text-white uppercase border border-[#070503] shadow-md flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>LIVE</span>
                </div>
              ) : hasLockedStory && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1A120D] border border-[#FF9A3D]/60 text-[#FF9A3D] flex items-center justify-center shadow">
                  <Lock size={9} />
                </div>
              )}
            </div>

            <span className="text-[11px] text-[#EBE6DF] font-semibold tracking-tight truncate max-w-[66px] text-center">
              {creator.name.split(' ')[0]}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
