// components/ui/MissionSection.tsx
"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartHandshake, Home, Leaf, Users } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const missionsRef = useRef<HTMLDivElement[]>([]);

  const missions = [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      text: "Design sustainable, nature-integrated spaces.",
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      text: "Foster inclusive, people-centered communities.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
      text: "Build trust through transparent, ethical design.",
    },
    {
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      text: "Create living spaces that feel truly like home.",
    },
  ];

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // === Mission items: stagger-in on scroll ===
        gsap.fromTo(
          missionsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24"
    >
      {/* === CONTENT: No card, direct layout === */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* === Mission List (mobile top) === */}
        <div className="grid grid-cols-1 gap-4 order-2 md:order-2">
          {missions.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) missionsRef.current[i] = el;
              }}
              className="flex items-start gap-3 bg-black/5 border border-black/10 rounded-2xl px-5 py-4 
                         text-gray-700 text-sm md:text-base leading-relaxed hover:bg-white/10 transition-all"
            >
              <span className="shrink-0">{item.icon}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* === Text === */}
        <div className="space-y-5 text-gray-800 order-1 md:order-1 flex flex-col justify-center">
          <h3 className="text-3xl md:text-6xl font-bold leading-[1.1] tracking-[-0.05em] md:tracking-[-0.08em] uppercase">
            OU
            <span className="relative inline-block">
              R
              <span className="absolute left-0 bottom-0 w-4 md:w-10 h-[2px] bg-emerald-400"></span>
            </span>
            &nbsp;MISSION
          </h3>

          <h4 className="text-xl md:text-2xl font-semibold text-emerald-400/70">
            Building a Greener Future
          </h4>

          <p className="text-sm md:text-lg leading-relaxed text-gray-600">
            We envision living spaces that breathe with nature — sustainable,
            human-centered, and filled with purpose. Every project reflects our
            belief in balance between design, comfort, and planet.
          </p>
        </div>
      </div>
    </section>
  );
}
