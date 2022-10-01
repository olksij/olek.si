import { byId } from "./shorthands";

export default class MotionBlur {
  private previous: DOMRect;
  private blurInvoked: boolean;
  private blurID: string;
  private watchID: string;

  mult: number;

  constructor(config: {blurID: string, watchID: string, mult: number}) {
    this.blurID = config.blurID, this.watchID = config.watchID, this.mult = config.mult;
  }

  invoke() {
    this.blurInvoked = true;
    this.previous = byId(this.watchID)!.getBoundingClientRect();
    requestAnimationFrame(this.motionBlur)
  }

  drop() {
    this.blurInvoked = false;
    byId(this.blurID)!.setAttribute('style', '');
  }

  motionBlur() {
    if (!this.blurInvoked) return;

    let current = byId(this.watchID)!.getBoundingClientRect();
    let diff = Math.round(Math.abs(current.left - this.previous.left) * this.mult * 5) / 5;

    this.previous = current;

    byId(this.blurID)!.setAttribute('style', `filter: blur(${diff}px)`);
    requestAnimationFrame(this.motionBlur);
  }
}
