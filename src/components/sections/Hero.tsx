"use client";

import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cta1Ref = useRef<HTMLButtonElement>(null);
  const cta2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset on refresh to avoid stutter
      gsap.set(
        [
          headingRef.current,
          paragraphRef.current,
          cta1Ref.current,
          cta2Ref.current,
        ],
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        }
      );

      // Heading: Scale + fade from below
      gsap.to(headingRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "elastic.out(1, 0.6)",
        delay: 0.3,
      });

      // Paragraph: Slide in from left with fade
      gsap.to(paragraphRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.7,
      });

      // CTAs: Staggered bounce-in
      gsap.to([cta1Ref.current, cta2Ref.current], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: 0.15,
        delay: 1,
      });

      // Shrink on scroll (unchanged logic, but smoother)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8, // Smoother scrub
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 - progress * 0.15;
          const borderRadius = 32 + progress * 48;
          const opacity = 1 - progress * 0.8;

          gsap.to(containerRef.current, {
            scale,
            borderRadius: `${borderRadius}px`,
            duration: 0,
            ease: "none",
          });
          gsap.to(imageRef.current, { opacity, duration: 0, ease: "none" });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mx-8 mt-32 mb-24 overflow-hidden rounded-[32px] transition-all duration-300"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/hero.jpeg"
          alt="Luxury apartment exterior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* DARKER overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-[85vh] min-h-[600px] items-center px-10 md:px-16">
        <div className="max-w-xl">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-center md:text-start text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Live Beyond
            <br />
            Expectation
          </h1>

          {/* Paragraph */}
          <p
            ref={paragraphRef}
            className="text-center md:text-start mt-6 text-lg text-white/80 max-w-md translate-x-[-50px] opacity-0"
          >
            A legacy of refined living in the heart of the city. Where
            architecture meets artistry.
          </p>

          {/* CTAs */}
          <div className="mt-16 flex flex-col items-center md:items-start md:flex-row flex-wrap gap-4">
            <button
              ref={cta1Ref}
              className={clsx(
                "group relative overflow-hidden rounded-full px-8 py-4 cursor-pointer",
                "bg-amber-500 text-black font-medium text-sm uppercase tracking-wider",
                "transition-all duration-300 hover:scale-105",
                "shadow-lg hover:shadow-amber-500/50"
              )}
            >
              <span className="relative z-10">Explore Residences</span>
              <div className="absolute inset-0 bg-amber-400 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </button>

            <button
              ref={cta2Ref}
              className={clsx(
                "group rounded-full border border-white/30 px-8 py-4 cursor-pointer",
                "text-white font-medium text-sm uppercase tracking-wider",
                "transition-all duration-300 hover:border-white hover:bg-white/10"
              )}
            >
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
