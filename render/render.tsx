/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

import { createElement } from "./jsx";
import { ComputeResult, CSSColor } from "/interfaces";

export default function (parent: HTMLElement, computed: ComputeResult) {
  let { text, icon, skeleton } = computed.element;

  let color = text?.style.color ?? icon?.color ?? 'var(--secondary)';
  let rerender = parent.children.length ? true : false;
  
  let elements: (SVGTextElement | SVGPathElement)[] = [];
  let root: SVGElement = <svg viewBox={`0 0 ${skeleton[0]} ${skeleton[1]}`}></svg>

  if (text) {
    let font = text.style;
    let textLeft = icon ? icon.gap + (icon.height ?? font.height) : 0;

    let style = `font-family: ${font.type}; letter-spacing: ${font.spacing}em; font-size: ${font.fontSize}px; line-height: ${font.height+.5}px; opacity: 0; ${!font.wrap ? 'width: max-content' : ''}`;
    let vector = <p style={style}>{text.text}</p>;

    if (!font.wrap) root.setAttribute('viewBox', `0 0 ${skeleton[0]} ${font.height}`);

    elements.push(vector);
    root.append(<foreignObject x={textLeft} width={font.wrap ? skeleton[0] : skeleton[0] * (font.height/skeleton[1]) + 'px'} height={font.wrap ? skeleton[1] : font.height + 'px'}>{vector}</foreignObject>);
  }

  if (icon) {
    let vector = <path opacity="0" d={icon?.path ?? ''}/>
    root.append(vector), elements.push(vector);
  }
  
  let morph = <path fill={rerender ? color : "var(--el)"} d={computed!.to} fill-rule="evenodd" clip-rule="evenodd">
    <animate attributeName="d" dur="0.8s" values={computed!.from + ';' + computed!.to} 
      calcMode="spline" keySplines="0.87 0 0.13 1" onendEvent={() => {
        elements.forEach(e => { e.style.opacity = "1", e.setAttribute("fill", color), e.style.color = color})
        morph.remove();
      }} />
  </path>

  setTimeout(() => morph.setAttribute('fill', color), 600);
  root.append(toColor(morph, color, rerender));

  parent.classList.add('rendered');
  parent.replaceChildren(root);
}

function toColor(element: SVGPathElement | SVGTextElement, color: CSSColor, rerender: boolean) {
  element.animate(
    [{ fill: rerender ? color : 'var(--el)' }, { fill: color }],
    { delay: 200, duration: 600, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' }
  );

  return element;
}
