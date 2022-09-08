## oleksii.xyz > src > 🪨 **compute**

files in this folder are imported as `webworkers` so it's possible to process heavy tasks in background

- `fonts.ts` - import fonts and adapt them for `opentype.js` and further use by other modules

- `metrics.ts` - mainly into compositing from/to `paths` and also values such as `baseline`

- `texts.ts` - communicator with `flubber` module, which animates values it got from `metrics.ts`
