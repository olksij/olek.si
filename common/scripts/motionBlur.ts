let blurElement  = document.getElementById('cnt')!;
let watchElement = document.getElementById('work')!;

let previous: DOMRect;
var blurInvoked = false;

// multiply calculated blur by the coefficient
var mult: number;

// manipulate motion blur state
export default function (state: boolean, multiplier: number = 1) {
  // if the inner state equals the called one - avoid double calls of [motionBlur]
  if (blurInvoked == state) return;

  // update global variables
  blurInvoked = state;
  mult = multiplier;
  //                    add the class when [state] is true
  //                    ___________|____________
  blurElement.classList[state ? 'add' : 'remove']('navTransformed')

  if (state) {
    // when it needs to invoke an animation
    previous = watchElement.getBoundingClientRect();
    return requestAnimationFrame(motionBlur);
  }

  // remove filter: blur() from the element to avoid artifacts
  blurElement.style.filter = '';
  return;
}

function motionBlur() {
  if (!blurInvoked) return;

  // calculate the blur
  let current = watchElement.getBoundingClientRect();
  let diff = Math.abs(current.left - previous.left);
  let blur = Math.round(diff * mult * 10) / 10;

  // save the current state
  previous = current;

  // apply & call for next frame
  blurElement.style.filter = blur ? `blur(${blur}px)` : '';
  requestAnimationFrame(motionBlur);
}
