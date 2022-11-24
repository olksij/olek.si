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
    
    let total = toProps.getTotalLength();
    let points = Math.floor(total / precision);
  
    // construct rings
    for (let length = 0; length <= total; length += precision) {
      toRing.push(getPoint(toProps.inst, length));
      fromRing.push(getPoint(fromProps.inst, length / total * fromProps.getTotalLength()));
    }

    // rotate rings so they are clockwise
    if (polygonArea(toRing) < 0) toRing.reverse();
    if (polygonArea(fromRing) < 0) fromRing.reverse();

    if (total) {
      let minSum = Infinity, bestOffset;

      for (var offset = 0; offset <= points; offset++) {
        let sum = 0;

        fromRing.forEach((point, i) => {
          var d = distance(toRing[(i + offset) % points], point);
          sum += d * d;
        });
    
        if (sum < minSum) minSum = sum, bestOffset = offset;
      }
      
      if (bestOffset) {
        let spliced = toRing.splice(0, bestOffset);
        toRing.splice(toRing.length, 0, ...spliced);
      };
    }
    
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

export function distance(a: PathPoint, b: PathPoint) {
  return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
}

const decimals = Math.pow(10, 1);
// set float number precision
function precise(number: number) {
  return Math.round(number * decimals) / decimals;
}
