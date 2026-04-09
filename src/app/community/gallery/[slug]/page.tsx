import { client } from "@/sanity/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import PortableTextWrapper from "@/components/PortableTextWrapper";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "gallery" && defined(slug.current)] { "slug": slug.current }`);
  if (!posts || posts.length === 0) {
    return [{ slug: "placeholder-gallery" }];
  }
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function GalleryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await client.fetch(`*[_type == "gallery" && slug.current == $slug][0]`, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 px-6 md:px-24 bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-4xl mb-12">
        <Link href="/community/gallery" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} />
          Back to Gallery
        </Link>
      </div>

      <article className="w-full max-w-4xl pb-32">
        <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6 block">
          Photo Gallery
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
          {post.title}
        </h1>
        
        <div className="text-sm opacity-50 mb-12">
          {new Date(post.date || post._createdAt).toLocaleDateString()}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-p:opacity-80 prose-p:leading-relaxed prose-p:mb-6 mt-12">
          {post.body ? <PortableTextWrapper value={post.body} /> : <p className="opacity-60">No additional content available.</p>}
        </div>
      </article>
    </div>
  );
}
