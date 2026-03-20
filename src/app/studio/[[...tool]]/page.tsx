import { Studio } from "./Studio";

export const dynamic = "force-static";

export function generateStaticParams() {
  // Required for `output: export` with catch-all routes
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
