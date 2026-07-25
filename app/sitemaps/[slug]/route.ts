import { stateSitemap } from "@/src/sitemaps";
import database from "@/data/usa_database.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const match = slug.match(/^(.+)-(\d+)\.xml$/);
  if (!match) return new Response("Not Found", { status: 404 });

  const stateSlug = match[1].toLowerCase();
  const chunk = parseInt(match[2], 10);

  const state = database.states.find(
    (s) =>
      s.slug?.toLowerCase() === stateSlug ||
      s.code?.toLowerCase() === stateSlug ||
      s.name?.toLowerCase().replace(/\s+/g, "-") === stateSlug
  );

  if (!state) return new Response("State Not Found", { status: 404 });

  const res = stateSitemap(state as any, chunk);
  if (!res) return new Response("Sitemap Not Found", { status: 404 });
  return res;
}
