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

// --- 3. Header Show/Hide Logic (Global) ---
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const headerHeight = 120; // Your header height

if(header) { // Add a check in case header doesn't exist
  lenis.on('scroll', (e) => {
    const currentScrollTop = e.scroll;

    if (currentScrollTop > headerHeight) { 
      header.classList.add('is-scrolled');

      if (currentScrollTop > lastScrollTop) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    } else {
      header.classList.remove('is-scrolled');
      header.classList.remove('is-hidden');
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
}

// --- 4. Site Loader (Global) ---
window.addEventListener('load', () => {
  lenis.stop(); // Stop scroll

  // --- FIX 1: Check for a hash in the URL ---
  const hash = window.location.hash;

  setTimeout(() => {
    document.documentElement.classList.add('is-loaded');
    
    // --- FIX 2: Only scroll to top if there is NO hash ---
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, 200);

  setTimeout(() => {
    runPageSpecificJS();
    
    ScrollTrigger.refresh();
    lenis.start();
    
    // --- FIX 3: If there *was* a hash, scroll to it now ---
    if (hash) {
      lenis.scrollTo(hash, {
        offset: -120, // Your 120px header height
        duration: 1.5, // A nice smooth scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
    
  }, 1500);

});

/**
 * This function checks what page we're on and
 * dynamically imports only the JS we need.
 */
function runPageSpecificJS() {
  
  // Check for homepage
  const isHomepage = document.querySelector('.hero-section');
  if (isHomepage) {
    import('./home-animations.js')
      .then(module => {
        module.initializeGSAPAnimations();
      })
      .catch(err => console.error('Error loading home animations:', err));
  }
  
  // Check for project page
  const isProjectPage = document.querySelector('.project-page');
  if (isProjectPage) {
    import('./project-animations.js')
      .then(module => {
        module.initProjectAnimations(lenis); // Pass lenis
      })
      .catch(err => console.error('Error loading project animations:', err));
  }

  // Check for about page
  const isAboutPage = document.querySelector('#lottie-cooking');
  if (isAboutPage) {
    import('./about-animations.js')
      .then(module => module.initAboutAnimations())
      .catch(err => console.error('Error loading about animations:', err));
  }
  
  // Check for playground page
  const isPlaygroundPage = document.querySelector('#lottie-playground');
  if (isPlaygroundPage) {
    import('./playground-animations.js')
      .then(module => module.initPlaygroundAnimations())
      .catch(err => console.error('Error loading playground animations:', err));
  }
}

// --- 5. Mobile Menu Toggle (Global) ---
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