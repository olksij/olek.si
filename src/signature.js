import "@lottiefiles/lottie-player";
import animationJson from 'bundle-text:../assets/signature.txt';

export function fireAnimation() {
  const player = document.querySelector("lottie-player");
  player.load(animationJson);

  setTimeout(() => {
    player.classList.add('rendered');
    document.getElementById('footer').classList.remove('torender');
    document.getElementById('footer').classList.add('rendered');
  }, 3500);
}