import { createElement, createFragment } from "./jsx";

// dates with custom description
export const dates = {
  "5-12": ["🎂 It's my birthday today!", "June 12"],
  // more dates to come such as celebrations and holidays
};

export const head: Node[] = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/assets/favicon.ico', import.meta.url)} />
];

// font links to load
export const fonts = {
  'Google Sans Display': new URL('/assets/fonts/GoogleSansDisplay-Bold.woff2', import.meta.url),
  'Google Sans Text': new URL('/assets/fonts/GoogleSansText-Medium.ttf', import.meta.url),
};

// image links to load
export const images = {
  "profilePicture": new URL("/assets/profilePicture.jpg?as=webp&width=512", import.meta.url),
  "telegram": new URL("/assets/telegram.svg", import.meta.url),
  "instagram": new URL("/assets/instagram.svg", import.meta.url),
  "github": new URL("/assets/github.svg", import.meta.url),
  "twitter": new URL("/assets/twitter.svg", import.meta.url),
  "email": new URL("/assets/email.svg", import.meta.url),
  "copyright": new URL("/assets/copyright.svg", import.meta.url),
  "123": new URL('/assets/oleksii.svg', import.meta.url),
};

export const stylesheets = [
  new URL("./index.css", import.meta.url)
];
