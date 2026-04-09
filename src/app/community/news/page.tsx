"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";
import { useSanityPosts } from "@/hooks/useSanityPosts";

export default function CommunityNewsPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;
  const { posts, loading } = useSanityPosts("notice", lang);

  const [filter, setFilter] = useState<'all' | 'notice' | 'news'>('all');

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    const itemType = post.noticeType || 'notice';
    return itemType === filter;
  });

  return (
    <>
      <PageHero title={t.communityNewsTitle} description={t.communityNewsDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="flex gap-2 mb-12 overflow-x-auto pb-4 md:pb-0">
             <button onClick={() => setFilter('all')} className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-widest transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/70'}`}>전체</button>
             <button onClick={() => setFilter('notice')} className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-widest transition-colors ${filter === 'notice' ? 'bg-primary text-white' : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/70'}`}>공지사항</button>
             <button onClick={() => setFilter('news')} className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-widest transition-colors ${filter === 'news' ? 'bg-primary text-white' : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/70'}`}>새소식</button>
          </div>

          {loading ? (
             <div className="text-center py-20 opacity-50">
               {lang === "ko" ? "불러오는 중..." : lang === "en" ? "Loading..." : "Wird geladen..."}
             </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid gap-8">
              {filteredPosts.map((post) => {
                const now = new Date();
                const postDate = new Date(post.date || post._createdAt);
                const diffTime = now.getTime() - postDate.getTime();
                const diffDays = diffTime / (1000 * 60 * 60 * 24);
                const isNew = diffDays < 7 && diffDays >= 0;

                return (
                <article key={post._id} className="border-b border-foreground/10 pb-8 flex flex-col md:flex-row gap-6">
                  {post.mainImage && (
                    <div className="w-full md:w-1/3 aspect-video bg-foreground/5 rounded-xl overflow-hidden shrink-0">
                      <img src={post.mainImage.asset.url} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">{post.category}</span>
                    <h3 className="text-2xl font-medium mb-3 flex items-start gap-2">
                      <span className="text-primary font-bold text-lg whitespace-nowrap pt-[2px]">[{post.noticeType === 'news' ? '새소식' : '공지'}]</span>
                      <span>{post.title}</span>
                      {isNew && (
                        <span className="bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full whitespace-nowrap self-start mt-1 relative">
                          NEW
                          <span className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></span>
                        </span>
                      )}
                    </h3>
                    <div className="text-sm opacity-50 mb-4">
                      {new Date(post.date).toLocaleDateString(lang === "ko" ? "ko-KR" : lang === "de" ? "de-DE" : "en-US")}
                    </div>
                    {/* Add Link to Post Detail Page when it gets created */}
                     <Link href={`/community/news/${post.slug?.current || '#'}`} className="text-sm font-bold tracking-[0.1em] border-b border-foreground/30 hover:border-foreground max-w-max pb-1 transition-colors mt-2">
                        {lang === "ko" ? "자세히 보기" : lang === "en" ? "Read More" : "Mehr lesen"}
                     </Link>
                  </div>
                </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 opacity-50">
              {lang === "ko"
                ? "현재 등록된 새소식이 없습니다."
                : lang === "en"
                ? "No news articles posted yet."
                : "Noch keine Neuigkeiten vorhanden."}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
