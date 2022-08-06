import { createElement, createFragment } from "./jsx";
import { head, dates, fonts, images } from './sources';
import { print } from './print';

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
    return <link rel="preload" href={images[this.id]}
      onLoad={() => this.onLoad()
      } as="image" />
  }
}

export const loadInternals = new Promise<Object>((resolve) => {
  let data = {};

  // insert required tags back
  document.head.append(...head);

  // load date
  const date = new Date();
  data['description'] = dates[date.getMonth() + '-' + date.getDate()] ??
    ["Redefining the way humans interact", "with computers."];
  // more things to come soon;
  resolve(data);
});

export const loadImages = new Promise<void>((resolve) => {
  for (var id in images) {
    var link = new PreloadImage(id, resolve);
    document.head.append(link.render());
  };
});

// fonts variable is done as a Promise object to allow code run asynchoriously
export const loadFonts = new Promise<void>((resolve) => {
  for (let font in fonts) new FontFace(font, `url(${fonts[font]})`)
    .load().then((fontface) => {
      document.fonts.add(fontface), delete fonts[font];
      if (!Object.keys(fonts).length) resolve(), print('⌨️ Fonts');
    });
});