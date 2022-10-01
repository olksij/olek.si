// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"
import { Font } from "opentype.js";

import fonts from "./fonts";
import { ComputedTextData, InputTextData, TextsRecord } from "../interfaces";

import print from '../modules/print';
import textMetrics from "./metrics";

let renderTexts: Record<string, ComputedTextData> = {}

export default async function loadTexts(textsData: TextsRecord) {
  // ensure that fonts are loaded and we can use them
  let fontsData = await fonts;
  
  for (let id in textsData) {
    let data = textsData[id] as InputTextData,
      font = fontsData[data.style.font.type] as Font;
    
    let { fromPath, toPath, baseline } = textMetrics(font, data);

    // create interpolatee paths for svg <animate>
    let interpolator = interpolateAll(fromPath, toPath, { maxSegmentLength: 4, single: true });
    renderTexts[id] = { from: interpolator(1 / 1000), to: interpolator(1 - 1 / 1000), baseline };
  }

  // send to main thread computed paths
  postMessage({ deliver: 'texts', data: renderTexts });
  print('💿 Computed')
}
