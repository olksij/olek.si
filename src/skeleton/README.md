## oleksii.xyz > src > 📄 **skeleton**

files in this folder are script files, inlined into every `HTML` page.

they provide super-basic functionality to archieve `FCP` (first contentful paint) ASAP by building layout and animatable skeleton.

- `buildTree.ts` - reconstructs the `DOM` based on an `Object` based layout-tree provided by `.html` pages 

- `fontLoader.ts` - preloads fonts for compute worker

- `skeletonLoader.ts` - animates the skeleton
