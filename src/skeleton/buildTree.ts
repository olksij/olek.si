// this file's mission is building a DOM tree from JS's Objects provided by HTML page

import { SkeletonConfig, SkeletonTree } from '../interfaces';
import fontLoader from './fontLoader';
import skeletonLoader from './skeletonLoader';

// default DOM structure for menu
const rg: SkeletonTree = { config: [[128, 24, 6]], home: {}, about: {}, projects: {}, work: {} }

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
    applyConfig(child, tree.config as SkeletonConfig);
    
    buildTree(elementID == 'rg' ? rg : tree[elementID] as SkeletonTree, child);
  }

  // after finished reconstruction of the DOM, call further
  if (parent == document.body) skeletonLoader(), fontLoader();
}

function applyConfig(element: HTMLElement, config: SkeletonConfig) {
  if (!config) return;

  let style = element.style;
  let mobile: 0 | 1 = window.innerWidth < 920 ? 0 : (config[1] ? 1 : 0)

  style.width =        config[mobile]![0] + 'px';
  style.height =       config[mobile]![1] + 'px';
  style.borderRadius = config[mobile]![2] + 'px';
}
