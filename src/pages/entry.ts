import { InputTextData, TextsRecord } from '../interfaces';

import print from '../modules/print';
import render from '../modules/render';

export const worker: Worker = window['worker'];

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload(content: Object) {
  print("🔥 Load Event");

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('../modules/webvitals');

  // to contain navigator, theme specs, and other dynamic things
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// the function is used in order to prepeare content 
// for sending to compute worker
export function computeTexts(content) {
  let textsData: TextsRecord = {};

  for (let id of Object.keys(content.texts['en'])) {
    // map each text id to inputtextdata cell
    let idData: InputTextData = {
      source: content.texts['en'][id],
      style: content.textStyleData[id],
    };

    // and add to record
    textsData[id] = idData;
  }

  // when done, post message
  worker.postMessage({ deliver: 'texts', data: textsData });

  worker.onmessage = message => {
    message.data.deliver == 'texts' ? render(content, message.data.data as TextsRecord) : 0;
  }
}
