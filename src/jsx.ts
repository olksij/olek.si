let vectorElements = ["svg", "path", "animate"];

export const createElement = (tag: any, props: Object, ...children: any) => {
  if (typeof tag === "function") return tag(props, ...children);

  let element = vectorElements.includes(tag)
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);

  if (vectorElements.includes(tag)) element.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith("on"))
      element.addEventListener(name.substr(2), () => value(element));
    else element.setAttribute(name, value?.toString());
  });

  children.forEach(child => appendChild(element, child));

  return element;
};

const appendChild = (parent: { appendChild: (arg0: any) => void; }, child: any) => {
  if (Array.isArray(child))
    child.forEach(nestedChild => appendChild(parent, nestedChild));
  else
    parent.appendChild(child.nodeType ? child : document.createTextNode(child));
};

export const createFragment = (_: any, ...children: any[]) => {
  return children;
};
