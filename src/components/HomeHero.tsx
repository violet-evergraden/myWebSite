"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="mb-32">
      {/* Left-aligned text content aligned with header */}
      <div className="text-left max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#39d6c6] animate-pulse" />
          <span className="text-xs text-white/80">记录技术、生活与思考的地方</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          <span className="text-white">Izumi Konata</span>
          <br />
          <span className="text-gradient">の 积微成著</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed"
        >
          技术广袤，学无止境。
          <br className="hidden md:block" />
          这里记录着我在技术、生活与思考的探索笔记——哪怕方向分散，但每一个都经过亲手验证。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-strong rounded-2xl px-8 py-3.5 text-sm font-medium text-white 
                         hover:bg-white/15 transition-all anime-glow"
            >
              查看Konata的笔记
            </motion.button>
          </Link>
        </motion.div>
      </div>


    </section>
  );
}
