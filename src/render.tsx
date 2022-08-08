import { createElement, createFragment } from "./jsx";
import { images } from "./sources";

export const giveIds = {
  "ps": ["tg", "ig", "gh", "tw", "mt"],
  "rg": ["nav-home", "nav-about", "nav-projects", "nav-work"],
  "ft": ["cr", "lg"]
}

export const imageAlts = {
  "pf": "profilePicture",
  "tg": "telegram",
  "ig": "instagram",
  "gh": "github",
  "tw": "twitter",
  "mt": "email",
  "cr": "copyright",
}

export default async function render(): Promise<void> {
  await window["skeleton"];

  // restore id's for shortened components
  for (let id in giveIds) {
    let children = document.getElementById(id)?.children!;
    for (var i = 0; i < children.length; i++)
      children[i].id = giveIds[id][i];
  }

  // restore images
  var counter = 0;
  for (let id in imageAlts) {
    let node: HTMLElement = <img src={images[imageAlts[id]]} alt={imageAlts[id]} />;
    document.getElementById(id)?.append(node);
    setTimeout(() => node.classList.add('rendered'), counter), counter += 75;
  }
}
