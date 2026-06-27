"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-32 py-12 px-6">
      {/* Divider */}
      <div className="max-w-4xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <p className="text-white/30 text-sm">
            &copy; 2026 My Blog. Built with Next.js
          </p>
        </motion.div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["GitHub", "Twitter", "Email"].map((label) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ y: -2, color: "#7c6aef" }}
              className="text-white/30 text-sm hover:text-white/60 transition-colors"
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
