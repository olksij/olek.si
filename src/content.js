var description = ["Redefining the way humans interact", "with computers."];

if (new Date().getMonth() == 5 && new Date().getDate() == 12)
  description = ["🎂 It's my birthday today!", "June 12"];

var source = new Map([
  ["pf", new URL("/assets/profilePicture.jpg?as=webp&width=512", import.meta.url)],
  ["ps1", new URL("/assets/telegram.svg", import.meta.url)],
  ["ps2", new URL("/assets/instagram.svg", import.meta.url)],
  ["ps3", new URL("/assets/github.svg", import.meta.url)],
  ["ps4", new URL("/assets/twitter.svg", import.meta.url)],
  ["ps5", new URL("/assets/email.svg", import.meta.url)],
  ["cr", new URL("/assets/copyright.svg", import.meta.url)],
]);

var data = new Map([
  ["tt", "Oleksii"],
  ["d1", description[0]],
  ["d2", description[1]],
]);


// fonts variable is done as a Promise object to allow code run asynchoriously
var fonts = new Promise((resolve) => {
  var fontCount = 0;

  for (let [font, url] of new Map([
    ['Google Sans Display', new URL('/assets/fonts/GoogleSansDisplay-Bold.woff2', import.meta.url)],
    ['Google Sans Text', new URL('/assets/fonts/GoogleSansText-Medium.woff2', import.meta.url)]
  ])) new FontFace(font, url)
    .load().then((fontface) => {
      document.fonts.add(fontface);
      if (++fontCount == 2) resolve(), console.log("--- FONTS ---");
    });
});

var fetched = new Promise((resolve) => {
  source.forEach((src, id) => fetch(src).then(async (response) => {
    var blob = await response.blob();
    data.set(id, URL.createObjectURL(blob));
    if (data.size == 7) resolve(), console.log("--- FETCHED ---");
  }));
});

window.addEventListener('load', async () => {
  console.log("--- LOAD ---");
  await fetched;
  await fonts;
  console.log(fetches);

  render();
});
