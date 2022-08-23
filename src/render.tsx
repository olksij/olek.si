import { ComputeAPI, RenderData, RenderTextData, TextData, TextsRecord } from "./interfaces";
import { createElement, createFragment } from "./jsx";
import { images } from "./sources";

export const computeWorker = new Worker(new URL('compute/compute.ts', import.meta.url), { type: 'module' });

// for restoring shortened ids in order to get 
// relation between records and dom
const restoreIDs: Record<string, Array<string>> = {
  "ps": ["telegram", "instagram", "github", "twitter", "email"],
  "rg": ["nav-home", "nav-about", "nav-projects", "nav-work"],
  "ft": ["cr", "lg"],
}

// order and details of animating each node
const animatingOrder: Record<string, RenderData> = {
  "pf": { type: 'img', delay: 0, alt: 'profilePicture' },
  "tt": { type: 'text', delay: 50 },
  "d1": { type: 'text', delay: 300 },
  "d2": { type: 'text', delay: 50 },
  "ps": { type: 'img', delay: 50, children: true },
  "rg": { type: 'text', delay: 50, children: true },
  "cr": { type: 'both', delay: 0 },
}

const textsData: Record<string, TextData> = {
  "tt": {
    text: 'Oleksii',
    width: 386,
    fromPath: "M103 0H0V112H103V80V0ZM52 80H51V79H52V80ZM103 0H129V112H103V80V0ZM129 0H201V112H129V0ZM167 81V80H168V81H167ZM201 0H267V112H201V0ZM324 0H267V112H324V50.5V0ZM324 0V50.5H355V0H324ZM324 50.5V112H355V50.5H324ZM386 50.5V0H355V50.5H386ZM386 112V50.5H355V112H386Z",
    font: {
      type: 'display',
      fontSize: 128,
      lineHeight: 112,
      letterSpacing: -0.04,
      color: 'var(--text)',
    },
  },
  "d1": {
    text: 'Redefining the way humans interact', // Pereosmyslenńa sposobu vzajemodiji ĺudyny
    width: 337,
    font: {
      fontSize: 20,
      lineHeight: 28,
    },
  },
  "d2": {
    text: 'with computers', // z kompjuterom
    width: 148,
    font: {
      fontSize: 20,
      lineHeight: 28,
    }
  },
  "nav-home": {
    text: 'oleksii.xyz',
    width: 128,
    font: {
      type: 'display',
      fontSize: 20,
      letterSpacing: -0.04,
      lineHeight: 24,
      color: 'var(--text)',
    }
  },
  "nav-about": {
    text: 'about',
    width: 128,
    font: {
      fontSize: 18,
      lineHeight: 24,
    }
  },
  "nav-projects": {
    text: 'projects',
    width: 128,
    font: {
      fontSize: 18,
      lineHeight: 24,
    }
  },
  "nav-work": {
    text: 'work',
    width: 128,
    font: {
      fontSize: 18,
      lineHeight: 24,
    }
  },
  "cr": {
    text: '2018-2022 Oleksii Besida',
    width: 142,
    font: {
      fontSize: 12,
      lineHeight: 16,
    }
  },
}

computeWorker.postMessage({ deliver: 'texts', data: textsData });

/** Shorthand for getting an `HTMLElement` */
function byId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/** Retreive child by tag */
function tagById(id: string, tag: string): Element | undefined {
  return byId(id)?.getElementsByTagName(tag)[0];
}

let resolveMorph: (value: TextsRecord) => void;
export let textMorphReady = new Promise<TextsRecord>((resolve) => resolveMorph = resolve);

export default async function render(): Promise<void> {
  if (!sessionStorage.getItem('loaded')) {
    await window["skeleton"];
    sessionStorage.setItem('loaded', 'true');
  }

  document.body.classList.add('rendered');

  let renderTextData = await textMorphReady;

  // restore id's for shortened components
  for (let id in restoreIDs) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++)
      children[i].id = restoreIDs[id][i];
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

          let loadVector = (element) => { element.parentElement.parentElement.replaceWith(<p>{textsData[item].text}</p>); }

          let vector = <svg viewBox={`0 0 ${textsData[item].width} ${textsData[item].font.lineHeight}`}>
            <path d={data.to} fill="var(--el)" fill-rule="evenodd" clip-rule="evenodd">
              <animate attributeName="d" dur="0.8s" values={data.from + ';' + data.to}
                calcMode="spline" keySplines="0.87 0 0.13 1"
                onendEvent={loadVector} />
            </path>
          </svg>

          byId(item)!.append(vector);

          tagById(item, 'path')?.animate(
            [{ fill: 'var(--el)' }, { fill: textsData[item].font.color ?? 'var(--secondary)' }],
            { delay: 400, duration: 500, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
          );

          byId(item)?.classList.add('rendered');

        }, delayCounter, child);
      }
    }
  }
}

computeWorker.onmessage = (message) => {
  if (message.data.deliver == 'texts') resolveMorph(message.data.data as TextsRecord);
}
