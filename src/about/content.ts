export { head, languages } from '../general/general';

import { ElementConfig, Languages, AnimatingOrder, SourceTextData } from '../interfaces';

import nav from 'bundle-text:/assets/raw/nav.txt';
import cr from 'bundle-text:/assets/raw/copyright.txt';
import lg from 'bundle-text:/assets/raw/language.txt';

let font = fontStyles;

export const elementConfig: Record<string, ElementConfig> = {
/*
  🏷️ Element ID     ✨ FontStyle        
  ______|______   ________|________  */
  tt:           { text: font.title, }, 
  d1:           { text: font.subtitle, },
  d2:           { text: font.subtitle, },
  home:         { text: font.menu },
  about:        { text: font.menuSelected },
  projects:     { text: font.menu }, //          🖼️ Icon
  work:         { text: font.menu }, // _____________|_____________
  nav:          { text: font.action,    icon: { path: nav, gap: 8 } },
  cr:           { text: font.footer,    icon: { path: cr,  gap: 0 } },
  lg:           { text: font.footer,    icon: { path: lg,  gap: 2 } },
};

export const texts: SourceTextData = {
  en: {
    tt: "About me",
    d1: 'I’m a Ukrainian he/him living in',
    d2: 'Stockholm, Sweden.',
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
import mx from 'data-url:/assets/vectors/matrix.svg';
import gh from 'data-url:/assets/vectors/github.svg';
import li from 'data-url:/assets/vectors/linkedin.svg';
import mt from 'data-url:/assets/vectors/email.svg';

export const images: Record<string, string> = { pf }

export const vectors: Record<string, string> = { tg, mx, gh, li, mt, cr, lg }

import indexStylesheet from 'data-url:../index/styles.css';
import { onMenuClick } from '../scripts/menu';
import { fontStyles } from '../scripts/fontStyles';

export const stylesheets: string[] = [indexStylesheet];

export const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://matrix.to/#/@human:oleksii.xyz", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
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
  "tt":  { delay: 50 },
  "d1":  { delay: 500 },
  "d2":  { delay: 0 },
  "ps":  { image: true, delay: 75, children: true },
  "rg":  { delay: 50, children: true },
  "nav": { delay: 100 },
  "cr":  { delay: 100 },
  "lg":  { delay: 100 },
}
