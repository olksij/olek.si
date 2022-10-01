import { Font } from 'opentype.js'
import { FontStyle } from './classes';

// `DeliverType`s used for communication with WebWorker
export type DeliverType = 'fonts' | 'texts';

//                                         📩 Input data   📤 Output data
//                                               |                |
// types for each DeliveryType             -------------   ----------------
export type TextsRecord = Record<string,   InputTextData | ComputedTextData >;
export type FontsRecord = Record<FontType, ArrayBuffer   | Font >;

export type RenderType = 'img' | 'text' | 'both';
export type FontType = 'display' | 'text';
export type PreloadAssetType = 'stylesheet' | 'image';

export type Languages = 'en' | 'sv' | 'uk'
export type SourceTextData = Record<Languages, Record<string, string>>;

export type FontStyleType =
  'title' |
  'subtitle' |
  'menuSelected' |
  'menu' |
  'action' |
  'footer';

// interface used for communicating with WebWorker
export interface ComputeAPI {
  deliver: DeliverType,
  data: FontsRecord | TextsRecord,
}

export interface FontStyleConfig {
  // display or text font, defaults to text
  type?: FontType,
  // yep, size of the font
  fontSize: number;
  // yep, height of the line
  lineHeight: number;
  // yep, distance between letters
  letterSpacing?: number;
  // and yep, text color as css value
  color?: `var(${string})`;
}

// used to define text style for each node
export interface TextStyle {
  // used by webworker to vectorize text
  font: FontStyle;
  // parent's box size
  width: number;
  // predefined path
  fromPath?: string;
  // wrap's text by width. otherwise sends back new width
  wrap?: boolean;
}

export interface ComputedTextData {
  from: string;
  to: string;
  baseline: number;
}

export interface InputTextData {
  source: string;
  style: TextStyle;
}

export interface RenderConfig {
  type?: RenderType;
  alt?: string;
  delay: number;
  children?: boolean;
}
