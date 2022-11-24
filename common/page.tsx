import { PageContent, Languages } from '../interfaces';
import { createElement } from "../render/jsx";

import print from '../render/print';
import render from '../render/render';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload(content: PageContent) {
  print("🔥 Load Event");

  requestAnimationFrame(() => render(content));

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
