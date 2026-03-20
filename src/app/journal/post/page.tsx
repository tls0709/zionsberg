"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function JournalPostPage() {
  return (
    <div className="min-h-screen pt-32 px-6 md:px-24 bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-4xl mb-12">
        <Link href="/journal" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl pb-32"
      >
        <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6 block">
          Article
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
          The Zionsberg Experience
        </h1>
        
        <div className="w-full h-[40vh] md:h-[60vh] bg-foreground/5 rounded-3xl mt-12 mb-16 flex flex-col items-center justify-center border border-foreground/10">
          <span className="text-sm tracking-[0.3em] uppercase opacity-30">Featured Image Placeholder</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tighter">
          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight opacity-90 mb-8">
            This is a placeholder for detailed news or journal content. 
            Once connected to a CMS like Sanity or Contentful, this page will dynamically load the correct article formatting and imagery.
          </p>
          <h2 className="text-3xl font-bold mt-12 mb-6">Embracing the Silence</h2>
          <p className="opacity-80 leading-relaxed mb-6">
            In our modern, hyper-connected world, true rest has become the ultimate luxury. 
            At Zionsberg, we strip away the noise and cognitive overload to provide a space where you can simply &quot;be&quot;.
          </p>
          <p className="opacity-80 leading-relaxed mb-6">
            Our latest winter edition introduces programs that align with the season&apos;s natural deceleration.
            Join us to experience the transformative power of stillness.
          </p>
        </div>
      </motion.article>
    </div>
  );
}
