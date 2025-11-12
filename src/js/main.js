import '../scss/main.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Initialize Lenis (Global) ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: true,
});

// --- 2. The Render Loop (Global) ---
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 4. Header Show/Hide Logic ---
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const headerHeight = 120; // Use the same value as $header-height

lenis.on('scroll', (e) => {
  const currentScrollTop = e.scroll;

  // Check if we've scrolled past the header height
  if (currentScrollTop > headerHeight) { 
    header.classList.add('is-scrolled');

    if (currentScrollTop > lastScrollTop) {
      // Scrolling Down
      header.classList.add('is-hidden');
    } else {
      // Scrolling Up
      header.classList.remove('is-hidden');
    }
  } else {
    // At the top of the page
    header.classList.remove('is-scrolled');
    header.classList.remove('is-hidden');
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

// --- 3. Site Loader (Global) ---
// window.addEventListener('load', () => {
//   lenis.stop();

//   setTimeout(() => {
//     document.documentElement.classList.add('is-loaded');
//     window.scrollTo(0, 0);

//     setTimeout(() => {
//       // --- A. Run page-specific animations ---
//       runPageSpecificJS();
      
//       // --- B. Refresh ScrollTrigger & restart scroll ---
//       ScrollTrigger.refresh();
//       lenis.start();
      
//     }, 1500);

//   }, 200);
// });

/**
 * This function checks what page we're on and
 * dynamically imports only the JS we need.
 */
function runPageSpecificJS() {
  
  // Check if we are on the homepage (by looking for the hero)
  const isHomepage = document.querySelector('.hero-section');
  
  if (isHomepage) {
    // If we are, dynamically import the homepage animations
    import('./home-animations.js')
      .then(module => {
        module.initializeGSAPAnimations(); // Run the exported function
      })
      .catch(err => console.error('Error loading home animations:', err));
  }
  
  // You can add more checks here for other pages
  const isProjectPage = document.querySelector('.project-page');
  if (isProjectPage) {
    console.log('Project page detected. No specific JS loaded.');
    // You could import('./project-animations.js') here if you had any
  }
}

// --- 4. Mobile Menu Toggle (Global) ---
const menuToggle = document.querySelector('.site-header__mobile-toggle');
const nav = document.querySelector('.site-header__nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    const isOpen = menuToggle.classList.contains('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}