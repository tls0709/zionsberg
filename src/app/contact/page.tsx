"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";
import { submitInquiry } from "@/app/actions/submitInquiry";

export default function ContactPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const labels = {
    name: lang === "ko" ? "이름" : lang === "en" ? "Name" : "Name",
    email: lang === "ko" ? "이메일" : lang === "en" ? "Email" : "E-Mail",
    title: lang === "ko" ? "제목" : lang === "en" ? "Subject" : "Betreff",
    message: lang === "ko" ? "문의 내용" : lang === "en" ? "Message" : "Nachricht",
    send: lang === "ko" ? "보내기" : lang === "en" ? "Send" : "Senden",
    sending: lang === "ko" ? "전송 중..." : lang === "en" ? "Sending..." : "Sende...",
    thanks: lang === "ko"
      ? "문의가 접수되었습니다. 감사합니다."
      : lang === "en"
      ? "Your message has been received. Thank you."
      : "Ihre Nachricht wurde empfangen. Vielen Dank.",
    error: lang === "ko"
      ? "오류가 발생했습니다. 다시 시도해주세요."
      : lang === "en"
      ? "An error occurred. Please try again."
      : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
  };

  async function handleAction(formData: FormData) {
    setLoading(true);
    const result = await submitInquiry(formData);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(labels.error);
    }
  }

  return (
    <>
      <PageHero title={t.contactTitle} description={t.contactDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          {submitted ? (
            <div className="text-center py-20">
              <p className="text-xl opacity-70">{labels.thanks}</p>
            </div>
          ) : (
            <form
              action={handleAction}
              className="space-y-6"
            >
              <div>
                <label className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                  {labels.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-transparent border border-foreground/15 rounded-xl focus:border-foreground/40 focus:outline-none transition-colors text-foreground disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                  {labels.email}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-transparent border border-foreground/15 rounded-xl focus:border-foreground/40 focus:outline-none transition-colors text-foreground disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                  {labels.title}
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-transparent border border-foreground/15 rounded-xl focus:border-foreground/40 focus:outline-none transition-colors text-foreground disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 block mb-2">
                  {labels.message}
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-transparent border border-foreground/15 rounded-xl focus:border-foreground/40 focus:outline-none transition-colors resize-none text-foreground disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-foreground text-background rounded-full text-sm font-bold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? labels.sending : labels.send}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
