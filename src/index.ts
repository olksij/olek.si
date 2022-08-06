import { loadInternals, loadFonts, loadImages } from './loaders';
import print from './print';
import render from './render';

window.addEventListener('load', async () => {
  print("🔥 Load Event");

  // let's check if we have loaded all for sure in case
  let internals = await loadInternals;
  await loadFonts;
  await loadImages;

  // we are done loading assets and are ready for render!
  print("🎨 Ready for render");
  render();

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('./webvitals');
});
