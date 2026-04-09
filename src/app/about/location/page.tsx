"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";

export default function AboutLocationPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;

  return (
    <>
      <PageHero title={t.aboutLocationTitle} description={t.aboutLocationDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          {/* Map Embed */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-foreground/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.892!2d9.0335044!3d51.533539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb0797b20e6e91%3A0xe6f965628938a382!2sAuf%20d.%20Platte%2053%2C%2034414%20Warburg!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zionsberg Location"
            />
          </div>

          {/* Address & Transport */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 mb-3">
                Address
              </h3>
              <p className="text-lg leading-relaxed">
                Auf d. Platte 53<br />
                34414 Warburg<br />
                Deutschland
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 mb-3">
                {lang === "ko" ? "교통편 안내" : lang === "en" ? "Getting Here" : "Anreise"}
              </h3>
              <div className="space-y-3 text-base opacity-80">
                <p>
                  {lang === "ko"
                    ? "🚗 주차장 무료 이용 가능"
                    : lang === "en"
                    ? "🚗 Free parking available"
                    : "🚗 Kostenlose Parkplätze verfügbar"}
                </p>
                <p>
                  {lang === "ko"
                    ? "🚆 바르부르크(Warburg) 기차역에서 차로 약 16분"
                    : lang === "en"
                    ? "🚆 About 16 min by car from Warburg train station"
                    : "🚆 Ca. 16 Min. mit dem Auto vom Bahnhof Warburg"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
