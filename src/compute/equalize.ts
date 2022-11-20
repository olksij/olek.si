import { svgPathProperties } from "svg-path-properties";

export default function(fromPath: string[], toPath: string[]) {
  let from = "", to = "";

  let startTime = performance.now()

  // since [fromPath.length] and [toPath.length] are equal
  for (let i = 0; i < fromPath.length; i++) {
    let fromProps = new svgPathProperties(fromPath[i]);
    let toProps = new svgPathProperties(toPath[i]);
    let startLength = 0, startDistance = Infinity;

    for (let length = 0; length <= toProps.getTotalLength(); length += 1) {
      let command = length == 0 ? "M" : "L";
      let coordinates = toProps.getPointAtLength(toProps.getTotalLength() - length);
      to += `${command}${Math.round(coordinates.x*100)/100} ${Math.round(coordinates.y*100)/100}`;

      let coordinatesF = fromProps.getPointAtLength(0);
      let distance = Math.sqrt(Math.pow(coordinates.x-coordinatesF.x,2)+Math.pow(coordinates.y-coordinatesF.y,2));
      //if (distance < startDistance)
      //  startLength = length, startDistance = distance;
      startLength = toProps.getTotalLength()/2;
    }

    for (let point = 0; point <= toProps.getTotalLength(); point++) {
      let length = ((startLength + point) % toProps.getTotalLength())
      let command = point == 0 ? "M" : "L";
      let coordinates = fromProps.getPointAtLength(length * fromProps.getTotalLength()/toProps.getTotalLength());
      from += `${command}${coordinates.x} ${coordinates.y}`;
    }

    from += 'Z', to += 'Z';
  }

  console.debug("[EQUALIZE]", Math.round(performance.now()-startTime))
  return { from, to };
}