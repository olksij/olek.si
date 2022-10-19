import { Font } from 'opentype.js'
import { FontStyle } from './classes';

// `DeliverType`s used for communication with WebWorker
export type DeliverType = 'fonts' | 'texts';

export type Dir = 'input' | 'result';

// types for each       🔛 Direction                                         📩 Input data   📤 Output data
// DeliveryType               |                                                     |                |
//                     ---------------                                        -------------   ----------------
export type TextsRecord<D extends Dir> = Record<string,   D extends 'input' ? InputTextData : ComputedTextData>;
export type FontsRecord<D extends Dir> = Record<FontType, D extends 'input' ? ArrayBuffer : Font >;

export type RenderType = 'img' | 'text' | 'both';
export type FontType = 'display' | 'text';
export type PreloadAssetType = 'stylesheet' | 'image';

export type Languages = 'en' | 'sv' | 'uk'
export type SourceTextData = Record<Languages, Record<string, string>>;

export type FontStyleType =
  'title'        |
  'subtitle'     |
  'menuSelected' |
  'menu'         |
  'action'       |
  'footer';

// interface used for communicating with WebWorker
export interface ComputeAPI<D extends Dir> {
  deliver?: DeliverType,
  request: string, // request ID
  data: FontsRecord<D> | TextsRecord<D>,
}

type CSSColorTypes = 'text' | 'secondary' | 'accent';

export type CSSColors = `var(--${CSSColorTypes})`;

export type AnimationConfig = [Keyframe[], KeyframeAnimationOptions];

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
  color?: CSSColors;
}

// used to define text style for each node
export interface TextStyle {
  // used by webworker to vectorize text
  style: FontStyleType;
  // parent's box size
  width: number;
  // predefined path
  fromPath?: string;
  icon?: string;
  gap?: number;
  // wrap's text by width. otherwise sends back new width
  wrap?: boolean;
}

export interface ComputedTextData {
  from: string;
  to: string;
  baseline: number;
  // TODO: WIDTH FROM COMPUTE WORKER
}

export interface RenderElementConfig {
  id: string;
  morph?: ComputedTextData;
  icon?: IconConfig;
  text?: TextConfig;
  height: number;
  color: CSSColors;
}

export interface TextConfig {
  text: string;
  style: FontStyleType;
}

export interface IconConfig {
  path: string;
  gap: number;
}

export interface InputTextData {
  from: FromMorphElement;
  to: MorphElement;
  style: FontStyleType;
}

export interface MorphElement {
  text: string;
  icon?: string;
  gap?: number; 
}

export interface FromMorphElement {
  width: number;
  element?: MorphElement;
  path?: string;
}

export interface InputTextData {
  style: FontStyleType;
  icon?: string;
  gap?: number
}

export interface RenderConfig {
  type?: RenderType;
  alt?: string;
  delay: number;
  children?: boolean;
}

export interface PageContent {
  head: HTMLElement[],
  languages: Record<Languages, string>,
  textStyleData: Record<string, TextStyle>;
  texts: SourceTextData;
  images: Record<string, string>;
  vectors: Record<string, string>;
  stylesheets: string[];  
  restoreLinks: Record<string, Array<string>>;  
  restoreClicks: Record<string, Array<Function>>;  
  animatingOrder: Record<string, RenderConfig>;  
  fontStyles: Record<FontStyleType, FontStyle>;
}
