"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseClick = (e: MouseEvent) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] text-blush-500 drop-shadow-md text-xl"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        ❤️
      </motion.div>
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="pointer-events-none fixed top-0 left-0 z-[9998] text-blush-400 text-lg"
            initial={{ opacity: 1, scale: 0.5, x: click.x - 10, y: click.y - 10 }}
            animate={{ opacity: 0, scale: 2, y: click.y - 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
