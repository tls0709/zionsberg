"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function IdentitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.97]);
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const highlightWord = lang === "ko" ? "치유" : lang === "en" ? "healing" : "Heilung";
  const highlightWord2 = lang === "ko" ? "평화로운" : lang === "en" ? "peaceful" : "friedliche";

  return (
    <>
      {/* ── Rounded top transition from hero ── */}
      <div className="relative w-full bg-foreground">
        <div className="bg-background rounded-t-[2rem] md:rounded-t-[3rem]" style={{ height: "3rem" }} />
      </div>

      <section
        ref={sectionRef}
        className="relative w-full bg-background text-foreground pt-12 pb-0 md:pt-24 md:pb-0 overflow-visible"
      >
        {/* ── Text area ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Left: Tag */}
            <div className="md:col-span-3">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 border border-foreground/15 rounded-full opacity-60"
              >
                About Zionsberg
              </motion.span>
            </div>

            {/* Right: Heading + Description */}
            <div className="md:col-span-9">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-snug mb-8"
              >
                {lang === "ko"
                  ? "오랜 기도의 자리에서, 새로운 치유가 시작됩니다."
                  : lang === "en"
                  ? "From a place of prayer, a new healing begins."
                  : "Von einem Ort des Gebets beginnt eine neue Heilung."}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl"
              >
                {t.identityDesc.split(highlightWord).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="inline-block px-2 py-0.5 bg-foreground/8 rounded-md text-foreground font-medium">
                        {highlightWord}
                      </span>
                    </span>
                  ) : (
                    <span key={i}>
                      {part.split(highlightWord2).map((p2, j, arr2) =>
                        j < arr2.length - 1 ? (
                          <span key={j}>
                            {p2}
                            <span className="inline-block px-2 py-0.5 bg-foreground/8 rounded-md text-foreground font-medium">
                              {highlightWord2}
                            </span>
                          </span>
                        ) : (
                          <span key={j}>{p2}</span>
                        )
                      )}
                    </span>
                  )
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-8"
              >
                <Link
                  href="/about/story"
                  className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.12em] uppercase group"
                >
                  <span className="border-b-2 border-foreground/20 group-hover:border-foreground transition-colors duration-300">
                    {t.identityCta}
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
          </div>
        </div>

        {/* ── 3D Parallax Image — Full Width ── */}
        <div
          ref={imageRef}
          className="w-full"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{
              rotateX,
              scale,
              transformOrigin: "center bottom",
            }}
            className="relative w-full aspect-[16/7] md:aspect-[2.8/1] overflow-hidden rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]"
          >
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-[-15%] bg-gradient-to-br from-foreground/10 via-foreground/15 to-foreground/25 flex items-center justify-center"
            >
              <span className="text-background/20 text-sm tracking-widest uppercase">
                Zionsberg Landscape
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Rounded bottom transition into Services (dark bg) ── */}
      <div className="relative w-full bg-background">
        <div className="bg-foreground rounded-t-[2rem] md:rounded-t-[3rem]" style={{ height: "3rem" }} />
      </div>
    </>
  );
}
