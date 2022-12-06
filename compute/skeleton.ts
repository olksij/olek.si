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

  lines.forEach((count, number) => {    
    // letter width for placeholder
    let lw = Math.round(size[0]! / count * 10) / 10;

    // split placeholder rectangle for each letter
    let pathString = `M 0 ${height*number + sbr!} 
      A${sbr} ${sbr} 0 0 1 ${sbr} ${height*number} 
      H${lw} V${height*(number+1)}
      H${sbr} 
      A${sbr} ${sbr} 0 0 1 0 ${height*(number+1)-sbr!} 
      V${height*number + sbr!} Z`;

    for (var ww = lw, i = 1; i < count-1; ww += lw, i++)
      pathString += `M ${ww} ${height*number} V${height*(number+1)} H${ww + lw} V${height*number} H${ww} Z`;

    pathString += `M${ lw * (count - 1) } ${height*number}
      H${ lw * count - sbr! } 
      A${ sbr } ${ height*number+sbr! } 0 0 1 ${ lw * count } ${ height*number+sbr! }
      V${ height*(number+1) - sbr! } 
      A${ sbr } ${ height*number+sbr! } 0 0 1 ${ lw * count - sbr! } ${ height*(number+1) } 
      H${ lw * (count - 1) } 
      V${height*number} Z`;
    
    path.push(pathString);
  })
  
  return convert(path, rings);
}