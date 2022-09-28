export { head, languages } from './general';

import { FontStyle, RenderConfig, SourceTextData, TextStyle } from '../interfaces';
import { fontStyles } from './general';


/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- --- URGENT REFACTORING- --- ---
   --- --- --- --- --- --- --- --- --- */

// specific dates with custom description
const dates: Record<string, Array<string>> = {
  "6-12": ["🎂 It's my birthday today!", "June 12"],
  "8-24": ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
  // more dates to come such as celebrations and holidays
  default: ["Redefining the way humans interact", "with computers."],
};

const titleFromPath = "M103 0H0V112H103V80V0ZM52 80H51V79H52V80ZM103 0H129V112H103V80V0ZM129 0H201V112H129V0ZM167 51V50H168V51H167ZM201 0H267V112H201V0ZM324 0H267V112H324V50.5V0ZM324 0V50.5H355V0H324ZM324 50.5V112H355V50.5H324ZM386 50.5V0H355V50.5H386ZM386 112V50.5H355V112H386Z";


let date = new Date();
let description = dates[date.getMonth() + '-' + (date.getDate() + 1)] ?? dates.default;

export const textStyleData: Record<string, TextStyle> = {

/*                   Placeholder 
  🏷️ Element ID        width              ✨ FontStyle              ⚙️ Custom placeholder
         |               |                      |                              |
  --------------   ------------       -----------------------           --------------   */

  "tt":           { width: 386, font: fontStyles.title,       fromPath: titleFromPath, },
  "d1":           { width: 337, font: fontStyles.description, },
  "d2":           { width: 148, font: fontStyles.description, },
  "nav-home":     { width: 128, font: fontStyles.menuSelected },
  "nav-about":    { width: 128, font: fontStyles.menu },
  "nav-projects": { width: 128, font: fontStyles.menu },
  "nav-work":     { width: 128, font: fontStyles.menu },
  "nav":          { width: 88,  font: fontStyles.navButton, },
  "cr":           { width: 142, font: fontStyles.copyright, },
  "lg":           { width: 76,  font: fontStyles.copyright, },
}

export const texts: SourceTextData = {
  en: {
    'tt': 'Oleksii',
    'd1': description[0],
    'd2': description[1],
    'nav-home': 'oleksii.xyz',
    'nav-about': 'about',
    'nav-projects': 'projects',
    'nav-work': 'work',
    'nav': 'Navigation',
    'cr': '2018-2022 Oleksii Besida',
    'lg': 'English',
  },
  sv: {
    'tt': 'Oleksiy',
    'd1': description[0],
    'd2': description[1],
    'nav-home': 'oleksii.xyz',
    'nav-about': 'om mig',
    'nav-projects': 'projekts',
    'nav-work': 'alster',
    'nav': 'Navigering',
    'cr': '2018-2022 Oleksiy Besida',
    'lg': 'Svenska',
  },
  uk: {
    'tt': 'Oleksij',
    'd1': description[0],
    'd2': description[1],
    'nav-home': 'oleksii.xyz',
    'nav-about': 'pro mene',
    'nav-projects': 'projekty',
    'nav-work': 'roboty',
    'nav': 'Naviǧacija',
    'cr': '2018-2022 Oleksij Besida',
    'lg': 'Ukrajinśka',
  }
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
import lg from 'data-url:/assets/vectors/language.svg';

export const images: Record<string, string> = { pf }

export const vectors: Record<string, string> = {
  telegram, instagram, github, linkedin, email, cr, nav, lg
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

export const animatingOrder: Record<string, RenderConfig> = {
  "pf":  { type: 'img',  delay: 0, alt: 'profilePicture' },
  "tt":  { type: 'text', delay: 50 },
  "d1":  { type: 'text', delay: 300 },
  "d2":  { type: 'text', delay: 50 },
  "ps":  { type: 'img',  delay: 50, children: true },
  "rg":  { type: 'text', delay: 50, children: true },
  "nav": { type: 'both', delay: 0 },
  "cr":  { type: 'both', delay: 0 },
  "lg":  { type: 'both', delay: 0 },
}
