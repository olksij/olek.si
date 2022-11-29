import { Font } from "opentype.js";
import { FontsRecord, FontStyle, MorphElement } from "/interfaces";

export default function (element: MorphElement | undefined, fonts: FontsRecord) {
  if (!element) return undefined;

  let icon = element.icon, text = element.text;

  let pathString = "";
  let width = 0, baseline = 0, points = 0;

  if (icon) {
    pathString += icon.path;
    width = icon.height ?? 0;
  }

  if (text) {
    let style = text.style;
    let font = fonts[style.type ?? 'text'];

    let textLeft = icon ? icon.gap + (icon.height ?? style.height) : 0;

    baseline = calculateBaseline(font, style);
    let pathData = font.getPath(text?.text, textLeft, baseline, style.fontSize, { letterSpacing: style.letterSpacing });
    width = pathData.getBoundingBox().x2;

    pathString += pathData.toPathData(2);
  }

  return { path: pathString, baseline, width, points };
}

function calculateBaseline(font: Font, style: FontStyle) {
  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * style.fontSize);

  // calculate baseline
  let baseline = Math.ceil(ascender - (ascender - descender - style.height) / 2);

  return baseline;
}
