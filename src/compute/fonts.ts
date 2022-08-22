// this file is about parsing and responding to received font objects

import { parse } from 'opentype.js';
import { FontsRecord, FontType } from '../interfaces';

// promise so we can ensure fonts are loaded 
// before we try to vectorize text
let fontsResolve: (value: FontsRecord | PromiseLike<FontsRecord>) => void;
const fonts = new Promise<FontsRecord>((resolve) => fontsResolve = resolve);
export default fonts;

// when script gor ArrayBuffer's of fonts, we can parse them and resolve promise
export async function loadFonts(data: FontsRecord) {
  let fonts: FontsRecord = {}

  for (let fontType in data) {
    let font = parse(data[fontType]);
    let baseline = 1 + Math.abs(font.descender) / font.ascender;

    fonts[fontType] = { font, baseline }
  }

  // resolve to notify texts section about successful font load
  fontsResolve(fonts);
}
