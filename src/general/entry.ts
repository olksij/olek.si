import { ComputeAPI, ComputeResult, Languages, PageContent, ComputeRequest, TextConfig, Size, FromMorphElement, SkeletonTree, SkeletonConfig } from '../interfaces';

import print from '../scripts/print';
import render from '../scripts/render';
import { byId } from '../scripts/shorthands';
import compute from '../scripts/worker';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export async function onload(content: PageContent) {
  print("🔥 Load Event");

  render(content);

  // webvitals file is loaded after load event and render call,
  // and meant to help measure this webpage quality
  print("😏 Loading web vitals");
  import('../scripts/webvitals');

  // to contain navigator, theme specs, and other dynamic things
}
