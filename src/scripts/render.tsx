/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

import { AnimatingOrder, PageContent, RenderElementInterface, CSSColor, AnimationConfig, TextConfig, Languages, SkeletonBaseConfig } from "../interfaces";
import { createElement } from "./jsx";
import print from './print';
import './menu.ts';
import { byId } from "./shorthands";
import { onMenuClick } from "./menu";
import compute from "./worker";
import waitFor from "./eventAsync";
import { head, languages } from "../general/page";

declare global { 
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export default async function render(content: PageContent): Promise<void> {
  await waitFor('skeleton');
  if (!sessionStorage.getItem('loaded')) {
    sessionStorage.setItem('loaded', 'true');
  }

  let images: Record<string, string> = {};
  Object.assign(images, content.images, content.vectors);

  document.head.append(...head);

  for (var style of content.stylesheets ?? []) {
    document.head.append(<link rel="stylesheet" href={style} />)
  }

  /* --- --- --- --- --- --- --- */

  print("🎨 Render");

  for (let id in content.restoreClicks) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++) {
      let childIndex = i;
      if (!children[i].getAttribute("onclick"))
        children[i].addEventListener("click", () => content.restoreClicks?.[id][childIndex]()),
          children[i].setAttribute("onclick", "return false");
    }
  }

  byId('lg')!.addEventListener("mouseenter", function () {
    for (let lg in Object.keys(languages)) {
      byId('lg')!.append(<div onclick={() => window.history.pushState({}, '', `?${lg}`)} class="lgItem">{languages[lg as Languages]}</div>);
    }
  });

  byId('lg')!.addEventListener("mouseleave", function () {
    onMenuClick();
    Array.from(byId('lg')!.getElementsByClassName('lgItem')).forEach(e => e.remove())
  });

  let delay: number = 0;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages ?? 'en';

  // restore everything;
  for (let item in content.animatingOrder) {
    let data: AnimatingOrder = content.animatingOrder[item];
    let queue: Array<string> = [item];

    // if it's about animation children, put children into a queue
    if (data.children) queue = [...byId(item)!.children]
      .map(child => child.id); 

      
    if (data.image) {
      for (let child of queue) {
        // insert node to an appropriate skeleton element;
        let node = <img src={images[child]} alt={item} />;
        byId(child)?.replaceChildren(node);
        // schedule the animation
        let render = (child: string) => byId(child)?.classList.add('rendered');
        setTimeout(render, delay += data.delay, child);
      } 
      // skip morphing as we have inserted the image element
      continue;
    }

    // iterate over queue
    for (let child of queue) {
      let element = content.elementConfig?.[child]!;
        
      let text = element.text ? {
        text: content.texts?.[lang as Languages][child],
        style: element.text,
      } as TextConfig : undefined;

      let mobile: 0 | 1 = window.innerWidth < 920 ? 0 : (window['current'][child][1] ? 1 : 0)
  
      let skeletonConfig: SkeletonBaseConfig = window['current'][child][mobile];
      //skeletonConfig[2] ??= parseInt(byId(child)?.style.borderRadius ?? '0');

      if (byId(child)?.hasChildNodes()) continue;

      let config = {
        id: child,
        height: element.text?.height ?? element.icon?.height!,
        morph: await compute({
          from: { ...element.from, skeleton: skeletonConfig },
          to: { text, icon: element.icon },
        }),
        icon: element.icon,
        text: {
          style: element.text,
          text: content.texts?.[lang as Languages][child]
        } as TextConfig,
      } as RenderElementInterface;

      setTimeout(renderElement, delay += data.delay, config);
    }
  }

  document.body.classList.add('rendered');
}

function renderElement(element: RenderElementInterface) {
  let parent = byId(element.id)!;

  let morph: SVGPathElement, text: SVGTextElement, icon: SVGPathElement;
  let computed = element.morph, width = element.morph?.width;
  let color = element.text?.style.color ?? element.icon?.color!;
  
  let elements: (SVGTextElement | SVGPathElement)[] = [];
  let root: SVGElement = <svg viewBox={`0 0 ${width} ${element.height}`}></svg>

  if (element.text) {
    let font = element.text.style;
    let textLeft = element.icon ? element.icon.gap + element.height : 0;

    let style = `font-family:${font.type ?? 'text'}; letter-spacing:${font.letterSpacing}em; font-size:${font.fontSize}px`;
    text = <text opacity="0" style={style} x={textLeft} y={computed!.baseline! - .25}>{element.text.text}</text>;

    elements.push(text);

    root.append(text);
  }

  if (element.icon) {
    icon = <path opacity="0" d={element.icon?.path ?? ''}/>
    root.append(icon)

    elements.push(icon);
  }

  if (element.morph) {
    let renderElement = () => {
      elements.forEach(e => { e.setAttribute("opacity", "1"), e.setAttribute("fill", color)})
      morph.remove();
    };
    
    morph = <path fill="var(--el)" d={computed!.to} fill-rule="evenodd" clip-rule="evenodd">
      <animate attributeName="d" dur="0.8s" values={computed!.from + ';' + computed!.to} 
        calcMode="spline" keySplines="0.87 0 0.13 1" onendEvent={renderElement} />
    </path>

    setTimeout(() => {
      morph.setAttribute('fill', color)
    }, 600);

    root.append(toColor(morph, color));
  }

  parent.classList.add('rendered');
  parent.replaceChildren(root);
}

function animate(element: SVGPathElement | SVGTextElement, config: AnimationConfig) {
  element.animate(...config);
  return element;
}

function toColor(element: SVGPathElement | SVGTextElement, color: CSSColor) {
  let config = [
    [{ fill: 'var(--el)' }, { fill: color }],
    { delay: 200, duration: 600, easing: 'cubic-bezier(0.87, 0, 0.13, 1)' }
  ] as AnimationConfig;

  return animate(element, config);
}
