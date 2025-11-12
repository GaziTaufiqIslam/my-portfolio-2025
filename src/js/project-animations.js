import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Accept the 'lenis' object as an argument
export function initProjectAnimations(lenis) { 
  const navLinks = gsap.utils.toArray('.sidebar-link');

  navLinks.forEach((link, index) => {
    const targetId = link.getAttribute('href');
    const section = document.querySelector(targetId);
    
    if (!section) return; // Safety check in case a section is missing

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',  // When the top of the section is 150px from viewport top
      end: 'bottom bottom', // When the bottom of the section is 150px from viewport top
      
      // --- THIS IS THE FIX ---
      // Use simple enter/leave events instead of onToggle
      
      onEnter: () => {
        link.classList.add('is-active');
      },
      onLeave: () => {
        link.classList.remove('is-active');
      },
      onEnterBack: () => {
        link.classList.add('is-active');
      },
      onLeaveBack: () => {
        link.classList.remove('is-active');
      },
      // --- END FIX ---
      
      // This handles the progress bar *within* that same zone.
      onUpdate: (self) => {
        // self.progress is 0 at 'top 150px' and 1 at 'bottom 150px'
        const progress = self.progress * 100;
        link.style.setProperty('--progress-width', `${progress}%`);
      },
    });

    // --- Smooth Scroll Click Event ---
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Stop the instant jump
      const targetId = link.getAttribute('href');
      
      if (targetId) {
        // Tell Lenis to smoothly scroll
        lenis.scrollTo(targetId, {
          offset: -140, // 120px header + 20px buffer
        });
      }
    });
  });
}