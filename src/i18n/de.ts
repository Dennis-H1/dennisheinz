import type { StringBundle } from "./strings";

export const de: StringBundle = {
  htmlLang: "de",
  ogLocale: "de_DE",
  title: "Dennis Heinz",
  metaDescription:
    "Dennis Heinz – Softwareentwickler aus dem Münsterland. Ich baue Webanwendungen, schreibe über Software und meine Nebenprojekte.",
  routes: {
    home: "/de/",
    about: "/de/about/",
    blog: "/de/blog/",
    legal: "/de/impressum/",
    privacy: "/de/datenschutz/",
  },
  person: {
    description:
      "Hi, ich bin Dennis, Softwareentwickler aus dem Münsterland. Ich entwickle leidenschaftlich gerne Webanwendungen mit PHP, React und TypeScript und beschäftige mich nebenbei mit Machine Learning. Auf dieser Seite stelle ich meine Projekte vor – schreib mir gerne über LinkedIn oder per E-Mail.",
    jobTitle: "Softwareentwickler",
  },
  service: {
    name: "Dennis Heinz – Webentwicklung",
    description:
      "Webentwicklung mit PHP, React, TypeScript und Datenbanken (SQL & NoSQL). Full-Stack von Frontend bis Backend.",
    serviceType: ["Webentwicklung", "Full-Stack-Entwicklung"],
  },
  nav: {
    home: "Dennis Heinz",
    projects: "Projekte",
    writing: "Blog",
    about: "Über",
    blog: "Blog",
    themeToggleAria: "Theme wechseln",
    langSwitchAria: "Sprache wechseln",
    langSwitchLabel: "EN",
    langSwitchHref: "/en/",
    langName: "Deutsch",
  },
  hero: {
    eyebrow: "Softwareentwickler · Münsterland, DE",
    name: "Dennis Heinz",
    subtitlePost: "aus dem Münsterland.",
    cyclerWords: ["Indie Hacker", "Tech-Enthusiast", "Wanderer", "Investor"],
    socialGithub: "GitHub",
    socialLinkedin: "LinkedIn",
    scrollCue: "scrollen",
  },
  projects: {
    label: "Projekte",
    title: "Ausgewählte Projekte",
    viewProject: "Projekt ansehen →",
    soon: "Bald verfügbar",
  },
  writing: {
    label: "Blog",
    title: "Aktuelle Beiträge",
    allPosts: "Alle Beiträge →",
    readTime: (min: number) => `${min} Min. Lesezeit`,
    empty: "Bald gibt es hier Beiträge.",
    placeholderTag: "Entwurf",
  },
  about: {
    label: "Über mich",
    body: "Ich bin Softwareentwickler im Münsterland. Backend, Mobile, Frontend – meistens TypeScript und PHP. Wenn ich nicht am Rechner sitze, bin ich draußen unterwegs, am liebsten wandernd.",
    more: "Mehr über mich →",
  },
  footer: {
    copyright: "© 2026 Dennis Heinz",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  },
  legal: {
    title: "Impressum",
    eyebrow: "Rechtliches",
    description:
      "Impressum und Anbieterkennzeichnung gemäß § 5 DDG für dennisheinz.com.",
    headings: {
      identity: "Angaben gemäß § 5 DDG",
      contact: "Kontakt",
      responsible: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    },
    labels: {
      name: "Name",
      address: "Anschrift",
      phone: "Telefon",
      email: "E-Mail",
    },
    note: "Privat betrieben, kein gewerbliches Angebot.",
  },
  privacy: {
    title: "Datenschutzerklärung",
    eyebrow: "Rechtliches",
    asOf: (date: string) => `Stand: ${date}`,
    description:
      "Datenschutzerklärung gemäß DSGVO für dennisheinz.com – Verantwortlicher, Verarbeitungen, Hosting (Hetzner, Cloudflare), Kontaktaufnahme (Cloudflare Email Routing, Brevo) und Rechte der Betroffenen.",
  },
  notFound: {
    eyebrow: "404",
    title: "Seite nicht gefunden",
    body: "Diese Seite existiert nicht oder wurde verschoben.",
    home: "← Zurück zur Startseite",
  },
};
