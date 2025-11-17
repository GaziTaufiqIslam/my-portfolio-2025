
const loaderTimeout = setTimeout(() => {
  console.warn("Loader fail-safe triggered after 1.8s");
  document.documentElement.classList.add("is-loaded");
}, 1800);

import '../scss/main.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

try {


gsap.registerPlugin(ScrollTrigger);

// --- 1. Initialize Lenis (Global) ---
const lenis = new Lenis({
  duration: 0.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: true,
});

window.lenis = lenis; // For debugging

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




window.addEventListener("DOMContentLoaded", () => {
    // clearTimeout(loaderTimeout);

  const hash = window.location.hash;

  // Phase 1 — Reveal structure
  setTimeout(() => {
    document.documentElement.classList.add("is-loaded");

    if (!hash) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, 200);

  // Phase 2 — Enable interactions + scroll to hash
  setTimeout(() => {
    runPageSpecificJS();
    ScrollTrigger.refresh();

    if (hash) {
      lenis.scrollTo(hash, {
        offset: -HEADER_HEIGHT,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

} catch (err) {
  console.error("MAIN JS ERROR:", err);
  document.documentElement.classList.add("is-loaded");
}


