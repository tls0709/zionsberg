import { client } from "@/sanity/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { FileIcon } from "lucide-react";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Function to resolve Sanity file URL
function getFileUrl(source: any) {
  if (!source?.asset?._ref) return null;
  const ref = source.asset._ref;
  // format: file-1234567890abcdef-pdf
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t90obuqv"}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/${id}.${extension}`;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-8 relative w-full h-[50vh] overflow-hidden rounded-2xl">
        <Image src={urlFor(value).url()} alt={value.alt || "Post image"} fill className="object-cover" />
      </div>
    ),
    file: ({ value }) => {
      const fileUrl = getFileUrl(value);
      if (!fileUrl) return null;
      return (
        <a href={fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 my-6 p-6 border border-foreground/10 rounded-2xl hover:bg-foreground/5 transition-colors no-underline">
          <FileIcon size={24} className="text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-base m-0 leading-tight">Attachment</span>
            <span className="text-sm opacity-60 m-0 leading-tight block mt-1">{value.description || "Download attached file"}</span>
          </div>
        </a>
      );
    }
  }
};

// Ensure Cloudflare next build works perfectly for all posts
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`);
  if (!posts || posts.length === 0) {
    return [{ slug: "placeholder-post" }];
  }
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 px-6 md:px-24 bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-4xl mb-12">
        <Link href="/journal" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>

      <article className="w-full max-w-4xl pb-32">
        <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6 block">
          {post.category || "Article"}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
          {post.title}
        </h1>
        
        {post.mainImage && (
          <div className="w-full h-[40vh] md:h-[60vh] rounded-3xl mt-12 mb-16 overflow-hidden relative border border-foreground/10">
            <Image 
              src={urlFor(post.mainImage).url()} 
              alt={post.title} 
              fill 
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-p:opacity-80 prose-p:leading-relaxed prose-p:mb-6">
          {post.body ? <PortableText value={post.body} components={portableTextComponents} /> : <p className="opacity-60">No content available.</p>}
        </div>
      </article>
    </div>
  );
}
