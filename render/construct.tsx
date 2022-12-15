import { PageContent, SkeletonCompositeConfig } from "interfaces";
import { createElement } from "./jsx";

import print from '../common/scripts/print';
import { content as common } from "/common/page";
import runtimize from "./runtimize";

export default async function construct(assets: PageContent): Promise<void> {
  window["assets"] = assets;

  Object.keys(common).forEach(key => assets[key] = Array.isArray(common[key]) 
    ? [...common[key], ...(assets[key] ?? [])] 
    : {...common[key], ...(assets[key] ?? {})} );
  
  document.head.append(...assets.head!);

  await window['skeleton'];

  print("🏗️ Constructing the page");

  // remove old stylesheets
  Array.from(document.head.children).forEach((element: any) =>
    element.tagName == 'STYLE' ? element.remove() : 0);

  // appennd new stylesheets
  for (var style of assets.stylesheets ?? [])
    document.head.append(<style>{style}</style>)

  // onclick
  for (let id in assets.clicks) {
    let children = document.getElementById(id)!.children;
    for (var i = 0; i < children.length; i++) {
      let childIndex = i;
      if (!children[i].getAttribute("onclick"))
        children[i].addEventListener("click", () => assets.clicks?.[id][childIndex]()),
          children[i].setAttribute("onclick", "return false");
    }
  }

  // restore everything;
  for (let id in window['skeletons']) {
    let skeleton = window['skeletons'][id] as SkeletonCompositeConfig,
        treeEl = document.getElementById(id)!;

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

    runtimize({ id, to: assets.elements![id] });
  }

  document.body.classList.add('rendered');  
}
