"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function StayDailyLifePage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const items = [
    {
      time: "07:00",
      title: lang === "ko" ? "고요한 아침" : lang === "en" ? "Quiet Morning" : "Stiller Morgen",
      desc: lang === "ko"
        ? "새소리와 함께 눈을 뜨고, 수녀원의 평화로운 아침을 맞이합니다."
        : lang === "en"
        ? "Wake to birdsong and greet the peaceful morning of the convent."
        : "Erwachen Sie mit Vogelgesang und begrüßen Sie den friedlichen Morgen.",
    },
    {
      time: "08:00",
      title: lang === "ko" ? "따뜻한 아침 식사" : lang === "en" ? "Warm Breakfast" : "Warmes Frühstück",
      desc: lang === "ko"
        ? "정성껏 준비된 건강한 아침 식사로 하루를 시작합니다."
        : lang === "en"
        ? "Start your day with a lovingly prepared healthy breakfast."
        : "Beginnen Sie Ihren Tag mit einem liebevoll zubereiteten Frühstück.",
    },
    {
      time: "10:00",
      title: lang === "ko" ? "산책과 묵상" : lang === "en" ? "Walk & Contemplation" : "Spaziergang & Besinnung",
      desc: lang === "ko"
        ? "바르부르크의 아름다운 자연 속 산책로를 걸으며 내면의 평온을 찾습니다."
        : lang === "en"
        ? "Find inner peace walking along Warburg's beautiful nature trails."
        : "Finden Sie inneren Frieden auf den Naturwegen von Warburg.",
    },
    {
      time: "15:00",
      title: lang === "ko" ? "문화 체험" : lang === "en" ? "Cultural Experience" : "Kulturerlebnis",
      desc: lang === "ko"
        ? "다도, 명상, 미술 치료 등 다양한 프로그램에 참여합니다."
        : lang === "en"
        ? "Participate in tea ceremony, meditation, art therapy and more."
        : "Nehmen Sie an Teezeremonie, Meditation, Kunsttherapie und mehr teil.",
    },
  ];

  return (
    <>
      <PageHero title={t.stayDailyTitle} description={t.stayDailyDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="space-y-0">
            {items.map((item, i) => (
              <div key={i} className="flex gap-6 md:gap-10 pb-12 relative">
                {/* Timeline line */}
                {i < items.length - 1 && (
                  <div className="absolute left-[1.75rem] md:left-[2rem] top-10 bottom-0 w-[1px] bg-foreground/10" />
                )}
                {/* Time */}
                <div className="flex-shrink-0 w-14 md:w-16 pt-1">
                  <span className="text-sm font-bold tracking-widest opacity-40">
                    {item.time}
                  </span>
                </div>
                {/* Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base opacity-70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
