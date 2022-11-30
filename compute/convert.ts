import { polygonArea } from "d3-polygon";
import { svgPathProperties } from "svg-path-properties";
import { PathRing, PathPoint } from "interfaces";

//                                Use an existing ring to match number of points   
//                                           _________|_________
export default function (pathString: string, points?: PathRing[]) {
  let ringList: PathRing[] = [],
      pathList = pathString?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];

  // go throught each Path (SVG Paths ends with "Z" command)
  for (let i = 0; i < pathList.length; i++) {
    let ring: PathRing = [], 
        props = new svgPathProperties(pathList[i]);
    
    let total = props.getTotalLength(),
        count = points?.[i]?.length ?? total / 2;
    //                                                   default precision = one point per two px
    // record [x, y] points for each step                                          ____|____
    for (let point = 0; point < count; point++) {
      let length = point * total / count;
      let position = props.getPointAtLength(length); 
      ring.push([position.x, position.y].map(precise) as PathPoint);
    }

    // avoid adding empty rings such as space glyph (" ")
    if (polygonArea(ring)) ringList.push(ring);
  }

  return ringList;
}

// set one digit after period to avoid DOM overload with long pathDatas
const precise = (number: number) => Math.round(number * 10) / 10;
