// this file's mission is building a DOM tree from JS's Objects provided by HTML page

import { SkeletonExtendedConfig, SkeletonTree } from 'interfaces';

import composite, { resetCounter } from './composite';
import { initResolver } from './resolve';

import rg from '/common/dom';

// default DOM structure for menu

export default function buildTree(skeleton: SkeletonTree | SkeletonExtendedConfig, parent: HTMLElement = document.body, insert: boolean = true): void | Promise<void> {
  // initialie skeleton resolver 
  parent == document.body && insert ? (initResolver(), resetCounter()) : 0;

  if (skeleton[0]) 
    return composite(parent, skeleton as SkeletonExtendedConfig, 1, insert);
    
  Array.from(parent.children).forEach(child =>
    insert && !['cnt', 'lf', 'rg', 'nav'].includes(child.id) ? child.remove() : 0);

  // if [parent.id] is 'ps' | 'rg', then use <a/> tags.
  let tagName = ['ps', 'rg'].includes(parent.id) ? 'a' : 'div';
  let tree = skeleton as SkeletonTree;

  for (let elementID of Object.keys(tree)) {
    if (elementID == 'config') continue;
    
    let cnt: SkeletonTree = { lf: tree[elementID] };

    if (!(document.getElementById(elementID) && (elementID == 'cnt' || elementID == 'lf'))) {
      var child = document.createElement(tagName);
      child.id = elementID, cnt.rg = rg;

      insert ? parent.append(child) : 0;
    }
    
    composite(document.getElementById(elementID)!, tree.config as SkeletonExtendedConfig, Object.keys(tree).length, insert);
    buildTree(elementID == 'cnt' ? cnt : tree[elementID], document.getElementById(elementID)!, insert);
  }
}
