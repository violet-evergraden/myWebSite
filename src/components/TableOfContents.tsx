"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ReadingSettings {
  fontSize: number; // 1-5
  lineHeight: number; // 1-5
  fontFamily: string;
  markdownHighlight: boolean;
}

const defaultSettings: ReadingSettings = {
  fontSize: 3,
  lineHeight: 3,
  fontFamily: "system",
  markdownHighlight: true,
};

export default function TableOfContents() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [settings, setSettings] = useState<ReadingSettings>(defaultSettings);

  // 提取文章中的所有标题
  useEffect(() => {
    const extractHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll("article .prose h1, article .prose h2, article .prose h3, article .prose h4")
      );

      const headingList: Heading[] = [];
      
      elements.forEach((el, index) => {
        // 优先使用 el.id，如果为空则生成一个唯一的 id
        const id = el.id || `heading-${index}-${Date.now()}`;
        
        // 如果没有 id，手动设置一个
        if (!el.id) {
          el.id = id;
        }
        
        headingList.push({
          id,
          text: el.textContent || "",
          level: parseInt(el.tagName.charAt(1)),
        });
      });

      setHeadings(headingList);

      // 滚动监听，高亮当前可见的标题
      const handleScroll = () => {
        const scrollPosition = window.scrollY + 100;

        for (let i = headingList.length - 1; i >= 0; i--) {
          const element = document.getElementById(headingList[i].id);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveId(headingList[i].id);
            break;
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    };

    // 延迟执行以确保 MDX 内容已渲染（增加到 300ms）
    setTimeout(extractHeadings, 300);
  }, []);

  // 从 localStorage 加载设置
  useEffect(() => {
    const saved = localStorage.getItem("reading-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // 保存设置到 localStorage 并应用到文章
  useEffect(() => {
    localStorage.setItem("reading-settings", JSON.stringify(settings));
    applySettings();
  }, [settings]);

  const applySettings = () => {
    const article = document.querySelector("article .prose");
    if (!article) return;

    // 应用字体大小
    const fontSizeMap = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];
    const currentSizeClass = fontSizeMap.find((cls) =>
      article.classList.contains(cls)
    );
    if (currentSizeClass) article.classList.remove(currentSizeClass);
    article.classList.add(fontSizeMap[settings.fontSize - 1]);

    // 应用行距
    const lineHeightMap = ["leading-tight", "leading-normal", "leading-relaxed", "leading-loose", "leading-[2.5]"];
    const currentLineClass = lineHeightMap.find((cls) =>
      article.classList.contains(cls)
    );
    if (currentLineClass) article.classList.remove(currentLineClass);
    article.classList.add(lineHeightMap[settings.lineHeight - 1]);

    // 应用字体
    const fontFamilyMap: Record<string, string> = {
      system: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
    };
    Object.values(fontFamilyMap).forEach((cls) => article.classList.remove(cls));
    article.classList.add(fontFamilyMap[settings.fontFamily] || "font-sans");

    // 应用 Markdown 高亮
    if (settings.markdownHighlight) {
      article.classList.add("markdown-highlight");
    } else {
      article.classList.remove("markdown-highlight");
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // 点击目录项滚动到对应位置
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* 目录按钮 - 右上角 */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isSettingsOpen) setIsSettingsOpen(false);
        }}
        className="fixed right-6 top-24 z-50 glass rounded-full px-4 py-3 
                   flex items-center gap-2 text-gray-900/80 hover:text-gray-900 hover:bg-white/15 
                   transition-all shadow-lg backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm font-medium">目录</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M4 4h8M4 8h8M4 12h8" />
        </svg>
      </motion.button>

      {/* 阅读设置按钮 - 左下角 */}
      <motion.button
        onClick={() => {
          setIsSettingsOpen(!isSettingsOpen);
          if (isOpen) setIsOpen(false);
        }}
        className="fixed left-6 bottom-6 z-50 glass rounded-full px-4 py-3 
                   flex items-center gap-2 text-white hover:text-white hover:bg-white/15 
                   transition-all shadow-lg backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
        <span className="text-sm font-medium">设置</span>
      </motion.button>

      {/* 目录面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 - 只关闭目录 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* 目录内容 - 右上角 */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 overflow-hidden"
            >
              <div className="h-full glass backdrop-blur-xl border-l border-white/10 
                            flex flex-col">
                {/* 头部 */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white">CONTENTS</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 5L5 15M5 5l10 10" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 目录列表 */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1.5">
                    {headings.map((heading, index) => (
                      <button
                        key={`${heading.id}-${index}`}
                        onClick={() => {
                          scrollToHeading(heading.id);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all
                                  ${
                                    activeId === heading.id
                                      ? "bg-white/10 text-white"
                                      : "text-white/60 hover:bg-white/5 hover:text-white/90"
                                  }`}
                        style={{
                          paddingLeft: `${(heading.level - 1) * 12 + 10}px`,
                        }}
                      >
                        <span className="text-xs">{heading.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 底部提示 */}
                <div className="p-3 border-t border-white/10">
                  <p className="text-[10px] text-white/40 text-center">
                    共 {headings.length} 个章节
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 阅读设置面板 - 左下角 */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            {/* 遮罩层 - 只关闭设置 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* 设置面板 - 左下角 */}
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 bottom-0 w-72 z-50 overflow-hidden max-h-[80vh] rounded-tr-xl border-t border-r border-white/10"
            >
              <div className="h-full glass backdrop-blur-xl flex flex-col">
                {/* 头部 */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white">阅读设置</h2>
                    <button
                      onClick={() => setIsSettingsOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 5L5 15M5 5l10 10" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 设置内容 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* 字体大小 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-white/80">字体大小</label>
                      <span className="text-sm text-white/60">{settings.fontSize}/5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={settings.fontSize}
                      onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between mt-1 text-xs text-white/40">
                      <span>小</span>
                      <span>默认</span>
                      <span>大</span>
                    </div>
                  </div>

                  {/* 行距 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-white/80">行距</label>
                      <span className="text-sm text-white/60">{settings.lineHeight}/5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={settings.lineHeight}
                      onChange={(e) => setSettings({ ...settings, lineHeight: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between mt-1 text-xs text-white/40">
                      <span>紧凑</span>
                      <span>默认</span>
                      <span>宽松</span>
                    </div>
                  </div>

                  {/* 字体选择 */}
                  <div>
                    <label className="text-sm text-white/80 block mb-2">字体</label>
                    <select
                      value={settings.fontFamily}
                      onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
                    >
                      <option value="system" className="bg-gray-800 text-white">系统(推荐)</option>
                      <option value="serif" className="bg-gray-800 text-white">衬线体</option>
                      <option value="mono" className="bg-gray-800 text-white">等宽体</option>
                    </select>
                  </div>

                  {/* Markdown 上色 */}
                  <div className="glass rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-white/80 block">Markdown 自动上色</label>
                        <p className="text-xs text-white/40 mt-1">
                          H3 蓝 / H4 紫 / H5 深绿,
                          Strong 粉红
                        </p>
                      </div>
                      <button
                        onClick={() => setSettings({ ...settings, markdownHighlight: !settings.markdownHighlight })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.markdownHighlight ? "bg-green-500" : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.markdownHighlight ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 底部按钮 */}
                <div className="p-4 border-t border-white/10">
                  <button
                    onClick={resetSettings}
                    className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors relative z-50"
                  >
                    重置为默认
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
