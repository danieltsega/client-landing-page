"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

const cards: CardData[] = [
  {
    title: "About Us",
    subtitle: "Heritage of Excellence",
    description:
      "Rooted in 25 years of architectural innovation, we craft homes that transcend trends and stand as timeless landmarks.",
    gradient: "from-amber-400/20 via-amber-300/10 to-transparent",
  },
  {
    title: "Our Mission",
    subtitle: "Elevate Living",
    description:
      "To design sustainable, soulful spaces where every detail inspires connection, comfort, and conscious living.",
    gradient: "from-emerald-400/20 via-teal-300/10 to-transparent",
  },
  {
    title: "Our Vision",
    subtitle: "Future in Form",
    description:
      "A world where architecture nurtures humanity — one thoughtful residence at a time.",
    gradient: "from-purple-400/20 via-pink-300/10 to-transparent",
  },
];

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll: 0 → -200% (3 cards)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Sticky Horizontal Slider */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 flex items-center justify-center px-6 md:px-12"
            >
              <div
                className={`
                  relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center
                  p-10 md:p-16 rounded-3xl
                  bg-white/95 backdrop-blur-xl
                  border border-white/30
                  shadow-2xl shadow-black/10
                  overflow-hidden
                `}
              >
                {/* Gradient Overlay */}
                <div
                  className={`
                    absolute inset-0 opacity-60
                    bg-gradient-to-br ${card.gradient}
                    pointer-events-none
                  `}
                />

                {/* Text Column */}
                <div className="relative space-y-6 z-10">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-medium text-amber-600">
                    {card.subtitle}
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Image Column */}
                <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/hero.jpeg"
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
