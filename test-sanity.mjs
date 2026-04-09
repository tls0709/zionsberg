import { createClient } from 'next-sanity';
const client = createClient({
  projectId: 't90obuqv',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});
async function main() {
  const res = await client.fetch(`*[_type == "notice"] { "slug": slug.current }`);
  console.log(JSON.stringify(res, null, 2));
}
main();
