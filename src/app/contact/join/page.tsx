"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function ContactJoinPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  const options = [
    {
      title: lang === "ko" ? "자원봉사" : lang === "en" ? "Volunteering" : "Freiwilligenarbeit",
      desc: lang === "ko"
        ? "문화 프로그램 운영, 시설 관리, 게스트 안내 등 다양한 분야에서 함께해 주세요."
        : lang === "en"
        ? "Join us in cultural programs, facility management, guest guidance and more."
        : "Helfen Sie bei Kulturprogrammen, Gebäudemanagement, Gästebetreuung und mehr.",
    },
    {
      title: lang === "ko" ? "후원" : lang === "en" ? "Donation" : "Spende",
      desc: lang === "ko"
        ? "자이온스베르크의 비전에 공감해 주시는 분들의 후원은 이 공간을 지속가능하게 만듭니다."
        : lang === "en"
        ? "Donations from those who share our vision help make this space sustainable."
        : "Spenden von denen, die unsere Vision teilen, machen diesen Ort nachhaltig.",
    },
  ];

  return (
    <>
      <PageHero title={t.contactJoinTitle} description={t.contactJoinDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {options.map((opt, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-foreground/10 hover:border-foreground/30 transition-colors"
              >
                <h3 className="text-xl font-bold tracking-tight mb-4">
                  {opt.title}
                </h3>
                <p className="text-base opacity-70 leading-relaxed mb-6">
                  {opt.desc}
                </p>
                <a
                  href={`mailto:${t.footerEmail}`}
                  className="text-sm font-bold tracking-[0.15em] uppercase border-b-2 border-foreground/30 hover:border-foreground transition-colors"
                >
                  {t.footerEmail}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
