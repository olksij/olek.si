// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"
import { fontsLoaded, fontDisplay, fontText } from "./fonts";
import { RenderTextData, TextData, TextsRecord } from "../interfaces";

let renderTexts: Record<string, RenderTextData> = {}

export async function loadTexts(textsData: TextsRecord) {
  // ensure that fonts are loaded and we can use them
  await fontsLoaded;

  for (let id in textsData) {
    let data = textsData[id] as TextData;

    // font used for vectorizing
    let font = data.font == 'display' ? fontDisplay : fontText;

    // vectorize font and convert to string[]
    let pathData = font.getPath(data.text, 0, data.y ?? data.fontSize, data.fontSize, { letterSpacing: data.letterSpacing });
    let toPath = pathData.toPathData(5).replaceAll('ZM', 'Z$M')?.split('$');

    // retrieve fromPath if available
    let fromPath: Array<string> = data.fromPath?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];

    if (fromPath.length == 0) {
      // letter width for placeholder
      let lw = Math.round(data.width / toPath.length * 100) / 100;
      // split placeholder rectangle for each letter
      for (var ww = 0, i = 0; i < toPath.length; ww += lw, i++) {
        let currPath = `M ${ww} 0 V${data.height} H${ww + lw} V0 H${ww} Z`;
        fromPath.push(currPath);
      }
    }

    // create interpolatee paths for svg <animate>
    let interpolator = interpolateAll(fromPath, toPath, { maxSegmentLength: 4, single: true });
    renderTexts[id] = { from: interpolator(1 / 1000), to: interpolator(1 - 1 / 1000) };
  }

  // send to main thread computed paths
  postMessage({ deliver: 'texts', data: renderTexts });
}
