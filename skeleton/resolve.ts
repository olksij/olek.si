// the file separates skeleton resolving process
// and imports compute worker

//  resolver to be called when      animated
//  all skeletons are animated     skeletons
//  _____________|_____________  ______|_____
let skeletonResolve: () => void, rendered = 0;

window['skeleton'] = new Promise<void>(resolve => skeletonResolve = resolve);

// Called to resolve            the total number     rendered
// skeleton promise if need     _______|_______   ______|______
export const resolveSkeleton = (counter: number,  count: number) =>
  (rendered += count) == counter ? skeletonResolve() : 0;
