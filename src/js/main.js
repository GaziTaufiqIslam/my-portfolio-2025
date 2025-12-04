import '../scss/main.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';


gsap.registerPlugin(ScrollTrigger);

// --- 1. Initialize Lenis (Global) ---
const lenis = new Lenis({
  duration: 0.8,
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
  console.log("heelo");
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
const loaderTimeout = setTimeout(() => {
  console.warn("Loader fail-safe triggered after 1.8s");
  document.documentElement.classList.add("is-loaded");
}, 1800);



window.addEventListener("DOMContentLoaded", () => {
    clearTimeout(loaderTimeout);

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
        offset: -(headerHeight),
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



// --- 7. Custom Cursor Logic ---
  const cursor = document.querySelector('.cursor');

  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3, 
        ease: 'power2.out'
      });
    });

    // 1. Links and Buttons (Scale Up)
    const linkTargets = document.querySelectorAll('a, button, .project-card');
    linkTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        gsap.to(cursor, { 
          scale: 2, 
          opacity: 0.5, 
          // mixBlendMode: 'difference', 
          duration: 0.3 
        });
      });
      
      target.addEventListener('mouseleave', () => {
        gsap.to(cursor, { 
          scale: 1, 
          opacity: 1, 
          // mixBlendMode: 'difference', 
          duration: 0.3 
        });
      });
    });

    // // 2. Images (Negative Effect)
    // const imageTargets = document.querySelectorAll('img');
    // imageTargets.forEach(target => {
    //   target.addEventListener('mouseenter', () => {
    //     gsap.to(cursor, { 
    //       scale: 1.1, 
    //       opacity: 1, 
    //       mixBlendMode: 'difference', 
    //       duration: 0.3 
    //     });
    //   });
      
    //   target.addEventListener('mouseleave', () => {
    //     gsap.to(cursor, { 
    //       scale: 1, 
    //       opacity: 1, 
    //       mixBlendMode: 'normal', 
    //       duration: 0.3 
    //     });
    //   });
    // });

    // document.addEventListener('mouseleave', () => {
    //   console.log('mouse left');
    //   gsap.to(cursor, {
    //     autoAlpha: 0,
    //     duration: 0.2
    //   });
    // });

    // --- A. Project Cards (Priority High) ---
    const projectTargets = document.querySelectorAll('.project-card');
    projectTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        
        // Check if this is a "Coming Soon" card
        const isComingSoon = target.classList.contains('project-card--coming-soon');
        
        if (isComingSoon) {
          cursor.textContent = "Coming Soon...";
          // Scale larger (6x) to fit the longer text
          gsap.to(cursor, { 
            scale: 6, 
            opacity: 1, 
            mixBlendMode: 'normal', 
            backgroundColor: '#451C64',
            fontSize: 2,
            duration: 0.3 
          });
        } else {
          cursor.textContent = "View";
          // Standard scale (4x)
          gsap.to(cursor, { 
            scale: 6, 
            opacity: 1, 
            fontSize: 2.335,
            mixBlendMode: 'normal', 
            backgroundColor: '#451C64', 
            duration: 0.3 
          });
        }
      });

      target.addEventListener('mouseleave', () => {
        cursor.textContent = ""; // Remove text
        gsap.to(cursor, { 
          scale: 1, 
          opacity: 1, 
          backgroundColor: '#67E3F6',
            mixBlendMode: 'difference', 
          duration: 0.3 
        });
      });
    });


    document.addEventListener('mouseleave', () => {
      // console.log('mouse left');
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.2
      });
    });
  }





  // --- Clipboard Button & Toast Logic ---
  const copyButtons = document.querySelectorAll('.copy-button');
  const toast = document.getElementById('copy-toast');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.dataset.clipboardText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        
        // 1. Animate Button (Visual feedback on the button itself)
        button.classList.add('is-copied');
        setTimeout(() => {
          button.classList.remove('is-copied');
        }, 2000);

        // 2. Show Toast
        if (toast) {
          toast.classList.add('is-visible');
          
          // Hide toast after 3 seconds
          setTimeout(() => {
            toast.classList.remove('is-visible');
          }, 3000);
        }

      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });