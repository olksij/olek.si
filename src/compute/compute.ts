// this file is used as a web worker so things like
// vectorizing text or morphing it won't block UI

import { ComputeAPI, MorphMetadata, FontsRecord, TextsRecord, MorphFrameRequest } from '../interfaces';

import { loadFonts } from './fonts';
import { loadTexts } from './texts';
import { morphText } from './morphs';

// when message is received from main thread
onmessage = (message: MessageEvent<ComputeAPI>) => {
  let data = message.data.data;

  if (message.data.deliver == 'fonts') loadFonts(data as FontsRecord);
  if (message.data.deliver == 'texts') loadTexts(data as TextsRecord);
  if (message.data.deliver == 'morph') morphText(data as MorphFrameRequest);
}
