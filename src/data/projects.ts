import type { Locale } from "@/i18n/strings";

export type ProjectVisual = "lumina" | "miniature";

export interface ProjectEntry {
  number: string;
  name: string;
  description: string;
  tags: string[];
  href: string | null;
  hrefLabel?: string;
  visual: ProjectVisual;
}

export const projects: Record<Locale, ProjectEntry[]> = {
  de: [
    {
      number: "01",
      name: "Lumina",
      description:
        "Räumliche Leinwand für persönliche Intelligenz. KI-Agenten, mobile Erfassung, wöchentliche Reviews.",
      tags: ["Laravel", "React", "Kotlin", "Jetpack Compose"],
      href: null,
      hrefLabel: "Bald verfügbar",
      visual: "lumina",
    },
    {
      number: "02",
      name: "dennisheinz.com",
      description:
        "Diese Seite. Astro plus eine React-Komponentenbibliothek mit CVA.",
      tags: ["Astro", "CVA", "Tailwind"],
      href: "https://github.com/Dennis-H1/dennisheinz",
      hrefLabel: "GitHub →",
      visual: "miniature",
    },
  ],
  en: [
    {
      number: "01",
      name: "Lumina",
      description:
        "Spatial canvas for personal intelligence. AI agents, mobile capture, weekly reviews.",
      tags: ["Laravel", "React", "Kotlin", "Jetpack Compose"],
      href: null,
      hrefLabel: "Coming soon",
      visual: "lumina",
    },
    {
      number: "02",
      name: "dennisheinz.com",
      description:
        "This site. Astro with a React component library built on CVA.",
      tags: ["Astro", "CVA", "Tailwind"],
      href: "https://github.com/Dennis-H1/dennisheinz",
      hrefLabel: "GitHub →",
      visual: "miniature",
    },
  ],
};
