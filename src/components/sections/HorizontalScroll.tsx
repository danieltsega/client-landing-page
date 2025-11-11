// components/sections/HorizontalScroll.tsx
"use client";

import About from "@/components/ui/About";
import MissionSection from "@/components/ui/MissionSection";
import VisionSection from "@/components/ui/VisionSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sections = [About, MissionSection, VisionSection];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {sections.map((Section, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 flex items-center justify-center px-6 md:px-12"
            >
              <Section />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
