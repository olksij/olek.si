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
var source = new Map([
  ["pf", new URL("/assets/profilePicture.jpg?as=webp&width=512", import.meta.url)],
  ["ps1", new URL("/assets/telegram.svg", import.meta.url)],
  ["ps2", new URL("/assets/instagram.svg", import.meta.url)],
  ["ps3", new URL("/assets/github.svg", import.meta.url)],
  ["ps4", new URL("/assets/twitter.svg", import.meta.url)],
  ["ps5", new URL("/assets/email.svg", import.meta.url)],
  ["cr", new URL("/assets/copyright.svg", import.meta.url)],
]);

// a Map with data, text, and loaded blobs
export var data = new Map([
  ["tt", "Oleksii"],
  ["d1", description[0]],
  ["d2", description[1]],
]);

export var fetched = new Promise((resolve) => {
  source.forEach((src, id) => fetch(src).then(async (response) => {
    data.set(id, URL.createObjectURL(await response.blob())), source.delete(id);
    if (!source.size) resolve();
  }));
});