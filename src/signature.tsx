import "@lottiefiles/lottie-player";
import animationJson from '/assets/lottie/signature.txt';

export function fireAnimation() {
  const player = document.querySelector("lottie-player") as any;
  const footer = document.getElementById('footer') as any;

  player.load(animationJson);
  player.animate(keyframes, timing);

  setTimeout(() => {
    player.classList.add('rendered');
    footer.classList.remove('torender');
    footer.classList.add('rendered');
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
