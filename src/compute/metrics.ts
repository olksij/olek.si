import { Font, Path } from "opentype.js";
import { FontsRecord, FontStyle, IconConfig, InputMorphData, MorphElement } from "../interfaces";

import { fontStyles } from '../modules/fontStyles';

/* --- --- --- --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES REFACTORING- ---
   --- --- --- --- --- --- --- --- --- --- --- --- */

export default function textMetrics(fonts: FontsRecord<'computed'>, data: InputMorphData) {
  let from = data.from, fromPath = new Array<string>();

  let toMorph = elementToPath(data.to, fonts)

  if (from.element)
    fromPath = elementToPath(data.to, fonts).path;
  else if(from.path)
    fromPath = splitPath(from.path);
  else if (from.size) {
    // letter width for placeholder
    let lw = Math.round(from.size[0] / toMorph.path.length * 100) / 100;
    // split placeholder rectangle for each letter
    for (var ww = 0, i = 0; i < toMorph.path.length; ww += lw, i++) {
      let currPath = `M ${ww} 0 V${from.size[1]} H${ww + lw} V0 H${ww} Z`;
      fromPath.push(currPath);
    }
  }

  while (fromPath.length < toMorph.path.length)
    fromPath.push('M0 0')

  while (toMorph.path.length < fromPath.length)
    toMorph.path.push('M0 0');

  return { fromPath, toPath: toMorph.path, baseline: toMorph.baseline, width: toMorph.width };
}

function splitPath(path?: string) {
  return path?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];
}

function calculate(font: Font, style: FontStyle) {
  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * style.fontSize);

  // calculate baseline
  let baseline = Math.ceil(ascender - (ascender - descender - style.height) / 2);

  return baseline;
}

function elementToPath(element: MorphElement, fonts: FontsRecord<'computed'>) {
  let icon = element.icon, text = element.text;

  let path = new Array<string>();
  let width = 0, baseline = 0;

  if (icon) {
    path.push(...splitPath(icon.path));
    width = icon.height ?? 0;
  }

  if (text) {
    let style = fontStyles[text.style];
    let font = fonts[style.type ?? 'text'];

    let textLeft = icon ? icon.gap + (icon.height ?? style.height) : 0;

    baseline = calculate(font, style);
    let pathData = font.getPath(text?.text, textLeft, baseline, style.fontSize, { letterSpacing: style.letterSpacing });
    width = pathData.getBoundingBox().x2;

    path.push(...splitPath(pathData.toPathData(2)));
  }

  return { path, baseline, width };
}