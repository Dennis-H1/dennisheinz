import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  return rss({
    title: "Dennis Heinz",
    description: "Personal site of Dennis Heinz.",
    site: context.site!,
    items: [],
  });
}
