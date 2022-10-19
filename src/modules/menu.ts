import { ComputeAPI, ComputeRecord } from "../interfaces";
import { worker } from "../pages/entry";
import MotionBlur from "./motionBlur";
import { byId, tagById } from "./shorthands";

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

var i = 0;
for (let child of rg.children) {
  let curr = ++i;
  child.addEventListener("mouseover", () => {
    for (let subling of rg.children) subling.classList.remove("hover");

    child.classList.add("hover");
  });

  child.addEventListener("click", () => {
    window.history.pushState({}, '', `/${child.id}`)
  });
}

function menuOpenBg(mouse: boolean) {
  document.body.animate(menuOpenBgKeyframes, {
    duration: 600,
    easing: "cubic-bezier(0.25, 0.25, 0, 1)",
  });
  document.body.setAttribute(
    "style",
    "background-position: -32px 0px; background: box-shadow: inset 0px 0px 0px 50vh var(--bg)"
  );
}

function menuCloseBg(mouse: boolean) {
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
    menuOpenBg(true);

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

export function onMenuClick() {
  closeMenu(), ignoreMouse = true;
}


function closeMenu () {
  cnt.classList.remove("navOpened");
  rg.classList.remove("hover");
  menuCloseBg(true);
};

let isNavHovered = false;

nav.onclick = function (event) {
  if (!cnt.classList.contains("navTapped")) {
    // open menu
    worker.postMessage({ deliver: 'texts', request: 'menuRender', data: {'nav': {
      from: {width: 200},
      to: {
        icon: '',
        gap: 0,
        text: 'Close'
      },
      style: 'action'
    }} } as ComputeAPI<'input'>);

    cnt.classList.add("navTapped", "navTransformed");
    tagById("nav", "text")!.innerHTML = "Close";
    menuOpenBg(false);
  } else {
    //close menu
    cnt.classList.remove("navTapped");
    tagById("nav", "text")!.innerHTML = "Navigation";
    menuCloseBg(false);
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

function renderMenu(message) {
  let data = message.data as ComputeAPI<'result'>;

  if (data.request == 'menuRender')
    console.log(data.data as ComputeRecord<'result'>);
};

window["skeleton"].then(() => worker.addEventListener('message', renderMenu));
