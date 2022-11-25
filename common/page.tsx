import { PageContent, Languages } from '../interfaces';
import { createElement } from "../render/jsx";
import { onMenuClick } from '../render/menu';

import print from '../render/print';
import construct from '../render/construct';
import { byId } from '../render/shorthands';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload(content: PageContent) {
  print("🔥 Load Event");

  requestAnimationFrame(() => construct(content));

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('../render/webvitals');

  // to contain navigator, theme specs, and other dynamic things
}

export const head: HTMLElement[] = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/favicon.ico', import.meta.url)} />
];

export const languages: Record<Languages, string> = {
  en: 'English',
  sv: 'Svenska',
  uk: 'Ukrajinśka',
}

let lg = byId('lg')!;

lg.addEventListener("mouseenter", function () {
  for (let lg in Object.keys(languages)) {
    byId('lg')!.append(<div onclick={() => window.history.pushState({}, '', `?${lg}`)} class="lgItem">{languages[lg as Languages]}</div>);
  }
});

lg.addEventListener("mouseleave", function () {
  onMenuClick();
  Array.from(byId('lg')!.getElementsByClassName('lgItem')).forEach(e => e.remove())
});
