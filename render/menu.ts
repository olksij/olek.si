import aboutDom from "/about/dom";
import indexDom from "/index/dom";
import buildTree from "/skeleton/buildTree";
import { resetCounter } from "/skeleton/composite";
import MotionBlur from "./motionBlur";
import { byId, tagById } from "./shorthands";
import compute from "./worker";
import { fontStyles } from "/common/fontStyles";

/* --- --- --- --- --- --- --- --- ---
   --- CODE IN THIS FILE REQUIRES- ---
   --- -- [URGENT] REFACTORING --- ---
   --- --- --- --- --- --- --- --- --- */

let rg = byId("rg")!;
let cnt = byId("cnt")!;
let nav = byId("nav")!;

var ignoreMouse = false;

let menuOpenBgKeyframes: Keyframe[] = [
  {
    backgroundPosition: "0px 0px",
    boxShadow: "inset 0px 0px 0px 50vh #FFF0",
  },
  {
    backgroundPosition: "-32px 0px",
    boxShadow: "inset 0px 0px 0px 50vh var(--bg)",
  },
];

let menuCloseBgKeyframes: Keyframe[] = [
  menuOpenBgKeyframes[1],
  menuOpenBgKeyframes[0],
];

//var i = 0;
for (let child of rg.children) {
  //let curr = ++i;
  child.addEventListener("mouseover", () => {
    for (let subling of rg.children) subling.classList.remove("hover");

    child.classList.add("hover");
  });

  child.addEventListener("click", () => {
    window.history.pushState({}, '', `/${child.id == 'home' ? '' : child.id + '/'}`)
  });
}

function menuOpenBg() {
  document.body.animate(menuOpenBgKeyframes, {
    duration: 600,
    easing: "cubic-bezier(0.25, 0.25, 0, 1)",
  });
  document.body.setAttribute(
    "style",
    "background-position: -32px 0px; background: box-shadow: inset 0px 0px 0px 50vh var(--bg)"
  );
}

function menuCloseBg() {
  document.body.animate(menuCloseBgKeyframes, {
    duration: 600,
    easing: "cubic-bezier(0.25, 0.25, 0, 1)",
  });
  document.body.setAttribute("style", "");

  for (let child of rg.children) child.classList.remove("hover");
}

rg.onmouseenter = (event) => { if (!ignoreMouse) openMenu(event); }

function openMenu(event: MouseEvent) {
  if (!cnt.classList.contains("navTapped")) {
    cnt.classList.add("navOpened", "navTransformed");
    rg.classList.add("hover");
    menuOpenBg();

    var hovered = false;
    for (let child of rg.children) {
      hovered = child.classList.contains("hover") || hovered;
    }

    if (!hovered) {
      if (event.clientY < window.innerHeight / 2)
        rg.firstElementChild?.classList.add("hover");
      else rg.lastElementChild?.classList.add("hover");
    }
  }

}

rg.onmouseleave = closeMenu;

const routes = {
  index:    [indexDom, () => import('/index/page')],
  about:    [aboutDom, () => import('/about/page')],
  projects: [indexDom, () => import('/index/page')],
  work:     [indexDom, () => import('/index/page')],
}

export function onMenuClick(route: string) {
  cnt.classList.remove("navTransformed");

  closeMenu(), ignoreMouse = true;
  resetCounter();
  //@ts-ignore
  buildTree(routes[route][0]);
  //@ts-ignore
  routes[route][1]().then(page => page.load());
}


export function closeMenu () {
  cnt.classList.remove("navOpened");
  rg.classList.remove("hover");
  menuCloseBg();
};

let isNavHovered = false;

nav.onclick = function () {
  if (!cnt.classList.contains("navTapped")) {
    // open menu
    compute({
      from: { skeleton: [24, 24, 24]},
      to: { text: { style: fontStyles.action, text: 'close' } }
    }).then(console.log)

    cnt.classList.add("navTapped", "navTransformed");
    tagById("nav", "text")!.innerHTML = "Close";
    menuOpenBg();
  } else {
    //close menu
    cnt.classList.remove("navTapped");
    tagById("nav", "text")!.innerHTML = "Navigation";
    menuCloseBg();
  }
};

nav.onmouseover = () => (isNavHovered = true);
nav.onmouseleave = () => (isNavHovered = false);

document.body.onclick = function () {
  if (!isNavHovered) {
    cnt.classList.remove("navTapped");
    tagById("nav", "text")!.innerHTML = "Navigation";
  }
};

let navBlur = new MotionBlur({ blurID: "cnt", watchID: "work", mult: 1 });

let motionStart = function () {
  if (!byId("cnt")?.classList.contains("navTransformed")) return;
  navBlur.mult = window.innerWidth < 920 ? 1 : 0.5;
  navBlur.invoke();
};

rg.ontransitionrun = motionStart;
rg.onanimationstart = motionStart;

rg.ontransitionend = () => navBlur.drop();
rg.onanimationend = () => navBlur.drop();

rg.onmousemove = (event) => {
  if (ignoreMouse && event.movementX>0) openMenu(event), ignoreMouse = false;
}
