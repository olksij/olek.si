import { svgPathProperties } from "svg-path-properties";
import { polygonArea } from "d3-polygon";
import SVGPathProperties from "svg-path-properties/dist/types/svg-path-properties";

type PathPoint = [number, number];
type PathRing = PathPoint[];

export default function(fromPath: string[], toPath: string[]) {
  let from = "", to = "";

  let startTime = performance.now()

  const precision = 2;

  // for each path
  for (let i = 0; i < fromPath.length; i++) {
    let toProps   = new svgPathProperties(toPath[i]),
        fromProps = new svgPathProperties(fromPath[i]);

    // rings contains [PathPoint]s
    let toRing: PathRing = [], 
        fromRing: PathRing = [];
    
    // construct rings
    for (let length = 0; length <= toProps.getTotalLength(); length += precision) {
      toRing.push(getPoint(toProps.inst, length));
      fromRing.push(getPoint(fromProps.inst, length));
    }

    // rotate rings so they are clockwise
    if (polygonArea(toRing) < 0) toRing.reverse();
    
    // add stringified path to result
    to += ringToString(toRing);
    from += ringToString(fromRing);
  }
  
  console.debug("[COMPUTE > NORMALIZE]", Math.round(performance.now()-startTime)+'ms')
  return { from, to };
}

// calculate point on path
function getPoint(props: SVGPathProperties, length: number): PathPoint {
  let toPos = props.getPointAtLength(length);
  return [toPos.x, toPos.y].map(precise) as PathPoint;
}

// convert ring to [string] path data
function ringToString(ring: [number, number][]) {
  let string = `M${ring[0][0]} ${ring[0][1]}`;
  ring.splice(0, 1), ring.forEach(p => string += `L${p[0]} ${p[1]}`);
  return string + 'Z';
}

const decimals = Math.pow(10, 2);
// set float number precision
function precise(number: number) {
  return Math.round(number * decimals) / decimals;
}
