window['worker'] = new Worker(new URL('../compute/compute.ts', import.meta.url), { type: 'module' });

var skeletonResolve;
window['skeleton'] = new Promise((resolve) => skeletonResolve = resolve);

var skeletonKeyframes: [Keyframe[], Object] = [
  [{ backgroundPositionX: '75vw, 0' }], 
  { duration: 1500, iterations: Infinity }
];

export default function skeletonLoader() {  // timeout counter
  var cnt = 1;
  // iterate over skeleton loader elements
  ["pf", "tt", "d1", "d2", "ps", "nav", "rg", "ft"].forEach((id) => {
    var element: HTMLElement = document.getElementById(id)!;
    var elements = (["ps", "rg", "ft"].includes(id) ? element.children : [element]);

    for (var item of elements) {
      item.classList.add("tr"); // to render mark

      setTimeout((item) => item.classList.replace("tr", "sl"), cnt, item);
      item.animate(...skeletonKeyframes);

      cnt += 100 / elements.length;
    }
  });
  setTimeout(skeletonResolve, cnt);
}
