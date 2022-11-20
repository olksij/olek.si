// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

//@ts-ignore
import { interpolateAll } from "flubber"
import { ComputeAPI, ComputeRequest, ComputeResult, FontsRecord } from "../interfaces";

import normalize from "./normalize";
import metrics from "./metrics";

export default async function interpolate(request: string, data: ComputeRequest, fonts: FontsRecord) {
  // ensure that fonts are loaded and we can use them
  let fontsData = fonts;
  let startTime = performance.now();
  
  let { fromPath, toPath, baseline, width } = metrics(fontsData, data);

  // create interpolatee paths for svg <animate>
  let { from, to } = normalize(fromPath, toPath);
  let computed = { from, to, baseline, width };
  //let interpolator = interpolateAll(fromPath, toPath, { maxSegmentLength: 4, single: true });
  //let computed = { from: interpolator(1 / 1000), to: interpolator(1 - 1 / 1000), baseline, width };

  // send to main thread computed paths
  postMessage({ request, data: computed } as ComputeAPI<ComputeResult>);
  console.debug("[COMPUTE]", Math.round(performance.now()-startTime)+'ms')
}
