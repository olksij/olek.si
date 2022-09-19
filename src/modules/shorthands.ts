/** Shorthand for getting an `HTMLElement` */
export function byId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/** Retreive child by tag */
export function tagById(id: string, tag: string): Element | undefined {
  return byId(id)?.getElementsByTagName(tag)[0];
}
