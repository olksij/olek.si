import { createElement, createFragment } from "./jsx";
import { loadInternals, loadFonts, loadImages } from './loaders';
import { print } from './print';

window.addEventListener('load', async () => {
  print("🔥 Load Event");
  let internals = await loadInternals;
  await loadFonts;
  await loadImages;
  print("🎨 Ready for render");
  // render();
});