import { Font } from "opentype.js";
import { FontsRecord, FontStyle, MorphElement } from "../interfaces";
import { fontStyles } from "../modules/fontStyles";

export function elementToPath(element: MorphElement, fonts: FontsRecord<'computed'>) {
  let icon = element.icon, text = element.text;

  let path = new Array<string>();
  let width = 0, baseline = 0;

  if (icon) {
    path.push(...splitPath(icon.path));
    width = icon.height ?? 0;
  }

  if (text) {
    let style = text.style;
    let font = fonts[style.type ?? 'text'];

    let textLeft = icon ? icon.gap + (icon.height ?? style.height) : 0;

    baseline = calculateBaseline(font, style);
    let pathData = font.getPath(text?.text, textLeft, baseline, style.fontSize, { letterSpacing: style.letterSpacing });
    width = pathData.getBoundingBox().x2;

    path.push(...splitPath(pathData.toPathData(2)));
  }

  return { path, baseline, width };
}

export function splitPath(path?: string) {
  return path?.replaceAll('ZM', 'Z$M')?.split('$') ?? [];
}

function calculateBaseline(font: Font, style: FontStyle) {
  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * style.fontSize);

  // calculate baseline
  let baseline = Math.ceil(ascender - (ascender - descender - style.height) / 2);

  return baseline;
}
