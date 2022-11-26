import { ComputeAPI, FontsTransmit } from "interfaces";

import display from '/assets/fonts/displayBold.ttf?url';
import text from '/assets/fonts/textMedium.ttf?url';

// list of fonts to download
let fonts = { display, text };

// and resolved ones
let fontResult: Record<string, ArrayBuffer> = {};

export default function fontLoader() {
  for (let font in fonts) {
    // create a request
    var request = new XMLHttpRequest();
    request.open('get', fonts[font as 'display' | 'text'], true);
    request.responseType = 'arraybuffer';
    // when font is loaded, pass it to document and service worker
    request.onload = function () {
      let res = this.response;
      document.fonts.add(new FontFace(font, res));
      fontResult[font] = res;
      // if all fonts are there, postMessage
      if (fontResult.display && fontResult.text)
      //@ts-ignore
      window['worker'].postMessage({ deliver: 'FontsTransmit', data: fontResult } as ComputeAPI<FontsTransmit>, fontResult);
    }
    request.send();
  }
}
