import { createElement, createFragment } from "./jsx";
import { images } from "./sources";
import { Font, load } from 'opentype.js';
import * as flubber from "flubber"

type RenderType = 'img' | 'text';

interface AnimatingData {
  type: RenderType;
  alt?: string;
  delay: number;
  children?: boolean;
}

interface AnimatingTextData {
  item: string // reference id for other data structures;
  interpolator: (t: number) => number // function which interpolate path data;
  start?: number | null // time when anmation started;
  duration: number // desired animation duration;
}

// for restoring shortened ids in order to get 
// relation between records and dom
const restoreIDs: Record<string, Array<string>> = {
  "ps": ["telegram", "instagram", "github", "twitter", "email"],
  "rg": ["nav-home", "nav-about", "nav-projects", "nav-work"],
  "ft": ["cr", "lg"],
}

// order and details of animating each node
const animatingOrder: Record<string, AnimatingData> = {
  "pf": { type: 'img', delay: 50, alt: 'pf' },
  "tt": { type: 'text', delay: 100 },
  "ps": { type: 'img', delay: 50, children: true },
  "cr": { type: 'img', delay: 100 },
}

/** Shorthand for getting an `HTMLElement` */
function byId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/** Retreive child by tag */
function tagById(id: string, tag: string): Element | undefined {
  return byId(id)?.getElementsByTagName(tag)[0];
}

export default async function render(): Promise<void> {
  if (!sessionStorage.getItem('loaded')) {
    await window["skeleton"];
    sessionStorage.setItem('loaded', 'true');
  }

  // restore id's for shortened components
  for (let id in restoreIDs) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++)
      children[i].id = restoreIDs[id][i];
  }

  /* --- --- --- --- --- --- --- --- --- --- ---
     --- CODE BELOW STILL NEEDS REFACTORING- --- 
     --- --- --- --- --- --- --- --- --- --- --- */

  // --- Title

  const font: Font = await load(new URL('/assets/fonts/GoogleSansDisplay-Bold.ttf', import.meta.url));
  const font2: Font = await load(new URL('/assets/fonts/GoogleSansText-Medium.ttf', import.meta.url));

  const oleksiiTo = font.getPath('Oleksii', 0, 128, 128, { letterSpacing: -.04 }).toPathData().replaceAll('ZM', 'Z$M')?.split('$');

  byId('tt')!.innerHTML += `<svg width="386" height="160" viewBox="0 0 386 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="path" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V160H386V0H0Z" fill="var(--el)"/>
    </svg>`;


  tagById('tt', 'path')?.animate(
    [{ fill: 'var(--el)' }, { fill: 'var(--text)' }],
    { delay: 400, duration: 400, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
  );

  document.getElementById('tt')?.classList.add('rendered');

  // --- ---
  // --- Description
  // --- ---

  const secondData = font2.getPath('Redefining the way humans interact', 0, 20, 20).toPathData().replaceAll('ZM', 'Z$M')?.split('$');

  byId('d1')!.innerHTML += `<svg width="300" height="28" viewBox="0 0 300 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="path" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V28H300V0H0Z" fill="var(--el)"/>
  </svg>`;

  let interponlate1 = flubber.interpolateAll(oleksiiFrom, oleksiiTo, { maxSegmentLength: 7, single: true });
  let interpolate2 = flubber.separate("M0 0V160H386V0H0Z", secondData, { maxSegmentLength: 3, single: true });

  requestAnimationFrame((time) => animateText({
    item: 'tt',
    interpolator: interponlate1,
    duration: 800,
  }, time));

  requestAnimationFrame((time) => animateText({
    item: 'd1',
    interpolator: interpolate2,
    duration: 600,
  }, time));

  byId('d1')?.classList.add('rendered');

  tagById('d1', 'path')?.animate(
    [{ fill: 'var(--el)' }, { fill: 'var(--secondary)' }],
    { delay: 300, duration: 300, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
  );

  let delayCounter: number = 0;

  // restore everything;
  for (let item in animatingOrder) {
    let data: AnimatingData = animatingOrder[item];
    let node: HTMLElement;

    switch (data.type) {
      case 'img':
        let queue: Array<string> = [item];
        // if data.children is true, retreive children
        if (data.children) queue = [...byId(item)!.children]
          .map(child => child.id);

        for (let child of queue) {
          console.log(child, queue)
          // generate future node;
          node = <img src={images[child]} alt={item} />;
          // insert it to appropriate skeleton element;
          byId(child)?.append(node);
          // schedule animation
          setTimeout((child) => byId(child)?.classList.add('rendered'), delayCounter, child);
        }
        break;

      /*case 'text':
        // generate future node;
        node = <img src={images[item]} alt={item} />;
        // insert it to appropriate skeleton element;
        byId(data.insertTo)?.append(node);
        // schedule animation
        delayCounter += data.delay;
        setTimeout(() => node.classList.add('rendered'), delayCounter);
        break;*/

      default:
        break;
    }
  }
}

var oleksiiFrom = [
  "M103 0H0V160H103V80V0Z",
  "M52 80H51V79H52V80Z",
  "M103 0H129V160H103V80V0Z",
  "M129 0H201V160H129V0Z",
  "M167 81V80H168V81H167Z",
  "M201 0H267V160H201V0Z",
  "M324 0H267V160H324V50.5V0Z",
  "M324 0V50.5H355V0H324Z",
  "M324 50.5V160H355V50.5H324Z",
  "M386 50.5V0H355V50.5H386Z",
  "M386 160V50.5H355V160H386Z",
]

function animateText(data: AnimatingTextData, current: number): number | void {
  if (data.start == null) data.start = current;
  // get current animation time in [0, 1] range && update path data;
  let t = easeInOutExpo((current - data.start) / data.duration);
  console.log(t)
  tagById(data.item, 'path')?.setAttribute("d", data.interpolator(t).toString());

  // check if we should continue animating;
  if (data.start + data.duration > current)
    return requestAnimationFrame((time) => animateText(data, time));


  // else changing to real eleemnt;
  tagById(data.item, 'svg')?.replaceWith(data.item == 'tt' ? <p>Oleksii</p> : <p>Redefining the way humans interact</p>);
}

function easeInOutExpo(x: number): number {
  if ([0, 1].includes(x)) return x;
  return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
