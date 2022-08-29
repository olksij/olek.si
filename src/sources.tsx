import { createElement, createFragment } from "./jsx";
import { FontType } from "./interfaces";

/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- --- URGENT REFACTORING- --- ---
   --- --- --- --- --- --- --- --- --- */

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

// inline fonts
import displayFont from '/fonts/displayBold.woff?raw';
import textFont from '/fonts/textMedium.woff?raw';

export const fonts: { [Type in FontType]?: string } = { display: displayFont, text: textFont };

// inline pictures
import profilePicture from '/images/profilePicture.webp?raw';
import telegram from '/images/telegram.svg?raw';
import instagram from '/images/instagram.svg?raw';
import github from '/images/github.svg?raw';
import twitter from '/images/twitter.svg?raw';
import email from '/images/email.svg?raw';
import copyright from '/images/copyright.svg?raw';

// image links to load
export const images: Record<string, string> = {
  pf: profilePicture, telegram,
  instagram, github, twitter, email, cr: copyright
};

import indexStylesheet from '/index.css';

export const stylesheets: string[] = [
  indexStylesheet
];
