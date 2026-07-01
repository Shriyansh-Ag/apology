"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Music2 } from "lucide-react";

export default function BackgroundMusic({ startWithMusic = false }: { startWithMusic?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (startWithMusic && audioRef.current) {
      audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(true);
    }
  }, [startWithMusic]);

  useEffect(() => {
    const handlePauseMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    const handlePlayMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        setIsPlaying(true);
      }
    };
    window.addEventListener("pause-background-music", handlePauseMusic);
    window.addEventListener("play-background-music", handlePlayMusic);
    return () => {
      window.removeEventListener("pause-background-music", handlePauseMusic);
      window.removeEventListener("play-background-music", handlePlayMusic);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src="/paro.mp3" />
      <motion.button
        onClick={togglePlay}
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg backdrop-blur-md border ${isPlaying ? "bg-blush-300/80 border-blush-400" : "bg-white/80 border-gray-200"
          }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <Music2 className="h-5 w-5 text-blush-600" />
        ) : (
          <Music className="h-5 w-5 text-gray-400" />
        )}
      </motion.button>
    </div>
  );
}
