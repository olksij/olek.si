// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"
import { Font } from "opentype.js";

import fonts from "./fonts";
import { ComputeAPI, ComputedTextData, InputTextData, ComputeRecord } from "../interfaces";

import print from '../modules/print';
import textMetrics from "./metrics";

import { fontStyles } from '../modules/fontStyles';

export default async function loadTexts(request: string, textsData: ComputeRecord<'initial'>) {
  let computed: Record<string, ComputedTextData> = {}

  // ensure that fonts are loaded and we can use them
  let fontsData = await fonts;
  
  for (let id in textsData) {
    let data = textsData[id] as InputTextData,
        font = fontsData[fontStyles[data.style].type] as Font;
    //  data.style - contains the predefined style for text
    //  fontStyles[].type - retrieve the style and get font type
    //  fontsData[] as Font - the Font object required for opentype.js 
    
    let { fromPath, toPath, baseline } = textMetrics(font, data);

    // create interpolatee paths for svg <animate>
    let interpolator = interpolateAll(fromPath, toPath, { maxSegmentLength: 4, single: true });
    computed[id] = { from: interpolator(1 / 1000), to: interpolator(1 - 1 / 1000), baseline };
  }

  // send to main thread computed paths
  postMessage({ request, data: computed } as ComputeAPI<'computed'>);
  print('💿 Computed')
}
