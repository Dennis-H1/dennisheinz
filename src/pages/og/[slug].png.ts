import type { APIRoute, GetStaticPaths } from "astro";
import { renderOgImage, type OgImageInput } from "../../lib/og";

interface OgPage extends OgImageInput {
  slug: string;
  [key: string]: unknown;
}

const pages: OgPage[] = [
  {
    slug: "de",
    title: "Dennis Heinz",
    subtitle:
      "Softwareentwickler aus dem Münsterland. Webanwendungen mit PHP, React und TypeScript.",
    footer: "Software Developer · Münsterland",
  },
  {
    slug: "en",
    title: "Dennis Heinz",
    subtitle:
      "Software developer from the Münsterland region. Web applications with PHP, React and TypeScript.",
    footer: "Software Developer · Münsterland",
  },
];

export const getStaticPaths: GetStaticPaths = () =>
  pages.map((page) => ({ params: { slug: page.slug }, props: page }));

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle, footer } = props as OgPage;
  const png = await renderOgImage({ title, subtitle, footer });
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
