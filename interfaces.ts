import { Font } from 'opentype.js'

// 🔤 transfering & storing fonts types
export type FontsTransmit = Record<FontType, ArrayBuffer>;
export type FontsRecord   = Record<FontType, Font>;

export type FontType = 'display' | 'text';

export type Languages = 'en' | 'sv' | 'uk'
export type SourceTextData = Record<string, Record<Languages, string> >;

export type CSSColor = `var(--${'text' | 'secondary' | 'accent'})`;

export type AnimationConfig = [Keyframe[], KeyframeAnimationOptions];


//                     🕒 Send a request    ⚙️ Computed paths    📤 Send fonts
// Types that can be        to worker            by worker          to worker
// transfered                ___|__________   ______|______   _________|___
export type ComputeAPIData = ComputeRequest | ComputeResult | FontsTransmit;

// [string] value for each [ComputeAPIData] Type so 
// it can be used further in JS runtime
export type _CAPIStringDT<Data> = Data extends FontsTransmit  ? 'FontsTransmit'  : 
                                 (Data extends ComputeRequest ? 'ComputeRequest' : 'ComputeResult')

// interface used for communicating with WebWorker
export interface ComputeAPI<Data extends ComputeAPIData> {
  deliver?: _CAPIStringDT<Data>;
  request: Data extends FontsTransmit ? undefined : string; // request ID
  data: Data,
}

export type FontStyleType =
  'title'        |
  'h2'           |
  'subtitle'     |
  'body'         |
  'menuSelected' |
  'menu'         |
  'action'       |
  'footer';

// used to define each element to be rendered
export interface ElementConfig {
  from?: FromElement;
  text?: FontStyle;  // <- text property here uses [FontStyle] instead of [TextConfig]
  icon?: IconConfig; //    because texts are stored separately becouse of possibility 
}                    //    of dynamic change of webpage language

// interface used to communicate with the render module
export interface RenderElementInterface {
  id: string;
  morph?: ComputeResult;
  icon?: IconConfig;
  text?: TextConfig;
  height: number;
}

// input used by compute worker
export interface ComputeRequest {
  from: FromMorphElement;
  to: ToMorphElement;
}

// response sent by compute worker
export interface ComputeResult {
  from: string;
  to: string;
  // calculated width of the element
  width: number;
  baseline?: number;
}
 
export interface MorphElement {
  text?: TextConfig;
  icon?: IconConfig;
  skeleton?:
}

export interface TextConfig {
  text: string;
  style: FontStyle;
}

export interface IconConfig {
  path: string;
  gap: number;
  height?: number;
  color?: CSSColor;
}

export interface FromElement {
  element?: MorphElement;
  path?: string;
}

// This Morph interface is defined during runtime
export interface FromMorphElement extends FromElement {
  skeleton?: SkeletonBaseConfig;
}

export interface ToMorphElement extends FromElement {
  skeleton: SkeletonBaseConfig;
}

export type SizeUnit = number | null;

export type Size = [SizeUnit, SizeUnit];

export interface FontStyle {
  // display or text font, defaults to text
  type?: FontType,
  // yep, size of the font
  fontSize: number;
  // yep, distance between letters
  letterSpacing?: number;

  height: number;
  color: CSSColor;
  wrap?: boolean;
}

export interface PageContent {
  head?: HTMLElement[];
  stylesheets: string[];
  skeleton: SkeletonTree;
  elements?: Record<string, ElementConfig>;
  images?: Record<string, string>;
  clicks?: Record<string, Array<Function>>;  
  links?: Record<string, Array<string>>;  
  texts?: SourceTextData;
}

export interface SkeletonTree { [id: string]: SkeletonConfig | SkeletonTree; }

//                               [width, height, borderRadius]
export type SkeletonBaseConfig = [...Size, BorderRadius?]
export type SkeletonConfig = [SkeletonBaseConfig, SkeletonBaseConfig?]

export interface SkeletonCompositeConfig { config: SkeletonConfig; delay: number; };

export type BorderRadius = number;

export type PathPoint = [number, number];
export type PathRing = PathPoint[];

export type TextLines = { text: string[], width: number }[]
