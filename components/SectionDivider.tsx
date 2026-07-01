"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center gap-6 py-12 w-full z-10 relative"
    >
      <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blush-300 rounded-full" />
      <span className="text-blush-400 flex gap-4 text-2xl">
        <span>🐾</span>
        <span className="animate-pulse">♡</span>
        <span>🐾</span>
      </span>
      <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blush-300 rounded-full" />
    </motion.div>
  );
}
