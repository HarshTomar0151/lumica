import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] max-w-[90%] px-4 py-2.5 rounded-2xl bg-[#140E0A]/90 backdrop-blur-2xl border border-[#FF9A3D]/40 text-white shadow-2xl shadow-black/80 flex items-center gap-2.5 pointer-events-none"
        >
          <span className="text-base">{toast.icon || '✨'}</span>
          <span className="text-xs font-semibold text-[#F5F1EC] tracking-tight">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
