import { PageContent, SourceTextData, ElementConfig } from 'interfaces';
import { createElement } from "/render/jsx";
import { hideDesktopMenu } from '/render/menu';

import print from '/render/print';
import construct from '/render/construct';
import { byId } from '/render/shorthands';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload(content: PageContent) {
  print("🔥 Load Event");

  requestAnimationFrame(() => construct(content));

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('./webvitals');

  // to contain navigator, theme specs, and other dynamic things
}

const head: HTMLElement[] = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/favicon.ico', import.meta.url)} />
];

import nav from '/assets/raw/nav.txt?raw';
import cr from '/assets/raw/copyright.txt?raw';
import lg from '/assets/raw/language.txt?raw';

import font from '/common/fontStyles';

const elements: Record<string, ElementConfig> = {
/*
  🏷️ Element ID     ✨ FontStyle
  ______|______   ________|________  */
  home:         { text: font.menuSelected },
  about:        { text: font.menu },
  projects:     { text: font.menu }, //          🖼️ Icon
  work:         { text: font.menu }, // _____________|_____________
  nav:          { text: font.action,    icon: { path: nav, gap: 8 } },
  cr:           { text: font.footer,    icon: { path: cr,  gap: 0 } },
  lg:           { text: font.footer,    icon: { path: lg,  gap: 2 } },
};

const texts: SourceTextData = {

//                   🏴󠁧󠁢󠁥󠁮󠁧󠁿 English                  🇸🇪 Svenska               🇺🇦 Ukrajinśka
//             ___________|____________   ___________|____________   ___________|____________ */
  home:      { en: "oleksii.xyz",         sv: "oleksii.xyz",         uk: "oleksii.xyz", },
  about:     { en: "about",               sv: "om mig",              uk: "pro mene" },
  projects:  { en: "projects",            sv: "projekts",            uk: "projekty" },
  work:      { en: "work",                sv: "alster",              uk: "roboty" },
  nav:       { en: "Navigation",          sv: "Navigering",          uk: "Naviǧacija" },
  cr:        { en: "2018-2022 Oleksii Besida", sv: "2018-2022 Oleksiy Besida", uk: "2018-2022 Oleksij Besida" },
  lg:        { en: "English",             sv: "Svenska",             uk: "Ukrajinśka" }
};

import stylesheet from './styles.css';
import skeleton from './skeleton.css';

const stylesheets: string[] = [skeleton, stylesheet];

const links: Record<string, Array<string>> = {
  "rg": ["/", "/about/", "/projects/", "/works/"],
}

import { onMenuItemClick } from '/render/menu';

const clicks: Record<string, Array<Function>> = {
  rg: [
    () => onMenuItemClick('index'),
    () => onMenuItemClick('about'),
    () => onMenuItemClick('projects'),
    () => onMenuItemClick('work'),
  ],
};

let lgElem = byId('lg')!;

export const content = { head, elements, clicks, links, stylesheets, texts } as PageContent;

lgElem.addEventListener("mouseenter", () => Object.keys(texts.lg).forEach(lg => 
  byId('lg')!.append(<div onclick={() => window.history.pushState({}, '', `?${lg}`)} class="lgItem">{texts.lg[lg]}</div>)));

lgElem.addEventListener("mouseleave", function () {
  hideDesktopMenu();
  Array.from(byId('lg')!.getElementsByClassName('lgItem')).forEach(e => e.remove())
});
