"use client";

import { useEffect, useState } from "react";

interface ResponsiveBackgroundProps {
  desktopImage: string;
  mobileImage: string;
}

export default function ResponsiveBackground({
  desktopImage,
  mobileImage,
}: ResponsiveBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const backgroundImage = isMobile ? mobileImage : desktopImage;

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
