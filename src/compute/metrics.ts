import { Font } from "opentype.js";
import { InputTextData } from "../interfaces";

export default function textMetrics(font: Font, data: InputTextData) {
  let textStyle = data.textStyle
  let fontStyle = data.fontStyle[textStyle.style]

  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * fontStyle.fontSize);

  // calculate baseline
  let baseline = Math.ceil(ascender - (ascender - descender - fontStyle.lineHeight) / 2);

  // vectorize font and convert to string[]
  let pathData = font.getPath(data.source, textStyle.iconWidth ?? 0, baseline, fontStyle.fontSize, { letterSpacing: fontStyle.letterSpacing });
  let toPath = ((textStyle.icon ?? '')+pathData.toPathData(2)).replaceAll('ZM', 'Z$M')?.split('$');

  // retrieve fromPath if available
  let fromPath: Array<string> = textStyle.fromPath?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];

  if (fromPath.length == 0) {
    // letter width for placeholder
    let lw = Math.round(textStyle.width / toPath.length * 100) / 100;
    // split placeholder rectangle for each letter
    for (var ww = 0, i = 0; i < toPath.length; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${fontStyle.lineHeight} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }
  }

  return { fromPath, toPath, baseline };
}