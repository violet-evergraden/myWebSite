"use client";

import { motion } from "framer-motion";

export default function LiquidBlobs() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
      {/* Primary blob */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full liquid-blob"
        style={{
          background:
            "radial-gradient(circle, rgba(124,106,239,0.15), transparent 70%)",
        }}
        animate={{
          x: [0, 100, -50, 30, 0],
          y: [0, -80, 40, -30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Secondary blob */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -60, 80, -40, 0],
          y: [0, 50, -60, 30, 0],
          scale: [1, 0.8, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Accent blob */}
      <motion.div
        className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(196,181,253,0.08), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 40, -70, 20, 0],
          y: [0, -40, 60, -20, 0],
          scale: [1, 1.1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
