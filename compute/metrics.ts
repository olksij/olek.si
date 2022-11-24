// this file calculates metrics for both [data.from] and [data.to]
// before animating

import { ComputeRequest, FontsRecord } from "../../interfaces";

import { elementToPath, splitPath } from "./element";

export default function matrics(fonts: FontsRecord, data: ComputeRequest) {
  let from = data.from, fromPath = new Array<string>();

  let { path, baseline, width } = elementToPath(data.to, fonts)

  if (from.element)
    fromPath = elementToPath(from.element, fonts).path;
  else if(from.path)
    fromPath = splitPath(from.path);
  else if (from.skeleton) {
    let [sw, sh, sbr] = from.skeleton;
    sbr ??= 0;
    
    //preserve aspect ratio
    let height = data.to.text?.style.height ?? data.to.icon?.height!;
    let size = [sh != 0 ? sw/sh*height : sw, height]

    // letter width for placeholder
    let lw = Math.round(size[0] / path.length * 100) / 100;

    // split placeholder rectangle for each letter
    fromPath.push(`M0 ${sbr} A${sbr} ${sbr} 0 0 1 ${sbr} 0 H${lw} V${size[1]} H${sbr} A${sbr} ${sbr} 0 0 1 0 ${size[1]-sbr} V${sbr} Z `);

    for (var ww = lw, i = 1; i < path.length-1; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${size[1]} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }

    fromPath.push(`
      M${lw*(path.length-1)} 0 
      H${lw*path.length-sbr} 
      A${sbr} ${sbr} 0 0 1 ${lw*path.length} ${sbr}
      V${size[1]-sbr} 
      A${sbr} ${sbr} 0 0 1 ${lw*path.length-sbr} ${size[1]} 
      H${lw*(path.length-1)} 
      V0 
      Z `);
  }

  while (fromPath.length < path.length)
    fromPath.push('M0 0')

  while (path.length < fromPath.length)
    path.push('M0 0');

  return { fromPath, toPath: path, baseline, width };
}
