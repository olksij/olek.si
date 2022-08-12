import { createElement, createFragment } from "./jsx";
import { images } from "./sources";
import TextToSVG from 'text-to-svg';
import inlineSVG from 'inline-svg';
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

  TextToSVG.load(new URL('/assets/fonts/GoogleSansDisplay-Bold.ttf', import.meta.url), (_, textToSVG) => {
    var oleksiiTo = textToSVG.getD('Oleksii', { anchor: 'left top', fontSize: 128, letterSpacing: -.03 }).replaceAll('ZM', 'Z$M')?.split('$');

    byId('tt')!.innerHTML += `<svg width="386" height="160" viewBox="0 0 386 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="path" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V160H386V0H0Z" fill="var(--el)"/>
    </svg>`;

    requestAnimationFrame((time) => animateText({
      item: 'tt',
      interpolator: flubber.interpolateAll(oleksiiFrom, oleksiiTo, { maxSegmentLength: 7, single: true }),
      duration: 800,
    }, time));

    tagById('tt', 'path')?.animate(
      [{ fill: 'var(--el)' }, { fill: 'var(--text)' }],
      { delay: 400, duration: 400, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
    );

    document.getElementById('tt')?.classList.add('rendered');
  });

  // --- Description

  TextToSVG.load(new URL('/assets/fonts/GoogleSansText-Medium.ttf', import.meta.url), (_, textToSVG) => {

    var secondData = textToSVG.getD('Redefining the way humans interact', { anchor: 'left top', fontSize: 20 }).replaceAll('ZM', 'Z$M')?.split('$');

    byId('d1')!.innerHTML += `<svg width="300" height="28" viewBox="0 0 300 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="path" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V28H300V0H0Z" fill="var(--el)"/>
    </svg>`;

    requestAnimationFrame((time) => animateText({
      item: 'd1',
      interpolator: flubber.separate("M0 0V160H386V0H0Z", secondData, { maxSegmentLength: 3, single: true }),
      duration: 600,
    }, time));

    byId('d1')?.classList.add('rendered');

    tagById('d1', 'path')?.animate(
      [{ fill: 'var(--el)' }, { fill: 'var(--secondary)' }],
      { delay: 300, duration: 300, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' },
    );
  });

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

var oleksiiTo = [
  "M52.6081 127.048C45.7814 127.048 39.4241 125.811 33.5361 123.336C27.7334 120.861 22.6988 117.491 18.4321 113.224C14.1654 108.872 10.7948 103.795 8.32008 97.992C5.93075 92.104 4.73608 85.832 4.73608 79.176C4.73608 72.52 5.93075 66.2906 8.32008 60.488C10.7948 54.6 14.1654 49.5226 18.4321 45.256C22.6988 40.904 27.7334 37.4906 33.5361 35.016C39.4241 32.5413 45.7814 31.304 52.6081 31.304C59.4348 31.304 65.7494 32.5413 71.5521 35.016C77.4401 37.4906 82.5174 40.904 86.7841 45.256C91.0508 49.5226 94.3788 54.6 96.7681 60.488C99.2428 66.2906 100.48 72.52 100.48 79.176C100.48 85.832 99.2428 92.104 96.7681 97.992C94.3788 103.795 91.0508 108.872 86.7841 113.224C82.5174 117.491 77.4401 120.861 71.5521 123.336C65.7494 125.811 59.4348 127.048 52.6081 127.048Z",
  "M52.6081 110.664C56.8748 110.664 60.8428 109.896 64.5121 108.36C68.2668 106.824 71.5094 104.691 74.2401 101.96C77.0561 99.2293 79.2321 95.944 80.7681 92.104C82.3894 88.1786 83.2001 83.8693 83.2001 79.176C83.2001 74.4826 82.3894 70.216 80.7681 66.376C79.2321 62.4506 77.0561 59.1226 74.2401 56.392C71.5094 53.6613 68.2668 51.528 64.5121 49.992C60.8428 48.456 56.8748 47.688 52.6081 47.688C48.3414 47.688 44.3308 48.456 40.5761 49.992C36.9068 51.528 33.6641 53.6613 30.8481 56.392C28.1174 59.1226 25.9414 62.4506 24.3201 66.376C22.7841 70.216 22.0161 74.4826 22.0161 79.176C22.0161 83.8693 22.7841 88.1786 24.3201 92.104C25.9414 95.944 28.1174 99.2293 30.8481 101.96C33.6641 104.691 36.9068 106.824 40.5761 108.36C44.3308 109.896 48.3414 110.664 52.6081 110.664Z",
  "M109.858 125V33.352H126.626V125H109.858Z",
  "M197.19 109.896C194.289 115.016 190.363 119.155 185.414 122.312C180.55 125.469 174.577 127.048 167.494 127.048C162.715 127.048 158.278 126.237 154.182 124.616C150.171 122.909 146.673 120.563 143.686 117.576C140.699 114.589 138.353 111.091 136.646 107.08C135.025 102.984 134.214 98.504 134.214 93.64C134.214 89.1173 135.025 84.8506 136.646 80.84C138.267 76.744 140.529 73.2026 143.43 70.216C146.331 67.144 149.745 64.712 153.67 62.92C157.681 61.128 162.075 60.232 166.854 60.232C171.889 60.232 176.369 61.0853 180.294 62.792C184.219 64.4133 187.505 66.7173 190.15 69.704C192.795 72.6053 194.801 76.0613 196.166 80.072C197.531 84.0826 198.214 88.4346 198.214 93.128C198.214 93.7253 198.214 94.2373 198.214 94.664C198.129 95.176 198.086 95.6453 198.086 96.072C198.001 96.4986 197.958 96.968 197.958 97.48H150.726C151.067 100.04 151.75 102.259 152.774 104.136C153.883 105.928 155.206 107.464 156.742 108.744C158.363 109.939 160.113 110.835 161.99 111.432C163.867 111.944 165.787 112.2 167.75 112.2C171.59 112.2 174.747 111.347 177.222 109.64C179.782 107.848 181.787 105.629 183.238 102.984L197.19 109.896Z",
  "M181.958 85.576C181.873 84.4666 181.489 83.2293 180.806 81.864C180.209 80.4986 179.27 79.2186 177.99 78.024C176.795 76.8293 175.259 75.848 173.382 75.08C171.59 74.312 169.414 73.928 166.854 73.928C163.27 73.928 160.113 74.952 157.382 77C154.651 79.048 152.731 81.9066 151.622 85.576H181.958Z",
  "M206.363 33.352H223.131V83.272H223.899L244.891 62.28H265.627V63.304L242.331 85.96L267.547 123.976V125H247.707L230.555 97.48L223.131 104.776V125H206.363V33.352Z",
  "M295.26 127.048C291.164 127.048 287.495 126.536 284.252 125.512C281.095 124.488 278.321 123.165 275.932 121.544C273.628 119.837 271.665 117.917 270.044 115.784C268.423 113.565 267.185 111.347 266.332 109.128L281.308 102.728C282.759 105.971 284.679 108.403 287.068 110.024C289.543 111.56 292.273 112.328 295.26 112.328C298.332 112.328 300.764 111.773 302.556 110.664C304.348 109.555 305.244 108.232 305.244 106.696C305.244 104.989 304.476 103.624 302.94 102.6C301.489 101.491 298.929 100.509 295.26 99.656L286.428 97.736C284.465 97.3093 282.417 96.6266 280.284 95.688C278.236 94.7493 276.359 93.5546 274.652 92.104C272.945 90.6533 271.537 88.904 270.428 86.856C269.319 84.808 268.764 82.4186 268.764 79.688C268.764 76.616 269.404 73.8853 270.684 71.496C272.049 69.1066 273.884 67.1013 276.188 65.48C278.492 63.7733 281.18 62.4933 284.252 61.64C287.409 60.7013 290.78 60.232 294.364 60.232C300.337 60.232 305.671 61.4266 310.364 63.816C315.057 66.12 318.513 69.832 320.732 74.952L306.268 80.84C305.073 78.3653 303.324 76.5733 301.02 75.464C298.716 74.3546 296.412 73.8 294.108 73.8C291.719 73.8 289.628 74.312 287.836 75.336C286.044 76.2746 285.148 77.512 285.148 79.048C285.148 80.4986 285.873 81.6506 287.324 82.504C288.86 83.3573 290.908 84.1253 293.468 84.808L303.068 87.112C309.468 88.648 314.204 91.1226 317.276 94.536C320.433 97.864 322.012 101.832 322.012 106.44C322.012 109.171 321.372 111.773 320.092 114.248C318.812 116.723 316.977 118.941 314.588 120.904C312.284 122.781 309.468 124.275 306.14 125.384C302.897 126.493 299.271 127.048 295.26 127.048Z",
  "M338.462 53.192C337.011 53.192 335.603 52.936 334.238 52.424C332.958 51.8266 331.806 51.0586 330.782 50.12C329.843 49.096 329.075 47.944 328.478 46.664C327.966 45.384 327.71 43.976 327.71 42.44C327.71 40.904 327.966 39.496 328.478 38.216C329.075 36.936 329.843 35.8266 330.782 34.888C331.806 33.864 332.958 33.096 334.238 32.584C335.603 31.9866 337.011 31.688 338.462 31.688C341.449 31.688 344.009 32.7546 346.142 34.888C348.275 36.936 349.342 39.4533 349.342 42.44C349.342 45.4266 348.275 47.9866 346.142 50.12C344.009 52.168 341.449 53.192 338.462 53.192Z", "M330.142 125V62.28H346.91V125H330.142Z",
  "M369.027 53.192C367.576 53.192 366.168 52.936 364.803 52.424C363.523 51.8266 362.371 51.0586 361.347 50.12C360.408 49.096 359.64 47.944 359.043 46.664C358.531 45.384 358.275 43.976 358.275 42.44C358.275 40.904 358.531 39.496 359.043 38.216C359.64 36.936 360.408 35.8266 361.347 34.888C362.371 33.864 363.523 33.096 364.803 32.584C366.168 31.9866 367.576 31.688 369.027 31.688C372.014 31.688 374.574 32.7546 376.707 34.888C378.84 36.936 379.907 39.4533 379.907 42.44C379.907 45.4266 378.84 47.9866 376.707 50.12C374.574 52.168 372.014 53.192 369.027 53.192Z", "M360.707 125V62.28H377.475V125H360.707Z",
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
