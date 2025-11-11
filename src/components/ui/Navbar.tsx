"use client";

import clsx from "clsx";
import { gsap } from "gsap";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const navLinks = ["About", "Story", "Vision", "Contact"];

  // GSAP Animation for Mobile Menu
  useEffect(() => {
    if (!menuRef.current || !backdropRef.current) return;

    const menu = menuRef.current;
    const backdrop = backdropRef.current;

    if (mobileOpen) {
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        menu,
        { y: -20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(backdrop, { opacity: 0, duration: 0.2 });
      gsap.to(menu, {
        y: -10,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Floating Navbar */}
      <nav className="fixed inset-x-0 top-8 z-50 flex justify-center pointer-events-none">
        <div
          className={clsx(
            "pointer-events-auto",
            "mx-4 w-full max-w-3xl", // NARROWER: was max-w-5xl
            "rounded-full border border-white/10",
            "bg-white/5 backdrop-blur-xl",
            "shadow-lg shadow-black/10", // MINIMIZED SHADOW
            "transition-all duration-300"
          )}
        >
          <div className="flex items-center justify-between px-5 py-3 md:px-7">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-base font-bold text-white">
                A
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Mobile: 3-Dot Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-white/80 hover:text-white transition-colors"
            >
              <MoreVertical size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu (White Panel) */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="fixed left-1/2 top-24 z-50 w-full max-w-xs -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <div className="p-6 text-center">
                {navLinks.map((link, i) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "block py-3 text-xl font-bold text-gray-900 transition-colors",
                      "hover:text-amber-600",
                      i !== navLinks.length - 1 && "border-b border-gray-100"
                    )}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
