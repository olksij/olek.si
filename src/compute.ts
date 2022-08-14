// this file is used as a web worker so things like
// vectorizing text or animating it won't block UI

import { Font, parse } from 'opentype.js';
import * as flubber from "flubber"

// declare communication API

// web worker can receive fonts and texts only
type DeliverType = 'fonts' | 'texts' | 'animate';

// types for each delivery type
type FontsRecord = Record<string, ArrayBuffer>;
type TextsRecord = Record<string, TextsData>;
type Animations = AnimationMetadata | AnimateFrameData;

// interface used for communicating
interface ComputeAPI {
  deliver: DeliverType,
  data: FontsRecord | TextsRecord | Animations,
}

// when message is received from main thread
onmessage = (message: MessageEvent<ComputeAPI>) => {
  if (message.data.deliver == 'fonts') loadFonts(message.data.data as FontsRecord);
  if (message.data.deliver == 'texts') loadTexts(message.data.data as TextsRecord);
  if (message.data.deliver == 'animate') animate(message.data.data as AnimationMetadata);
}

/* --- --- FONTS SECTION --- --- */

// let's declare globals for fonts
let fontDisplay: Font, fontText: Font;

// promise so we can ensure fonts are loaded 
// before we try to vectorize text
let fontsResolve: (value: void | PromiseLike<void>) => void;
let fontsLoaded = new Promise<void>((resolve) => fontsResolve = resolve);

async function loadFonts(fontsData: Record<string, ArrayBuffer>) {
  fontDisplay = parse(fontsData['Display']);
  fontText = parse(fontsData['Text']);
  fontsResolve();
}

/* --- --- TEXTS SECTION --- --- */

let interpolators: Record<string, any> = {}

interface TextsData {
  text: string // text itself;
  font: 'display' | 'text';
  fontSize: number;
  x?: number;
  y?: number // baseline;
  letterSpacing?: number;
  fromPath: string // temporary property until i will finish another refactoring;
}

async function loadTexts(fontsData: Record<string, TextsData>) {
  await fontsLoaded;

  for (let id in fontsData) {
    const data = fontsData[id];

    let font = data.font == 'display' ? fontDisplay : fontText;
    let pathData = font.getPath(data.text, data.x ?? 0, data.y ?? data.fontSize, data.fontSize, { letterSpacing: data.letterSpacing }).toPathData(2).replaceAll('ZM', 'Z$M')?.split('$');
    let fromPath = data.fromPath.replaceAll('ZM', 'Z$M')?.split('$');
    let interpolator = fromPath.length == 1 ? flubber.separate : flubber.interpolateAll;
    fromPath = fromPath.length == 1 ? fromPath[0] : fromPath;
    interpolators[id] = interpolator(fromPath, pathData, { maxSegmentLength: 7, single: true });
  }

  postMessage({ deliver: 'texts' });
}

/* --- --- ANIMATION SECTION --- --- */

interface AnimationMetadata {
  item: string;
  duration: number;
  start?: number;
  current: number;
}

interface AnimateFrameData {
  item: string;
  path: string;
  next?: boolean;
  start: number;
  duration: number;
}

function animate(data: AnimationMetadata): number | void {
  if (data.start == null) data.start = data.current;
  let t = easeInOutExpo((data.current - data.start) / data.duration);
  const computed: AnimateFrameData = { item: data.item, path: interpolators[data.item](t), start: data.start, duration: data.duration };
  computed.next = data.start + data.duration > data.current;

  postMessage({ deliver: 'animate', data: computed } as ComputeAPI);
}

function easeInOutExpo(x: number): number {
  if ([0, 1].includes(x)) return x;
  return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
