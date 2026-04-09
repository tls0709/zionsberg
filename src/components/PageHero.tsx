"use client";

import { motion } from "framer-motion";

export default function PageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-28 bg-foreground text-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-light opacity-70 leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
