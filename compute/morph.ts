// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { ComputeAPI, ComputeRequest, ComputeResult, FontsRecord } from "/interfaces";

import normalize from "./normalize";
import convert   from "./convert";
import vectorize from "./vectorize";
import skeleton  from "./skeleton";

export default async function interpolate(request: string, data: ComputeRequest, fonts: FontsRecord) {
  let startTime = performance.now();
  let { from, to } = data;

  // vectorize the [to] element
  let { path, baseline, width } = vectorize(to, from.skeleton, fonts)!;

  // get [PathRings[]] out of PathData string
  let { ringList: toRings, multilineConfig } = convert(path);

  // if there is a predefined from element, animate from it
  let fromRings = from.element || from.path
    ? convert(vectorize(from.element, from.skeleton, fonts)?.path ?? [from.path!], toRings).ringList
    : skeleton(data, multilineConfig, toRings). ringList; // else, build a skeleton

  //           rearrage points in rings for smooth animation
  //                  ______________|______________
  let computed = { ...normalize(fromRings, toRings), baseline, width };

  // send to main thread computed paths
  postMessage({ request, data: computed } as ComputeAPI<ComputeResult>);
  console.debug("[COMPUTE]", Math.round(performance.now()-startTime)+'ms')
}
