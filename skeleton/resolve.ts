// the file separates skeleton resolving process
// and imports compute worker

//  resolver to be called when      animated
//  all skeletons are animated     skeletons
//  _____________|_____________  ______|_____
let skeletonResolve: () => void, rendered = 0;

// called before wiping all elements
export const initResolver = () =>
  [window['skeleton'], window['elements'], rendered] = [new Promise<void>(resolve => skeletonResolve = resolve), [], 0];

//             the total number     rendered
//              _______|_______   ______|______
export default (counter: number,  count: number) =>
// if the number of rendered skeletons matches the total one, resolve
  (rendered += count) == counter ? skeletonResolve() : 0;
