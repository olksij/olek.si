import { createElement, createFragment } from "./jsx";

// dates with custom description
export const dates: Record<string, Array<string>> = {
  "6-12": ["🎂 It's my birthday today!", "June 12"],
  "8-23": ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
  // more dates to come such as celebrations and holidays
};

export const head: Node[] = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('favicon.ico', import.meta.url)} />
];

// font links to load
export const fonts: Record<string, URL> = {
  'display': new URL('fonts/Display-Bold.woff', import.meta.url),
  'text': new URL('fonts/Text-Medium.woff', import.meta.url),
};

// image links to load
export const images: Record<string, URL> = {
  "pf": new URL('profilePicture.webp', import.meta.url),
  "telegram": new URL('telegram.svg', import.meta.url),
  "instagram": new URL('instagram.svg', import.meta.url),
  "github": new URL('github.svg', import.meta.url),
  "twitter": new URL('twitter.svg', import.meta.url),
  "email": new URL('email.svg', import.meta.url),
  "cr": new URL('copyright.svg', import.meta.url),
};

export const stylesheets: URL[] = [
  new URL('index.css', import.meta.url)
];
