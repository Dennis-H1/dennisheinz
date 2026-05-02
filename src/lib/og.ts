import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const fontsDir = path.resolve(process.cwd(), "src/assets/fonts");

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: "normal" }[]> | null = null;
const loadFonts = () =>
  (fontsPromise ??= Promise.all([
    fs.readFile(path.join(fontsDir, "Inter-Regular.ttf")),
    fs.readFile(path.join(fontsDir, "Inter-Bold.ttf")),
  ]).then(([regular, bold]) => [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
  ]));

export interface OgImageInput {
  title: string;
  subtitle?: string;
  footer?: string;
}

export async function renderOgImage({ title, subtitle, footer }: OgImageInput): Promise<Buffer> {
  const fonts = await loadFonts();

  const node = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#0a0a0a",
        color: "#f0ede8",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontSize: 28,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
            },
            children: "dennisheinz.com",
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 24,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 88,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  },
                  children: title,
                },
              },
              subtitle && {
                type: "div",
                props: {
                  style: {
                    fontSize: 36,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: "#bdb8b0",
                    maxWidth: 1000,
                  },
                  children: subtitle,
                },
              },
            ].filter(Boolean),
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: 24,
              color: "#666",
              letterSpacing: "0.05em",
            },
            children: footer ?? "Software Developer · Münsterland",
          },
        },
      ],
    },
  };

  const svg = await satori(node as unknown as ReactNode, {
    width: 1200,
    height: 630,
    fonts,
  });

  return Buffer.from(new Resvg(svg).render().asPng());
}
