import { createElement, createFragment } from "./jsx";
import { head, dates, fonts, images } from './sources';
import print from './print';

/// class used to preload images during skeleton loader animation by 
/// inserting <link rel="preload" as="image" /> tags
class PreloadImage {
  id: string;
  resolve: any;
  list: Set<string>;

  constructor(id: string, list: Set<string>, resolve: any) {
    this.id = id;
    this.list = list;
    this.resolve = resolve;
  }

  onLoad(): void {
    this.list.delete(this.id);
    if (!this.list.size) this.resolve(), print('🖼️ Images');
  }

  render() {
    return <link rel="preload" href={images[this.id]} onLoad={() => this.onLoad()} as="image" />
  }
}

/// promise mission of which is to insert missing information to document and
/// provide text information to display in preffered language
/// and for preffered date
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

/// promise mission of which is to take a list of all required images
/// to load and use PreloadImage class to load them
export const loadImages = new Promise<void>((resolve) => {
  let list = new Set<string>();
  for (var id in images) {
    const link = new PreloadImage(id, list, resolve);
    list.add(id), document.head.append(link.render());
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