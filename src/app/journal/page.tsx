import { client } from "@/sanity/client";
import JournalList from "./JournalList";

// Fetch posts at build time
export default async function JournalPage() {
  const posts = await client.fetch(`*[_type == "post"] | order(date desc) {
    "id": slug.current,
    title,
    date,
    category
  }`);

  return <JournalList posts={posts} />;
}
