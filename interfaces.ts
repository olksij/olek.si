import { Font } from 'opentype.js'

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

// 🔤 transfering & storing fonts types
export type FontsTransmit = Record<FontType, ArrayBuffer>;
export type FontsRecord   = Record<FontType, Font>;

// input used by compute worker
export interface ComputeRequest {
  from: RuntimeElementConfig;
  to: RuntimeElementConfig;
}

// response sent by compute worker
export interface ComputeResult {
  from: PathData;
  to: PathData;
  // return the element with updated skeleton
  element: RuntimeElementConfig;
}

export type FontType = 'display' | 'text';
export type CSSColor = 'text'    | 'secondary' | 'accent';

// font style indentificators
export type FontStyleType =
  'title'        |
  'h2'           |
  'subtitle'     |
  'body'         |
  'menuSelected' |
  'menu'         |
  'action'       |
  'footer';

/* -------------------------------- elements ------------------------------- */

export interface TextConfig {
  text: string;
  style: FontStyle;
}

export interface IconConfig {
  path: PathData;
  gap: number;
  height?: number;
  color?: CSSColor;
}

// static constant data about each element on page
export interface StaticElementConfig {
  text?:  string;
  style?: FontStyle;
  icon?:  IconConfig;
}

// used after the layout has been calculated
export interface RuntimeElementConfig {
  text?: TextConfig;
  icon?: IconConfig;
  skeleton?: SkeletonConfig<RuntimeSize>;
}

// predefined font styles for text
export interface FontStyle {
  type: FontType,
  fontSize: FontSize;
  spacing?: FontSpacing;
  color: CSSColor;
  // line height
  height: SizeUnit;
  // should be singlelined or wrapped
  wrap?: boolean;
}

// assets loaded together with page
export interface PageContent {
  // page name for neat debugging
  id: string; 
  // elements to be injected into document.head
  head?: HTMLElement[];
  
  stylesheets: string[];
  skeleton: SkeletonTree;
  
  elements?: Record<ElementID, StaticElementConfig>;
  images?:   Record<ElementID, string>;
  clicks?:   Record<ElementID, Array<Function>>;  
  links?:    Record<ElementID, Array<string>>;  
}

/* -------------------------------- skeleton ------------------------------- */

// used to build dom and injected as interface           The [SkeletonTree] might contain itself
// into html's scripts to build skeleton tree                         ______|______
export interface SkeletonTree { [id: string]: SkeletonExtendedConfig | SkeletonTree; }

// configured during DOM build for proper page construction
export interface SkeletonCompositeConfig { config: SkeletonExtendedConfig; delay: Delay; };

// the skeleton config contains sizes for both mobile and desktop views
export type SkeletonExtendedConfig = [SkeletonConfig<StaticSize>, SkeletonConfig<StaticSize>?]

// the basic skeleton config with dimensions and border radius
export type SkeletonConfig<U extends SizeUnit> = [...BoundingBox<U>, BorderRadius?]

// specifies width and height
export type BoundingBox<U extends SizeUnit> = [U, U];

// static size may have [null] values, meaning that the property is decided during runtime
type SizeUnit = StaticSize | RuntimeSize;

/* -------------------------------- morphing ------------------------------- */

// a list of SVG path points
export type PathRing = PathPoint[];
//                       x       y
export type PathPoint = [number, number];

/* --------------------------------- units --------------------------------- */

export type StaticSize = number | null;

export type RuntimeSize = number;

export type FontSize = number;

export type FontSpacing = number;

export type ElementID = string;

export type PathData = string;

export type BorderRadius = number;

export type Delay = number;
