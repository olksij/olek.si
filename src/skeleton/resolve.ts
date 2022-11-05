// the file separates skeleton resolving process
// and imports compute worker

//  resolver to be called when      animated
//  all skeletons are animated     skeletons
//  _____________|_____________  ______|_____
let skeletonResolve: () => void, rendered = 0;

export const skeleton = new Promise<void>(resolve => skeletonResolve = resolve);

// Called to resolve            the total number     rendered
// skeleton promise if need     _______|_______   ______|______
export function resolveSkeleton(counter: number,  count: number) {
  if ((rendered += count) == counter)
    skeletonResolve()
}

const workerURL = new URL('../compute/compute.ts', import.meta.url);
export const worker = new Worker(workerURL, { type: 'module' });
