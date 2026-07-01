"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 z-10">
      {/* Decorative Cats */}
      <motion.div
        className="absolute left-[10%] top-[20%] text-7xl opacity-80"
        animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🐈
      </motion.div>
      <motion.div
        className="absolute right-[15%] bottom-[20%] text-7xl opacity-80"
        animate={{ y: [0, 15, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🐱💗
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-3xl text-center space-y-8 backdrop-blur-sm bg-white/40 p-10 rounded-[40px] shadow-xl border border-white/60"
      >
        <motion.h1
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="font-handwriting text-5xl md:text-7xl text-blush-500 drop-shadow-sm"
        >
          I Know I Fucked Up
        </motion.h1>

        <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
          <p>
            Hey Laddoo , I am really sorry for breaking your heart and I hate myself for letting you beleive that I am someone you think I am not.
          </p>
          <p>
            You mean the world to me and id hate myself if i let you go. Please kishmish just watch this video below , I mean every single word of it.
          </p>
        </div>
      </motion.div>

      {/* Soft glowing blob behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blush-200/40 to-peach-100/40 rounded-full blur-[80px] -z-10"></div>
    </section>
  );
}
