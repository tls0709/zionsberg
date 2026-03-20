"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguageStore, Language } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { lang, setLang } = useLanguageStore();
  const t = dict[lang] || dict.ko; // fallback to ko

  const links = [
    { name: t.story, href: "/#story" },
    { name: t.stay, href: "/stay" },
    { name: t.program, href: "/program" },
    { name: t.journal, href: "/journal" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-foreground/5" : "bg-transparent text-foreground"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-widest uppercase">
          {t.navTitle}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
          <div className="border border-foreground/20 rounded-full px-3 py-1 flex items-center gap-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent border-none text-xs font-bold tracking-widest uppercase cursor-pointer outline-none appearance-none"
            >
              <option value="ko" className="text-foreground bg-background">KR</option>
              <option value="en" className="text-foreground bg-background">EN</option>
              <option value="de" className="text-foreground bg-background">DE</option>
            </select>
          </div>
          <Link
            href="/reservation"
            className="px-6 py-2 bg-primary text-primary-foreground text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity"
          >
            {t.bookNow}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        variants={{
          open: { opacity: 1, height: "100vh" },
          closed: { opacity: 0, height: 0 },
        }}
        className="md:hidden overflow-hidden bg-background absolute top-20 left-0 right-0 border-t border-foreground/5 z-40"
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl tracking-widest uppercase"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
