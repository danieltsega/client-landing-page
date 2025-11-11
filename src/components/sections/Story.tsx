"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const smallImage1Ref = useRef<HTMLDivElement>(null);
  const smallImage2Ref = useRef<HTMLDivElement>(null);
  const fullImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Title: Split + reveal on scroll + refresh
      const titleText = titleRef.current?.textContent || "";
      titleRef.current!.innerHTML = titleText
        .split("")
        .map(
          (char) =>
            `<span class="inline-block opacity-0 translate-y-8">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");

      const titleLetters = titleRef.current!.querySelectorAll("span");

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(titleLetters, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(titleLetters, { opacity: 0, y: 8, duration: 0.6 });
        },
      });

      // Description: Fade + slide up
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Zoom images on scroll
      const zoomImages = [
        mainImageRef,
        smallImage1Ref,
        smallImage2Ref,
        fullImageRef,
      ];
      zoomImages.forEach((ref, i) => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
          onUpdate: (self) => {
            const scale = 1.15 - self.progress * 0.15;
            gsap.to(ref.current, { scale, duration: 0.1, ease: "none" });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        {/* ROW 1: Title + Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Title */}
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
          >
            Our Story
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed"
          >
            For over two decades, we’ve crafted living spaces that blend modern
            architecture with timeless elegance. Each residence is a testament
            to thoughtful design, sustainability, and community.
          </p>
        </div>

        {/* ROW 2: Images + Overlay Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left: Main Image + Overlay Card */}
          <div className="relative">
            <div
              ref={mainImageRef}
              className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="/hero.jpeg"
                alt="Main residence"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-64 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-gray-900">$2.8M</p>
                <p className="text-gray-600">Bole Road, Addis Ababa</p>
                <p className="text-gray-500">Bole District, Ethiopia</p>
              </div>
            </div>
          </div>

          {/* Right: Nested Grid */}
          <div className="grid grid-cols-1 gap-8">
            {/* Two Equal Images */}
            <div className="grid grid-cols-2 gap-4">
              <div
                ref={smallImage1Ref}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/hero.jpeg"
                  alt="Detail 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div
                ref={smallImage2Ref}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/hero.jpeg"
                  alt="Detail 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Full Width Image */}
            <div
              ref={fullImageRef}
              className="aspect-video rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/hero.jpeg"
                alt="Panoramic view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
