"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images: { src: string; caption?: string }[] = [
  { src: "/1.JPG", caption: "" },
  { src: "2.JPG", caption: "" },
  { src: "/3.JPG", caption: "" },
  { src: "/4.JPG", caption: "" },
  { src: "/5.JPG", caption: "" },
];

export default function MemoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="relative flex w-full flex-col items-center justify-center px-4 py-20 z-10"
    >
      <h2 className="font-handwriting text-5xl md:text-6xl text-blush-500 mb-12 drop-shadow-sm text-center">Our Beautiful Memories</h2>

      <div
        className="relative w-full max-w-4xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-white/30 backdrop-blur-md border border-white/50 shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/40"
            >
              <img
                src={images[currentIndex].src.startsWith('/') ? images[currentIndex].src : `/${images[currentIndex].src}`}
                alt="Memory"
                className="h-full w-full object-contain drop-shadow-lg"
                onError={(e) => {
                  // Fallback if image not found
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-pink-50/50 hidden">
                <p className="text-gray-400 font-sans px-4 text-center">
                  Image missing: {images[currentIndex].src}<br />
                  <span className="text-sm">Make sure it's in the public folder!</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-10">
            <motion.p
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white font-sans text-xl md:text-2xl drop-shadow-lg px-6 font-medium tracking-wide"
            >
              {images[currentIndex].caption}
            </motion.p>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow-md text-blush-500 transition-all opacity-100 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow-md text-blush-500 transition-all opacity-100 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-3 rounded-full transition-all duration-500 ${i === currentIndex ? "w-12 bg-blush-400 shadow-sm" : "w-3 bg-blush-200 hover:bg-blush-300"
                }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
