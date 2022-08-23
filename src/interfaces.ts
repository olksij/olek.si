import { Font } from 'opentype.js'

// `DeliverType`s used for communication with WebWorker
export type DeliverType = 'fonts' | 'texts';

// types for each `DeliveryType`
export type FontsRecord = { [Type in FontType]?: Font | ArrayBuffer };
export type TextsRecord = Record<string, TextData | RenderTextData>;

export type RenderType = 'img' | 'text' | 'both';
export type FontType = 'display' | 'text';
export type PreloadAssetType = 'stylesheet' | 'image';

// interface used for communicating with WebWorker
export interface ComputeAPI {
  deliver: DeliverType,
  data: FontsRecord | TextsRecord,
}

export interface FontStyle {
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
export interface TextData {
  // text itself
  text: string
  // used by webworker to vectorize text
  font: FontStyle;
  // parent's box size
  width: number;
  // predefined path
  fromPath?: string;
  // wrap's text by width. otherwise sends back new width
  wrap?: boolean;
}

export interface RenderTextData {
  from: string;
  to: string;
  // lines: number;
  // width: number1
}

export interface RenderData {
  type?: RenderType;
  alt?: string;
  delay: number;
  children?: boolean;
}
