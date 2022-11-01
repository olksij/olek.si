// this file calculates metrics for both [data.from] and [data.to]
// before animating

import { FontsRecord, InputMorphData } from "../interfaces";

import { elementToPath, splitPath } from "./element";

export default function matrics(fonts: FontsRecord<'computed'>, data: InputMorphData) {
  let from = data.from, fromPath = new Array<string>();

  let { path, baseline, width } = elementToPath(data.to, fonts)

  if (from.element)
    fromPath = elementToPath(from.element, fonts).path;
  else if(from.path)
    fromPath = splitPath(from.path);
  else if (from.size) {
    // letter width for placeholder
    let lw = Math.round(from.size[0] / path.length * 100) / 100;

    let br = 4;

    // split placeholder rectangle for each letter
    fromPath.push(`M0 ${br} A${br} ${br} 0 0 1 ${br} 0 H${lw} V${from.size[1]} H${br} A${br} ${br} 0 0 1 0 ${from.size[1]-br} V${br} Z `);

    for (var ww = lw, i = 1; i < path.length-1; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${from.size[1]} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }

    fromPath.push(`
      M${lw*(path.length-1)} 0 
      H${lw*path.length-br} 
      A${br} ${br} 0 0 1 ${lw*path.length} ${br}
      V${from.size[1]-br} 
      A${br} ${br} 0 0 1 ${lw*path.length-br} ${from.size[1]} 
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
