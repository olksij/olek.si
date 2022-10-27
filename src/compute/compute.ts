// this file is used as a web worker so things like
// vectorizing text or morphing it won't block UI

import { ComputeAPI, FontsRecord, ComputeRecord } from '../interfaces';

import fonts from './fonts';
import interpolate from './interpolate';

// when message is received from main thread
onmessage = (message: MessageEvent<ComputeAPI<'initial'>>) => {
  let input = message.data;
  let request = input.request, deliver = input.deliver, data = input.data;

  if (deliver == 'fonts') fonts.load(request, data as FontsRecord<'initial'>);
  if (deliver == 'texts') interpolate(request, data as ComputeRecord<'initial'>);
}
