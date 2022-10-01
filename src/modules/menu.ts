import MotionBlur from "./motionBlur";
import { byId, tagById } from "./shorthands";

/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

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

var i = 0;
for(let child of byId('rg')!.children) {
  let curr = ++i;
  child.addEventListener('mouseover', () => {
    for(let subling of byId('rg')!.children)
      subling.classList.remove('hover');

    child.classList.add('hover')
  });
}

function menuOpenBg(mouse: boolean) {
  document.body.animate(menuOpenBgKeyframes, { duration: 600, easing: 'cubic-bezier(0.25, 0.25, 0, 1)' });
  document.body.setAttribute('style', 'background-position: -32px 0px; background: box-shadow: inset 0px 0px 0px 50vh var(--bg)');
}

function menuCloseBg(mouse: boolean) {
  document.body.animate(menuCloseBgKeyframes, { duration: 600, easing: 'cubic-bezier(0.25, 0.25, 0, 1)' });
  document.body.setAttribute('style', '');

  for(let child of byId('rg')!.children)
    child.classList.remove('hover');
}

byId('rg')!.onmouseover = function (event) {
  if (!byId('cnt')!.classList.contains('navTapped')) {
    byId('cnt')!.classList.add('navOpened', 'navTransformed');
    byId('rg')!.classList.add('hover');
    menuOpenBg(true);

    let hovered = false;
    for(let child of byId('rg')!.children) {
      hovered = child.classList.contains('hover') || hovered;
    
    if (!hovered) {
      if (event.clientY < window.innerHeight/2) byId('rg')!.firstElementChild?.classList.add('hover')
      else byId('rg')!.lastElementChild?.classList.add('hover')
    }
  }
}
byId('rg')!.onmouseleave = function () { 
  byId('cnt')!.classList.remove('navOpened'); 
  byId('rg')!.classList.remove('hover');
  menuCloseBg(true);
}

let isNavHovered = false;

byId('nav')!.onclick = function (event) {
  if (!byId('cnt')!.classList.contains('navTapped')) {
    byId('cnt')!.classList.add('navTapped', 'navTransformed');
    tagById('nav', 'text')!.innerHTML = 'Close';
    menuOpenBg(false)
  }
  else {
    byId('cnt')!.classList.remove('navTapped');
    tagById('nav', 'text')!.innerHTML = 'Navigation';
    menuCloseBg(false);
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

let navBlur = new MotionBlur({ blurID: 'cnt', watchID:'nav-work', mult: 1 })

let motionStart = function () {
  if (!byId('cnt')?.classList.contains('navTransformed')) return;
  navBlur.invoke();
}

byId('rg')!.ontransitionrun = motionStart;
byId('rg')!.onanimationstart = motionStart;

byId('rg')!.ontransitionend = navBlur.drop;
byId('rg')!.onanimationend = navBlur.drop;
