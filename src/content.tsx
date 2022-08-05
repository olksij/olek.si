import { createElement, createFragment } from "./jsx";

function print(message?: any): void {
  let date = new Date();
  let time = `[${date.toLocaleTimeString('sv-SE')}.${date.getMilliseconds()}]`;
  console.log('%c' + message + ' %c' + time, 'font-weight: bold; padding:4px', 'color: #AAA');
}

// dates with custom description
const customDates = {
  "5-12": ["🎂 It's my birthday today!", "June 12"],
  // more dates to come such as celebrations and holidays
};

// font links to load
const fonts = {
  'Google Sans Display': new URL('/assets/fonts/GoogleSansDisplay-Bold.woff2', import.meta.url),
  'Google Sans Text': new URL('/assets/fonts/GoogleSansText-Medium.woff2', import.meta.url),
};

// image links to load
const images = {
  "pf": new URL("/assets/profilePicture.jpg?as=webp&width=512", import.meta.url),
  "ps1": new URL("/assets/telegram.svg", import.meta.url),
  "ps2": new URL("/assets/instagram.svg", import.meta.url),
  "ps3": new URL("/assets/github.svg", import.meta.url),
  "ps4": new URL("/assets/twitter.svg", import.meta.url),
  "ps5": new URL("/assets/email.svg", import.meta.url),
  "cr": new URL("/assets/copyright.svg", import.meta.url),
};

let internals = {};

var loadInternals = new Promise<void>((resolve) => {
  // load date
  const date = new Date();
  internals['description'] = customDates[date.getMonth() + '-' + date.getDate()] ??
    ["Redefining the way humans interact", "with computers."];
  // more things to come soon;
  resolve();
});

class PreloadImage {
  id: string;
  resolve: any;

  constructor(id: string, resolve: any) {
    this.id = id;
    this.resolve = resolve;
  }

  onLoad(): void {
    delete images[this.id];
    if (!Object.keys(images).length) this.resolve(), print('🖼️ Images');
  }

  render() {
    //@ts-ignore
    return <link rel="preload" href={images[this.id]}
      onLoad={() => this.onLoad()} as="image" />
  }
}

var loadImages = new Promise<void>((resolve) => {
  for (var id in images) {
    var link = new PreloadImage(id, resolve);
    document.head.append(link.render());
  };
});

// fonts variable is done as a Promise object to allow code run asynchoriously
var loadFonts = new Promise<void>((resolve) => {
  for (let font in fonts) new FontFace(font, `url(${fonts[font]})`)
    .load().then((fontface) => {
      document.fonts.add(fontface), delete fonts[font];
      if (!Object.keys(fonts).length) resolve(), print('⌨️ Fonts');
    });
});

window.addEventListener('load', async () => {
  print("🔥 Load Event");
  await loadInternals;
  await loadFonts;
  await loadImages;
  print("🎨 Ready for render");
  // render();
});