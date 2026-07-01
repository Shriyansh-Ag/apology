"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import FloatingElements from "@/components/FloatingElements";
import BackgroundMusic from "@/components/BackgroundMusic";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import VideoSection from "@/components/VideoSection";
import MemoriesCarousel from "@/components/MemoriesCarousel";
import FinalSection from "@/components/FinalSection";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [startWithMusic, setStartWithMusic] = useState(false);

  return (
    <>
      <LoadingScreen onLoaded={(play) => { setIsLoaded(true); setStartWithMusic(play); }} />
      
      <AnimatePresence>
        {isLoaded && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative flex min-h-screen flex-col items-center overflow-x-hidden selection:bg-blush-200 selection:text-blush-600 cursor-none"
          >
            <CustomCursor />
            <FloatingElements />
            <BackgroundMusic startWithMusic={startWithMusic} />
            
            <HeroSection />
            <SectionDivider />
            
            <VideoSection />
            <SectionDivider />
            
            <MemoriesCarousel />
            <SectionDivider />
            
            <FinalSection />
            <Footer />
            
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
