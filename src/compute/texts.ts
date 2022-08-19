// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"
import { fontsLoaded, fontDisplay, fontText } from "./fonts";
import { TextData } from "../interfaces";

export let interpolators: Record<string, any> = {}

export async function loadTexts(textsData: Record<string, TextData>) {
  // ensure that fonts are loaded and we can use them
  await fontsLoaded;


  for (let id in textsData) {
    console.log(id, textsData);
    let data = textsData[id];

    // font used for vectorizing
    let font = data.font == 'display' ? fontDisplay : fontText;
    // retrieve from-to paths
    let pathData = font.getPath(data.text, 0, data.y ?? data.fontSize, data.fontSize, { letterSpacing: data.letterSpacing });
    let toPath = pathData.toPathData(2).replaceAll('ZM', 'Z$M')?.split('$');

    let fromPath: Array<string> = [];
    if (data.fromPath)
      fromPath = data.fromPath!.replaceAll('ZM', 'Z$M')?.split('$');
    else for (var i = 0; i < toPath.length; i++) {
      fromPath.push(`M 0 0 V${pathData.getBoundingBox().y2} H${pathData.getBoundingBox().x2} Z`);
    }

    // add interpolator to record
    interpolators[id] = interpolateAll(fromPath, toPath, { maxSegmentLength: 5, single: true });
  }

  // signal to main thread that interpolators are ready
  postMessage({ deliver: 'texts', data: { svg: '' } });
}
