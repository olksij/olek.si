// @ts-nocheck
import { createElement, createFragment } from "./jsx";

/** @jsx createElement */
/** @jsxFrag createFragment */


// in case there is a speacial date
var date = new Date();
switch ([date.getMonth(), date.getDate()]) {
  case [5, 12]:
    var description = ["🎂 It's my birthday today!", "June 12"];
    break;
  // more dates to come soon
  default:
    var description = ["Redefining the way humans interact", "with computers."];
    break;
}

// content links to load
var source = {
  "pf": new URL("/assets/profilePicture.jpg?as=webp&width=512", import.meta.url),
  "ps1": new URL("/assets/telegram.svg", import.meta.url),
  "ps2": new URL("/assets/instagram.svg", import.meta.url),
  "ps3": new URL("/assets/github.svg", import.meta.url),
  "ps4": new URL("/assets/twitter.svg", import.meta.url),
  "ps5": new URL("/assets/email.svg", import.meta.url),
  "cr": new URL("/assets/copyright.svg", import.meta.url),
};

var fetched = new Promise<void>((resolve) => {
  let tr = (id) => (Object.keys(source).length - 1) ? delete source[id] : resolve();
  for (var id in source) {
    document.head.append(<link rel="preload" id={id} href={source[id]} onLoad={() => console.log(this.id)} as="image" />);
  };
});

// fonts variable is done as a Promise object to allow code run asynchoriously
var fonts = new Promise<void>((resolve) => {
  var fontCount = 0;

  for (let [font, url] of new Map([
    ['Google Sans Display', `url(${new URL('/assets/fonts/GoogleSansDisplay-Bold.woff2', import.meta.url)})`],
    ['Google Sans Text', `url(${new URL('/assets/fonts/GoogleSansText-Medium.woff2', import.meta.url)})`]
  ])) new FontFace(font, url)
    .load().then((fontface) => {
      document.fonts.add(fontface);
      if (++fontCount == 2) resolve(), console.log("--- FONTS ---");
    });
});

window.addEventListener('load', async () => {
  console.log("load");
  //console.log(data);
  await fonts;
  // render();
});