import { polygonArea } from "d3-polygon";
import { PathPoint, PathRing } from "/interfaces";

export default function(from: PathRing[], to: PathRing[]) {
  let fromString = "", toString = "";

  let startTime = performance.now()
  
  let isFrom = from.length < to.length ? 1 : 0,
      shorter = (n: number = 0) => isFrom ^ n ? from : to;
      
  while (from.length != to.length) {
    shorter()[shorter().length] = [];
    
    for (var i = 0; i < shorter(1)[shorter().length-1].length; i++)
    shorter()[shorter().length-1].push([0, 0]);
  }

  // for each path
  for (let ring = 0; ring < from.length; ring++) {
    if (from[ring].length != to[ring].length) console.log(from, to)
    // rotate rings so they are clockwise
    if (polygonArea(to[ring]) < 0) to[ring].reverse();
    if (polygonArea(from[ring]) < 0) from[ring].reverse();

    let minSum = Infinity, bestOffset;

    for (var offset = 0; offset <= to[ring].length; offset++) {
      let sum = 0;

      from[ring].forEach((point, i) => {
        var d = distance(to[ring][(i + offset) % to[ring].length], point);
        sum += d * d;
      });
  
      if (sum < minSum) minSum = sum, bestOffset = offset;
    }
    
    if (bestOffset) {
      let spliced = to[ring].splice(0, bestOffset);
      to[ring].splice(to[ring].length, 0, ...spliced);
    };
    
    // add stringified path to result
    toString += ringToString(to[ring]);
    fromString += ringToString(from[ring]);
  }
  
  console.debug("[COMPUTE > NORMALIZE]", Math.round(performance.now()-startTime)+'ms')
  return { from: fromString, to: toString };
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
