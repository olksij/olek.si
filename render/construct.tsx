import { AnimatingOrder, PageContent, RenderElementInterface, TextConfig, Languages, SkeletonBaseConfig } from "interfaces";
import { createElement } from "./jsx";
import print from './print';
import { byId } from "./shorthands";
import compute from "./worker";
import { content as commonContent } from "/common/page";
import render from './render';

export default async function construct(content: PageContent): Promise<void> {
  let assets = {
    head: [ ...(content.head ?? []), ...(commonContent.head ?? []) ],
    animatingOrder: { ...content.animatingOrder, ...commonContent.animatingOrder },
    elementConfig:  { ...content.elementConfig,  ...commonContent.elementConfig },
    images: { ...content.images, ...commonContent.images },
    restoreClicks: { ...content.restoreClicks, ...commonContent.restoreClicks },
    restoreLinks: { ...content.restoreLinks, ...commonContent.restoreLinks },
    stylesheets: [ ...content.stylesheets, ...commonContent.stylesheets ],
    texts: { ...content.texts, ...commonContent.texts },
  } as PageContent;

  if (!sessionStorage.getItem('loaded')) {
    await window['skeleton'];
    sessionStorage.setItem('loaded', 'true');
  }

  print("🎨 Render");

  document.head.append(...assets.head!);

  // remove old stylesheets
  Array.from(document.head.children).forEach((element: any) =>
    element.tagName == 'STYLE' ? element.remove() : 0);

  // appennd new stylesheets
  for (var style of assets.stylesheets ?? [])
    document.head.append(<style>{style}</style>)

  // onclick
  for (let id in assets.restoreClicks) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++) {
      let childIndex = i;
      if (!children[i].getAttribute("onclick"))
        children[i].addEventListener("click", () => assets.restoreClicks?.[id][childIndex]()),
          children[i].setAttribute("onclick", "return false");
    }
  }

  let delay: number = 0;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages ?? 'en';

  // restore everything;
  for (let item in assets.animatingOrder) {
    let data: AnimatingOrder = assets.animatingOrder[item];
    let queue: Array<string> = [item];

    // if it's about animation children, put children into a queue
    if (data.children) queue = [...byId(item)!.children]
      .map(child => child.id); 

    if (data.image) {
      for (let child of queue) {
        // insert node to an appropriate skeleton element;
        let node = <img src={assets.images?.[child]} alt={item} />;
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
      let element = assets.elementConfig?.[child]!;
        
      let text = element.text ? {
        text: assets.texts?.[child][lang as Languages],
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
          text: assets.texts?.[child][lang as Languages]
        } as TextConfig,
      } as RenderElementInterface;

      setTimeout(render, delay += data.delay, config);
    }
  }

  document.body.classList.add('rendered');
}
