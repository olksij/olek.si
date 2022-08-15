// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { separate, interpolateAll } from "flubber"
import { fontsLoaded, fontDisplay, fontText } from "./fonts";
import { TextsData } from "../interfaces";

export let interpolators: Record<string, any> = {}

export async function loadTexts(fontsData: Record<string, TextsData>) {
  // ensure that fonts are loaded and we can use them
  await fontsLoaded;

  for (let id in fontsData) {
    let data = fontsData[id];

    // font used for vectorizing
    let font = data.font == 'display' ? fontDisplay : fontText;
    // retrieve from-to paths
    let fromPath: string | string[] = data.fromPath.replaceAll('ZM', 'Z$M')?.split('$');
    let pathData = font.getPath(data.text, data.x ?? 0, data.y ?? data.fontSize, data.fontSize, { letterSpacing: data.letterSpacing })
      .toPathData(2).replaceAll('ZM', 'Z$M')?.split('$');

    // decide with correct interpolator and fix [fromPath]
    let singlePath = fromPath.length == 1;
    let interpolator = singlePath ? separate : interpolateAll;
    fromPath = singlePath ? fromPath[0] : fromPath;

    // add interpolator to record
    interpolators[id] = interpolator(fromPath, pathData, { maxSegmentLength: 7, single: true });
  }

  // signal to main thread that interpolators are ready
  postMessage({ deliver: 'texts' });
}
