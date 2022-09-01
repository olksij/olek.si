// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"
import fonts from "./fonts";
import { RenderTextData, TextData, TextsRecord } from "../interfaces";
import { Font } from "opentype.js";

import print from '../print';

let renderTexts: Record<string, RenderTextData> = {}

export async function loadTexts(textsData: TextsRecord) {
  // ensure that fonts are loaded and we can use them
  let fontsData = await fonts;

  for (let id in textsData) {
    let data = textsData[id] as TextData, style = data.font;

    // font used for vectorizing
    let font = fontsData[style.type ?? 'text'] as Font;

    // calculate ascender & descender
    let [ascender, descender] = [font.ascender, font.descender]
      .map(value => value / font.unitsPerEm * style.fontSize);

    // calculate baseline
    let baseline = Math.ceil(ascender - (ascender - descender - style.lineHeight) / 2);

    // vectorize font and convert to string[]
    let pathData = font.getPath(data.text, 0, baseline, style.fontSize, { letterSpacing: style.letterSpacing });
    let toPath = pathData.toPathData(5).replaceAll('ZM', 'Z$M')?.split('$');

    // retrieve fromPath if available
    let fromPath: Array<string> = data.fromPath?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];

    if (fromPath.length == 0) {
      // letter width for placeholder
      let lw = Math.round(data.width / toPath.length * 100) / 100;
      // split placeholder rectangle for each letter
      for (var ww = 0, i = 0; i < toPath.length; ww += lw, i++) {
        let currPath = `M ${ww} 0 V${style.lineHeight} H${ww + lw} V0 H${ww} Z`;
        fromPath.push(currPath);
      }
    }

    // create interpolatee paths for svg <animate>
    let interpolator = interpolateAll(fromPath, toPath, { maxSegmentLength: 3, single: true });
    renderTexts[id] = { from: interpolator(1 / 1000), to: interpolator(1 - 1 / 1000), baseline };
  }

  // send to main thread computed paths
  postMessage({ deliver: 'texts', data: renderTexts });
  print('💿 Computed')
}
