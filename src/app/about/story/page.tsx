"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function AboutStoryPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  return (
    <>
      <PageHero title={t.aboutStoryTitle} description={t.aboutStoryDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Placeholder image */}
            <div className="aspect-[4/5] rounded-2xl bg-foreground/5 flex items-center justify-center">
              <span className="text-foreground/20 text-sm tracking-widest uppercase">
                Story Photo
              </span>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-lg leading-relaxed opacity-80">
                {t.aboutStoryDesc}
              </p>
              <div className="w-12 h-[1px] bg-foreground/20" />
              <p className="text-base leading-relaxed opacity-60">
                {lang === "ko"
                  ? "자이온스베르크는 독일 바르부르크에 위치한 유서 깊은 수녀원을 기반으로, 한국인 운영진과 수녀님들이 함께 만들어가는 특별한 공간입니다. 기도와 봉사의 전통 위에 문화와 치유의 새로운 장을 열어가고 있습니다."
                  : lang === "en"
                  ? "Zionsberg is a special place based on a historic convent in Warburg, Germany, created together by Korean operators and the sisters. We are opening a new chapter of culture and healing upon the traditions of prayer and service."
                  : "Zionsberg ist ein besonderer Ort, basierend auf einem historischen Kloster in Warburg, Deutschland, geschaffen von koreanischen Betreibern und den Schwestern gemeinsam. Wir eröffnen ein neues Kapitel der Kultur und Heilung auf den Traditionen von Gebet und Dienst."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
