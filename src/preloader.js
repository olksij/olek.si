import { hey } from './content';

// the purpose of this file is to start loading needed resourses ASAP,
// earlier, than content.js file is loaded, which contains parsers,
// renders, and content embedders.


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

// a Map with data, text, and loaded blobs
var data = {
  "tt": "Oleksii",
  "d1": description[0],
  "d2": description[1],
};

var fetched = new Promise((resolve) => {
  for (var id in source) {
    var item = document.createElement("link");
    item.rel = "preload", item.href = source[id], item.as = "image";
    document.head.append(item), delete source.id;
    /*fetch(source[id]).then(async (response) => {
      data[id] = URL.createObjectURL(await response.blob()), delete source.id;
      if (!source.size) resolve();
    })*/
  };
});

export function hhh() {
  hey();
}