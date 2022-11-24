## oleksii.xyz > 🪨 **compute**

intended to process vectors of elements before morphing them.

- `compute.ts` - handle requests and send to `fonts.ts` or `morph.ts`.

<br>

---

<br>

- `morph.ts` - controls the element vectorization process.
  - `element.ts` - vectorize every part of element.
  - `metrics.ts` - calculate values such as `baseline` and `width`.
  - `normalize.ts` - arranges `PathData` points of both eleemnts so they morph smoothly

<br>

- `fonts.ts` - preprocess `ArrayBuffer` into `opentype.js`'s `Font` object.
