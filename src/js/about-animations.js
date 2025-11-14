import lottie from 'lottie-web';

export function initAboutAnimations() {

  const lottieContainer = document.querySelector('#lottie-cooking');

  if (lottieContainer) {
    lottie.loadAnimation({
      container: lottieContainer, // The div to load into
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lottie/cooking.json' // The path to your animation
    });
  }
}