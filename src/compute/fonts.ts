// this file is about parsing and responding to received font objects

import { parse } from 'opentype.js';
import { FontsRecord, FontsTransmit, FontType } from '../interfaces';

import print from '../scripts/print';

let resolve: (value: FontsRecord) => void;
export default new Promise<FontsRecord>(r => resolve = r);

// resolve to notify texts section about successful font load
export function loadFonts(data: FontsTransmit) {
  let parsed = {
    display: parse(data.display),
    text: parse(data.text)
  };

  resolve(parsed);
  print('⌨️ Fonts')
}
