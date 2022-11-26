import { AnimatingOrder, PageContent, RenderElementInterface, TextConfig, Languages, SkeletonBaseConfig } from "interfaces";
import { createElement } from "./jsx";
import print from './print';
import { byId } from "./shorthands";
import compute from "./worker";
import waitFor from "./eventAsync";
import { head } from "/common/page";
import render from './render';

export default async function construct(content: PageContent): Promise<void> {
  await waitFor('skeleton');
  if (!sessionStorage.getItem('loaded')) {
    sessionStorage.setItem('loaded', 'true');
  }

  print("🎨 Render");

  let images: Record<string, string> = {};
  Object.assign(images, content.images, content.vectors);

  document.head.append(...head);

  // stylesheets
  for (var style of content.stylesheets ?? [])
    document.head.append(<link rel="stylesheet" href={style} />)

  // onclick
  for (let id in content.restoreClicks) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++) {
      let childIndex = i;
      if (!children[i].getAttribute("onclick"))
        children[i].addEventListener("click", () => content.restoreClicks?.[id][childIndex]()),
          children[i].setAttribute("onclick", "return false");
    }
  }

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
        text: content.texts?.[child][lang as Languages],
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
          text: content.texts?.[child][lang as Languages]
        } as TextConfig,
      } as RenderElementInterface;

      setTimeout(render, delay += data.delay, config);
    }
  }

  document.body.classList.add('rendered');
}
