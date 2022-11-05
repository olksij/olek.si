// this file's mission is building a DOM tree from JS's Objects provided by HTML page

import { SkeletonConfig, SkeletonTree } from '../interfaces';
import fontLoader from './fontLoader';
import skeletonLoader from './skeletonLoader';

// default DOM structure for menu
export const rg: SkeletonTree = { config: [[128, 24, 6]], home: {}, about: {}, projects: {}, work: {} }

export default function buildTree(skeleton: SkeletonTree | SkeletonConfig, parent: HTMLElement = document.body) {

  if (skeleton[0]) 
    return applyConfig(parent, skeleton as SkeletonConfig);  

  // if [parent.id] is 'ps' | 'rg', then use <a/> tags.
  let tagName = ['ps', 'rg'].includes(parent.id) ? 'a' : 'div';
  let tree = skeleton as SkeletonTree;

  for (let elementID of Object.keys(tree)) {
    if (elementID == 'config') continue;

    var child = document.createElement(tagName);
    child.id = elementID, parent.append(child);
    
    applyConfig(child, tree.config as SkeletonConfig, Object.keys(tree).length);
    buildTree(elementID == 'rg' ? rg : tree[elementID] as SkeletonTree, child);
  }

  // after finished reconstruction of the DOM, call further
  if (parent == document.body) fontLoader();
}

let skeletonCounter = 0;

var skeletonResolve;
window['skeleton'] = new Promise((resolve) => skeletonResolve = resolve);
window['worker'] = new Worker(new URL('../compute/compute.ts', import.meta.url), { type: 'module' });
setTimeout(skeletonResolve, 1500);


const skeletonKeyframes: [Keyframe[], Object] = [
  [{ backgroundPositionX: '75vw, 0' }], 
  { duration: 1500, iterations: Infinity }
];

//                                                                  Element count if it's a group
// Apply [SkeletonConfig] which preserves                          and should be animated together      
// size & borderRadius to skeleton element                               ________|________
async function applyConfig(element: HTMLElement, config: SkeletonConfig, count: number = 1) {
  if (!config) return;
  window['current'] ??= [];

  // wait till current frame is painted to make sure CSS is applied
  // in order to make the skeleton animation smooth
  await new Promise(resolve => requestAnimationFrame(resolve));
  window['current'][element.id] = config;
  element.classList.add('tr'); // to render mark

  setTimeout(function () {
    let style = element.style;
    let mobile: 0 | 1 = window.innerWidth < 920 ? 0 : (config[1] ? 1 : 0)
  
    style.width =        config[mobile]![0] + 'px';
    style.height =       config[mobile]![1] + 'px';
    style.borderRadius = config[mobile]![2] + 'px';  

    // to render -> skeleton && animate
    element.classList.replace('tr', 'sl');
    element.animate(...skeletonKeyframes);

  }, skeletonCounter += 100 / count)
}
