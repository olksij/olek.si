// this file is about parsing and responding to received font objects

import { Font, parse } from 'opentype.js';
import { FontsRecord } from '../interfaces';

// let's declare globals for fonts
export let fontDisplay: Font, fontText: Font;

// promise so we can ensure fonts are loaded 
// before we try to vectorize text
let fontsResolve: (value: void | PromiseLike<void>) => void;
export const fontsLoaded = new Promise<void>((resolve) => fontsResolve = resolve);

// when script gor ArrayBuffer's of fonts, we can parse them and resolve promise
export async function loadFonts(fontsData: FontsRecord) {
  fontDisplay = parse(fontsData['Display']);
  fontText = parse(fontsData['Text']);

  // resolve to notify texts section about successful font load
  fontsResolve();
}
