import { createElement, createFragment } from "./jsx";
import { images } from "./sources";

export const computeWorker = new Worker(new URL('compute.ts', import.meta.url), { type: 'module' });

type RenderType = 'img' | 'text';

interface AnimatingData {
  type: RenderType;
  alt?: string;
  delay: number;
  children?: boolean;
}

type DeliverType = 'fonts' | 'texts' | 'animate';

// types for each delivery type
type FontsRecord = Record<string, ArrayBuffer>;
type TextsRecord = Record<string, TextsData>;
type Animations = AnimationMetadata | AnimateFrameData;

// interface used for communicating
interface ComputeAPI {
  deliver: DeliverType,
  data: FontsRecord | TextsRecord | Animations,
}

interface AnimationMetadata {
  item: string;
  duration: number;
  start?: number;
  current?: number;
}

interface AnimateFrameData {
  item: string;
  path: string;
  next?: boolean;
  duration: number;
  start?: number;

}

interface TextsData {
  text: string // text itself;
  font: 'display' | 'text';
  fontSize: number;
  x?: number;
  y?: number // baseline;
  letterSpacing?: number;
  fromPath: string // temporary property until i will finish another refactoring;
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

const textsData: Record<string, TextsData> = {
  "tt": {
    text: 'Oleksii',
    font: 'display',
    fontSize: 128,
    letterSpacing: -0.02,
    fromPath: "M103 0H0V160H103V80V0ZM52 80H51V79H52V80ZM103 0H129V160H103V80V0ZM129 0H201V160H129V0ZM167 81V80H168V81H167ZM201 0H267V160H201V0ZM324 0H267V160H324V50.5V0ZM324 0V50.5H355V0H324ZM324 50.5V160H355V50.5H324ZM386 50.5V0H355V50.5H386ZM386 160V50.5H355V160H386Z",
  },
  "d1": {
    text: 'Redefining the way humans interact',
    font: 'text',
    fontSize: 20,
    fromPath: "M0 0V160H386V0H0Z",
  }
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

  computeWorker.postMessage({ deliver: 'texts', data: textsData });

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

computeWorker.onmessage = (message: MessageEvent<ComputeAPI>) => {
  if (message.data.deliver == 'texts') renderTexts();
  if (message.data.deliver == 'animate') renderAnimations(message.data.data as AnimateFrameData);
}

function renderTexts() {

  byId('tt')!.innerHTML += `<svg width="386" height="160" viewBox="0 0 386 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="path" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V160H386V0H0Z" fill="var(--el)"/>
    </svg>`;

  byId('d1')!.innerHTML += `<svg width="300" height="28" viewBox="0 0 300 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="path" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V28H300V0H0Z" fill="var(--el)"/>
  </svg>`;

  /*requestAnimationFrame((time) => animateText({
    item: 'tt',
    duration: 800,
  }, time));*/
  requestAnimationFrame((time) => computeWorker.postMessage({
    deliver: 'animate',
    data: {
      item: 'tt',
      duration: 800,
      current: time,
    }
  } as ComputeAPI));

  /*requestAnimationFrame((time) => animateText({
    item: 'd1',
    duration: 600,
  }, time));*/

  tagById('tt', 'path')?.animate(
    [{ fill: 'var(--el)' }, { fill: 'var(--text)' }],
    { delay: 400, duration: 400, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
  );

  document.getElementById('tt')?.classList.add('rendered');

  byId('d1')?.classList.add('rendered');

  tagById('d1', 'path')?.animate(
    [{ fill: 'var(--el)' }, { fill: 'var(--secondary)' }],
    { delay: 300, duration: 300, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
  );
}

function renderAnimations(data: AnimateFrameData) {
  tagById(data.item, 'path')?.setAttribute("d", data.path);
  if (data.next)
    return requestAnimationFrame((time) => computeWorker.postMessage({
      deliver: 'animate',
      data: {
        item: data.item,
        duration: data.duration,
        current: time,
        start: data.start
      }
    } as ComputeAPI));

  byId(data.item)?.replaceChildren(<p>Oleksii</p>);
}
