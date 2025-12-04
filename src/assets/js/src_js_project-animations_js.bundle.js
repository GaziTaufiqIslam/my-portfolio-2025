"use strict";
(self["webpackChunkmy_portfolio_2025"] = self["webpackChunkmy_portfolio_2025"] || []).push([["src_js_project-animations_js"],{

/***/ "./src/js/project-animations.js":
/*!**************************************!*\
  !*** ./src/js/project-animations.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initProjectAnimations: () => (/* binding */ initProjectAnimations)
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");



// Accept the 'lenis' object as an argument
function initProjectAnimations(lenis) {
  var navLinks = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.toArray('.sidebar-link');
  navLinks.forEach(function (link, index) {
    var targetId = link.getAttribute('href');
    var section = document.querySelector(targetId);
    if (!section) return; // Safety check in case a section is missing

    gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__.ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      // When the top of the section is 150px from viewport top
      end: 'bottom bottom',
      // When the bottom of the section is 150px from viewport top

      // --- THIS IS THE FIX ---
      // Use simple enter/leave events instead of onToggle

      onEnter: function onEnter() {
        link.classList.add('is-active');
      },
      onLeave: function onLeave() {
        link.classList.remove('is-active');
      },
      onEnterBack: function onEnterBack() {
        link.classList.add('is-active');
      },
      onLeaveBack: function onLeaveBack() {
        link.classList.remove('is-active');
      },
      // --- END FIX ---

      // This handles the progress bar *within* that same zone.
      onUpdate: function onUpdate(self) {
        // self.progress is 0 at 'top 150px' and 1 at 'bottom 150px'
        var progress = self.progress * 100;
        link.style.setProperty('--progress-width', "".concat(progress, "%"));
      }
    });

    // --- Smooth Scroll Click Event ---
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Stop the instant jump
      var targetId = link.getAttribute('href');
      if (targetId) {
        // Tell Lenis to smoothly scroll
        lenis.scrollTo(targetId, {
          offset: -140 // 120px header + 20px buffer
        });
      }
    });
  });
}

/***/ })

}]);
//# sourceMappingURL=src_js_project-animations_js.bundle.js.map