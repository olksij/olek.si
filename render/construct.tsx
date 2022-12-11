import { PageContent, Languages, SkeletonCompositeConfig, MorphElement } from "interfaces";
import { createElement } from "./jsx";
import print from './print';
import { byId } from "./shorthands";
import compute from "./worker";
import { content as common } from "/common/page";
import render from './render';

export default async function construct(assets: PageContent): Promise<void> {
  window["assets"] = assets;

  Object.keys(common).forEach(key => assets[key] = Array.isArray(common[key]) 
    ? [...common[key], ...(assets[key] ?? [])] 
    : {...common[key], ...(assets[key] ?? {})} );

  await window['skeleton'];
  if (!sessionStorage.getItem('loaded')) {
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

  prepeareRender(true);
}

const urlSearchParams = new URLSearchParams(window.location.search);
const lang = Object.keys(Object.fromEntries(urlSearchParams.entries()))[0] as Languages ?? 'en';

async function prepeareRender(initial: boolean = false) {
  let assets = window["assets"];

  // restore everything;
  for (let id in window['skeletons']) {
    let skeleton = window['skeletons'][id] as SkeletonCompositeConfig,
        config = assets.elements?.[id] ?? {},
        treeEl = byId(id)!;

    // if the element already has content
    //if (treeEl.hasChildNodes()) continue;

    // if the element doesn't require morphing
    if (assets.images?.[id]) {
      // insert node to an appropriate skeleton element;
      let node = <img src={assets.images?.[id]} alt={id} />;
      treeEl?.replaceChildren(node);
      // schedule the animation
      let render = (elem: HTMLElement) => elem.classList.add('rendered', 'renderedImg');
      setTimeout(render, skeleton.delay * 200, treeEl);
      // skip morphing as we have inserted the image element
      continue;
    }

    let fromElement = window['elements'][id];

    window['elements'][id] = {
      icon: config.icon,
      text: config.text ? {
        text: assets.texts?.[id][lang as Languages],
        style: config.text,
      } : undefined
    } as MorphElement;

    //                                            Mobile or desktop
    //                                        ___________|____________
    let skeletonConfig = [...(skeleton.config[innerWidth < 920 ? 0 : 1] ?? skeleton.config[0])];

    skeletonConfig.forEach((_, index) =>
      skeletonConfig[index] ??= [treeEl.clientWidth, treeEl.clientHeight][index]);
    console.log(skeletonConfig)

    setTimeout(render, skeleton.delay * 200, treeEl, {
      ...window['elements'][id],
      height: config.text?.height ?? config.icon?.height ?? 0,
      morph: await compute({
        from: { ...config.from, element: fromElement, skeleton: skeletonConfig },
        to: window['elements'][id],
      }),
    });
  }

  document.body.classList.add('rendered');  
}

addEventListener("resize", () => {
  prepeareRender();
})
