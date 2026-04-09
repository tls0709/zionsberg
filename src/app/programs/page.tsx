"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function ProgramsPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const programs = [
    {
      title: lang === "ko" ? "명상 & 요가" : lang === "en" ? "Meditation & Yoga" : "Meditation & Yoga",
      desc: lang === "ko"
        ? "전문 강사와 함께하는 마음 챙김 명상과 요가 프로그램"
        : lang === "en"
        ? "Mindfulness meditation and yoga programs with expert instructors"
        : "Achtsamkeitsmeditation und Yoga mit erfahrenen Lehrern",
    },
    {
      title: lang === "ko" ? "미술 치료" : lang === "en" ? "Art Therapy" : "Kunsttherapie",
      desc: lang === "ko"
        ? "그림과 공예를 통해 내면의 감정을 표현하고 치유하는 시간"
        : lang === "en"
        ? "Express and heal inner emotions through painting and crafts"
        : "Innere Emotionen durch Malen und Handwerk ausdrücken und heilen",
    },
    {
      title: lang === "ko" ? "한국 문화 체험" : lang === "en" ? "Korean Culture" : "Koreanische Kultur",
      desc: lang === "ko"
        ? "전통 다도, 한식 요리 교실 등 독일에서 만나는 한국 문화"
        : lang === "en"
        ? "Traditional tea ceremony, Korean cooking classes and more"
        : "Traditionelle Teezeremonie, koreanische Kochkurse und mehr",
    },
  ];

  return (
    <>
      <PageHero title={t.programTitle} description={t.programDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-foreground/[0.03] hover:bg-foreground hover:text-background transition-all duration-500 cursor-pointer"
              >
                <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-30 block mb-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold tracking-tight mb-3">
                  {prog.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
