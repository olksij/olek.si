window['worker'] = new Worker(new URL('./compute/compute.ts', import.meta.url), { type: 'module' });

export var skeletonResolve, skeleton = new Promise((resolve) => skeletonResolve = resolve);

var anim = [[{ backgroundPosition: '75vw 0, 0 0' }], { duration: 1500, iterations: Infinity }];

document.addEventListener("DOMContentLoaded", async () => {
  // timeout counter
  var cnt = 1;
  // iterate over skeleton loader elements
  ["pf", "tt", "d1", "d2", "ps", "nav", "rg", "ft"].forEach((id) => {
    // HTMLElement
    var element = document.getElementById(id);
    // make it iterable ..
    element = (["ps", "rg", "ft"].includes(id) ? element.children : [element]);
    // .. & iterate
    for (var item of element) {
      // to render mark
      item.classList.add("tr");
      // replace "tr" with "psl" - prepeared skeleton loader
      setTimeout((item) => item.classList.replace("tr", "sl"), cnt, item);
      // we can try to animate it already
      item.animate(...anim);
      // increase wait counter
      cnt += 100 / element.length;
    }
  });
  setTimeout(skeletonResolve, cnt);
});

// list of fonts to download
let fonts = {
  display: new URL('/assets/fonts/displayBold.ttf', import.meta.url),
  text: new URL('/assets/fonts/textMedium.ttf', import.meta.url)
};

// and resolved ones
let fontResult = {};

for (let font in fonts) {
  // create a request
  var request = new XMLHttpRequest();
  request.open('get', fonts[font], true);
  request.responseType = 'arraybuffer';
  // when font is loaded, pass it to document and service worker
  request.onload = function (this) {
    let res = this.response;
    document.fonts.add(new FontFace(font, res));
    fontResult[font] = res;
    // if all fonts are there, postMessage
    if (fontResult.display && fontResult.text)
      worker.postMessage({ deliver: 'fonts', data: fontResult }, fontResult);
  }
  request.send();
}