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

export default function render(): void {
  // restore id's for shortened components
  for (let id in giveIds) {
    let children = document.getElementById(id)?.children!;
    for (var i = 0; i < children.length; i++)
      children[i].id = giveIds[id][i];
  }

  // restore images
  for (let id in imageAlts)
    document.getElementById(id)?.append(<img src={images[imageAlts[id]]} alt={imageAlts[id]} />);
}