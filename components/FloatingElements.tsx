"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const elements = ["❤️", "🥺", "💖", "✨", "🌸", "🤍"];

export default function FloatingElements() {
  const [items, setItems] = useState<{ id: number; element: string; left: number; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const generatedItems = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      element: elements[Math.floor(Math.random() * elements.length)],
      left: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      size: Math.random() * 1.5 + 0.5,
    }));
    setItems(generatedItems);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bottom-[-50px] opacity-60"
          initial={{ y: 100, x: 0, opacity: 0 }}
          animate={{
            y: "-110vh",
            x: [0, Math.random() * 50 - 25, Math.random() * -50 + 25, 0],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${item.left}%`,
            scale: item.size,
          }}
        >
          {item.element}
        </motion.div>
      ))}
    </div>
  );
}
