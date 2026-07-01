"use client";

import { motion } from "framer-motion";

export default function FinalSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 overflow-hidden z-10">
      {/* Background Gradient purely for this section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blush-100/50 to-pink-100/70 -z-10" />

      {/* Decorative Cats Hugging */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="text-9xl mb-12 drop-shadow-lg"
      >
        🫂😽
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center flex flex-col items-center"
      >
        <motion.h2
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="font-handwriting text-6xl md:text-8xl text-blush-600 drop-shadow-md mb-8"
        >
          "I do love you ❤️"
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="font-handwriting text-4xl text-gray-600 opacity-90"
        >
          And I always will.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="font-handwriting text-4xl text-gray-600 opacity-90"
        >
          p.s : I am not like the other guys
        </motion.p>
      </motion.div>

      {/* Tiny floating hearts just for the final section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`final-heart-${i}`}
            className="absolute bottom-[-50px] text-blush-300/60 text-3xl"
            initial={{ y: "100vh", x: Math.random() * 100 + "vw" }}
            animate={{ y: "-20vh", x: Math.random() * 100 + "vw" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </section>
  );
}
