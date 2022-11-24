## oleksii.xyz > 🩻 **skeleton**

files in this folder are script files, inlined into every `.html` file.

they are **isolated** from other modules, so communication is happening via the `window` scope or by `Event` listening & disposing.

they provide super-basic functionality to archieve `FCP` (first contentful paint) ASAP by building layout and animatable skeleton.

- `buildTree.ts` - reconstructs the `DOM` based on a `SkeletonTree` object provided by `.html` pages 

- `fontLoader.ts` - preloads fonts for compute worker

- `composite.ts` - configures metrics & animates the skeleton

- `init.ts` - called when it's the first dom build time

- `resolve.ts` - fires an skeleton resolve event and preloads compute worker
