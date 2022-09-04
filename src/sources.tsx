import { createElement, createFragment } from "./jsx";

/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- --- URGENT REFACTORING- --- ---
   --- --- --- --- --- --- --- --- --- */

/// promise mission of which is to insert missing information to document and
/// provide text information to display in preffered language
/// and for preffered date
export const loadInternals = new Promise<Object>((resolve) => {
  let data = {};

  // specific dates with custom description
  let dates: Record<string, Array<string>> = {
    "6-12": ["🎂 It's my birthday today!", "June 12"],
    "8-23": ["Restoration of independence of Ukraine", "🇺🇦 August 24"],
    // more dates to come such as celebrations and holidays
  };

  // insert required tags back
  document.head.append(...[
    <title>Oleksii Besida</title>,
    <meta name="description" content="Oleksii Besida  |  Ukrainian he/him UI&UX designer and Frontend developer living in Stockholm, Sweden." />,
    <link rel="icon" type="image/x-icon" href={new URL('/assets/favicon.ico', import.meta.url)} />
  ]);

  // load date
  const date = new Date();
  data['description'] = dates[date.getMonth() + '-' + date.getDate()] ??
    ["Redefining the way humans interact", "with computers."];
  // more things to come soon;
  resolve(data);
});

/*// inline fonts
import display from 'data-url:/assets/fonts/displayBold.woff';
import text from 'data-url:/assets/fonts/textMedium.woff';

type FontsBase64 = { [Type in FontType]?: string };

let fonts: FontsBase64 = { display, text };

for (let font in fonts) {
  document.fonts.add(new FontFace(font, fonts[font]));

  let fontResult = Uint8Array.from(Buffer.from(fonts[font], 'base64')).buffer;
  computeWorker.postMessage({ deliver: 'fonts', data: fontResult }, [fontResult]);
}*/

// inline pictures
import profilePicture from 'data-url:/assets/images/profilePicture.webp';
import telegram from 'data-url:/assets/images/telegram.svg';
import instagram from 'data-url:/assets/images/instagram.svg';
import github from 'data-url:/assets/images/github.svg';
import linkedin from 'data-url:/assets/images/linkedin.svg';
import email from 'data-url:/assets/images/email.svg';
import copyright from 'data-url:/assets/images/copyright.svg';

// image links to load
export let images: Record<string, string> = {};

let importedImages: Record<string, string> = {
  pf: profilePicture, telegram,
  instagram, github, linkedin, email, cr: copyright
}

for (var image in importedImages) {
  var data = importedImages[image];
  if (!data.startsWith('data:'))
    data = "data:image/svg+xml;utf8," + data;
  images[image] = data;
}

import indexStylesheet from 'data-url:./index.css';

const stylesheets: string[] = [indexStylesheet];

for (var style of stylesheets) {
  document.head.append(<link rel="stylesheet" href={style} />)
}
