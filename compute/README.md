## 🪨 compute

intended to process vectors of elements before morphing them.

+ `compute.ts` – handle requests and send to `fonts.ts` or `morph.ts`.

<br>

+ `morph.ts` – controls the element vectorization process.

  - `vectorize.ts` – vectorize every part of element.
 
  - `skeleton.ts` – constructs rectangular paths from which elements morph during render

  - `convert.ts` – recalculate path points so their number will be equal
 
  - `normalize.ts` – arranges path points of both elemnts so they morph smoothly

<br>

+ `fonts.ts` - preprocess `ArrayBuffer` into `opentype.js`'s `Font` object.
