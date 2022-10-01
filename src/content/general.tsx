import { FontStyle } from "../classes";
import { FontStyleType, Languages } from "../interfaces";
import { createElement, createFragment } from "../modules/jsx";

export const head = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/assets/favicon.ico', import.meta.url)} />
];

export const fontStyles: Record<FontStyleType, FontStyle> = {
  title: new FontStyle({
    type: 'display',
    fontSize: 128,
    lineHeight: 112,
    letterSpacing: -0.04,
    color: 'var(--text)',
  }),
  subtitle: new FontStyle({
    fontSize: 20,
    lineHeight: 28,
  }),
  menuSelected: new FontStyle({
    type: 'display',
    fontSize: 20,
    letterSpacing: -0.04,
    lineHeight: 24,
    color: 'var(--text)',
  }),
  menu: new FontStyle({
    fontSize: 18,
    lineHeight: 24,
  }),
  action: new FontStyle({
    fontSize: 16,
    lineHeight: 24,
    type: "display",
    color: 'var(--text)'
  }),
  footer: new FontStyle({
    fontSize: 12,
    lineHeight: 16,
  }),
};

export const languages: Record<Languages, string> = {
  en: 'English',
  sv: 'Svenska',
  uk: 'Ukrajinśka',
}
