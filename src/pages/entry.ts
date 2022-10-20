import { ComputeAPI, ComputedTextData, InputTextData, Languages, PageContent, ComputeRecord } from '../interfaces';

import print from '../modules/print';
import render from '../modules/render';

export const worker: Worker = window['worker'];

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload() {
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
  let inputData: ComputeRecord<'input'> = {};

  const urlSearchParams = new URLSearchParams(window.location.search);
  let lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages | null;

  if (lang == null) 
    window.history.pushState({}, '', `?en`), lang = 'en';

  for (let id of Object.keys(content.texts[lang])) {
    if (content.elementConfig[id].from == null) continue;
    // map each text id to inputtextdata cell
    let idData: InputTextData = {
      from: content.elementConfig[id].from!,
      to: content.elementConfig[id].element
    };

    // and add to record
    inputData[id] = idData;
  }

  // when done, post message
  worker.postMessage({ deliver: 'texts', request: 'entryRender', data: inputData } as ComputeAPI<'input'>);

  worker.addEventListener('message', message => {
    let data = message.data as ComputeAPI<'result'>;

    if (data.request == 'entryRender')
      render(content, data.data as ComputeRecord<'result'>);
  });
}
