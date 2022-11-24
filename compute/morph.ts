// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { ComputeAPI, ComputeRequest, ComputeResult, FontsRecord } from "../../interfaces";

import normalize from "./normalize";
import metrics from "./metrics";

export default async function interpolate(request: string, data: ComputeRequest, fonts: FontsRecord) {
  let startTime = performance.now();
  
  let { fromPath, toPath, baseline, width } = metrics(fonts, data);

  // create interpolatee paths for svg <animate>
  let { from, to } = normalize(fromPath, toPath);
  let computed = { from, to, baseline, width };

  // send to main thread computed paths
  postMessage({ request, data: computed } as ComputeAPI<ComputeResult>);
  console.debug("[COMPUTE]", Math.round(performance.now()-startTime)+'ms')
}
