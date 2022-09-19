export { head } from './general';

import { FontStyle, RenderData, TextData } from '../interfaces';
import { fontStyles } from './general';


/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- --- URGENT REFACTORING- --- ---
   --- --- --- --- --- --- --- --- --- */

// specific dates with custom description
const dates: Record<string, Array<string>> = {
  "6-12": ["🎂 It's my birthday today!", "June 12"],
  "8-23": ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
  // more dates to come such as celebrations and holidays
  default: ["Redefining the way humans interact", "with computers."],
};

const titleFromPath = "M103 0H0V112H103V80V0ZM52 80H51V79H52V80ZM103 0H129V112H103V80V0ZM129 0H201V112H129V0ZM167 51V50H168V51H167ZM201 0H267V112H201V0ZM324 0H267V112H324V50.5V0ZM324 0V50.5H355V0H324ZM324 50.5V112H355V50.5H324ZM386 50.5V0H355V50.5H386ZM386 112V50.5H355V112H386Z";


let date = new Date();
let description = dates[date.getMonth() + '-' + date.getDate()] ?? dates.default;

export const texts: Record<string, TextData> = {
  "tt": { text: 'Oleksii', width: 386, fromPath: titleFromPath, font: fontStyles.title, },
  "d1": { text: description[0], width: 337, font: fontStyles.description, },
  "d2": { text: description[1], width: 148, font: fontStyles.description, },
  "nav-home": { text: 'oleksii.xyz', width: 128, font: fontStyles.menuSelected },
  "nav-about": { text: 'about', width: 128, font: fontStyles.menu },
  "nav-projects": { text: 'projects', width: 128, font: fontStyles.menu },
  "nav-work": { text: 'work', width: 128, font: fontStyles.menu },
  "nav": { text: 'Navigation', width: 88, font: fontStyles.navButton, },
  "cr": { text: '2018-2022 Oleksii Besida', width: 142, font: fontStyles.copyright, },
}

// more things to come soon;

// inline pictures
import pf from 'data-url:/assets/images/profilePicture.webp';
import telegram from 'data-url:/assets/vectors/telegram.svg';
import instagram from 'data-url:/assets/vectors/instagram.svg';
import github from 'data-url:/assets/vectors/github.svg';
import linkedin from 'data-url:/assets/vectors/linkedin.svg';
import email from 'data-url:/assets/vectors/email.svg';
import nav from 'data-url:/assets/vectors/nav.svg';
import cr from 'data-url:/assets/vectors/copyright.svg';

export const images: Record<string, string> = { pf }

export const vectors: Record<string, string> = {
  telegram, instagram, github, linkedin, email, cr, nav
}

import indexStylesheet from 'data-url:../styles/index.css';

export const stylesheets: string[] = [indexStylesheet];

// for restoring shortened ids in order to get 
// relation between records and dom
export const restoreIDs: Record<string, Array<string>> = {
  "ps": ["telegram", "instagram", "github", "linkedin", "email"],
  "rg": ["nav-home", "nav-about", "nav-projects", "nav-work"],
  "ft": ["cr", "lg"],
}

export const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://instagram.com/oleksiibesidaa", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
  "rg": ["https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz"],
}

// order and details of animating each node

export const animatingOrder: Record<string, RenderData> = {
  "pf": { type: 'img', delay: 0, alt: 'profilePicture' },
  "tt": { type: 'text', delay: 50 },
  "d1": { type: 'text', delay: 300 },
  "d2": { type: 'text', delay: 50 },
  "ps": { type: 'img', delay: 50, children: true },
  "rg": { type: 'text', delay: 50, children: true },
  "nav": { type: 'both', delay: 0 },
  "cr": { type: 'both', delay: 0 },
}
