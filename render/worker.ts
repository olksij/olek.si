// the file wraps requests to compute worker to promises
// so its possible to request asynchronously

import { ComputeAPI, ComputeRequest, ComputeResult } from "interfaces";
// @ts-ignore
let worker = window['worker'];

// Map object containing all promises and configs to resolve them later
let requests = new Map<string, (value: ComputeResult) => void>();

// unique id of a request
function generateName() {
  let time = performance.now();
  let random = Math.round(Math.random()*1000)
  return time.toString() + random;
}

// the function that sends requests to compute worker and return a promise
export default function compute(data: ComputeRequest) {
  let requestID = generateName();
  // initialize a new Promise and store it's [resolve] function
  let promise = new Promise<ComputeResult>(resolve => requests.set(requestID, resolve));

  worker.postMessage({
    deliver: 'ComputeRequest',
    request: requestID,
    data: data,
  } as ComputeAPI<ComputeRequest>);
  
  return promise;
}

// resolve a corresponding promise when answer received.
worker.onmessage = function (event: MessageEvent<ComputeAPI<ComputeResult>>) {
  let request = requests.get(event.data.request),
      data = event.data;
  
  if (request) return request(data.data) 
  console.error('[worker] No such request: ', data.request, requests);
}
