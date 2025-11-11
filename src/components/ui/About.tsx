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

  // Paragraph refs (only these are animated)
  const p1 = useRef<HTMLParagraphElement>(null);
  const p2 = useRef<HTMLParagraphElement>(null);
  const p3 = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // === Paragraphs: stagger-in on scroll ===
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
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // === Zoom-out exit when full section is seen ===
        gsap.to(containerRef.current, {
          scale: 0.85,
          x: "-30vw",
          opacity: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            end: "+=300",
            scrub: 1.5,
          },
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24">
      {/* === CONTENT: No card, direct layout === */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* === Image (mobile top) === */}
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
        <div className="space-y-5 text-gray-50 order-2 md:order-1 flex flex-col justify-center">
          <h2 className="text-3xl md:text-6xl font-bold leading-[1.1] tracking-[-0.05em] md:tracking-[-0.08em] uppercase">
            AB
            <span className="relative inline-block">
              O
              <span className="absolute left-0 bottom-0 w-4 md:w-10 h-[2px] bg-gray-200"></span>
            </span>
            UT&nbsp;US
          </h2>

          <h4 className="text-xl md:text-2xl font-semibold text-amber-500 opacity-70">
            Addis Living, Redefined
          </h4>

          <p
            ref={p1}
            className="text-gray-300 text-sm md:text-lg leading-relaxed"
          >
            Founded in the heart of Addis Ababa, we specialize in crafting
            modern, vibrant apartments that blend Ethiopian heritage with global
            design.
          </p>

          <p
            ref={p2}
            className="text-gray-300 text-sm md:text-lg leading-relaxed"
          >
            From Bole’s skyline to the serene hills of Entoto, our homes are
            built for families who value community, culture, and convenience.
          </p>

          <p
            ref={p3}
            className="text-gray-300 text-sm md:text-lg leading-relaxed"
          >
            We don’t just sell apartments — we deliver lifestyles. Every unit is
            a postcard from the future of urban living in Ethiopia.
          </p>
        </div>
      </div>
    </section>
  );
}
