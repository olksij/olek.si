import { byId, tagById } from "./shorthands";

let menuOpenBgKeyframes: Keyframe[] = [
  {
    backgroundPosition: '0px 0px',
    boxShadow: 'inset 0px 0px 0px 50vh #FFF0',
  },
  {
    backgroundPosition: '-32px 0px',
    boxShadow: 'inset 0px 0px 0px 50vh var(--bg)',
  }
]

let menuCloseBgKeyframes: Keyframe[] = [
  menuOpenBgKeyframes[1],
  menuOpenBgKeyframes[0]
]

function menuOpenBg() {
  document.body.animate(menuOpenBgKeyframes, { duration: 600, easing: 'cubic-bezier(0.25, 0.25, 0, 1)' });
  document.body.setAttribute('style', 'background-position: -32px 0px; background: box-shadow: inset 0px 0px 0px 50vh var(--bg)');
}

function menuCloseBg() {
  document.body.animate(menuCloseBgKeyframes, { duration: 600, easing: 'cubic-bezier(0.25, 0.25, 0, 1)' });
  document.body.setAttribute('style', '');
}

byId('rg')!.onmouseover = function () {
  byId('cnt')!.classList.add('navOpened', 'navTransformed');
  menuOpenBg();
}
byId('rg')!.onmouseleave = function () { byId('cnt')!.classList.remove('navOpened'); menuCloseBg() }

let isNavHovered = false;

byId('nav')!.onclick = function () {
  if (!byId('cnt')!.classList.contains('navTapped')) {
    byId('cnt')!.classList.add('navTapped', 'navTransformed');
    tagById('nav', 'text')!.innerHTML = 'Close';
    menuOpenBg()
  }
  else {
    byId('cnt')!.classList.remove('navTapped');
    tagById('nav', 'text')!.innerHTML = 'Navigation';
    menuCloseBg();
  }
}

byId('nav')!.onmouseover = () => isNavHovered = true;
byId('nav')!.onmouseleave = () => isNavHovered = false;

document.body.onclick = function () {
  if (!isNavHovered) {
    byId('cnt')!.classList.remove('navTapped');
    tagById('nav', 'text')!.innerHTML = 'Navigation';
  }
}

var blurInvoked = false;

let motionStart = function (event) {
  if (!byId('cnt')?.classList.contains('navTransformed')) return;

  if (!blurInvoked) {
    blurInvoked = true;
    let rect = byId('nav-work')!.getBoundingClientRect();
    requestAnimationFrame(() => motionBlur('rg', rect));
  }
}

let motionEnd = function (event) {
  blurInvoked = false;
  byId('cnt')!.setAttribute('style', '');
};

byId('rg')!.ontransitionrun = motionStart;
byId('rg')!.onanimationstart = motionStart;

byId('rg')!.ontransitionend = motionEnd;
byId('rg')!.onanimationend = motionEnd;

function motionBlur(id: string, previous: DOMRect) {
  if (!blurInvoked) return;

  let current = byId('nav-work')!.getBoundingClientRect();

  let diff = Math.round(Math.abs(current.left - previous.left) * 5) / 5;

  if (byId('cnt')?.classList.contains('navOpened')) diff /= 2;

  byId('cnt')!.setAttribute('style', `filter: blur(${diff}px)`);

  requestAnimationFrame(() => motionBlur(id, current));
}
