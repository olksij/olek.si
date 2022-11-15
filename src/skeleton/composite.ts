import { SkeletonConfig } from "../interfaces";
import { resolveSkeleton } from "./resolve";

// the total number of skeletons in the virtual tree
let counter = 0;

export const resetCounter = () => counter = 0;

//                                                                               Element count if it's a group
// Apply [SkeletonConfig] which preserves                                       and should be animated together      
// size & borderRadius to skeleton element                                            ________|________
export default async function composite(element: HTMLElement, config: SkeletonConfig, count: number = 1) {
  if (!config) return;
  window['current'] ??= [];

  // build a simpler SkeletonConfig interface
  window['current'][element.id] = config;
  element.classList.add('tr'); // to render mark

  // wait till current frame is painted to make sure CSS is applied
  // in order to make the skeleton animation smooth
  await new Promise(resolve => requestAnimationFrame(resolve));

  setTimeout(function (count: number) {
    let style = element.style;
    let mobile: 0 | 1 = window.innerWidth < 920 ? 0 : (config[1] ? 1 : 0)
  
    style.width  =       config[mobile]![0] + 'px';
    style.height =       config[mobile]![1] + 'px';
    style.borderRadius = config[mobile]![2] + 'px';  

    // to render -> skeleton && animate
    element.classList.replace('tr', 'sl');
    element.animate(...skeletonKeyframes);

    resolveSkeleton(counter, 1 / count);

  }, (counter += 1 / count) * 100, count)
}

// keyframes to apply that loading animation
const skeletonKeyframes: [Keyframe[], Object] = [
  [{ backgroundPositionX: '75vw, 0' }], 
  { duration: 1500, iterations: Infinity }
];
