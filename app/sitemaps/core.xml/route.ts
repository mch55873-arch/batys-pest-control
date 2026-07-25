import { coreSitemap } from "@/src/sitemaps";
import database from "@/data/usa_database.json";

export async function GET() {
  return coreSitemap(database.states as any);
}
