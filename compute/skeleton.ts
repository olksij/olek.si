import { ComputeRequest, PathRing } from "interfaces";
import convert from "./convert";

export default function (data: ComputeRequest, rings: PathRing[]) {
  let { from, to } = data,
      [sw, sh, sbr] = from.skeleton,
      pathString = "";

  sbr ??= 0;

  //preserve aspect ratio
  let height = to.text?.style.height ?? to.icon?.height!;
  let size = to.text?.style.wrap ? [sw, sh] : [sh != 0 ? sw!/sh!*height : sw, height];

  // letter width for placeholder
  let lw = Math.round(size[0]! / rings.length * 10) / 10;

  // split placeholder rectangle for each letter
  pathString += `M0 ${sbr} A${sbr} ${sbr} 0 0 1 ${sbr} 0 H${lw} V${size[1]} H${sbr} A${sbr} ${sbr} 0 0 1 0 ${size[1]!-sbr} V${sbr} Z `;

  for (var ww = lw, i = 1; i < rings.length-1; ww += lw, i++) {
    let currPath = `M ${ww} 0 V${size[1]} H${ww + lw} V0 H${ww} Z`;
    pathString += currPath;
  }

  pathString += `
    M${ lw * (rings.length - 1) } 0 
    H${ lw * rings.length - sbr } 
    A${ sbr } ${ sbr } 0 0 1 ${ rings.length } ${ sbr }
    V${ size[1]! - sbr } 
    A${ sbr } ${ sbr } 0 0 1 ${ rings.length - sbr } ${ size[1] } 
    H${ lw * (rings.length - 1) } 
    V0 Z `;
  
    console.log(pathString)

  return convert(pathString, rings);
}