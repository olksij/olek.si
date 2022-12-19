import motionBlur from './motionBlur';

import runtimize from "/render/runtimize";
import font from "../typography";

let body = document.body;

// extract HTMLElements
let menu = document.getElementById("rg")!;
let cnt = document.getElementById("cnt")!;
let nav = document.getElementById("nav")!;

// mouse hover listeners
menu.addEventListener("mousemove",  event => 0 < event.movementX ? menuState(true) : 0);
menu.addEventListener("mouseleave", (   ) => menuState(false));

// on navigation button click
nav .addEventListener("click", navTap)
body.addEventListener("click", () => nav.matches(':hover') ? 0 : navTap());


export function menuState(open: boolean, tapped: boolean = false) {
  let operation = open ? 'add' : 'remove';

  // css classes
  if (!tapped) {
    cnt. classList[operation]("navOpened");
    menu.classList[operation]("hover");
  }
  
  //animate background
  document.body.animate(open ? backgroundKeyframes : backgroundKeyframes.reverse(), backgroundAnimation);
  body.classList[operation]("menu")

  // configure motion blur
  motionBlur(open, innerWidth < 920 ? 1 : 0.5)
}

function navTap() {
  let closed = !cnt.classList.contains("navTapped");

  // update the button
  runtimize({ id: 'nav', to: { style: font.action, 
    text: closed ? 'Navigation' : 'Close' } });

  cnt.classList[closed ? 'add' : 'remove']("navTapped");
  nav.style.opacity = closed ? '0.5' : '1';

  menuState(closed, true);
}

// keyframes used for background animation
const backgroundKeyframes: Keyframe[] = [
  { backgroundPosition: "0px 0px",   boxShadow: "inset 0px 0px 0px 50vh #FFF0" },
  { backgroundPosition: "-32px 0px", boxShadow: "inset 0px 0px 0px 50vh var(--bg)" },
];

// animation options used to hide/show background
const backgroundAnimation: KeyframeAnimationOptions = {
  easing: "cubic-bezier(0.25, 0.25, 0, 1)",
  duration: 600,
};