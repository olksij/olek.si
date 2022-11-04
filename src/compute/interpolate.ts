// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"

import fonts from "./fonts";
import { ComputeAPI, ComputedTextData, InputMorphData, ComputeRecord } from "../interfaces";

import print from '../modules/print';
import matrics from "./metrics";

export default async function interpolate(request: string, textsData: ComputeRecord<'initial'>) {
  let computed: Record<string, ComputedTextData> = {}


  // ensure that fonts are loaded and we can use them
  let fontsData = await fonts;
  
  for (let id in textsData) {
    let start = Date.now();

    let data = textsData[id] as InputMorphData;
    
    let { fromPath, toPath, baseline, width } = matrics(fontsData, data);

    // create interpolatee paths for svg <animate>
    let interpolator = interpolateAll(fromPath, toPath, { maxSegmentLength: 4, single: true });
    computed[id] = { from: interpolator(1 / 1000), to: interpolator(1 - 1 / 1000), baseline, width };
  }


  // send to main thread computed paths
  postMessage({ request, data: computed } as ComputeAPI<'computed'>);
  print('💿 Computed')
}
