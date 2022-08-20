// this file's purpose is to vectorize and interpolate
// texts before they are rendered in a second thread so ui isn't blocked

import { interpolateAll } from "flubber"
import { fontsLoaded, fontDisplay, fontText } from "./fonts";
import { RenderTextData, TextData } from "../interfaces";

export let interpolators: Record<string, any> = {}
let renderTexts: Record<string, RenderTextData> = {}

export async function loadTexts(textsData: Record<string, TextData>) {
  // ensure that fonts are loaded and we can use them
  await fontsLoaded;


  for (let id in textsData) {
    let data = textsData[id];

    // font used for vectorizing
    let font = data.font == 'display' ? fontDisplay : fontText;
    // retrieve from-to paths
    let pathData = font.getPath(data.text, 0, data.y ?? data.fontSize, data.fontSize, { letterSpacing: data.letterSpacing });
    let toPath = pathData.toPathData(5).replaceAll('ZM', 'Z$M')?.split('$');

    let fromPath: Array<string> = [];
    let fromSvg: string = '';

    if (data.fromPath)
      fromPath = data.fromPath!.replaceAll('ZM', 'Z$M')?.split('$');
    else for (var i = 0; i < toPath.length; i++) {
      let box = pathData.getBoundingBox();
      let currPath = `M ${data.width / toPath.length * i} 0 V${box.y2} H${data.width / toPath.length * (i + 1)} V0 H${data.width / toPath.length * i} Z`;
      fromPath.push(currPath), fromSvg += currPath;
    }

    // add interpolator to record
    interpolators[id] = interpolateAll(fromPath, toPath, { maxSegmentLength: 5, single: true });
    renderTexts[id] = {
      svg: `<svg>
        <path fill="var(--el)" fill-rule="evenodd" clip-rule="evenodd">
          <animate attributeName="d" dur=".8s" values="${interpolators[id](0.001)};${interpolators[id](0.999)}" onend="this.parentElement.parentElement.replaceWith('<p>hhh</p>')" calcMode="spline" keySplines="0.87 0 0.13 1"/>
        </path>
      </svg>` };

    console.log(interpolators[id](0.5));
  }

  // signal to main thread that interpolators are ready
  postMessage({ deliver: 'texts', data: renderTexts });
}
