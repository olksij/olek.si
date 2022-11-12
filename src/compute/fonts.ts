// this file is about parsing and responding to received font objects

import { parse } from 'opentype.js';
import { FontsRecord, FontsTransmit } from '../interfaces';

import print from '../scripts/print';

let resolve: (value: FontsRecord) => void;

export let fontsResolve = (_resolve: (value: FontsRecord) => void) => resolve = _resolve;

// resolve to notify texts section about successful font load
export function loadFonts(data: FontsTransmit) {
  let parsed = {
    display: parse(data.display),
    text: parse(data.text)
  };

  resolve(parsed);
  print('⌨️ Fonts')
}
