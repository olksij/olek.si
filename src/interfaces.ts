import { Font } from 'opentype.js'

// `DeliverType`s used for communication with WebWorker
export type DeliverType = 'fonts' | 'texts';

export type Dir = 'input' | 'result';

// types for each         🔛 Direction                                         📩 Input data   📤 Output data
// DeliveryType          ______ ↓ ______                                        _____ ↓ _____   ______ ↓ _______
export type ComputeRecord<D extends Dir> = Record<string,   D extends 'input' ? InputTextData : ComputedTextData>;
export type FontsRecord  <D extends Dir> = Record<FontType, D extends 'input' ? ArrayBuffer   : Font>;

export type RenderType = 'img' | 'morph';
export type FontType = 'display' | 'text';
export type PreloadAssetType = 'stylesheet' | 'image';

export type Languages = 'en' | 'sv' | 'uk'
export type SourceTextData = Record<Languages, Record<string, string>>;

export type CSSColor = `var(--${'text' | 'secondary' | 'accent'})`;

export type AnimationConfig = [Keyframe[], KeyframeAnimationOptions];

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
  data: FontsRecord<D> | ComputeRecord<D>,
}

// used to define each element to be rendered
export interface ElementConfig {
  from?: FromMorphElement;
  element: MorphElement;

  height: number;
  color: CSSColor;
}

// interface used to communicate with the render module
export interface RenderElementConfig {
  id: string;
  morph?: ComputedTextData;
  icon?: IconConfig;
  text?: TextConfig;
  height: number;
  color: CSSColor;
}

// input used by compute worker
export interface InputTextData {
  from: FromMorphElement;
  to: MorphElement;
}

// response sent by compute worker
export interface ComputedTextData {
  from: string;
  to: string;
  // calculated width of the element
  width: number;
  baseline?: number;
}
 
export interface MorphElement {
  text?: TextConfig;
  icon?: IconConfig;
}

export interface TextConfig {
  text: string;
  style: FontStyleType;
}

export interface IconConfig {
  path: string;
  gap: number;
}

export interface FromMorphElement {
  element?: MorphElement;
  width?: number;
  path?: string;
}

export interface AnimatingOrder {
  image?: boolean;
  alt?: string;
  delay: number;
  children?: boolean;
}

export interface FontStyle {
  // display or text font, defaults to text
  type?: FontType,
  // yep, size of the font
  fontSize: number;
  // yep, distance between letters
  letterSpacing?: number;
}

export interface PageContent {
  // ↓ general data, to be refactored ↓ // 
  head: HTMLElement[],
  languages: Record<Languages, string>,
  // ↑ general data, to be refactored ↑ // 
  elementConfig: Record<string, ElementConfig>;
  texts: SourceTextData;
  images: Record<string, string>;
  vectors: Record<string, string>;
  stylesheets: string[];  
  restoreLinks: Record<string, Array<string>>;  
  restoreClicks: Record<string, Array<Function>>;  
  animatingOrder: Record<string, AnimatingOrder>;  
}
