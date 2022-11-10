// this file is used as a web worker so things like
// vectorizing text or morphing it won't block UI

import { ComputeAPI, FontsTransmit, ComputeRequest, ComputeAPIData } from '../interfaces';

import { loadFonts } from './fonts';
import interpolate from './interpolate';

// when message is received from main thread
onmessage = (message: MessageEvent<ComputeAPI<ComputeAPIData>>) => {
  let input = message.data;
  let request = input.request, deliver = input.deliver, data = input.data;

  if (deliver == 'FontsTransmit')  loadFonts(data as FontsTransmit);
  if (deliver == 'ComputeRequest') interpolate(request!, data as ComputeRequest);
}
