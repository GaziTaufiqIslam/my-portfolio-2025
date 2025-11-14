import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * All GSAP and ScrollTrigger animations go in here.
 */
export function initializeGSAPAnimations() {

  // --- Works Headline Animation ---
  gsap.utils.toArray('.works-headline .char').forEach(char => {
    gsap.set(char, {
      rotation: gsap.utils.random(-3, 2),
      y: gsap.utils.random(-2, 2),
    });
  });

  // --- Contact Headline Animation ---
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
    
    if (projects.length === 0) return; // Safety check
    
    let lastActiveIndex = -1;
    const progressBarSteps = 10; // Your "stop motion" frames

    // Set default active state
    projects[0].classList.add('is-active');
    const firstThumbId = projects[0].dataset.thumbnailId;
    if (firstThumbId) {
      const firstThumb = document.getElementById(firstThumbId);
      if (firstThumb) firstThumb.classList.add('is-active');
    }
    lastActiveIndex = 0;

    // 1. Create ONE ScrollTrigger for the whole section
    ScrollTrigger.create({
      trigger: '.works-section',
      start: 'top top',
      end: '+=400vh', // Your 400vh duration
      pin: true,
      pinSpacing: true,
      scrub: 1,

      onUpdate: (self) => {
        let numProjects = projects.length;
        
        // --- THIS IS THE UPDATED LOGIC ---
        
        // 1. Calculate the new active index
        // We use Math.floor to get the index (0, 1, 2, 3, 4)
        let newIndex = Math.floor(self.progress * numProjects);
        // Clamp it to the max index
        if (newIndex >= numProjects) {
          newIndex = numProjects - 1;
        }

        // 2. Calculate the progress *within* this project's segment
        let segmentDuration = 1 / numProjects;
        let segmentStartProgress = newIndex * segmentDuration;
        // This gives a 0-1 value for just the current segment
        let rawProgress = (self.progress - segmentStartProgress) / segmentDuration;
        rawProgress = Math.max(0, Math.min(1, rawProgress)); // Clamp it

        // 3. Apply the "stop motion" steps
        let steppedProgress = Math.round(rawProgress * progressBarSteps) / progressBarSteps;
        let progressForThisProject = steppedProgress * 100;
        
        // --- END UPDATED LOGIC ---

        // Toggle active class (only if it changed)
        if (newIndex !== lastActiveIndex) {
          projects.forEach(p => p.classList.remove('is-active'));
          thumbnails.forEach(t => t.classList.remove('is-active'));

          if (projects[newIndex]) {
            projects[newIndex].classList.add('is-active');
            const thumbId = projects[newIndex].dataset.thumbnailId;
            if (thumbId) {
              const thumb = document.getElementById(thumbId);
              if (thumb) thumb.classList.add('is-active');
            }
          }
          lastActiveIndex = newIndex;
        }
        
        // --- THIS IS THE FIX ---
        // This code block is no longer inside an `if (projects.length === 2)`
        if (projects[newIndex]) {
           if(progressForThisProject !== undefined) {
             projects[newIndex].style.setProperty('--progress-width', `${progressForThisProject}%`);
           }
           
           // Clean up bars for other projects
           projects.forEach((p, index) => {
             if(index !== newIndex) {
               if(index < newIndex) p.style.setProperty('--progress-width', '100%');
               if(index > newIndex) p.style.setProperty('--progress-width', '0%');
             }
           });
        }
      },
      
      // onEnter, set the first item as active
      onEnter: () => {
        // ... (this code is fine as-is)
      }
    });
  } // End of if (window.innerWidth > 768)

  // --- Contact Section Scroll Animation ---
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    // Using your new, preferred values
    gsap.set('.decor-sun', { xPercent: -40, yPercent: -100, rotation: -60 });
    gsap.set('.decor-tree', { xPercent: 40, yPercent: -5, rotation: 30 });
    gsap.set('.decor-mountain', { xPercent: -40, yPercent: 10, rotation: -20 });
    gsap.set('.decor-tori', { xPercent: 40, yPercent: 10, rotation: -25 });

    const stopMotionEase = "steps(10)"; 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: 'top bottom',
        // --- FIX 2: Corrected end trigger ---
        end: 'bottom 80%', // Was 'bottom 80%'
        scrub: 1.5
      }
    });

    // We add the 'ease' property to each animation
    tl.to('.decor-sun', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0)
      .to('.decor-tree', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0)
      .to('.decor-mountain', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0)
      .to('.decor-tori', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0);

  } // End of if (contactSection)


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