// this file's mission is building a DOM tree from JS's Objects provided by HTML page

import { SkeletonConfig, SkeletonTree } from '../src/interfaces';
import composite from './composite';
import rg from '../src/general/menu';

// default DOM structure for menu

export default function buildTree(skeleton: SkeletonTree | SkeletonConfig, parent: HTMLElement = document.body) {
  if (skeleton[0]) 
    return composite(parent, skeleton as SkeletonConfig);  

  // if [parent.id] is 'ps' | 'rg', then use <a/> tags.
  let tagName = ['ps', 'rg'].includes(parent.id) ? 'a' : 'div';
  let tree = skeleton as SkeletonTree;

  for (let elementID of Object.keys(tree)) {
    if (elementID == 'config') continue;
    
    let cnt: SkeletonTree = { lf: tree[elementID] };

    if (!(document.getElementById(elementID) && (elementID == 'cnt' || elementID == 'lf'))) {
      var child = document.createElement(tagName);
      child.id = elementID;

      if (document.getElementById(elementID)) {
        parent.replaceChild(child, document.getElementById(elementID)!)
      }
      else parent.append(child)

      cnt.rg = rg;
      composite(child, tree.config as SkeletonConfig, Object.keys(tree).length);
    }

    buildTree(elementID == 'cnt' ? cnt : tree[elementID], document.getElementById(elementID)!);
  }
}
