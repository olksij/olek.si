import { SkeletonCompositeConfig, SkeletonConfig, StaticSize, RuntimeElementConfig, StaticElementConfig } from "/interfaces";
import render from "./render";
import compute from "./worker";
import buildTree from "/skeleton/buildTree";

window["toresize"] ??= new Set()

export interface AssembleInterface { id: string, to: StaticElementConfig, initial?: boolean }

export default async function runtimize({ id, to, initial }: AssembleInterface) {
  let { config: skeletonExtended, delay } = window['skeletons'][id] as SkeletonCompositeConfig,
    treeEl = document.getElementById(id)!;
  
  //                                           Mobile or desktop
  //                                       ___________|____________
  let skeleton = [...(skeletonExtended[innerWidth < 920 ? 0 : 1] ?? skeletonExtended[0])] as SkeletonConfig<StaticSize>;

  // if the static element has dynamic properties -> add to resize queue
  skeleton.includes(null) ? window["toresize"].add(id) : 0;

  // add runtime-calculated values
  skeleton.forEach((_, index) =>
    skeleton[index] ??= [treeEl.clientWidth, treeEl.clientHeight][index]);

  // define from/to elements
  let fromElement = window['elements'][id] as RuntimeElementConfig | null;
  let toElement = { text: to, icon: to.icon, skeleton: skeleton } as RuntimeElementConfig;

  // update element config in virtual tree
  window['elements'][id] = toElement;

  setTimeout(render, initial ? delay * 200 : 0, 
    treeEl, await compute({ from: fromElement, to: toElement }));
}

// update dynamic elements when resized
addEventListener("resize", () => {
  // rebuild tree in case desktop/mobile width changed
  buildTree(window["assets"].skeleton, document.body, false);

  // for each dynamic element => runtimize
  window["toresize"].forEach((id: string) => 
    runtimize({ id, to: window["assets"].elements[id], initial: false }))
})
