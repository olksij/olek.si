import { PageContent, RenderElementInterface, TextConfig, Languages, SkeletonCompositeConfig } from "interfaces";
import { createElement } from "./jsx";
import print from './print';
import { byId } from "./shorthands";
import compute from "./worker";
import { content as commonContent } from "/common/page";
import render from './render';

export default async function construct(content: PageContent): Promise<void> {
  let assets = {
    head: [ ...(content.head ?? []), ...(commonContent.head ?? []) ],
    elements:  { ...content.elements,  ...commonContent.elements },
    images: { ...content.images, ...commonContent.images },
    clicks: { ...content.clicks, ...commonContent.clicks },
    links: { ...content.links, ...commonContent.links },
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
  for (let id in assets.clicks) {
    let children = byId(id)!.children;
    for (var i = 0; i < children.length; i++) {
      let childIndex = i;
      if (!children[i].getAttribute("onclick"))
        children[i].addEventListener("click", () => assets.clicks?.[id][childIndex]()),
          children[i].setAttribute("onclick", "return false");
    }
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages ?? 'en';

  // restore everything;
  for (let id in window['elements']) {
    let skeleton = window['elements'][id] as SkeletonCompositeConfig;

    if (assets.images?.[id]) {
      // insert node to an appropriate skeleton element;
      let node = <img src={assets.images?.[id]} alt={id} />;
      byId(id)?.replaceChildren(node);
      // schedule the animation
      let render = (child: string) => byId(child)?.classList.add('rendered');
      setTimeout(render, skeleton.delay * 200, id);
      // skip morphing as we have inserted the image element
      continue;
    }

    let element = assets.elements?.[id] ?? {};

    // iterate over queue    
    let text = element.text ? {
      text: assets.texts?.[id][lang as Languages],
      style: element.text,
    } as TextConfig : undefined;

    let mobile: 0 | 1 = window.innerWidth < 920 ? 0 : (skeleton.config[1] ? 1 : 0)

    if (byId(id)?.hasChildNodes()) continue;

    let config = {
      id,
      height: element.text?.height ?? element.icon?.height!,
      morph: await compute({
        from: { ...element.from, skeleton: skeleton.config[mobile]! },
        to: { text, icon: element.icon },
      }),
      icon: element.icon,
      text,
    } as RenderElementInterface;

    setTimeout(render, skeleton.delay * 200, config);
  }

  document.body.classList.add('rendered');
}
