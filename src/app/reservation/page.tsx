"use client";

import { motion } from "framer-motion";

export default function ReservationPage() {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl w-full"
      >
        <span className="text-primary text-sm tracking-[0.2em] font-medium uppercase mb-4 block">
          Booking
        </span>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-12">
          Reserve Your Stay
        </h1>
        
        <form className="flex flex-col gap-6 text-left max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest opacity-60">Full Name</label>
            <input type="text" className="w-full p-3 bg-transparent border-b border-foreground/20 focus:border-primary outline-none transition-colors" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest opacity-60">Dates</label>
            <input type="date" className="w-full p-3 bg-transparent border-b border-foreground/20 focus:border-primary outline-none transition-colors" />
          </div>
          <button className="mt-8 px-8 py-4 bg-primary text-primary-foreground tracking-widest uppercase hover:opacity-90 transition-opacity">
            Submit Request
          </button>
        </form>
      </motion.div>
    </div>
  );
}
