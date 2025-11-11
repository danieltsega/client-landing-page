// components/ui/About.tsx
"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const p1 = useRef<HTMLParagraphElement>(null);
  const p2 = useRef<HTMLParagraphElement>(null);
  const p3 = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Title entrance
        gsap.fromTo(
          titleRef.current,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Card entrance
        gsap.fromTo(
          cardRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Paragraphs
        gsap.fromTo(
          [p1.current, p2.current, p3.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // === Fix: Zoom-out animation triggers only when card is fully visible ===
        gsap.to(containerRef.current, {
          scale: 0.85,
          x: "-30vw",
          opacity: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom", // 👈 waits until full section is visible
            end: "+=300",
            scrub: 1.5,
            pin: false,
          },
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-start px-0 md:px-12 pt-24 md:pt-32"
    >
      <h2
        ref={titleRef}
        className="relative z-20 text-center mb-[-4rem] md:mb-[-6rem]"
      >
        <span
          className="inline-block text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text
                     bg-gradient-to-b from-gray-900 via-gray-700 to-transparent
                     bg-[length:100%_300%] bg-[0_0] animate-fadeDown"
          style={{ backgroundClip: "text", WebkitBackgroundClip: "text" }}
        >
          About Us
        </span>
      </h2>

      {/* === Card === */}
      <div
        ref={cardRef}
        className={`
          relative z-30 w-full max-w-5xl
          grid grid-cols-1 md:grid-cols-2 
          md:gap-12 gap-8
          p-10 md:p-14 rounded-3xl bg-white shadow-2xl
          transform 
          overflow-hidden
        `}
        style={{
          marginTop: "-6rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-amber-300/20 via-amber-200/10 to-transparent pointer-events-none" />

        {/* === Image first on mobile === */}
        <div className="relative aspect-[4/5] md:aspect-square order-1 md:order-2 overflow-hidden transform -rotate-3">
          <div className="absolute inset-0 border-8 border-white z-10 pointer-events-none"></div>
          <Image
            src="/hero.jpeg"
            alt="Addis Apartment Living"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-md z-20">
            ADDIS
          </div>
        </div>

        {/* === Text === */}
        <div className="space-y-5 text-gray-700 order-2 md:order-1">
          <h2 className="text-3xl md:text-6xl font-bold leading-[1.1] tracking-[-0.05em] md:tracking-[-0.08em] uppercase relative inline-block">
            AB
            <span className="relative inline-block">
              O
              <span className="absolute left-0 bottom-0 w-4 md:w-10 h-[2px] bg-gray-800"></span>
            </span>
            UT&nbsp;US
          </h2>

          <h4 className="text-xl md:text-2xl font-semibold text-amber-700 opacity-50">
            Addis Living, Redefined
          </h4>

          <p ref={p1} className="text-sm md:text-lg leading-relaxed">
            Founded in the heart of Addis Ababa, we specialize in crafting
            modern, vibrant apartments that blend Ethiopian heritage with global
            design.
          </p>

          <p ref={p2} className="text-sm md:text-lg leading-relaxed">
            From Bole’s skyline to the serene hills of Entoto, our homes are
            built for families who value community, culture, and convenience.
          </p>

          <p ref={p3} className="text-sm md:text-lg leading-relaxed">
            We don’t just sell apartments — we deliver lifestyles. Every unit is
            a postcard from the future of urban living in Ethiopia.
          </p>
        </div>
      </div>
    </section>
  );
}
