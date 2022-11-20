import { svgPathProperties } from "svg-path-properties";
import { polygonArea } from "d3-polygon";

export default function(fromPath: string[], toPath: string[]) {
  let from = "", to = "";

  let startTime = performance.now()

  const precision = 2;

  // since [fromPath.length] and [toPath.length] are equal
  for (let i = 0; i < fromPath.length; i++) {
    let fromProps = new svgPathProperties(fromPath[i]);
    let toProps = new svgPathProperties(toPath[i]);
    let startLength = 0, startDistance = Infinity;

    let toTotal = toProps.getTotalLength();

    let points: [number, number][] = [];

    for (let length = 0; length <= toTotal; length += precision) {
      let position = toProps.getPointAtLength(toTotal - length);
      points.push([Math.round(position.x*100)/100, Math.round(position.y*100)/100])

      let pos2 = fromProps.getPointAtLength(0);
      let distance = Math.sqrt(Math.pow(position.x-pos2.x,2)+Math.pow(position.y-pos2.y,2));
      if (distance < startDistance)
        startLength = length, startDistance = distance;
    }

    console.log(polygonArea(points))
    if (polygonArea(points) < 0) points.reverse();
    else startLength = toProps.getTotalLength()/2;

    to += `M${points[0][0]} ${points[0][1]}`, points.splice(0, 1);
    points.forEach(p => to += `L${p[0]} ${p[1]}`);

    for (let point = 0; point <= toTotal; point+=precision) {
      let length = ((startLength + point) % toTotal)
      let command = point == 0 ? "M" : "L";
      let coordinates = fromProps.getPointAtLength(length * fromProps.getTotalLength()/(toTotal));
      from += `${command}${coordinates.x} ${coordinates.y}`;
    }

    from += 'Z', to += 'Z';
  }

  console.debug("[EQUALIZE]", Math.round(performance.now()-startTime))
  return { from, to };
}