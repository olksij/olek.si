import { head } from './general';

/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- --- URGENT REFACTORING- --- ---
   --- --- --- --- --- --- --- --- --- */

/// promise mission of which is to insert missing information to document and
/// provide text information to display in preffered language
/// and for preffered date
let data = {};

// specific dates with custom description
let dates: Record<string, Array<string>> = {
  "6-12": ["🎂 It's my birthday today!", "June 12"],
  "8-23": ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
  // more dates to come such as celebrations and holidays
};

// insert required tags back
document.head.append(...head);

// load date
const date = new Date();
data['description'] = dates[date.getMonth() + '-' + date.getDate()] ??
  ["Redefining the way humans interact", "with computers."];
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

import indexStylesheet from 'data-url:./index.css';

export const stylesheets: string[] = [indexStylesheet];