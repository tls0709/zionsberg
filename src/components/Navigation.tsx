"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguageStore, Language } from "@/store/useLanguageStore";
import { dict } from "@/locales";

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  sub: SubItem[];
}

function useNavItems() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const items: NavItem[] = [
    {
      name: t.navAbout,
      sub: [
        { name: t.navAboutStory, href: "/about/story" },
        { name: t.navAboutVision, href: "/about/vision" },
        { name: t.navAboutLocation, href: "/about/location" },
      ],
    },
    {
      name: t.navStay,
      sub: [
        { name: t.navStayAccom, href: "/stay" },
        { name: t.navStayDaily, href: "/stay/daily-life" },
        { name: t.navStayReserve, href: "/reservation" },
      ],
    },
    {
      name: t.navPrograms,
      sub: [
        { name: t.navProgramsCulture, href: "/programs" },
        { name: t.navProgramsSpirit, href: "/programs/spirituality" },
      ],
    },
    {
      name: t.navCommunity,
      sub: [
        { name: t.navCommunityNews, href: "/community/news" },
        { name: t.navCommunityGallery, href: "/community/gallery" },
      ],
    },
    {
      name: t.navContact,
      sub: [
        { name: t.navContactUs, href: "/contact" },
        { name: t.navContactJoin, href: "/contact/join" },
      ],
    },
  ];

  return { items, t };
}

// ─── Desktop Dropdown ───
function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="relative z-50 flex items-center justify-center h-full"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        onClick={onOpen}
        className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest py-2"
      >
        {item.name}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 z-[100]"
          >
            <div className="bg-background/95 backdrop-blur-md border border-foreground/10 rounded-2xl shadow-xl overflow-hidden min-w-[180px] flex flex-col">
              {item.sub.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onClose}
                  className="block px-6 py-3.5 text-sm tracking-wide text-foreground/80 hover:bg-foreground hover:text-background transition-colors duration-200"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Accordion ───
function MobileAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-lg tracking-widest uppercase py-3"
      >
        {item.name}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-3 pl-4 border-l border-foreground/10">
              {item.sub.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onNavigate}
                  className="text-sm tracking-wide text-foreground/60 hover:text-foreground py-2 transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navigation ───
export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { lang, setLang } = useLanguageStore();
  const { items, t } = useNavItems();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenDropdown = (i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(i);
  };

  const handleCloseDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setActiveDropdown(null);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setActiveDropdown(null);
    if (activeDropdown !== null) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [activeDropdown]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-150%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-auto min-w-[300px] lg:min-w-0 rounded-full ${
          scrolled || mobileOpen
            ? "bg-background/95 backdrop-blur-md border border-foreground/10 shadow-lg"
            : "bg-background/80 backdrop-blur-sm border border-foreground/5 shadow-sm text-foreground"
        }`}
      >
        <div className="px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between gap-8 lg:gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg lg:text-2xl font-light tracking-widest uppercase whitespace-nowrap"
          >
            {t.navTitle}
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden lg:flex gap-6 items-center h-full">
            {items.map((item, i) => (
              <DesktopDropdown
                key={item.name}
                item={item}
                isOpen={activeDropdown === i}
                onOpen={() => handleOpenDropdown(i)}
                onClose={handleCloseDropdown}
              />
            ))}

            {/* Language Switcher */}
            {langOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setLangOpen(false)}
              />
            )}
            <div className="relative z-50 ml-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 border border-foreground/20 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-transparent hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                {lang === "ko" ? "KR" : lang === "en" ? "EN" : "DE"}
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-full min-w-[3.5rem] flex flex-col bg-background border border-foreground/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 z-[100] ${
                  langOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                {(["ko", "en", "de"] as Language[])
                  .filter((l) => l !== lang)
                  .map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className="px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-foreground hover:text-background text-center text-foreground transition-colors"
                    >
                      {l === "ko" ? "KR" : l === "en" ? "EN" : "DE"}
                    </button>
                  ))}
              </div>
            </div>

            {/* Book Now */}
            <Link
              href="/reservation"
              className="px-6 py-2 bg-primary text-primary-foreground text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity ml-2 whitespace-nowrap"
            >
              {t.bookNow}
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="lg:hidden p-1 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-sm bg-background border border-foreground/10 rounded-3xl shadow-2xl z-40 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 px-6 gap-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {items.map((item) => (
                <MobileAccordion
                  key={item.name}
                  item={item}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}

              {/* Mobile Language */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-foreground/10 w-full justify-center">
                {(["ko", "en", "de"] as Language[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-300 flex-1 max-w-[80px] ${
                      lang === code
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 opacity-50"
                    }`}
                  >
                    {code === "ko" ? "KR" : code === "en" ? "EN" : "DE"}
                  </button>
                ))}
              </div>

              {/* Mobile Book Now */}
              <Link
                href="/reservation"
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full text-center py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest rounded-full"
              >
                {t.bookNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
