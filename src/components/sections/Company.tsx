// components/sections/Company.tsx
"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import About from "../ui/About";
import MissionSection from "../ui/MissionSection";

// Section 1 – with parallax scale
function SectionOne({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <motion.div
        style={{ scale, rotate }}
        className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center"
      >
        <About />
      </motion.div>
    </div>
  );
}

// Section 2
function SectionTwo({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  //   const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  return (
    <motion.div
      style={{ scale }}
      className="h-screen w-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
    >
      <div className="text-center text-white px-6">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          To lead with purpose, sustainability, and cutting-edge design.
        </p>
      </div>
    </motion.div>
  );
}

// Section 3
function SectionThree({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative h-screen w-full bg-white flex items-center justify-center"
    >
      <MissionSection />
    </motion.div>
  );
}

// Main Company component
export default function Company() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="relative bg-black h-[200vh]">
      <SectionOne scrollYProgress={scrollYProgress} />
      {/* <SectionTwo scrollYProgress={scrollYProgress} /> */}
      <SectionThree scrollYProgress={scrollYProgress} />
    </main>
  );
}
