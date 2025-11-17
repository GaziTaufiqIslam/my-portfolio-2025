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
// We no longer need lastScrollTop
const header = document.querySelector('.site-header');
const headerHeight = 120; // Your header height

if(header) { // Add a check in case header doesn't exist
  
  // This tells Lenis to update GSAP's ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  lenis.on('scroll', (e) => {
    const currentScrollTop = e.scroll;
    const velocity = e.velocity;

    // --- 1. Handle the 'is-scrolled' class (for blur/border) ---
    // This logic is based on position and is correct.
    if (currentScrollTop > headerHeight) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // --- 2. Handle the 'is-hidden' class (show/hide logic) ---
    // We only apply this logic *after* scrolling past the header
    if (currentScrollTop > headerHeight) {
        
        // Scrolling DOWN (positive velocity)
        // We use a small threshold (0.5) to ignore tiny movements
        if (velocity > 0.5) { 
            header.classList.add('is-hidden');
        } 
        // Scrolling UP (negative velocity)
        else if (velocity < -0.5) {
            header.classList.remove('is-hidden');
        }
        // If velocity is between -0.5 and 0.5, we're pausing or
        // easing, so we DO NOTHING. The header stays as it was.

    } 
    // When near the top, always show the header
    else {
      header.classList.remove('is-hidden');
    }

    // 'lastScrollTop' is no longer needed for this logic.
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

  // gsap.to('body', { duration: 0.5, opacity: 1, ease: 'power1.inOut' });

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