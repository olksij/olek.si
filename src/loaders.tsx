import { createElement, createFragment } from "./jsx";
import { head, dates, fonts, images, stylesheets } from './sources';
import print from './print';
import { computeWorker } from "./render";
import { PreloadAssetType } from "./interfaces";

/// class used to preload images during skeleton loader animation by
/// inserting <link rel="preload" as="image" /> tags
class PreloadAsset {
  type: PreloadAssetType;
  asset: string | URL;
  resolve: any;
  list: Set<string | URL>;
  url: URL;
  id: string;

  constructor(type: PreloadAssetType, asset: string | URL, list: Set<string | URL>, resolve: any) {
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
      print(this.type == 'stylesheet' ? '💅🏼 Stylesheets' : '🖼️ Images');
  }

  render() {
    if (this.type == 'image')
      return <link rel="preload" href={images[this.id]} onload={() => this.onLoad()} as="image" />;
    if (this.type == 'stylesheet')
      return <link rel="stylesheet" href={this.url} onload={() => this.onLoad()} />;
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
    const link = new PreloadAsset('image', id, list, resolve);
    list.add(id), document.head.append(link.render());
  };
});

// fonts variable is done as a Promise object to allow code run asynchoriously
export const loadFonts = new Promise<void>((resolve) => {
  let list = new Set<string>();
  let fontResult: Record<string, ArrayBuffer> = {};

  for (let font in fonts) {
    var request = new XMLHttpRequest();
    request.open('get', fonts[font], true);
    request.responseType = 'arraybuffer';
    request.onload = function (this) {
      let fontFace = new FontFace(font, this.response);
      document.fonts.add(fontFace), list.delete(font);
      fontResult[font] = this.response;

      if (!list.size) {
        resolve(), print('⌨️ Fonts');
        computeWorker.postMessage({ deliver: 'fonts', data: fontResult }, fontResult);
      }
    }
    request.send(), list.add(font);
  }
});

export const loadStylesheets = new Promise<void>((resolve) => {
  let list = new Set<URL>();
  for (let style of stylesheets) {
    const link = new PreloadAsset('stylesheet', style, list, resolve);
    list.add(style), document.head.append(link.render());
  };
});
