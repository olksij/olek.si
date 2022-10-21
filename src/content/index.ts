export { head, languages } from './general';

import { ElementConfig, Languages, AnimatingOrder, SourceTextData } from '../interfaces';


/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- --- URGENT REFACTORING- --- ---
   --- --- --- --- --- --- --- --- --- */

// specific dates with custom description
const dates: Record<string, Record<Languages, [string, string]>> = {  
  "6-12":  {
    en: ["🎂 It's my birthday today!", "June 12"],
    sv: ["🎂 Jag fyller år idag!", "Juni 12"],
    uk: ["🎂 Ce moje deń narodžnńa!", "Červeń 12"],
  },
  "8-24": {
    en: ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
    sv: ["Återställande av Ukrainas självständighet", "🇺🇦 Augusti 24"],
    uk: ["Vidnovlenńa nezaležnosti Ukrajiny", "🇺🇦 Serpeń 24"],
  },
  // more dates to come such as celebrations and holidays
  default: {
    en: ["Redefining the way humans interact", "with computers."],
    sv: ["Omdefinierar hur människor interagerar", "med datorer."],
    uk: ["Pereosmysĺuju sposib vzajemodiji", "z compjuteramy."],
  }
};

import titleFromPath from 'bundle-text:/assets/raw/titleFromPath.txt';
import nav from 'bundle-text:/assets/raw/nav.txt';
import cr from 'bundle-text:/assets/raw/copyright.txt';
import lg from 'bundle-text:/assets/raw/language.txt';

let date = new Date();
let description = dates[date.getMonth() + '-' + (date.getDate() + 1)] ?? dates.default;

export const elementConfig: Record<string, ElementConfig> = {

/* 🏷️ Element ID       ✨ FontStyle        ⚙️ Custom placeholder
  _______|_______   _________|_______  ______________|______________ */
  tt:             { text: "title",     from: { path: titleFromPath } },
  d1:             { text: "subtitle", },
  d2:             { text: "subtitle", },
  home:           { text: "menuSelected" },
  about:          { text: "menu" },
  projects:       { text: "menu" }, //          🖼️ Icon
  work:           { text: "menu" }, // _____________|_____________
  nav:            { text: "action",    icon: { path: nav, gap: 4 } },
  cr:             { text: "footer",    icon: { path: cr,  gap: 0 } },
  lg:             { text: "footer",    icon: { path: lg,  gap: 2 } },
};

export const texts: SourceTextData = {
  en: {
    tt: "Oleksii",
    d1: description["en"][0],
    d2: description["en"][1],
    home: "oleksii.xyz",
    about: "about",
    projects: "projects",
    work: "work",
    nav: "Navigation",
    cr: "2018-2022 Oleksii Besida",
    lg: "English",
  },
  sv: {
    tt: "Oleksiy",
    d1: description["sv"][0],
    d2: description["sv"][1],
    home: "oleksii.xyz",
    about: "om mig",
    projects: "projekts",
    work: "alster",
    nav: "Navigering",
    cr: "2018-2022 Oleksiy Besida",
    lg: "Svenska",
  },
  uk: {
    tt: "Oleksij",
    d1: description["uk"][0],
    d2: description["uk"][1],
    home: "oleksii.xyz",
    about: "pro mene",
    projects: "projekty",
    work: "roboty",
    nav: "Naviǧacija",
    cr: "2018-2022 Oleksij Besida",
    lg: "Ukrajinśka",
  },
};

// more things to come soon;

// inline pictures
import pf from 'data-url:/assets/images/profilePicture.webp';
import tg from 'data-url:/assets/vectors/telegram.svg';
import ig from 'data-url:/assets/vectors/instagram.svg';
import gh from 'data-url:/assets/vectors/github.svg';
import li from 'data-url:/assets/vectors/linkedin.svg';
import mt from 'data-url:/assets/vectors/email.svg';

export const images: Record<string, string> = { pf }

export const vectors: Record<string, string> = { tg, ig, gh, li, mt, cr, lg }

import indexStylesheet from 'data-url:../styles/index.css';
import { onMenuClick } from '../modules/menu';

export const stylesheets: string[] = [indexStylesheet];

export const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://ig.me/oleksiibesidaa", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
  "rg": ["https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz"],
}

export const restoreClicks: Record<string, Array<Function>> = {
  rg: [
    () => onMenuClick(),
    () => onMenuClick(),
    () => onMenuClick(),
    () => onMenuClick(),
  ],
};

// order and details of animating each node

export const animatingOrder: Record<string, AnimatingOrder> = {
  "pf":  { image: true,  delay: 0, alt: 'Profile Picture' },
  "tt":  { delay: 50 },
  "d1":  { delay: 500 },
  "d2":  { delay: 50 },
  "ps":  { image: true, delay: 100, children: true },
  "rg":  { delay: 50, children: true },
  "nav": { delay: 0 },
  "cr":  { delay: 0 },
  "lg":  { delay: 0 },
}
