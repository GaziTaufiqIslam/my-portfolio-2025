"use strict";
(self["webpackChunkmy_portfolio_2025"] = self["webpackChunkmy_portfolio_2025"] || []).push([["src_js_about-animations_js"],{

/***/ "./src/js/about-animations.js":
/*!************************************!*\
  !*** ./src/js/about-animations.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initAboutAnimations: () => (/* binding */ initAboutAnimations)
/* harmony export */ });
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lottie-web */ "./node_modules/lottie-web/build/player/lottie.js");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_0__);

function initAboutAnimations() {
  var lottieContainer = document.querySelector('#lottie-cooking');
  if (lottieContainer) {
    lottie_web__WEBPACK_IMPORTED_MODULE_0___default().loadAnimation({
      container: lottieContainer,
      // The div to load into
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lottie/cooking.json' // The path to your animation
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_js_about-animations_js.bundle.js.map