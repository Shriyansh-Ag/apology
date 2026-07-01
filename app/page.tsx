"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Only trigger once per session to avoid spam on reloads
    if (sessionStorage.getItem("visited")) return;
    sessionStorage.setItem("visited", "true");

    const sendNotification = async () => {
      try {
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
          console.log("No Web3Forms access key found");
          return;
        }

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: "Someone opened your Apology Website! 💖",
            message: "A visitor just opened your apology website. Fingers crossed! 🤞",
            from_name: "Apology Tracker",
          }),
        });
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    };

    sendNotification();
  }, []);

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
