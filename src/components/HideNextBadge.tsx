"use client";

import { useEffect } from "react";

export default function HideNextBadge() {
  useEffect(() => {
    const hideBadge = () => {
      const selectors = [
        "[data-next-badge-root]",
        "[data-next-badge]",
        "#next-logo",
        "[data-next-mark]",
        "[data-dot]",
      ];
      
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });
    };
    
    // 立即执行并持续监控
    hideBadge();
    const observer = new MutationObserver(hideBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}
