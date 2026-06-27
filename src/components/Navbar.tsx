"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "笔记" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="flex items-center gap-1">
        {/* Logo */}
        <Link href="/" className="mr-6 group flex items-center gap-3">
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
          <span className="hidden md:block text-white/90 font-medium text-sm whitespace-nowrap">
            Sora の 小站
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                ref={(el) => {
                  itemRefs.current[item.href] = el;
                }}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.href || hoveredItem === item.href
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
          
          {/* Animated indicator background - follows mouse hover */}
          {(hoveredItem || pathname) && (
            <motion.div
              layoutId="active-pill"
              className="absolute top-0 h-full rounded-xl bg-white/10 pointer-events-none"
              initial={false}
              animate={{
                x: itemRefs.current[hoveredItem || pathname]?.offsetLeft || 0,
                width: itemRefs.current[hoveredItem || pathname]?.offsetWidth || 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </div>

        {/* Search Box - Show on both desktop and mobile */}
        <div className="ml-auto mr-2">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              className="w-32 md:w-48 glass rounded-xl px-3 md:px-4 py-2 pl-9 md:pl-10 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/15 transition-all"
            />
            <svg
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
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
          </div>
        </div>

        {/* Mobile Toggle - Move to far right */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors ml-2"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-white/80 rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-white/80 rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-white/80 rounded-full block"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-3 pb-1 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                    pathname === item.href
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
