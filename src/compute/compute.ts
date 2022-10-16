// this file is used as a web worker so things like
// vectorizing text or morphing it won't block UI

import { ComputeAPI, FontsRecord, TextsRecord } from '../interfaces';

import fonts from './fonts';
import loadTexts from './texts';

// when message is received from main thread
onmessage = (message: MessageEvent<ComputeAPI<'input'>>) => {
  let input = message.data;
  let request = input.request, deliver = input.deliver, data = input.data;

  if (deliver == 'fonts') fonts.load(request, data as FontsRecord<'input'>);
  if (deliver == 'texts') loadTexts(request, data as TextsRecord<'input'>);
}
