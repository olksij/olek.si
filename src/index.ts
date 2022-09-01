import { loadInternals } from './sources';
import print from './print';
import render from './render';

window.addEventListener('load', async () => {
  print("🔥 Load Event");

  await loadInternals;

  // we are done loading assets and are ready for render!
  render();

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('./webvitals');
});
