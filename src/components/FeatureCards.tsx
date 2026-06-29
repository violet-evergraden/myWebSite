"use client";

import { motion } from "framer-motion";

interface FeatureCardsProps {
  tags: string[];
}

export default function FeatureCards({ tags }: FeatureCardsProps) {
  return (
    <section className="mb-32 max-w-[900px] mx-auto">
      {/* Tag Marquee Scroll Bar */}
      <div className="mb-8 overflow-hidden">
        <div className="marquee-track flex w-max gap-3">
          {/* Duplicate tags for seamless loop */}
          {[...tags, ...tags].map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 glass px-4 py-1.5 text-xs font-medium text-white/60 whitespace-nowrap"
            >
              <span className="h-1 w-1 rounded-full bg-neutral-600" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        探索领域
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Core 知识库", desc: "系统化的技术沉淀。从微机原理到前端工程化。", icon: "📚" },
          { title: "Labs", desc: "React 交互组件与 DSP 可视化实验。", icon: "" },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass rounded-xl p-5 cursor-pointer group hover:bg-white/[0.12] transition-all"
          >
            {'icon' in card && card.icon && (
              <div className="text-3xl mb-4">{card.icon}</div>
            )}
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient transition-colors">
              {card.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
