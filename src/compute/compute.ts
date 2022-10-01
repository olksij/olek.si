// this file is used as a web worker so things like
// vectorizing text or morphing it won't block UI

import { ComputeAPI, FontsRecord, TextsRecord } from '../interfaces';

import fonts from './fonts';
import loadTexts from './texts';

// when message is received from main thread
onmessage = (message: MessageEvent<ComputeAPI>) => {
  let data = message.data.data;

  if (message.data.deliver == 'fonts') fonts.load(data as FontsRecord);
  if (message.data.deliver == 'texts') loadTexts(data as TextsRecord);
}
