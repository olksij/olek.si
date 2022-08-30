import { images, loadInternals, stylesheets } from './sources';
import print from './print';
import render, { textMorphReady } from './render';

window.addEventListener('load', async () => {
  print("🔥 Load Event");

  await loadInternals;

  // we are done loading assets and are ready for render!
  print("🎨 Ready for render");
  render();

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('./webvitals');
});
