import type { StringBundle } from "./strings";

export const en: StringBundle = {
  htmlLang: "en",
  ogLocale: "en_US",
  title: "Dennis Heinz",
  metaDescription:
    "Dennis Heinz – software developer from the Münsterland region. I build web applications and write about software and the side projects I'm working on.",
  routes: {
    home: "/en/",
    about: "/en/about/",
    blog: "/en/blog/",
    legal: "/en/imprint/",
    privacy: "/en/privacy/",
  },
  person: {
    description:
      "Hi, I'm Dennis, a software developer from the Münsterland region in Germany. I build web applications with PHP, React and TypeScript, and tinker with machine learning on the side. This site is where I share my projects – reach out on LinkedIn or by email.",
    jobTitle: "Software Developer",
  },
  service: {
    name: "Dennis Heinz – Web Development",
    description:
      "Web development with PHP, React, TypeScript and databases (SQL & NoSQL). Full-stack from frontend to backend.",
    serviceType: ["Web Development", "Full-Stack Development"],
  },
  nav: {
    home: "Dennis Heinz",
    projects: "Projects",
    writing: "Blog",
    about: "About",
    blog: "Blog",
    themeToggleAria: "Toggle theme",
    langSwitchAria: "Switch language",
    langSwitchLabel: "DE",
    langSwitchHref: "/de/",
    langName: "English",
  },
  hero: {
    eyebrow: "Software Developer · Münsterland, DE",
    name: "Dennis Heinz",
    subtitlePost: "near Münster.",
    cyclerWords: ["Indie Hacker", "Tech Enthusiast", "Hiker", "Investor"],
    socialGithub: "GitHub",
    socialLinkedin: "LinkedIn",
    scrollCue: "scroll",
  },
  projects: {
    label: "Projects",
    title: "Selected projects",
    viewProject: "View project →",
    soon: "Coming soon",
  },
  writing: {
    label: "Blog",
    title: "Latest posts",
    allPosts: "All posts →",
    readTime: (min: number) => `${min} min read`,
    empty: "Posts coming soon.",
    placeholderTag: "Draft",
  },
  about: {
    label: "About",
    body: "I'm a software developer based near Münster, Germany. Backend, mobile, frontend – mostly TypeScript and PHP. When I'm not at the keyboard I'm usually outside, ideally on a hiking trail.",
    more: "More about me →",
  },
  footer: {
    copyright: "© 2026 Dennis Heinz",
    impressum: "Imprint",
    datenschutz: "Privacy",
  },
  legal: {
    title: "Imprint",
    eyebrow: "Legal",
    description:
      "Imprint and provider identification per § 5 DDG (German Telemedia Act) for dennisheinz.com.",
    headings: {
      identity: "Information per § 5 DDG",
      contact: "Contact",
      responsible: "Responsible for content per § 18 (2) Media State Treaty",
    },
    labels: {
      name: "Name",
      address: "Address",
      phone: "Phone",
      email: "Email",
    },
    note: "Operated privately, not a commercial offering.",
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Legal",
    asOf: (date: string) => `Last updated: ${date}`,
    description:
      "Privacy policy under the GDPR for dennisheinz.com — controller, processing activities, hosting (Hetzner, Cloudflare), contact (Cloudflare Email Routing, Brevo) and data subject rights.",
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    body: "This page doesn't exist or has been moved.",
    home: "← Back to the homepage",
  },
};
