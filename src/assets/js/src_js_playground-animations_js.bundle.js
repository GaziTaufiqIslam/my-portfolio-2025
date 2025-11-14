"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_portfolio_2025"] = self["webpackChunkmy_portfolio_2025"] || []).push([["src_js_playground-animations_js"],{

/***/ "./src/js/playground-animations.js":
/*!*****************************************!*\
  !*** ./src/js/playground-animations.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initPlaygroundAnimations: () => (/* binding */ initPlaygroundAnimations)\n/* harmony export */ });\n/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lottie-web */ \"./node_modules/lottie-web/build/player/lottie.js\");\n/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction initPlaygroundAnimations() {\n  var lottieContainer = document.querySelector('#lottie-playground');\n  if (lottieContainer) {\n    lottie_web__WEBPACK_IMPORTED_MODULE_0___default().loadAnimation({\n      container: lottieContainer,\n      // The div to load into\n      renderer: 'svg',\n      loop: true,\n      autoplay: true,\n      path: '/lottie/cooking.json' // The same animation file\n    });\n  }\n}\n\n//# sourceURL=webpack://my-portfolio-2025/./src/js/playground-animations.js?\n}");

/***/ })

}]);