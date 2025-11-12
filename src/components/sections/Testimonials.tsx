"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The attention to detail and commitment to quality transformed our vision into a home beyond imagination. Truly a legacy of excellence.",
    name: "Sarah & Michael Chen",
    role: "Tech Entrepreneur & Architect",
  },
  {
    quote:
      "From concept to completion, the team delivered a masterpiece. Our family now lives in a space that feels like art.",
    name: "James Rodriguez",
    role: "Film Director",
  },
  {
    quote:
      "Sustainable design without compromise. Our home is net-zero and breathtakingly beautiful.",
    name: "Emma Larsson",
    role: "Environmental Scientist",
  },
  {
    quote:
      "They didn't just build a house — they built our future. Every corner tells a story of care and precision.",
    name: "Aisha & Omar Al-Mansour",
    role: "Philanthropists",
  },
  {
    quote:
      "A seamless blend of luxury and functionality. We wake up every day inspired by our living space.",
    name: "Dr. Liam Park",
    role: "Neurosurgeon",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [houses, setHouses] = useState(0);
  const [satisfactionValue, setSatisfactionValue] = useState(0);

  const housesSold = useMotionValue(0);
  const satisfaction = useMotionValue(0);

  // Animate counters once on mount
  useEffect(() => {
    const controls1 = animate(housesSold, 127, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (v) => setHouses(Math.round(v)),
    });

    const controls2 = animate(satisfaction, 98, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (v) => setSatisfactionValue(Math.round(v)),
    });

    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, [housesSold, satisfaction]);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 h-screen md:py-32 bg-gray-100">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        {/* Giant Heading with Fading Bottom Effect */}
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold text-center text-gray-900 mb-12 md:mb-20 relative opacity-50"
        >
          Testimonials
          {/* Fading bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
        </motion.h2>

        {/* Two Cards - Centered and Smaller */}
        <div className="absolute px-4 md:px-0 top-15 md:top-22 z-20 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Card: Stats - Smaller and HR removed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 bg-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <span className="text-5xl md:text-6xl font-bold text-white inline-block">
                  {houses} +
                </span>
                <p className="text-base md:text-lg text-gray-100 mt-2">
                  Homes Sold
                </p>
              </div>

              <div>
                <span className="text-5xl md:text-6xl font-bold text-white inline-block">
                  {satisfactionValue}%
                </span>
                <p className="text-base md:text-lg text-gray-100 mt-2">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Testimonial Carousel - Smaller */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-7 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-amber-500 mb-4 md:mb-6" />
                  <blockquote className="text-lg md:text-xl font-medium text-gray-200 leading-relaxed mb-6 md:mb-8">
                    {testimonials[index].quote}
                  </blockquote>
                </div>

                <div>
                  <p className="text-base md:text-lg font-semibold text-gray-300">
                    {testimonials[index].name}
                  </p>
                  <p className="text-gray-400 text-sm md:text-base">
                    {testimonials[index].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Chevron Navigation */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-4 flex gap-1 md:gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                    i === index ? "bg-amber-500 w-6 md:w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
