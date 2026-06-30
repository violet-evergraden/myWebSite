"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PostItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "笔记" },
];

export default function NavbarClient({ posts }: { posts: PostItem[] }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 搜索逻辑
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const searchQueryLower = searchQuery.toLowerCase().trim();

      const filtered = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchQueryLower);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchQueryLower);
        const tagMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQueryLower)
        );
        return titleMatch || excerptMatch || tagMatch;
      });

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, posts]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-[#39d6c6]/30 text-white px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: isVisible ? 0 : -150,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? "glass-strong" : "glass"
      } rounded-2xl px-8 py-3 w-[900px] max-w-[90vw]`}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-8 h-8 rounded-lg overflow-hidden"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </motion.div>
          <span className="hidden md:block text-white/90 font-medium text-sm whitespace-nowrap z-50 relative">
            Konata の 小站
          </span>
        </Link>

        {/* Navigation Menu with Smooth Animation */}
        <div className="flex items-center gap-6 ml-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-1"
              >
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#39d6c6] rounded-full"
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.5 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      duration: 0.2 
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Search Box - Direct Input */}
        <div className="ml-auto w-64 md:w-80 relative">
          <div className="relative glass rounded-xl overflow-hidden">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文章..."
              className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none text-sm px-10 py-2.5"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {(searchQuery.trim() || isSearching) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-xl shadow-2xl z-[1000] max-h-[60vh] overflow-y-auto"
              >
                {isSearching ? (
                  <div className="p-8 text-center text-white/40">
                    <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-3" />
                    <p className="text-sm">搜索中...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={() => setSearchQuery("")}
                      >
                        <motion.div
                          className="p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <h3 className="text-white font-semibold mb-2 group-hover:text-[#39d6c6] transition-colors">
                            {highlightText(post.title, searchQuery)}
                          </h3>
                          <p className="text-white/60 text-sm line-clamp-2">
                            {highlightText(post.excerpt, searchQuery)}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-white/30">
                            <time>{post.date}</time>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-white/40">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">未找到相关结果</p>
                    <p className="text-xs mt-1 text-white/30">尝试使用不同的关键词</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
