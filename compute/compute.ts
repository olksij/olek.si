// this file is used as a web worker so things like
// vectorizing text or morphing it won't block UI

import { ComputeAPI, FontsTransmit, ComputeRequest, ComputeAPIData, FontsRecord } from 'interfaces';

import { fontsResolve, loadFonts } from './fonts';
import morph from './morph';

let fonts: Promise<FontsRecord> = new Promise(fontsResolve);

// when message is received from main thread
onmessage = async (message: MessageEvent<ComputeAPI<ComputeAPIData>>) => {
  let input = message.data;
  let request = input.request, deliver = input.deliver, data = input.data;

  if (deliver == 'FontsTransmit') loadFonts(data as FontsTransmit);
  if (deliver == 'ComputeRequest') morph(request!, data as ComputeRequest, await fonts);
}
