import { ElementConfig, Languages, SourceTextData } from 'interfaces';

// specific dates with custom description
const dates: Record<string, Record<Languages, [string, string]>> = {  
  "6-12":  {
    en: ["🎂 It's my birthday today!", "June 12"],
    sv: ["🎂 Jag fyller år idag!", "Juni 12"],
    uk: ["🎂 Ce moje deń narodžnńa!", "Červeń 12"],
  },
  "8-24": {
    en: ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
    sv: ["Återställande av Ukrainas självständighet", "🇺🇦 Augusti 24"],
    uk: ["Vidnovlenńa nezaležnosti Ukrajiny", "🇺🇦 Serpeń 24"],
  },
  // more dates to come such as celebrations and holidays
  default: {
    en: ["Redefining the way humans interact", "with computers."],
    sv: ["Omdefinierar hur människor interagerar", "med datorer."],
    uk: ["Pereosmysĺuju sposib vzajemodiji", "z compjuteramy."],
  }
};

import titleFromPath from '/assets/raw/titleFromPath.txt?raw';

let date = new Date();
let description = dates[date.getMonth() + '-' + (date.getDate() + 1)] ?? dates.default;

import font from '/common/fontStyles';

const elements: Record<string, ElementConfig> = {
/*
 🏷️ ID     ✨ FontStyle           ⚙️ Custom placeholder
  _|_    ________|________     _____________|_____________ */
  tt:  { text: font.title,     from: { path: titleFromPath } },
  d1:  { text: font.subtitle, },
  d2:  { text: font.subtitle, },
};

const texts: SourceTextData = {

/*             🏴󠁧󠁢󠁥󠁮󠁧󠁿 English                  🇸🇪 Svenska               🇺🇦 Ukrajinśka
/        ___________|____________   ___________|____________   ___________|____________ */
  tt:  { en: "Oleksii",             sv: "Oleksiy",             uk: "Oleksij" },
  d1:  { en: description["en"][0],  sv: description["sv"][0],  uk: description["uk"][0] },
  d2:  { en: description["en"][1],  sv: description["sv"][1],  uk: description["uk"][1] },
};

// inline pictures
import pf from '/assets/images/profilePicture.webp';
import tg from '/assets/vectors/telegram.svg';
import mx from '/assets/vectors/matrix.svg';
import gh from '/assets/vectors/github.svg';
import li from '/assets/vectors/linkedin.svg';
import mt from '/assets/vectors/email.svg';

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
export let load = () => onload({ elements, images, links, stylesheets, texts, skeleton });
