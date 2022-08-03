import { fetched, data } from './preloader';

// fonts variable is done as a Promise object to allow code run asynchoriously
var fonts = new Promise((resolve) => {
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
  console.log("--- LOAD ---");
  await fetched;
  await fonts;
  console.log(data);

  // render();
});
