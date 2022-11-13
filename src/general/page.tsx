import { Languages } from "../interfaces";
import { createElement } from "../scripts/jsx";

export const head: HTMLElement[] = [
  <title>Oleksii Besida</title>,
  <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
  <link rel="icon" type="image/x-icon" href={new URL('/assets/favicon.ico', import.meta.url)} />
];

export const languages: Record<Languages, string> = {
  en: 'English',
  sv: 'Svenska',
  uk: 'Ukrajinśka',
}
