import { Font } from "opentype.js";
import { FontsRecord, FontStyle, RuntimeElementConfig, RuntimeSize, SkeletonConfig } from "interfaces";

export type TextLines = { text: string[], width: number }[]

export default function (element: RuntimeElementConfig, skeleton: SkeletonConfig<RuntimeSize>, fonts: FontsRecord) {
  let icon = element.icon, text = element.text;

  let pathString: string[] = [];
  let lines: TextLines = [{ text: [], width: 0 }],
      toSkeleton: SkeletonConfig<RuntimeSize> = [0, 0];

  if (icon) {
    pathString = [icon.path];
    toSkeleton = [icon.height ?? 0, icon.height ?? 0];
  }

  if (text) {
    let style = text.style;
    let font = fonts[style.type ?? 'text'];

    let textLeft = icon ? icon.gap + (icon.height ?? style.height) : 0;

    let words = text.text.split(' ');
    let whitespace = font.getAdvanceWidth(' ', style.fontSize);

    words.forEach(word => {
      let width = font.getAdvanceWidth(word, style.fontSize),
          line = lines.length - 1, spaced = whitespace + width;
      
      if (lines[line].width + spaced <= skeleton[0]! || !style.wrap)
        lines[line].text.push(word), lines[line].width += spaced;

      else lines.push({ text: [word], width })
    });

    // unless multiline text is enabled, propose a new width for computed text
    toSkeleton = style.wrap ? [skeleton[0]!, lines.length * style.height] : [toSkeleton[0] + lines[0].width, style.height];
    let baseline = calculateBaseline(font, style);    


    lines.forEach((line, i) => pathString[i] = (pathString[i] ?? '') + font.getPath(line.text.join(' '), 
      textLeft, baseline + style.height * i, style.fontSize, { letterSpacing: style.spacing }).toPathData(2));
  }

  return { path: pathString, skeleton };
}

function calculateBaseline(font: Font, style: FontStyle) {
  // calculate ascender & descender
  let [ascender, descender] = [font.ascender, font.descender]
    .map(value => value / font.unitsPerEm * style.fontSize);

  // calculate baseline
  let baseline = ascender - (ascender - descender - style.height) / 2;

  return baseline - style.fontSize * style.fontSize * -.0001;
}
