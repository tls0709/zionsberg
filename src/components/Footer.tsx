"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px" });

  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  return (
    <footer ref={footerRef} className="relative w-full bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8"
          >
            {t.footerTitle}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/reservation"
              className="inline-block px-8 py-3.5 bg-background text-foreground rounded-full text-sm font-bold tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {t.footerBtn}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold tracking-widest uppercase mb-3">
              Zionsberg
            </h3>
            <p className="text-sm opacity-50 leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          {/* Address & Contact */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                Address
              </span>
              <p className="text-sm opacity-70 leading-relaxed">
                {t.footerAddress}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                Contact
              </span>
              <a
                href={`mailto:${t.footerEmail}`}
                className="text-sm opacity-70 hover:opacity-100 transition-opacity block"
              >
                {t.footerEmail}
              </a>
              <span className="text-sm opacity-70 block mt-1">
                {t.footerPhone}
              </span>
            </div>
          </div>

          {/* Quick Links & Language */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                Quick Links
              </span>
              <div className="flex flex-col gap-1.5">
                <Link href="/stay" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {t.stay}
                </Link>
                <Link href="/program" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {t.program}
                </Link>
                <Link href="/journal" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {t.journal}
                </Link>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                Language
              </span>
              <div className="flex gap-3">
                {(["ko", "de", "en"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => useLanguageStore.getState().setLang(code)}
                    className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${
                      lang === code
                        ? "border-background bg-background text-foreground"
                        : "border-background/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    {code === "ko" ? "한국어" : code === "de" ? "Deutsch" : "English"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-30">
            &copy; {new Date().getFullYear()} Zionsberg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
