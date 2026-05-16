import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "@/i18n/strings";

export type Post = CollectionEntry<"blog">;

export function localeOf(post: Post): Locale | null {
  const seg = post.id.split("/")[0];
  if (seg === "de" || seg === "en") return seg;
  return null;
}

export function slugOf(post: Post): string {
  const parts = post.id.split("/");
  return parts.length > 1 ? parts.slice(1).join("/") : post.id;
}

export async function getPosts(lang: Locale): Promise<Post[]> {
  const all = await getCollection("blog");
  return all
    .filter((p) => localeOf(p) === lang)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function findAlternate(
  post: Post,
  targetLang: Locale,
): Promise<Post | null> {
  const all = await getCollection("blog");
  const slug = slugOf(post);
  return (
    all.find((p) => localeOf(p) === targetLang && slugOf(p) === slug) ?? null
  );
}
