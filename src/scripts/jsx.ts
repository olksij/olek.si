// this file helps to handle xml in jsx files
// and is based on a tutorial by [https://github.com/kartiknair]

// elements that require SVG namespace
let vectorElements = ['svg', 'path', 'animate', 'text', 'foreignObject'];

export let toRender: (HTMLElement | SVGElement)[]

export const createElement = (tag: string | Function, props: Record<string, any>, ...children: any): Element => {
  if (typeof tag === 'function') return tag(props, ...children);

  // element that will be embedded
  let element = vectorElements.includes(tag)
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);

  // add all props to element
  for (let name in props) {
    let value = props[name];
    
    if (['delay', 'tr'].includes(name))
      element.classList.add('torender');

    // if prop starts with 'on', (ex. onload), use eventListener
    if (!name.startsWith('on')) element.setAttribute(name, value?.toString());
    else element.addEventListener(name.slice(2), () => value(element));
  }

  // recursively add children
  children.forEach((child: string | Element | (string | Element)[]) => appendChild(element, child));

  return element;
};

const appendChild = (parent: Element, children0: Array<Element | string> | Element | string) => {
  for (let child of Array.isArray(children0) ? children0 : [children0])
    parent.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
};

export const createFragment = (_: any, ...children: any[]) => children;

declare global {namespace JSX {
  interface IntrinsicElements {[elemName: string]: any;}
}}