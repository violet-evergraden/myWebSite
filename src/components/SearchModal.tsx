"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PostItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostItem[];
}

export default function SearchModal({ isOpen, onClose, posts }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC 关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // 搜索逻辑
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const allPosts = posts;
      const searchQuery = query.toLowerCase().trim();

      const filtered = allPosts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
        const tagMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery)
        );
        return titleMatch || excerptMatch || tagMatch;
      });

      // 高亮匹配文本
      const highlightedResults = filtered.map((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
        return {
          ...post,
          highlightField: titleMatch ? "title" : excerptMatch ? "excerpt" : "tags",
        };
      });

      setResults(highlightedResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-400/30 text-yellow-200 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[1000] px-4"
          >
            <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <svg
                  className="w-5 h-5 text-white/60 flex-shrink-0"
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
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索文章标题、内容或标签..."
                  className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none text-base font-medium"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
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

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isSearching ? (
                  <div className="p-8 text-center text-white/40">
                    <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-3" />
                    <p className="text-sm">搜索中...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((post, index) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={onClose}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <h3 className="text-white font-semibold mb-2 group-hover:text-[#39d6c6] transition-colors">
                            {highlightText(post.title, query)}
                          </h3>
                          {post.highlightField === "excerpt" && (
                            <p className="text-white/60 text-sm line-clamp-2">
                              {highlightText(post.excerpt, query)}
                            </p>
                          )}
                          {post.highlightField === "tags" && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {post.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    tag.toLowerCase().includes(query.toLowerCase())
                                      ? "bg-[#39d6c6]/20 text-[#39d6c6]"
                                      : "bg-white/5 text-white/40"
                                  }`}
                                >
                                  {highlightText(tag, query)}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-xs text-white/30">
                            <time>{post.date}</time>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : query.trim() ? (
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
                ) : (
                  <div className="p-8 text-center text-white/30">
                    <p className="text-sm">输入关键词开始搜索</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center justify-between text-xs text-white/30">
                  {results.length > 0 && (
                    <span>共 {results.length} 个结果</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
