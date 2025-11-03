import '../scss/main.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; // <-- Import Lenis

gsap.registerPlugin(ScrollTrigger);

// --- 1. Initialize Lenis ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  smoothTouch: true,
});

// --- 2. Link Lenis to GSAP ScrollTrigger ---
lenis.on('scroll', ScrollTrigger.update);

// --- 3. The Render Loop ---
// This is required for Lenis to work
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- Site Loader & Scroll Init ---
// window.addEventListener('load', () => {

//   // --- 4. Lock Scrolling ---
//   // Stop the user from scrolling while the loader is active
//   lenis.stop(); // <-- Use Lenis's stop method

//   // --- 5. Animate Loader Out ---
//   setTimeout(() => {
//     document.documentElement.classList.add('is-loaded');
//     window.scrollTo(0, 0); // Force to top

//     // --- 6. DELAY GSAP INIT ---
//     // Wait for the loader to be GONE and the site to be FADED IN
//     setTimeout(() => {
      
//       // --- A. NOW initialize all GSAP animations ---
//       initializeGSAPAnimations();
      
//       // --- B. Refresh ScrollTrigger on the visible page ---
//       ScrollTrigger.refresh();
      
//       // --- C. Unlock scrolling ---
//       lenis.start(); // <-- Use Lenis's start method
      
//     }, 1500); // This must be >= your CSS fade-in time

//   }, 200); // 200ms initial delay

// }); // --- END of window.onload ---


/**
 * All GSAP and ScrollTrigger animations go in here.
 * This function is only called *after* the page is 100% visible.
 */
function initializeGSAPAnimations() {

  // --- Works Headline Animation ---
  gsap.utils.toArray('.works-headline .char').forEach(char => {
    gsap.set(char, {
      rotation: gsap.utils.random(-3, 2),
      y: gsap.utils.random(-2, 2),
    });
  });

  gsap.utils.toArray('.contact-headline .char').forEach(char => {
    gsap.set(char, {
      rotation: gsap.utils.random(-2, 2), // 3-5 degrees
      y: gsap.utils.random(-2, 2),     // Random y position
    });
  });

  // --- Works Section Scroll Animation ---
  if (window.innerWidth > 768) {
    const projects = gsap.utils.toArray('.project-item');
    const thumbnails = gsap.utils.toArray('.works-gallery-thumbnail');
    
    // Variable to keep track of the active item
    let lastActiveIndex = -1;

    // 1. Create ONE ScrollTrigger for the whole section
    ScrollTrigger.create({
      trigger: '.works-section',
      start: 'top top',
      endTrigger: '.works-list',
      end: '+=2000vh',
      pin: true,
      pinSpacing: true,
      scrub: 1, // Smoothly scrubs the animation (1-second "catch-up")


      // onUpdate fires every frame of the scroll
      onUpdate: (self) => {
        // self.progress is a value from 0 (start) to 1 (end)
        // We map this progress to an index in our projects array
        let newIndex = Math.round(self.progress * (projects.length - 1));

        // Only update the DOM if the index has changed
        if (newIndex !== lastActiveIndex) {
          
          // Deactivate all items
          projects.forEach(p => p.classList.remove('is-active'));
          thumbnails.forEach(t => t.classList.remove('is-active'));

          // Activate the new current item
          projects[newIndex].classList.add('is-active');
          const thumbId = projects[newIndex].dataset.thumbnailId;
          if (thumbId) {
            document.getElementById(thumbId).classList.add('is-active');
          }

          // Update our tracker
          lastActiveIndex = newIndex;
        }
      },
      
      // onEnter, set the first item as active
      onEnter: () => {
        projects[0].classList.add('is-active');
        const firstThumbId = projects[0].dataset.thumbnailId;
        if (firstThumbId) {
          document.getElementById(firstThumbId).classList.add('is-active');
        }
        lastActiveIndex = 0;
      }
    });

    // 2. We have DELETED the 'forEach' loop that created
    //    multiple triggers. This single trigger handles everything.

  } // End of if (window.innerWidth > 768)

  

  // --- Contact Section Scroll Animation ---
  const contactSection = document.querySelector('.contact-section');
  
  // Set initial off-screen positions
  gsap.set('.decor-sun', { xPercent: -5, yPercent: -100, rotation: -45 });
  gsap.set('.decor-tree', { xPercent: 40, yPercent: -5, rotation: -5 });
  gsap.set('.decor-mountain', { xPercent: -40, yPercent: 10 });
  gsap.set('.decor-tori', { xPercent: 40, yPercent: 10 });

  // Animate them to their final position (transform: 'none')
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contactSection,
      start: 'top bottom', // When section top hits viewport bottom
      end: 'bottom top', // When section bottom hits viewport top
      scrub: 1.5 // Smoothly map to scroll (1.5s "catch-up")
    }
  });

  tl.to('.decor-sun', { xPercent: 0, yPercent: 0, rotation: 0 }, 0) // 0 = start at the same time
    .to('.decor-tree', { xPercent: 0, yPercent: 0, rotation: 0 }, 0)
    .to('.decor-mountain', { xPercent: 0, yPercent: 0 }, 0)
    .to('.decor-tori', { xPercent: 0, yPercent: 0 }, 0);



}


// --- Mobile Menu Toggle ---
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

// --- Clipboard Button ---
document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('click', () => {
    const textToCopy = button.dataset.clipboardText;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Success!
      button.classList.add('is-copied');
      
      // Revert after 2 seconds
      setTimeout(() => {
        button.classList.remove('is-copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
});