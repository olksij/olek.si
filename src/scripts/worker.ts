// the file wraps requests to compute worker to promises
// so its possible to request asynchronously

import { ComputeAPI, ComputeRequest, DeliverType, FontsTransmit } from "../interfaces";
import { _worker } from "../skeleton/resolve";

// simplify types
type InitialRecord = ComputeRequest<'initial'> | FontsTransmit<'initial'>;
type Computed = ComputeAPI<'computed'>;

// Map object containing all request to resolve them later
let requests = new Map<string, (value: Computed) => void>();

// unique id of a request
function generateName() {
  let time = performance.now();
  let random = Math.round(Math.random()*1000)
  return time.toString() + random;
}

// the function that sends requests to compute worker and return a promise
export default function compute(data: InitialRecord, deliver: DeliverType = 'texts') {
  let requestID = generateName();
  let promise = new Promise<Computed>(resolve => requests.set(requestID, resolve));

  _worker.postMessage({
    deliver: deliver,
    request: requestID,
    data: data,
  } as ComputeAPI<'initial'>);
  
  return promise;
}

// resolve a corresponding promise when answer received.
_worker.onmessage = function (event: MessageEvent<Computed>) {
  let data = event.data;

  if (requests.has(data.request))
    return requests.get(data.request)!(data) 

  console.error('[worker] No such request: ', data.request, requests);
}
