// this file's purpose is to respond to main thread's requests
// about interpolating vectors before next frame render

import { ComputeAPI, MorphMetadata, MorphFrameData, MorphFrameRequest } from "../interfaces";
import { interpolators } from "./texts";

let morphMetadata: Record<string, MorphMetadata> = {};

export function morphText(request: MorphFrameRequest): number | void {
  // at initial run save morph metadata, as it won't be sent again
  if (request.metadata) morphMetadata[request.item] = request.metadata;
  let meta = morphMetadata[request.item];

  // morphs aren't linear, so texts are morphed smoothly
  let t = easeInOutExpo((request.current - meta.start) / meta.duration);

  // prepeare object before sending
  const computed: MorphFrameData = { item: request.item, path: interpolators[request.item](t) };
  computed.next = meta.start + meta.duration > request.current;

  // send interpolated vector to main thread
  postMessage({ deliver: 'morph', data: computed } as ComputeAPI);
}

// function used to make the morph animation look in a smooth way
function easeInOutExpo(x: number): number {
  // when [x] is `0` or `1` - result is the same
  if ([0, 1].includes(x)) return x;
  // a bit of math
  return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
