/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

import { RenderConfig, ComputedTextData, TextsRecord, InputTextData, PageContent, RenderElementConfig } from "../interfaces";
import { createElement, createFragment } from "./jsx";
import print from './print';
import './menu.ts';
import { byId, tagById } from "./shorthands";
import { FontStyle } from "../classes";
import { onMenuClick } from "./menu";
import { fontStyles } from "./fontStyles";

export default async function render(content: PageContent, renderTextData: TextsRecord<'result'>): Promise<void> {
  if (!sessionStorage.getItem('loaded')) {
    await window["skeleton"];
    sessionStorage.setItem('loaded', 'true');
  }

  // TODO: organize things here

  /* --- FROM OLD SOURCES.TSX --- */

  let images = {};
  Object.assign(images, content.images, content.vectors);

  document.head.append(...content.head);

  for (var style of content.stylesheets) {
    document.head.append(<link rel="stylesheet" href={style} />)
  }

  /* --- --- --- --- --- --- --- */

  print("🎨 Render");

  for (let id in content.restoreClicks) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++) {
      let childIndex = i;
      children[i].addEventListener("click", () => content.restoreClicks[id][childIndex]()),
        children[i].setAttribute("onclick", "return false");
    }
  }

  byId('lg')!.onmouseenter = function () {
    for (let lg in content.languages) {
      byId('lg')!.append(<div onclick={() => window.history.pushState({}, '', `?${lg}`)} class="lgItem">{content.languages[lg]}</div>);
    }
  }

  byId('lg')!.onmouseleave = function () {
    onMenuClick();
    Array.from(byId('lg')!.getElementsByClassName('lgItem')).forEach(e => e.remove())
  }

  let delay: number = 0;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0];

  // restore everything;
  for (let item in content.animatingOrder) {
    let data: RenderConfig = content.animatingOrder[item];
    let queue: Array<string> = [item];

    // if it's about animation children, put children into a queue
    if (data.children) queue = [...byId(item)!.children]
      .map(child => child.id);  

    // iterate over queue
    for (let child of queue) {
      delay += data.delay;
      setTimeout(renderElement, delay, child);
    }
  }

  document.body.classList.add('rendered');
}

function renderElement(element: RenderElementConfig) {
  let computed = element.morph, font = fontStyles[element.style] as FontStyle;

  // position of text depends if there is an icon
  let textLeft = element.icon ? element.icon.gap + font.lineHeight : 0;

  let svgElement: SVGElement = <svg viewBox={`0 0 ${element.width} ${font.lineHeight}`}></svg>

  let morph: SVGPathElement = <path fill="var(--el)" fill-rule="evenodd" clip-rule="evenodd">
    <animate attributeName="d" dur="0.8s" values={computed.from + ';' + computed.to} calcMode="spline" keySplines="0.87 0 0.13 1" />
  </path>

  let text: SVGTextElement = <text x={textLeft} y={computed.baseline - .25}>{element.text}</text>;
  let icon: SVGPathElement = <path d={element.icon?.path ?? ''}/>

  svgElement.append(morph, text, icon);
  byId(element.id)!.append(svgElement);

  [morph, text, icon].forEach(element => element.animate(
    [{ fill: 'var(--el)' }, { fill: font.color }],
    { delay: 400, duration: 400, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
  ));

  morph.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { delay: 600, duration: 200 },
  );

  text.setAttribute("style", `opacity: 0; font-family:${font.type}; letter-spacing:${font.letterSpacing}em; font-size:${font.fontSize}px`);
  icon.setAttribute("style", `opacity: 0;`);

  [text, icon].forEach(element => element.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { delay: 600, duration: 200, easing: 'cubic-bezier(0.5, 0, 0.13, 1)' },
  )); 

  setTimeout((icon, text) => {
    text.setAttribute("style", text.getAttribute("style") + '; fill: ' + (font.color) + '; opacity:1');
    icon.setAttribute("style", icon.getAttribute("style") + '; fill: ' + (font.color) + '; opacity:1');
  }, 600, icon, text);

  byId(element.id)?.classList.add('rendered');
}
