import { Font } from "opentype.js";
import { InputTextData } from "../interfaces";

import { fontStyles } from '../modules/fontStyles';

/* --- --- --- --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES REFACTORING- ---
   --- --- --- --- --- --- --- --- --- --- --- --- */

export default function textMetrics(font: Font, data: InputTextData) {
  let from = data.from, to = data.to;
  let style = fontStyles[data.style];

  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * style.fontSize);

  // calculate baseline
  let baseline = Math.ceil(ascender - (ascender - descender - style.lineHeight) / 2);

  /* --- --- TO --- --- */

  let textLeft = to.gap ? to.gap + style.lineHeight : 0;
  let icon = to.icon ?? '';

  // vectorize font and convert to string[]
  let pathData = font.getPath(to.text, textLeft, baseline, style.fontSize, { letterSpacing: style.letterSpacing });
  let toPath = splitPath(icon+pathData.toPathData(2));

  /* --- --- FROM --- --- */

  // retrieve fromPath if available
  let fromPath: Array<string> = splitPath(from.path);

  if (fromPath.length == 0) {
    // letter width for placeholder
    let lw = Math.round(from.width / toPath.length * 100) / 100;
    // split placeholder rectangle for each letter
    for (var ww = 0, i = 0; i < toPath.length; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${style.lineHeight} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }
  }
  
  while (fromPath.length < toPath.length)
    fromPath.push('')

  while (toPath.length < fromPath.length)
    toPath.push('')

  return { fromPath, toPath, baseline };
}

function splitPath(path?: string) {
  return path?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];
}