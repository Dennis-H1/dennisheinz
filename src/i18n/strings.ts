import { de } from "./de";
import { en } from "./en";

export type Locale = "de" | "en";

export interface StringBundle {
  htmlLang: string;
  ogLocale: string;
  title: string;
  metaDescription: string;
  routes: {
    home: string;
    about: string;
    blog: string;
    legal: string;
    privacy: string;
  };
  person: {
    description: string;
    jobTitle: string;
  };
  service: {
    name: string;
    description: string;
    serviceType: string[];
  };
  nav: {
    home: string;
    projects: string;
    writing: string;
    about: string;
    blog: string;
    themeToggleAria: string;
    langSwitchAria: string;
    langSwitchLabel: string;
    langSwitchHref: string;
    langName: string;
  };
  legal: {
    title: string;
    eyebrow: string;
    description: string;
    headings: {
      identity: string;
      contact: string;
      responsible: string;
    };
    labels: {
      name: string;
      address: string;
      phone: string;
      email: string;
    };
    note: string;
  };
  privacy: {
    title: string;
    eyebrow: string;
    asOf: (date: string) => string;
    description: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    subtitlePost: string;
    cyclerWords: string[];
    socialGithub: string;
    socialLinkedin: string;
    scrollCue: string;
  };
  projects: {
    label: string;
    title: string;
    viewProject: string;
    soon: string;
  };
  writing: {
    label: string;
    title: string;
    allPosts: string;
    readTime: (min: number) => string;
    empty: string;
    placeholderTag: string;
  };
  about: {
    label: string;
    body: string;
    more: string;
  };
  footer: {
    copyright: string;
    impressum: string;
    datenschutz: string;
  };
}

export const strings: Record<Locale, StringBundle> = { de, en };
