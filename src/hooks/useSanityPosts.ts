import { useState, useEffect } from "react";
import { client } from "@/sanity/client";

export function useSanityPosts(type: string, lang: string = 'ko') {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        // Fetch posts that match the document type and language
        // Also fallback to generic posts if type is 'post' and filter by category if needed
        let query = '';
        if (type === 'post') {
            query = `*[_type == "post" && language == $lang] | order(date desc) {
              _id, title, slug, mainImage { asset->{ url } }, date, category, body
            }`;
        } else {
            query = `*[_type == "${type}" && language == $lang] | order(date desc) {
              _id, title, noticeType, slug, mainImage { asset->{ url } }, date, body
            }`;
        }
        
        const data = await client.fetch(query, { lang });
        setPosts(data);
      } catch (e) {
        console.error(`Failed to fetch ${type}:`, e);
      } finally {
        setLoading(false);
      }
    }
    
    if (lang) {
      fetchPosts();
    }
  }, [type, lang]);

  return { posts, loading };
}
