// this file's mission is building a DOM tree from JS's Objects provided by HTML page

import { SkeletonConfig, SkeletonTree } from 'interfaces';
import composite from './composite';
import rg from '/common/dom';

// default DOM structure for menu

export default function buildTree(skeleton: SkeletonTree | SkeletonConfig, parent?: HTMLElement): void | Promise<void> {
  if (!parent) {
    parent = document.body;
    window['elements'] = [];
  }

  if (skeleton[0]) 
    return composite(parent, skeleton as SkeletonConfig);
    
  Array.from(parent.children).forEach(child =>
    !['cnt', 'lf', 'rg'].includes(child.id) ? child.remove() : 0);

  // if [parent.id] is 'ps' | 'rg', then use <a/> tags.
  let tagName = ['ps', 'rg'].includes(parent.id) ? 'a' : 'div';
  let tree = skeleton as SkeletonTree;

  for (let elementID of Object.keys(tree)) {
    if (elementID == 'config') continue;
    
    let cnt: SkeletonTree = { lf: tree[elementID] };

    if (!(document.getElementById(elementID) && (elementID == 'cnt' || elementID == 'lf'))) {
      var child = document.createElement(tagName);
      child.id = elementID, cnt.rg = rg;

      parent.append(child)
      composite(child, tree.config as SkeletonConfig, Object.keys(tree).length);
    }

    buildTree(elementID == 'cnt' ? cnt : tree[elementID], document.getElementById(elementID)!);
  }
}
