"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const VIDEO_URL = "/video1.mov"; // Upload your video to the public folder and change name if needed

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        window.dispatchEvent(new CustomEvent("pause-background-music"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
      setProgress(manualChange);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="relative flex w-full flex-col items-center justify-center px-4 py-10 z-10"
    >
      <div className={`relative max-w-4xl w-full rounded-[2rem] p-3 bg-white/20 backdrop-blur-lg border border-blush-200/50 shadow-[0_0_40px_-10px_rgba(255,179,193,0.6)] transition-all duration-700 ${!isPlaying ? "backdrop-blur-xl bg-white/40" : ""}`}>

        {/* Animated glowing border effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blush-300 via-peach-200 to-lavender-300 opacity-30 blur-xl -z-10 animate-pulse" />

        <div className="relative rounded-2xl overflow-hidden group bg-black/10">
          <video
            ref={videoRef}
            src={VIDEO_URL}
            className="w-full h-auto aspect-video object-cover rounded-2xl cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 rounded-b-2xl">

            {/* Seek Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blush-400 hover:h-2.5 transition-all"
            />

            <div className="flex items-center justify-between text-white mt-1">
              <div className="flex items-center gap-5">
                <button onClick={togglePlay} className="hover:scale-110 transition-transform bg-white/20 p-2.5 rounded-full backdrop-blur-sm hover:bg-blush-400/80">
                  {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
                </button>
                <div className="text-sm font-sans flex items-center gap-2 opacity-90 font-medium tracking-wide">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <button onClick={toggleMute} className="hover:scale-110 transition-transform hover:text-blush-300">
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <button onClick={toggleFullscreen} className="hover:scale-110 transition-transform hover:text-blush-300">
                  <Maximize size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Center Play Button for when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/20 backdrop-blur-md p-8 rounded-full shadow-2xl border border-white/30"
              >
                <Play size={50} fill="currentColor" className="text-white ml-2 drop-shadow-lg" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
