/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

import { ComputeAPI, FontStyle, RenderData, RenderTextData, TextData, TextsRecord } from "../interfaces";
import { createElement, createFragment } from "./jsx";
import print from './print';

export const computeWorker = window['worker'];

// for restoring shortened ids in order to get 
// relation between records and dom
const restoreIDs: Record<string, Array<string>> = {
  "ps": ["telegram", "instagram", "github", "linkedin", "email"],
  "rg": ["nav-home", "nav-about", "nav-projects", "nav-work"],
  "ft": ["cr", "lg"],
}

const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://instagram.com/oleksiibesidaa", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
  "rg": ["https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz"],
}

// order and details of animating each node
const animatingOrder: Record<string, RenderData> = {
  "pf": { type: 'img', delay: 0, alt: 'profilePicture' },
  "tt": { type: 'text', delay: 50 },
  "d1": { type: 'text', delay: 300 },
  "d2": { type: 'text', delay: 50 },
  "ps": { type: 'img', delay: 50, children: true },
  "rg": { type: 'text', delay: 50, children: true },
  "nav": { type: 'both', delay: 0 },
  "cr": { type: 'both', delay: 0 },
}

let resolveMorph: (value: TextsRecord) => void;
export let textMorphReady = new Promise<TextsRecord>((resolve) => resolveMorph = resolve);

export default async function render(content): Promise<void> {
  computeWorker.postMessage({ deliver: 'texts', data: content.texts });

  if (!sessionStorage.getItem('loaded')) {
    await window["skeleton"];
    sessionStorage.setItem('loaded', 'true');
  }

  /* --- FROM OLD SOURCES.TSX --- */

  let images = {};
  Object.assign(images, content.images, content.vectors);

  document.head.append(...content.head);

  /* --- --- --- --- --- --- --- */

  for (var style of content.stylesheets) {
    document.head.append(<link rel="stylesheet" href={style} />)
  }

  document.body.classList.add('rendered');

  let renderTextData = await textMorphReady as Record<string, RenderTextData>;

  print("🎨 Render");

  // restore id's for shortened components
  for (let id in restoreIDs) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++)
      children[i].id = restoreIDs[id][i];
  }

  for (let id in restoreLinks) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++)
      children[i].setAttribute('href', restoreLinks[id][i]);
  }

  let delayCounter: number = 0;

  // restore everything;
  for (let item in animatingOrder) {
    let data: RenderData = animatingOrder[item];
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
        delayCounter += data.delay;
        setTimeout((item) => {
          var data = renderTextData[item] as RenderTextData;

          let vector = <svg viewBox={`0 0 ${content.texts[item].width} ${content.texts[item].font.lineHeight}`}>
            <path fill="var(--el)" fill-rule="evenodd" clip-rule="evenodd">
              <animate attributeName="d" dur="0.8s" values={data.from + ';' + data.to}
                calcMode="spline" keySplines="0.87 0 0.13 1" />
            </path>
            <text y={renderTextData[item].baseline - .25}>{content.texts[item].text}</text>
          </svg>
          byId(item)!.append(vector);

          let font = content.texts[item].font as FontStyle;

          [tagById(item, 'path'), tagById(item, 'text')].forEach(el => el!.animate(
            [{ fill: 'var(--el)' }, { fill: font.color ?? 'var(--secondary)' }],
            { delay: 400, duration: 400, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
          ));

          tagById(item, 'path')?.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { delay: 600, duration: 200 },
          );

          tagById(item, 'text')?.setAttribute("style", `opacity: 0; font-family:${font.type ?? 'text'}; letter-spacing:${font.letterSpacing ?? 0}em; font-size:${font.fontSize}`);

          tagById(item, 'text')?.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { delay: 600, duration: 200, easing: 'cubic-bezier(0.5, 0, 0.13, 1)' },
          );

          setTimeout(() => {
            tagById(item, 'text')?.setAttribute("style", tagById(item, 'text')?.getAttribute("style") + '; fill: ' + (font.color ?? 'var(--secondary)') + '; opacity:1');
          }, 600);

          byId(item)?.classList.add('rendered');

        }, delayCounter, child);
      }
    }
  }
}

computeWorker.onmessage = (message) => {
  if (message.data.deliver == 'texts') resolveMorph(message.data.data as TextsRecord);
}

byId('rg')!.onmouseenter = function () { byId('lf')!.setAttribute('style', 'transform: translateX(-96px); opacity: 0.25;'); }
byId('rg')!.onmouseleave = function () { byId('lf')!.setAttribute('style', 'transform: translateX(0px); opacity: 1') }

/** Shorthand for getting an `HTMLElement` */
function byId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/** Retreive child by tag */
function tagById(id: string, tag: string): Element | undefined {
  return byId(id)?.getElementsByTagName(tag)[0];
}