"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function AboutVisionPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  return (
    <>
      <PageHero title={t.aboutVisionTitle} description={t.aboutVisionDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
          {/* Vision */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              {lang === "ko" ? "비전" : lang === "en" ? "Vision" : "Vision"}
            </h2>
            <p className="text-lg leading-relaxed opacity-80">
              {lang === "ko"
                ? "지친 현대인들에게 육체와 마음의 쉼을 제공하고, 문화를 통해 영적인 회복과 평안을 나누는 공간이 되겠습니다."
                : lang === "en"
                ? "We aim to provide rest for body and mind to weary modern people, and to share spiritual recovery and peace through culture."
                : "Wir möchten erschöpften Menschen Ruhe für Körper und Geist bieten und durch Kultur spirituelle Erholung und Frieden teilen."}
            </p>
          </div>

          <div className="w-full h-[1px] bg-foreground/10" />

          {/* Mission */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              {lang === "ko" ? "사명" : lang === "en" ? "Mission" : "Mission"}
            </h2>
            <p className="text-lg leading-relaxed opacity-80">
              {lang === "ko"
                ? "수녀원의 기도와 봉사 전통을 이어가며, 한국과 독일의 문화가 어우러지는 치유의 공동체를 만들어갑니다. 사랑과 치유의 메시지를 부드럽게 나누는 것이 우리의 사명입니다."
                : lang === "en"
                ? "Continuing the convent's tradition of prayer and service, we build a healing community where Korean and German cultures come together. Our mission is to gently share the message of love and healing."
                : "Wir setzen die klösterliche Tradition von Gebet und Dienst fort und bauen eine Heilungsgemeinschaft, in der koreanische und deutsche Kulturen zusammenkommen. Unsere Mission ist es, die Botschaft von Liebe und Heilung sanft zu teilen."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
