// the file separates skeleton resolving process
// and imports compute worker

//  resolver to be called when      animated
//  all skeletons are animated     skeletons
//  _____________|_____________  ______|_____
let skeletonResolve: () => void, rendered = 0;

const skeleton = new Event('skeleton');

// Called to resolve            the total number     rendered
// skeleton promise if need     _______|_______   ______|______
export function resolveSkeleton(counter: number,  count: number) {
  if ((rendered += count) == counter)
    dispatchEvent(skeleton), sessionStorage.setItem('skeleton', 'true');
}
