import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * All GSAP and ScrollTrigger animations go in here.
 * This function is only called *after* the page is 100% visible.
 */
export function initializeGSAPAnimations() {

  // --- Works Headline Animation ---
  gsap.utils.toArray('.works-headline .char').forEach(char => {
    gsap.set(char, {
      rotation: gsap.utils.random(-3, 2),
      y: gsap.utils.random(-2, 2),
    });
  });

  gsap.utils.toArray('.contact-headline .char').forEach(char => {
    gsap.set(char, {
      rotation: gsap.utils.random(-2, 2),
      y: gsap.utils.random(-2, 2),
    });
  });

  // --- Works Section Scroll Animation ---
  if (window.innerWidth > 768) {
    const projects = gsap.utils.toArray('.project-item');
    const thumbnails = gsap.utils.toArray('.works-gallery-thumbnail');
    
    let lastActiveIndex = -1;

    // 1. Create ONE ScrollTrigger for the whole section
    ScrollTrigger.create({
      trigger: '.works-section',
      start: 'top top',
      // *** FIX: Removed conflicting 'endTrigger' ***
      end: '+=2000vh',
      pin: true,
      pinSpacing: true,
      scrub: 1,

      onUpdate: (self) => {
        let newIndex = Math.round(self.progress * (projects.length - 1));

        if (newIndex !== lastActiveIndex) {
          projects.forEach(p => p.classList.remove('is-active'));
          thumbnails.forEach(t => t.classList.remove('is-active'));

          if (projects[newIndex]) { // Check if project exists
            projects[newIndex].classList.add('is-active');
            const thumbId = projects[newIndex].dataset.thumbnailId;
            if (thumbId) {
              const thumb = document.getElementById(thumbId);
              if (thumb) thumb.classList.add('is-active');
            }
          }
          lastActiveIndex = newIndex;
        }
      },
      
      onEnter: () => {
        if (projects.length > 0) { // Check if projects exist
          projects[0].classList.add('is-active');
          const firstThumbId = projects[0].dataset.thumbnailId;
          if (firstThumbId) {
            const firstThumb = document.getElementById(firstThumbId);
            if (firstThumb) firstThumb.classList.add('is-active');
          }
          lastActiveIndex = 0;
        }
      }
    });
  } // End of if (window.innerWidth > 768)

  // --- Contact Section Scroll Animation ---
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) { // Added a null check just in case
    gsap.set('.decor-sun', { xPercent: -5, yPercent: -100, rotation: -45 });
    gsap.set('.decor-tree', { xPercent: 40, yPercent: -5, rotation: -5 });
    gsap.set('.decor-mountain', { xPercent: -40, yPercent: 10 });
    gsap.set('.decor-tori', { xPercent: 40, yPercent: 10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    tl.to('.decor-sun', { xPercent: 0, yPercent: 0, rotation: 0 }, 0)
      .to('.decor-tree', { xPercent: 0, yPercent: 0, rotation: 0 }, 0)
      .to('.decor-mountain', { xPercent: 0, yPercent: 0 }, 0)
      .to('.decor-tori', { xPercent: 0, yPercent: 0 }, 0);
  }

  // --- Clipboard Button ---
  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.dataset.clipboardText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        button.classList.add('is-copied');
        setTimeout(() => {
          button.classList.remove('is-copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

} // --- END OF initializeGSAPAnimations ---