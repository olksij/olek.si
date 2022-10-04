// this file's mission is building a DOM tree from JS's Objects provided by HTML page

import fontLoader from './fontLoader';
import skeletonLoader from './skeletonLoader';

// default DOM structure for menu
const rg = { home: {}, about: {}, projects: {}, work: {} }

export default function buildTree(dom: any, parent: HTMLElement = document.body) {
  let tagName = ['ps', 'rg'].includes(parent.id) ? 'a' : 'div';

  for (let elementID of Object.keys(dom)) {
    var child = document.createElement(tagName);
    child.id = elementID, parent.append(child);
    
    buildTree(elementID == 'rg' ? rg : dom[elementID], child);
  }

  // after finished reconstruction of the DOM, call further
  if (parent == document.body) skeletonLoader(), fontLoader();
}
