import { Studio } from "./Studio";

export const dynamic = "force-static";
export const dynamicParams = false;
export const runtime = "edge";

export function generateStaticParams() {
  // Required for `output: export` with catch-all routes
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
