"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_portfolio_2025"] = self["webpackChunkmy_portfolio_2025"] || []).push([["src_js_project-animations_js"],{

/***/ "./src/js/project-animations.js":
/*!**************************************!*\
  !*** ./src/js/project-animations.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initProjectAnimations: () => (/* binding */ initProjectAnimations)\n/* harmony export */ });\n/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/ScrollTrigger */ \"./node_modules/gsap/ScrollTrigger.js\");\n\n\n\n// Accept the 'lenis' object as an argument\nfunction initProjectAnimations(lenis) {\n  var navLinks = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.toArray('.sidebar-link');\n  navLinks.forEach(function (link, index) {\n    var targetId = link.getAttribute('href');\n    var section = document.querySelector(targetId);\n    if (!section) return; // Safety check in case a section is missing\n\n    gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__.ScrollTrigger.create({\n      trigger: section,\n      start: 'top bottom',\n      // When the top of the section is 150px from viewport top\n      end: 'bottom bottom',\n      // When the bottom of the section is 150px from viewport top\n\n      // --- THIS IS THE FIX ---\n      // Use simple enter/leave events instead of onToggle\n\n      onEnter: function onEnter() {\n        link.classList.add('is-active');\n      },\n      onLeave: function onLeave() {\n        link.classList.remove('is-active');\n      },\n      onEnterBack: function onEnterBack() {\n        link.classList.add('is-active');\n      },\n      onLeaveBack: function onLeaveBack() {\n        link.classList.remove('is-active');\n      },\n      // --- END FIX ---\n\n      // This handles the progress bar *within* that same zone.\n      onUpdate: function onUpdate(self) {\n        // self.progress is 0 at 'top 150px' and 1 at 'bottom 150px'\n        var progress = self.progress * 100;\n        link.style.setProperty('--progress-width', \"\".concat(progress, \"%\"));\n      }\n    });\n\n    // --- Smooth Scroll Click Event ---\n    link.addEventListener('click', function (e) {\n      e.preventDefault(); // Stop the instant jump\n      var targetId = link.getAttribute('href');\n      if (targetId) {\n        // Tell Lenis to smoothly scroll\n        lenis.scrollTo(targetId, {\n          offset: -140 // 120px header + 20px buffer\n        });\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack://my-portfolio-2025/./src/js/project-animations.js?\n}");

/***/ })

}]);