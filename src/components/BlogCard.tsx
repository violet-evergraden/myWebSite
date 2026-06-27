"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags: string[];
  index: number;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  tags,
  index,
}: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--card-x", `${x}px`);
    cardRef.current.style.setProperty("--card-y", `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group"
    >
      <Link href={`/blog/${slug}`}>
        <div
          className="glass rounded-xl p-5 relative overflow-hidden 
                     hover:bg-white/[0.08] transition-all duration-300"
        >
          {/* Hover glow */}
          <div
            className="absolute w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 pointer-events-none"
            style={{
              left: "var(--card-x, 50%)",
              top: "var(--card-y, 50%)",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(124,106,239,0.1), transparent 70%)",
            }}
          />

          {/* Date */}
          <time className="text-xs text-white/40 font-mono">{date}</time>

          {/* Title */}
          <h3 className="text-base font-semibold text-white mt-2 mb-2 group-hover:text-gradient transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/50 leading-relaxed mb-3 line-clamp-2">
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 
                           border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/30"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
