import { Font } from "opentype.js";
import { FontStyle, InputTextData } from "../interfaces";

export default function textMetrics(font: Font, data: InputTextData) {
  let style = data.style.font;

  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * style.fontSize);

  // calculate baseline
  let baseline = Math.ceil(ascender - (ascender - descender - style.lineHeight) / 2);

  // vectorize font and convert to string[]
  let pathData = font.getPath(data.source, 0, baseline, style.fontSize, { letterSpacing: style.letterSpacing });
  let toPath = pathData.toPathData(5).replaceAll('ZM', 'Z$M')?.split('$');

  // retrieve fromPath if available
  let fromPath: Array<string> = data.style.fromPath?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];

  if (fromPath.length == 0) {
    // letter width for placeholder
    let lw = Math.round(data.style.width / toPath.length * 100) / 100;
    // split placeholder rectangle for each letter
    for (var ww = 0, i = 0; i < toPath.length; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${style.lineHeight} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }
  }

  return { fromPath, toPath, baseline };
}