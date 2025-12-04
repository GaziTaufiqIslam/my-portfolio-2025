"use strict";
(self["webpackChunkmy_portfolio_2025"] = self["webpackChunkmy_portfolio_2025"] || []).push([["src_js_home-animations_js"],{

/***/ "./src/js/home-animations.js":
/*!***********************************!*\
  !*** ./src/js/home-animations.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeGSAPAnimations: () => (/* binding */ initializeGSAPAnimations)
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");



/**
 * All GSAP and ScrollTrigger animations go in here.
 */
function initializeGSAPAnimations() {
  // --- Works Headline Animation ---
  // gsap.utils.toArray('.works-headline .char').forEach(char => {
  //   gsap.set(char, {
  //     rotation: gsap.utils.random(-3, 2),
  //     y: gsap.utils.random(-2, 2),
  //   });
  // });

  // // --- Contact Headline Animation ---
  // gsap.utils.toArray('.contact-headline .char').forEach(char => {
  //   gsap.set(char, {
  //     rotation: gsap.utils.random(-2, 2),
  //     y: gsap.utils.random(-2, 2),
  //   });
  // });

  // --- Works Section Scroll Animation ---
  if (window.innerWidth > 768) {
    var projects = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.toArray('.project-item');
    var thumbnails = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.toArray('.works-gallery-thumbnail');
    if (projects.length === 0) return; // Safety check

    var lastActiveIndex = -1;
    var progressBarSteps = 6; // Your "stop motion" frames

    // Set default active state
    projects[0].classList.add('is-active');
    var firstThumbId = projects[0].dataset.thumbnailId;
    if (firstThumbId) {
      var firstThumb = document.getElementById(firstThumbId);
      if (firstThumb) firstThumb.classList.add('is-active');
    }
    lastActiveIndex = 0;

    // 1. Create ONE ScrollTrigger for the whole section
    gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__.ScrollTrigger.create({
      trigger: '.works-section',
      start: 'top top',
      end: '+=2000vh',
      // Your 400vh duration
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: function onUpdate(self) {
        var numProjects = projects.length;

        // --- THIS IS THE UPDATED LOGIC ---

        // 1. Calculate the new active index
        // We use Math.floor to get the index (0, 1, 2, 3, 4)
        var newIndex = Math.floor(self.progress * numProjects);
        // Clamp it to the max index
        if (newIndex >= numProjects) {
          newIndex = numProjects - 1;
        }

        // 2. Calculate the progress *within* this project's segment
        var segmentDuration = 1 / numProjects;
        var segmentStartProgress = newIndex * segmentDuration;
        // This gives a 0-1 value for just the current segment
        var rawProgress = (self.progress - segmentStartProgress) / segmentDuration;
        rawProgress = Math.max(0, Math.min(1, rawProgress)); // Clamp it

        // 3. Apply the "stop motion" steps
        var steppedProgress = Math.round(rawProgress * progressBarSteps) / progressBarSteps;
        var progressForThisProject = steppedProgress * 100;

        // --- END UPDATED LOGIC ---

        // Toggle active class (only if it changed)
        if (newIndex !== lastActiveIndex) {
          projects.forEach(function (p) {
            return p.classList.remove('is-active');
          });
          thumbnails.forEach(function (t) {
            return t.classList.remove('is-active');
          });
          if (projects[newIndex]) {
            projects[newIndex].classList.add('is-active');
            var thumbId = projects[newIndex].dataset.thumbnailId;
            if (thumbId) {
              var thumb = document.getElementById(thumbId);
              if (thumb) thumb.classList.add('is-active');
            }
          }
          lastActiveIndex = newIndex;
        }

        // --- THIS IS THE FIX ---
        // This code block is no longer inside an `if (projects.length === 2)`
        if (projects[newIndex]) {
          if (progressForThisProject !== undefined) {
            projects[newIndex].style.setProperty('--progress-width', "".concat(progressForThisProject, "%"));
          }

          // Clean up bars for other projects
          projects.forEach(function (p, index) {
            if (index !== newIndex) {
              if (index < newIndex) p.style.setProperty('--progress-width', '100%');
              if (index > newIndex) p.style.setProperty('--progress-width', '0%');
            }
          });
        }
      },
      // onEnter, set the first item as active
      onEnter: function onEnter() {
        // ... (this code is fine as-is)
      }
    });
  } // End of if (window.innerWidth > 768)

  // --- Contact Section Scroll Animation ---
  // const contactSection = document.querySelector('.contact-section');
  // if (contactSection) {
  //   // Using your new, preferred values
  //   gsap.set('.decor-sun', { xPercent: -40, yPercent: -100, rotation: -60 });
  //   gsap.set('.decor-tree', { xPercent: 40, yPercent: -5, rotation: 30 });
  //   gsap.set('.decor-mountain', { xPercent: -40, yPercent: 10, rotation: -20 });
  //   gsap.set('.decor-tori', { xPercent: 40, yPercent: 10, rotation: -25 });

  //   const stopMotionEase = "steps(10)"; 

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: contactSection,
  //       start: 'top bottom',
  //       // --- FIX 2: Corrected end trigger ---
  //       end: 'bottom 80%', // Was 'bottom 80%'
  //       scrub: 1.5
  //     }
  //   });

  //   // We add the 'ease' property to each animation
  //   tl.to('.decor-sun', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0)
  //     .to('.decor-tree', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0)
  //     .to('.decor-mountain', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0)
  //     .to('.decor-tori', { xPercent: 0, yPercent: 0, rotation: 0, ease: stopMotionEase }, 0);

  // } // End of if (contactSection)

  // --- Clipboard Button ---
  document.querySelectorAll('.copy-button').forEach(function (button) {
    button.addEventListener('click', function () {
      var textToCopy = button.dataset.clipboardText;
      navigator.clipboard.writeText(textToCopy).then(function () {
        button.classList.add('is-copied');
        setTimeout(function () {
          button.classList.remove('is-copied');
        }, 2000);
      })["catch"](function (err) {
        console.error('Failed to copy: ', err);
      });
    });
  });
} // --- END OF initializeGSAPAnimations ---

/***/ })

}]);
//# sourceMappingURL=src_js_home-animations_js.bundle.js.map