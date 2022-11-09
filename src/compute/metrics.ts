// this file calculates metrics for both [data.from] and [data.to]
// before animating

import { FontsTransmit, ComputeRequest } from "../interfaces";

import { elementToPath, splitPath } from "./element";

export default function matrics(fonts: FontsTransmit<'computed'>, data: ComputeRequest) {
  let from = data.from, fromPath = new Array<string>();

  let { path, baseline, width } = elementToPath(data.to, fonts)

  if (from.element)
    fromPath = elementToPath(from.element, fonts).path;
  else if(from.path)
    fromPath = splitPath(from.path);
  else if (from.size) {
    //preserve aspect ratio
    let height = data.to.text?.style.height ?? data.to.icon?.height!;
    let size = [from.size[1]  != 0 ? from.size[0]/from.size[1]*height : from.size[0], height]

    // letter width for placeholder
    let lw = Math.round(size[0] / path.length * 100) / 100;

    let br = 8

    // split placeholder rectangle for each letter
    fromPath.push(`M0 ${br} A${br} ${br} 0 0 1 ${br} 0 H${lw} V${size[1]} H${br} A${br} ${br} 0 0 1 0 ${size[1]-br} V${br} Z `);

    for (var ww = lw, i = 1; i < path.length-1; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${size[1]} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }

    fromPath.push(`
      M${lw*(path.length-1)} 0 
      H${lw*path.length-br} 
      A${br} ${br} 0 0 1 ${lw*path.length} ${br}
      V${size[1]-br} 
      A${br} ${br} 0 0 1 ${lw*path.length-br} ${size[1]} 
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
