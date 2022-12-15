import { PageContent, StaticElementConfig } from 'interfaces';
import { createElement } from "/render/jsx";

import print from './scripts/print';
import construct from '/render/construct';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload(content: PageContent) {
  print(`🔥 Page: ${content.id}`);

  // wait till the previous frame finish painting to avoid freezing of styles
  requestAnimationFrame(() => construct(content));

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("⏱️ Loading web vitals");
  import('./scripts/webvitals');
}

// content that will be injected into [document.head] since it's empty
const head: HTMLElement[] = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/favicon.ico', import.meta.url)} />
];

const texts: Record<string, string> = {
/*  🏷️ ID      ✍️ Text
  ____|____  ______|______ */
  home:      "oleksii.xyz",
  about:     "about",
  projects:  "projects",
  work:      "work",
  nav:       "Navigation",
  cpr:       "2018-2022 Oleksii Besida",
  tmc:       "00:00:00",
};

import nav from '/common/vectors/nav.txt?raw';
import cpr from '/common/vectors/copyright.txt?raw';

import font from './typography';

const elements: Record<string, StaticElementConfig> = {
/*
  🏷️ Element ID      ✍️ Strings           ✨ FontStyle
  ______|______   ________|_______      ________|________  */
  home:         { text: texts.home,     style: font.menuSelected } ,
  about:        { text: texts.about,    style: font.menu },
  projects:     { text: texts.projects, style: font.menu }, //          🖼️ Icon
  work:         { text: texts.work,     style: font.menu }, // _____________|_____________
  nav:          { text: texts.nav,      style: font.action,    icon: { path: nav, gap: 8 } },
  cr:           { text: texts.cpr,      style: font.footer,    icon: { path: cpr, gap: 0 } },
  tm:           { text: texts.tmc,      style: font.footer },
};

import stylesheet from './styles/styles.css';
import skeleton from './styles/skeleton.css';

//setInterval(() => assembleAndRender('tm', content, false), 1000)

const stylesheets: string[] = [skeleton, stylesheet];

const links: Record<string, Array<string>> = {
  "rg": ["/", "/about/", "/projects/", "/works/"],
}

import { onMenuItemClick } from './scripts/menu';

const clicks: Record<string, Array<Function>> = {
  rg: [
    () => onMenuItemClick('index'),
    () => onMenuItemClick('about'),
    () => onMenuItemClick('projects'),
    () => onMenuItemClick('work'),
  ],
};

export const content = { head, elements, clicks, links, stylesheets, texts } as PageContent;
