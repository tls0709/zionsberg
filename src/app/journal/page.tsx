"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const newsItems = [
  {
    id: "winter-2026",
    title: "The Winter Edition",
    date: "Dec 12, 2026",
    category: "Announcement",
  },
  {
    id: "new-experience",
    title: "A New Sanctuary Experience",
    date: "Nov 05, 2026",
    category: "Program",
  },
  {
    id: "philosophy",
    title: "Philosophy of Deep Rest",
    date: "Oct 21, 2026",
    category: "Journal",
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen pt-32 px-6 md:px-24 bg-background text-foreground flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mb-24"
      >
        <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6 block">
          News & Updates
        </span>
        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-none mb-12">
          JOURNAL.
        </h1>
        <p className="text-xl md:text-3xl font-light opacity-80 max-w-2xl tracking-tight">
          Read the latest stories, program announcements, and philosophies from Zionsberg.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl flex flex-col border-t border-foreground/10 pb-32">
        {newsItems.map((item, index) => (
          <Link href={`/journal/${item.id}`} key={item.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-foreground/10 hover:bg-foreground/5 transition-colors duration-500 cursor-pointer -mx-6 px-6"
            >
              <div className="flex flex-col md:w-2/3">
                <span className="text-xs tracking-[0.2em] font-bold uppercase opacity-50 mb-4">{item.category}</span>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter group-hover:text-primary transition-colors duration-500">{item.title}</h2>
              </div>
              <div className="mt-6 md:mt-0 text-lg opacity-60 tracking-tight flex items-center gap-4">
                {item.date}
                <motion.div 
                  className="w-8 h-[2px] bg-foreground group-hover:w-16 transition-all duration-500"
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
