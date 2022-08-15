// `DeliverType`s used for communication with WebWorker
export type DeliverType = 'fonts' | 'texts' | 'morph';

// types for each `DeliveryType`
export type FontsRecord = Record<string, ArrayBuffer>;
export type TextsRecord = Record<string, TextsData>;
export type MorphFrame = MorphFrameRequest | MorphFrameData;

export type RenderType = 'img' | 'text';
export type FontType = 'display' | 'text';
export type PreloadAssetType = 'stylesheet' | 'image';

// interface used for communicating with WebWorker
export interface ComputeAPI {
  deliver: DeliverType,
  data: FontsRecord | TextsRecord | MorphFrame,
}

// used to define text style for each node
export interface TextsData {
  text: string // text itself;
  font: FontType;
  fontSize: number;
  x?: number;
  y?: number // baseline;
  letterSpacing?: number;
  duration: number;
  fromPath: string;
  fromSvg: string;
}

export interface RenderData {
  type: RenderType;
  alt?: string;
  delay: number;
  children?: boolean;
}

// used by main thread to request next frame in compute
export interface MorphFrameRequest {
  item: string // morph item id;
  metadata?: MorphMetadata;
  current: number;
}

// used to store metadata about morph
export interface MorphMetadata {
  duration: number;
  start: number;
}

// interface for posting message to mainthread with a result of computing process
export interface MorphFrameData {
  item: string;
  path: string;
  next?: boolean;
}
