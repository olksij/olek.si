import { ComputedTextData, InputTextData, Languages, PageContent, TextsRecord } from '../interfaces';

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
export function computeTexts(content: PageContent) {
  let textsData: TextsRecord<'input'> = {};

  const urlSearchParams = new URLSearchParams(window.location.search);
  let lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages | null;

  if (lang == null) 
    window.history.pushState({}, '', `?en`), lang = 'en';

  for (let id of Object.keys(content.texts[lang])) {
    // map each text id to inputtextdata cell
    let idData: InputTextData = {
      style: content.textStyleData[id].style,
      from: { path: content.textStyleData[id].fromPath!, width: content.textStyleData[id].width },
      to: { text: content.texts[lang][id], gap: content.textStyleData[id].gap, icon: content.textStyleData[id].icon }
    };

    // and add to record
    textsData[id] = idData;
  }

  // when done, post message
  worker.postMessage({ deliver: 'texts', data: textsData });

  worker.onmessage = message => {
    message.data.deliver == 'texts' ? render(content, message.data.data as ComputedTextData) : 0;
  }
}
