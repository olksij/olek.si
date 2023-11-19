import "@lottiefiles/lottie-player";
import animationJson from '../assets/signature.txt';

export function fireAnimation() {
  const player = document.querySelector("lottie-player");

  player.load(animationJson);
  player.animate(keyframes, timing);

  setTimeout(() => {
    player.classList.add('rendered');
    document.getElementById('footer').classList.remove('torender');
    document.getElementById('footer').classList.add('rendered');
  }, 1800);
}

const keyframes = [
  { opacity: "0" },
  { opacity: "1" },
];

const timing = {
  duration: 1000,
  iterations: 1,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
};
