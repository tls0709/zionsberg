"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function ProgramsSpiritualityPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  return (
    <>
      <PageHero title={t.programSpiritTitle} description={t.programSpiritDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 md:px-12 space-y-12">
          <div className="aspect-video rounded-2xl bg-foreground/5 flex items-center justify-center">
            <span className="text-foreground/20 text-sm tracking-widest uppercase">
              Spirituality Photo
            </span>
          </div>
          <p className="text-lg leading-relaxed opacity-80">
            {lang === "ko"
              ? "자이온스베르크에서는 종교적인 색채를 너무 무겁지 않게, '치유'와 '사랑'의 관점에서 다양한 영성 프로그램을 진행합니다. 기도 모임, 말씀 나눔, 세미나 등을 통해 마음의 평안을 찾으실 수 있습니다."
              : lang === "en"
              ? "At Zionsberg, we offer various spiritual programs from the perspective of healing and love, keeping the religious tone gentle. Find peace of mind through prayer gatherings, sharing, and seminars."
              : "In Zionsberg bieten wir verschiedene spirituelle Programme aus der Perspektive von Heilung und Liebe an. Finden Sie inneren Frieden durch Gebetstreffen, Teilen und Seminare."}
          </p>
        </div>
      </section>
    </>
  );
}
