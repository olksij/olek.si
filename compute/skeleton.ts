import { ComputeRequest, PathRing, TextLines } from "interfaces";
import convert from "./convert";

export default function (data: ComputeRequest, lines: TextLines, rings: PathRing[]) {
  let { from, to } = data,
      [sw, sh, sbr] = from.skeleton,
      pathString = "";

  sbr ??= 0;

  //preserve aspect ratio
  let height = to.text?.style.height ?? to.icon?.height!;
  let size = to.text?.style.wrap ? [sw, sh] : [sh != 0 ? sw!/sh!*height : sw, height];

  let pathsLeft = rings.length;
  let pathsPerLine = Math.ceil(pathsLeft / lines.length);

  lines.forEach((line, number) => {
    let pathsOnLine = Math.min(pathsLeft, pathsPerLine);
    pathsLeft -= pathsOnLine;
    
    // letter width for placeholder
    let lw = Math.round(size[0]! / pathsOnLine * 10) / 10;

    // split placeholder rectangle for each letter
    pathString += `M 0 ${height*number + sbr} 
      A${sbr} ${sbr} 0 0 1 ${sbr} ${height*number} 
      H${lw} V${height*(number+1)}
      H${sbr} 
      A${sbr} ${sbr} 0 0 1 0 ${height*(number+1)-sbr!} 
      V${height*number + sbr} Z`;

    for (var ww = lw, i = 1; i < pathsOnLine-1; ww += lw, i++) {
      let currPath = `M ${ww} ${height*number} V${height*(number+1)} H${ww + lw} V${height*number} H${ww} Z`;
      pathString += currPath;
    }

    pathString += `M${ lw * (pathsOnLine - 1) } ${height*number}
      H${ lw * pathsOnLine - sbr! } 
      A${ sbr } ${ height*number+sbr } 0 0 1 ${ lw * pathsOnLine } ${ height*number+sbr }
      V${ height*(number+1) - sbr! } 
      A${ sbr } ${ height*number+sbr } 0 0 1 ${ lw * pathsOnLine - sbr! } ${ height*(number+1) } 
      H${ lw * (pathsOnLine - 1) } 
      V${height*number} Z`;
  })
  
  return convert(pathString, rings);
}