import { sitemapIndex } from "@/src/sitemaps";
import database from "@/data/usa_database.json";

export async function GET() {
  return sitemapIndex(database.states as any);
}
