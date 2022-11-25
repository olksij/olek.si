import { ElementConfig, AnimatingOrder, SourceTextData } from '../interfaces';

import nav from '/assets/raw/nav.txt?raw';
import cr from '/assets/raw/copyright.txt?raw';
import lg from '/assets/raw/language.txt?raw';

let font = fontStyles;

const elementConfig: Record<string, ElementConfig> = {
/*
  🏷️ Element ID     ✨ FontStyle        
  ______|______   ________|________  */
  tt:           { text: font.h2, }, 
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

const texts: SourceTextData = {
  tt: { en: "About me", sv: "Om mig", uk: "Pro mene" },
  d1: { en: "I’m a Ukrainian he/him living", sv: "Jag är en ukrainare han/honom", uk: "Ja vin/joho ukrajineć, prožyvajučyj" },
  d2: { en: "in Stockholm, Sweden.", sv: "som bor i Stockholm, Sverige.", uk: "v Stockhoĺm, Švecija." },
  home: { en: "oleksii.xyz", sv: "oleksii.xyz", uk: "oleksii.xyz", },
  about: { en: "about", sv: "om mig", uk: "pro mene" },
  projects: { en: "projects", sv: "projekts", uk: "projekty" },
  work: { en: "work", sv: "alster", uk: "roboty" },
  nav: { en: "Navigation", sv: "Navigering", uk: "Naviǧacija" },
  cr: { en: "2018-2022 Oleksii Besida", sv: "2018-2022 Oleksiy Besida", uk: "2018-2022 Oleksij Besida" },
  lg: { en: "English", sv: "Svenska", uk: "Ukrajinśka" }
};

// more things to come soon;

// inline pictures
import tg from '/assets/vectors/telegram.svg';
import mx from '/assets/vectors/matrix.svg';
import gh from '/assets/vectors/github.svg';
import li from '/assets/vectors/linkedin.svg';
import mt from '/assets/vectors/email.svg';

const vectors: Record<string, string> = { tg, mx, gh, li, mt, cr, lg }

import indexStylesheet from '../index/styles.css?url';
import { onMenuClick } from '../render/menu';
import { fontStyles } from '../common/fontStyles';

const stylesheets: string[] = [indexStylesheet];

const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://matrix.to/#/@human:oleksii.xyz", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
  "rg": ["https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz"],
}

const restoreClicks: Record<string, Array<Function>> = {
  rg: [
    () => onMenuClick('index'),
    () => onMenuClick('about'),
    () => onMenuClick('projects'),
    () => onMenuClick('work'),
  ],
};

// order and details of animating each node
const animatingOrder: Record<string, AnimatingOrder> = {
  tt:  { delay: 50 },
  d1:  { delay: 500 },
  d2:  { delay: 0 },
  ps:  { image: true, delay: 75, children: true },
  rg:  { delay: 50, children: true },
  nav: { delay: 100 },
  cr:  { delay: 100 },
  lg:  { delay: 100 },
}

import { onload } from '../common/page';
export let load = () => onload({ animatingOrder, elementConfig, restoreClicks, 
  restoreLinks, stylesheets, texts, vectors });
