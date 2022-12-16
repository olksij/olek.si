// specific dates with custom description
const dates: Record<string, [string, string]> = {  
  "6-12": ["🎂 It's my birthday today!", "June 12"],
  "8-24": ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
  // more dates to come such as celebrations and holidays
  default: ["Redefining the way humans interact", "with computers."],
};

let date = new Date();
let description = dates[date.getMonth() + '-' + (date.getDate() + 1)] ?? dates.default;

import font from '/common/typography';

const elements: Record<string, StaticElementConfig> = {
/*
 🏷️ ID       ✍️ Text             ✨ FontStyle
  _|_    _______|_______       ________|________ */
  tt:  { text: 'Oleksii',      style: font.title, },
  d1:  { text: description[0], style: font.subtitle, },
  d2:  { text: description[1], style: font.subtitle, },
};

// inline pictures
import pf from '/common/images/profilePicture.webp';
import tg from '/common/vectors/telegram.svg';
import mx from '/common/vectors/matrix.svg';
import gh from '/common/vectors/github.svg';
import li from '/common/vectors/linkedin.svg';
import mt from '/common/vectors/email.svg';

const images: Record<string, string> = { pf, tg, mx, gh, li, mt }

import mainStylesheet from './styles.css';
import skeletonStylesheet from './skeleton.css';
import desktopStylesheet from './desktop.skeleton.css';

const stylesheets: string[] = [ mainStylesheet, skeletonStylesheet, desktopStylesheet ];

const links: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://matrix.to/#/@human:oleksii.xyz", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
}

import skeleton from './dom';

import { onload } from '/common/page';
import { StaticElementConfig } from '/interfaces';
export let load = () => onload({ id: 'index', elements, images, links, stylesheets, skeleton });
