import '../scss/main.scss';

// --- Site Loader ---

// We are hiding the body by default in CSS,
// so we must un-hide it for users without JavaScript.
document.body.classList.add('js-enabled');

// // Wait for the *entire* page (images, CSS, fonts) to load
// window.addEventListener('load', () => {
  
//   // Add a small delay for a better feel, then trigger the animation
//   setTimeout(() => {
//     document.body.classList.add('is-loaded');
//   }, 200); // 200ms delay

// });

// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector('.site-header__mobile-toggle');
const nav = document.querySelector('.site-header__nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    // Toggle the 'is-open' class on both the button and the nav
    menuToggle.classList.toggle('is-open');
    nav.classList.toggle('is-open');

    // Toggle the aria-expanded attribute for accessibility
    const isOpen = menuToggle.classList.contains('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}