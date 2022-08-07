import { createElement, createFragment } from "./jsx";
import { head, dates, fonts, images, stylesheets } from './sources';
import print from './print';

/// class used to preload images during skeleton loader animation by
/// inserting <link rel="preload" as="image" /> tags

enum Asset { stylesheet, image };

class PreloadAsset {
  type: Asset;
  asset: string | URL;
  resolve: any;
  list: Set<string | URL>;
  url: URL;
  id: string;

  constructor(type: Asset, asset: string | URL, list: Set<string | URL>, resolve: any) {
    this.type = type;
    this.asset = asset;
    this.url = asset as URL;
    this.id = asset as string;
    this.list = list;
    this.resolve = resolve;
  }

  onLoad(): void {
    this.list.delete(this.asset);
    if (!this.list.size) this.resolve(),
      print(['💅🏼 Stylesheets', '🖼️ Images'][this.type]);
  }

  render() {
    if (this.type == Asset.image)
      return <link rel="preload" href={images[this.id]} onLoad={() => this.onLoad()} as="image" />;
    if (this.type == Asset.stylesheet)
      return <link rel="stylesheet" href={this.url} onLoad={() => this.onLoad()} />;
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
    const link = new PreloadAsset(Asset.image, id, list, resolve);
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


export const loadStylesheets = new Promise<void>((resolve) => {
  let list = new Set<URL>();
  for (let style of stylesheets) {
    const link = new PreloadAsset(Asset.stylesheet, style, list, resolve);
    list.add(style), document.head.append(link.render());
  };
});
