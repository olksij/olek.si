import { ComputeRequest, PathRing } from "interfaces";
import convert from "./convert";

export default function (data: ComputeRequest, lines: number[], rings: PathRing[]) {
  let { from, to } = data,
      [sw, sh, sbr] = from.skeleton,
      path: string[] = [];

  sbr ??= 0;

  //preserve aspect ratio
  let height = to.text?.style.height ?? to.icon?.height!;
  let size = to.text?.style.wrap ? [sw, sh] : [sh != 0 ? sw!/sh!*height : sw, height];

  let lineHeight = size[1]!/lines.length;

  lines.forEach((count, number) => {    
    // letter width for placeholder
    let lw = Math.round(size[0]! / count * 10) / 10;

    // split placeholder rectangle for each letter
    let pathString = `M 0 ${lineHeight*number + sbr!} 
      A${sbr} ${sbr} 0 0 1 ${sbr} ${lineHeight*number} 
      H${lw} V${lineHeight*(number+1)}
      H${sbr} 
      A${sbr} ${sbr} 0 0 1 0 ${lineHeight*(number+1)-sbr!} 
      V${lineHeight*number + sbr!} Z`;

    for (var ww = lw, i = 1; i < count-1; ww += lw, i++)
      pathString += `M ${ww} ${lineHeight*number} V${lineHeight*(number+1)} H${ww + lw} V${lineHeight*number} H${ww} Z`;

    pathString += `M${ lw * (count - 1) } ${lineHeight*number}
      H${ lw * count - sbr! } 
      A${ sbr } ${ lineHeight*number+sbr! } 0 0 1 ${ lw * count } ${ lineHeight*number+sbr! }
      V${ lineHeight*(number+1) - sbr! } 
      A${ sbr } ${ lineHeight*number+sbr! } 0 0 1 ${ lw * count - sbr! } ${ lineHeight*(number+1) } 
      H${ lw * (count - 1) } 
      V${lineHeight*number} Z`;
    
    path.push(pathString);
  })
  
  return convert(path, rings);
}