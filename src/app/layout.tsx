"use client";

import Lenis from "@studio-freight/lenis";
import { ReactNode, useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease-out
      smooth: true,
      smoothTouch: false, // Disable on mobile if needed
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
