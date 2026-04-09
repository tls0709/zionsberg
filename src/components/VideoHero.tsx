"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";
import Link from "next/link";

export default function VideoHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const lines = t.heroMainCopy.split("\n");

  return (
    <section className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Background Video with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-foreground/50 mix-blend-multiply" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full px-6 h-full flex flex-col items-center justify-center text-center"
      >
        <div className="overflow-hidden">
          {lines.map((line, i) => (
            <motion.h1
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 + i * 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-background leading-tight"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10"
        >
          <Link
            href="/stay"
            className="inline-block px-8 py-3.5 bg-background text-foreground rounded-full text-sm font-bold tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            {t.heroCta}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-background/60"
      >
        <span className="text-xs tracking-[0.2em] font-bold uppercase mb-4">
          Discover
        </span>
        <div className="w-[1px] h-12 bg-background/30 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-background"
          />
        </div>
      </motion.div>
    </section>
  );
}
