"use client";

import PageHero from "@/components/PageHero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dict } from "@/locales";
import { useSanityPosts } from "@/hooks/useSanityPosts";
import Link from "next/link";

export default function CommunityGalleryPage() {
  const { lang } = useLanguageStore();
  const t = dict[lang] || dict.ko;
  const { posts, loading } = useSanityPosts("gallery", lang);

  return (
    <>
      <PageHero title={t.communityGalleryTitle} description={t.communityGalleryDesc} />
      <section className="py-20 md:py-32 bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {loading ? (
             <div className="text-center py-20 opacity-50">
               {lang === "ko" ? "불러오는 중..." : lang === "en" ? "Loading..." : "Wird geladen..."}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {posts.map((post, i) => (
                <Link
                  href={`/community/gallery/${post.slug?.current || '#'}`}
                  key={post._id}
                  className={`relative block rounded-xl overflow-hidden bg-foreground/5 group cursor-pointer ${
                    i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  {post.mainImage ? (
                    <img src={post.mainImage.asset.url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-foreground/20 text-xs tracking-widest uppercase">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <span className="text-white text-sm font-medium">{post.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 opacity-50">
              {lang === "ko"
                ? "현재 등록된 사진이 없습니다."
                : lang === "en"
                ? "No photos available yet."
                : "Noch keine Fotos vorhanden."}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
