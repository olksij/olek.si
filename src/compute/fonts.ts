// this file is about parsing and responding to received font objects

import { parse } from 'opentype.js';
import { FontsRecord } from '../interfaces';

import print from '../modules/print';

// the class extends promise so we can ensure the 
// fonts are loaded before we try to vectorize text
class FontsArrayBuffer extends Promise<FontsRecord<'result'>> {
  resolve: (value: FontsRecord<'result'> | PromiseLike<FontsRecord<'result'>>) => void;

  constructor() {
    let promiseResolve;
    super((resolve) => promiseResolve = resolve);
    this.resolve = promiseResolve;
  }

  // the method is called usually by compute.ts
  load(data: FontsRecord<'input'>) {
    let parsed: FontsRecord<'result'> = {
      display: parse(data.display),
      text: parse(data.text)
    };

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
