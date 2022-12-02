import { byId } from "./shorthands";

export default class MotionBlur {
  private previous!: DOMRect;
  private blurInvoked: boolean;
  private blurElement: HTMLElement;
  private watchID: string;

  mult: number;

  constructor(config: { blurID: string; watchID: string; mult: number }) {
    this.blurElement = byId(config.blurID)!;
    this.watchID = config.watchID;
    this.mult = config.mult;
    this.blurInvoked = false;
  }

  invoke() {
    if (this.blurInvoked) return;

    this.blurElement.classList.add('navTransformed')

    this.blurInvoked = true;
    this.previous = byId(this.watchID)!.getBoundingClientRect();
    requestAnimationFrame(() => this.motionBlur());
  }

  drop() {
    this.blurInvoked = false;
    this.blurElement.style.filter = '';
    this.blurElement.classList.remove('navTransformed')
  }

  motionBlur() {
    if (!this.blurInvoked) return;

    let current = byId(this.watchID)!.getBoundingClientRect();
    let diff = Math.abs(current.left - this.previous.left);
    let blur = Math.round(diff * this.mult * 10) / 10;

    this.previous = current;

    this.blurElement.style.filter = blur ? `blur(${blur}px)` : '';
    requestAnimationFrame(() => this.motionBlur());
  }
}