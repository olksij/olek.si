import print from '../modules/print';
import render from '../modules/render';

export async function onload(content: Object) {
  print("🔥 Load Event");

  // we are done loading assets and are ready for render!
  render(content);

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('../modules/webvitals');
}
