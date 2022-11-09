// this file is about parsing and responding to received font objects

import { parse } from 'opentype.js';
import { FontsTransmit, FontType } from '../interfaces';

import print from '../scripts/print';

// the class extends promise so we can ensure the 
// fonts are loaded before we try to vectorize text
class FontsArrayBuffer extends Promise<FontsTransmit<'computed'>> {
  parsed: Record<FontType, FontsTransmit<'computed'> | undefined>;
  
  resolve: (value: FontsTransmit<'computed'> | PromiseLike<FontsTransmit<'computed'>>) => void;

  constructor() {
    let promiseResolve;
    super((resolve) => promiseResolve = resolve);
    this.resolve = promiseResolve;
  }

  // the method is called usually by compute.ts
  load(request: string, data: FontsTransmit<'initial'>) {
    parsed[data]

    // resolve to notify texts section about successful font load
    this.resolve(parsed);
    print('⌨️ Fonts')
  }

  static get [Symbol.species]() {
    return Promise;
  }

  get [Symbol.toStringTag]() {
    return 'FontsArrayBuffer';
  }
}

const fonts = new FontsArrayBuffer();
export default fonts;
