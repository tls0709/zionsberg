"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function ServiceCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsColRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const services = [
    {
      id: "service_stay",
      title: t.serviceStayTitle,
      desc: t.serviceStayDesc,
      cta: t.serviceStayCta,
      url: "/stay",
      placeholder: "Guesthouse Room",
    },
    {
      id: "service_culture",
      title: t.serviceCultureTitle,
      desc: t.serviceCultureDesc,
      cta: t.serviceCultureCta,
      url: "/programs",
      placeholder: "Cultural Program",
    },
    {
      id: "service_daily",
      title: t.serviceDailyTitle,
      desc: t.serviceDailyDesc,
      cta: t.serviceDailyCta,
      url: "/stay/daily-life",
      placeholder: "Daily Life",
    },
    {
      id: "service_spirit",
      title: t.serviceSpiritTitle,
      desc: t.serviceSpiritDesc,
      cta: t.serviceSpiritCta,
      url: "/programs/spirituality",
      placeholder: "Spirituality",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray<HTMLElement>(".svc-card");

    const ctx = gsap.context(() => {
      // Each card gets its own ScrollTrigger to detect when it's in the viewport
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, container);

    return () => ctx.revert();
  }, [lang]);

  const scrollToCard = (index: number) => {
    const cards = document.querySelectorAll(".svc-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-foreground text-background"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-16">
          {/* ── Left: Sticky tab navigation ── */}
          <div className="md:col-span-4 pt-20 md:pt-0">
            <div className="md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center">
              <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-40 block mb-8">
                Services
              </span>

              <div className="flex flex-col gap-3 mb-10">
                {services.map((service, i) => (
                  <button
                    key={service.id}
                    onClick={() => scrollToCard(i)}
                    className={`text-left px-5 py-3 rounded-xl transition-all duration-400 ${
                      activeIndex === i
                        ? "bg-background/15 text-background"
                        : "text-background/35 hover:text-background/60 hover:bg-background/5"
                    }`}
                  >
                    <span className="text-sm md:text-base font-semibold tracking-tight">
                      {service.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="hidden md:block">
                <p className="text-sm opacity-30 leading-relaxed max-w-xs">
                  {lang === "ko"
                    ? "자이온스베르크가 제공하는 특별한 경험들을 만나보세요."
                    : lang === "en"
                    ? "Discover the special experiences Zionsberg has to offer."
                    : "Entdecken Sie die besonderen Erlebnisse, die Zionsberg bietet."}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Scrolling cards ── */}
          <div ref={cardsColRef} className="md:col-span-8 py-16 md:py-32 space-y-8 md:space-y-12">
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`svc-card rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-500 ${
                  activeIndex === i
                    ? "border-background/20 bg-background/[0.08]"
                    : "border-background/5 bg-background/[0.03]"
                }`}
              >
                {/* Card image area */}
                <div className="relative aspect-[16/9] bg-background/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-background/20 text-sm tracking-widest uppercase">
                      {service.placeholder}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 md:p-10">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-30 block mb-4">
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg font-light opacity-70 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link
                    href={service.url}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.12em] uppercase group"
                  >
                    <span className="px-5 py-2.5 border border-background/25 rounded-full group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                      {service.cta}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
