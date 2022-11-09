import { ComputeAPI, ComputeResult, ComputeRequest, Languages, PageContent, ComputeRequest, TextConfig, Size, FromMorphElement, SkeletonTree, SkeletonConfig } from '../interfaces';

import print from '../scripts/print';
import render from '../scripts/render';
import { byId } from '../scripts/shorthands';
import compute from '../scripts/worker';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload() {
  print("🔥 Load Event");

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('../scripts/webvitals');

  // to contain navigator, theme specs, and other dynamic things
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// the function is used in order to prepeare content 
// for sending to compute worker
export async function computeTexts(content: PageContent) {
  let inputData: ComputeRequest<'initial'> = {};

  const urlSearchParams = new URLSearchParams(window.location.search);
  let lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages | null;

  if (lang == null) 
    window.history.pushState({}, '', `?en`), lang = 'en';

  for (let id in content.elementConfig) {
    let config = content.elementConfig[id];

    let text = config.text ? {
      text: content.texts[lang][id],
      style: config.text,
    } as TextConfig : undefined;

    let skeletonConfig = window['current'][id];

    // map each text id to inputtextdata cell
    let idData: ComputeRequest = {
      from: config.from ?? { size: [
        skeletonConfig![0][0],
        skeletonConfig![0][1],
      ], radius: byId(id)?.style.borderRadius} as FromMorphElement,
      to: { text, icon: config.icon },
    };

    // and add to record
    inputData[id] = idData;
  }

  // when done, post message
  compute(inputData)
    .then((result) => render(content, result.data as ComputeRequest<'computed'>));
}
