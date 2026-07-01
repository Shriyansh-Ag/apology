"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2 } from "lucide-react";

export default function LoadingScreen({ onLoaded }: { onLoaded: (playMusic: boolean) => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = (playMusic: boolean) => {
    setIsVisible(false);
    setTimeout(() => onLoaded(playMusic), 800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream/95 backdrop-blur-md"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-8xl mb-6 drop-shadow-md"
          >
            🐈💤
          </motion.div>
          
          {!isReady ? (
            <motion.div className="flex items-center gap-2">
              <p className="font-handwriting text-4xl text-blush-500 drop-shadow-sm">Preparing something from my heart</p>
              <motion.div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="font-handwriting text-4xl text-blush-500"
                  >
                    .
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 mt-4"
            >
              <p className="font-handwriting text-4xl text-blush-500 drop-shadow-sm">Ready for you...</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleEnter(true)}
                  className="flex items-center gap-2 bg-blush-400 hover:bg-blush-500 text-white px-6 py-3 rounded-full font-sans text-lg transition-all shadow-md hover:scale-105 pointer-events-auto cursor-none"
                >
                  <Music2 size={20} />
                  Enter with Music
                </button>
                <button 
                  onClick={() => handleEnter(false)}
                  className="flex items-center gap-2 bg-white/80 border border-gray-200 hover:bg-white text-gray-500 px-6 py-3 rounded-full font-sans text-lg transition-all shadow-sm hover:scale-105 pointer-events-auto cursor-none"
                >
                  <Music size={20} />
                  Enter silently
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
