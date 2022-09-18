/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

import { ComputeAPI, FontStyle, RenderData, RenderTextData, TextData, TextsRecord } from "../interfaces";
import { createElement, createFragment } from "./jsx";
import print from './print';

export const computeWorker = window['worker'];

// TODO: related to individual page

// for restoring shortened ids in order to get 
// relation between records and dom
const restoreIDs: Record<string, Array<string>> = {
  "ps": ["telegram", "instagram", "github", "linkedin", "email"],
  "rg": ["nav-home", "nav-about", "nav-projects", "nav-work"],
  "ft": ["cr", "lg"],
}

// TODO: related to individual page

const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://instagram.com/oleksiibesidaa", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
  "rg": ["https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz", "https://oleksii.xyz"],
}

// TODO: related to individual page

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

// TODO: merge into one value

let resolveMorph: (value: TextsRecord) => void;
export let textMorphReady = new Promise<TextsRecord>((resolve) => resolveMorph = resolve);

export default async function render(content): Promise<void> {
  // TODO: it's possible to send text data earlier
  computeWorker.postMessage({ deliver: 'texts', data: content.texts });

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

  // TODO: merge all cases into one

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
        // TODO: ahhrr clean up code 
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
  document.body.classList.add('rendered'), delayCounter;
}

computeWorker.onmessage = (message) => {
  if (message.data.deliver == 'texts') resolveMorph(message.data.data as TextsRecord);
}

let menuOpenBgKeyframes: Keyframe[] = [
  {
    backgroundPosition: '0px 0px',
    boxShadow: 'inset 0px 0px 0px 50vh #FFF0',
  },
  {
    backgroundPosition: '-32px 0px',
    boxShadow: 'inset 0px 0px 0px 50vh var(--bg)',
  }
]

let menuCloseBgKeyframes: Keyframe[] = [
  menuOpenBgKeyframes[1],
  menuOpenBgKeyframes[0]
]

function menuOpenBg() {
  document.body.animate(menuOpenBgKeyframes, { duration: 600, easing: 'cubic-bezier(0.25, 0.25, 0, 1)' });
  document.body.setAttribute('style', 'background-position: -32px 0px; background: box-shadow: inset 0px 0px 0px 50vh var(--bg)');
}

function menuCloseBg() {
  document.body.animate(menuCloseBgKeyframes, { duration: 600, easing: 'cubic-bezier(0.25, 0.25, 0, 1)' });
  document.body.setAttribute('style', '');
}

// TODO: it's heavely related to pages
byId('rg')!.onmouseover = function () {
  byId('cnt')!.classList.add('navOpened', 'navTransformed');
  menuOpenBg();
}
byId('rg')!.onmouseleave = function () { byId('cnt')!.classList.remove('navOpened'); menuCloseBg() }

let isNavHovered = false;

byId('nav')!.onclick = function () {
  if (!byId('cnt')!.classList.contains('navTapped')) {
    byId('cnt')!.classList.add('navTapped', 'navTransformed');
    tagById('nav', 'text')!.innerHTML = 'Close';
    menuOpenBg()
  }
  else {
    byId('cnt')!.classList.remove('navTapped');
    tagById('nav', 'text')!.innerHTML = 'Navigation';
    menuCloseBg();
  }
}

byId('nav')!.onmouseover = () => isNavHovered = true;
byId('nav')!.onmouseleave = () => isNavHovered = false;

document.body.onclick = function () {
  if (!isNavHovered) {
    byId('cnt')!.classList.remove('navTapped');
    tagById('nav', 'text')!.innerHTML = 'Navigation';
  }
}

var blurInvoked = false;

let motionStart = function (event) {
  if (!byId('cnt')?.classList.contains('navTransformed')) return;

  if (!blurInvoked) {
    blurInvoked = true;
    let rect = byId('nav-work')!.getBoundingClientRect();
    requestAnimationFrame(() => motionBlur('rg', rect));
  }
}

let motionEnd = function (event) {
  blurInvoked = false;
  byId('cnt')!.setAttribute('style', '');
};

byId('rg')!.ontransitionrun = motionStart;
byId('rg')!.onanimationstart = motionStart;

byId('rg')!.ontransitionend = motionEnd;
byId('rg')!.onanimationend = motionEnd;

function motionBlur(id: string, previous: DOMRect) {
  if (!blurInvoked) return;

  let current = byId('nav-work')!.getBoundingClientRect();

  let diff = Math.round(Math.abs(current.left - previous.left) / 2 * 5) / 5;

  byId('cnt')!.setAttribute('style', `filter: blur(${diff}px)`);

  requestAnimationFrame(() => motionBlur(id, current));
}

/** Shorthand for getting an `HTMLElement` */
function byId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/** Retreive child by tag */
function tagById(id: string, tag: string): Element | undefined {
  return byId(id)?.getElementsByTagName(tag)[0];
}