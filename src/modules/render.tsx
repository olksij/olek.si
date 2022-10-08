/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

import { RenderConfig, ComputedTextData, TextsRecord, InputTextData, PageContent } from "../interfaces";
import { createElement, createFragment } from "./jsx";
import print from './print';
import './menu.ts';
import { byId, tagById } from "./shorthands";
import { FontStyle } from "../classes";
import { onMenuClick } from "./menu";

export default async function render(content: PageContent, renderTextData: ComputedTextData): Promise<void> {
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

  let delayCounter: number = 0;

  // TODO: merge all cases into one

  // restore everything;
  for (let item in content.animatingOrder) {
    let data: RenderConfig = content.animatingOrder[item];
    let node: HTMLElement;

    let queue: Array<string> = [item];
    // if data.children is true, retreive children
    if (data.children) queue = [...byId(item)!.children]
      .map(child => child.id);

    if (data.type == 'img' || data.type == 'both') {
      for (let child of queue) {
        // generate future node;
        node = <img src={images[child]} alt={item} />;
        // insert it to appropriate skeleton element;
        byId(child)?.append(node);
        // schedule animation
        delayCounter += data.delay;
        setTimeout((child) => byId(child)?.classList.add('rendered'), delayCounter, child);
      }
    }

    if (data.type == 'text' || data.type == 'both') {
      for (let child of queue) {
        // TODO: ahhrr clean up code 
        delayCounter += data.delay;
        setTimeout((item) => {
          var data = renderTextData[item] as ComputedTextData;
          let font = content.fontStyles[content.textStyleData[item].style] as FontStyle;

          let vector: SVGElement = <svg viewBox={`0 0 ${content.textStyleData[item].width} ${font.lineHeight}`}>
            <path fill="var(--el)" fill-rule="evenodd" clip-rule="evenodd">
              <animate attributeName="d" dur="0.8s" values={data.from + ';' + data.to}
                calcMode="spline" keySplines="0.87 0 0.13 1" />
            </path>
            <text x={content.textStyleData[item].iconWidth??0} y={renderTextData[item].baseline - .25}>{content.texts['en'][item]}</text>
            <path class="final" d={content.textStyleData[item].icon??''}/>
          </svg>
          byId(item)!.append(vector);


          let icon = vector.children[2];

          [tagById(item, 'path'), tagById(item, 'text'), icon].forEach(el => el!.animate(
            [{ fill: 'var(--el)' }, { fill: font.color }],
            { delay: 400, duration: 400, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
          ));

          tagById(item, 'path')?.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { delay: 600, duration: 200 },
          );

          tagById(item, 'text')?.setAttribute("style", `opacity: 0; font-family:${font.type}; letter-spacing:${font.letterSpacing}em; font-size:${font.fontSize}px`);
          icon.setAttribute("style", `opacity: 0;`)

          tagById(item, 'text')?.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { delay: 600, duration: 200, easing: 'cubic-bezier(0.5, 0, 0.13, 1)' },
          );          
          icon.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { delay: 600, duration: 200, easing: 'cubic-bezier(0.5, 0, 0.13, 1)' },
          );

          setTimeout((icon) => {
            tagById(item, 'text')?.setAttribute("style", tagById(item, 'text')?.getAttribute("style") + '; fill: ' + (font.color) + '; opacity:1');
            icon.setAttribute("style", icon.getAttribute("style") + '; fill: ' + (font.color) + '; opacity:1');
          }, 600, icon);

          byId(item)?.classList.add('rendered');

        }, delayCounter, child);
      }
    }
  }
  document.body.classList.add('rendered'), delayCounter;
}
