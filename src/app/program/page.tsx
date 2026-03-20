"use client";

import { motion } from "framer-motion";

export default function ProgramPage() {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <span className="text-primary text-sm tracking-[0.2em] font-medium uppercase mb-4 block">
          Healing Programs
        </span>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-8">
          Wellness & Programs
        </h1>
        <p className="text-lg font-light tracking-widest leading-relaxed opacity-80">
          Therapeutic programs carefully curated to heal your body and soul.
          (Schedule and details coming soon...)
        </p>
      </motion.div>
    </div>
  );
}
