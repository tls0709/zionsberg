"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

const galleryItems = [
  { id: 1, aspect: "aspect-[3/4]", label: "Gallery 1" },
  { id: 2, aspect: "aspect-[4/3]", label: "Gallery 2" },
  { id: 3, aspect: "aspect-[4/3]", label: "Gallery 3" },
  { id: 4, aspect: "aspect-[3/4]", label: "Gallery 4" },
];

export default function GalleryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background text-foreground py-24 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            {t.gallerySectionTitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.15em] uppercase group"
            >
              <span className="border-b-2 border-foreground/30 group-hover:border-foreground transition-colors duration-300">
                {t.galleryViewAll}
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Gallery Grid - masonry-like 2-column layout */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {/* Left column - offset down */}
          <div className="flex flex-col gap-4 md:gap-6 pt-0 md:pt-12">
            {galleryItems.slice(0, 2).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`relative ${item.aspect} rounded-xl md:rounded-2xl overflow-hidden bg-foreground/5 group cursor-pointer`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-500">
                  <span className="text-foreground/20 text-xs tracking-widest uppercase">
                    {item.label}
                  </span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-foreground/5 backdrop-blur-[1px]" />
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {galleryItems.slice(2, 4).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.35 + i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`relative ${item.aspect} rounded-xl md:rounded-2xl overflow-hidden bg-foreground/5 group cursor-pointer`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-500">
                  <span className="text-foreground/20 text-xs tracking-widest uppercase">
                    {item.label}
                  </span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-foreground/5 backdrop-blur-[1px]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
