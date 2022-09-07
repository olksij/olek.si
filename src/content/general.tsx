import { FontStyle } from "../interfaces";
import { createElement, createFragment } from "../modules/jsx";

export const head = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/assets/favicon.ico', import.meta.url)} />
];

export const fontStyles: Record<string, FontStyle> = {
  title: {
    type: 'display',
    fontSize: 128,
    lineHeight: 112,
    letterSpacing: -0.04,
    color: 'var(--text)',
  },
  description: {
    fontSize: 20,
    lineHeight: 28,
  },
  menuSelected: {
    type: 'display',
    fontSize: 20,
    letterSpacing: -0.04,
    lineHeight: 24,
    color: 'var(--text)',
  },
  menu: {
    fontSize: 18,
    lineHeight: 24,
  },
  copyright: {
    fontSize: 12,
    lineHeight: 16,
  },
};