"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkchuangshiji"] = self["webpackChunkchuangshiji"] || []).push([["src_views_admin_course_Course_vue-src_components_uploadBigFile_vue"],{

/***/ "./src/views/admin/course/Course.vue":
/*!*******************************************!*\
  !*** ./src/views/admin/course/Course.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Course_vue_vue_type_template_id_5b1a6776___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Course.vue?vue&type=template&id=5b1a6776& */ \"./src/views/admin/course/Course.vue?vue&type=template&id=5b1a6776&\");\n/* harmony import */ var _Course_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Course.vue?vue&type=script&lang=js& */ \"./src/views/admin/course/Course.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Course_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Course_vue_vue_type_template_id_5b1a6776___WEBPACK_IMPORTED_MODULE_0__.render,\n  _Course_vue_vue_type_template_id_5b1a6776___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/admin/course/Course.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://chuangshiji/./src/views/admin/course/Course.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/admin/course/Course.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/admin/course/Course.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_uploadBigFile_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/uploadBigFile.vue */ \"./src/components/uploadBigFile.vue\");\n/* harmony import */ var xgplayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xgplayer */ \"./node_modules/.store/xgplayer@3.0.5/node_modules/xgplayer/es/index.umd.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    components: { uploadBigFile: _components_uploadBigFile_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"] },\r\n    data() {\r\n        return {\r\n            chunksize: 10,\r\n        }\r\n    },\r\n    mounted() {\r\n        const videoDom = this.$refs.videoRef;\r\n        //videoDom.src = 'https://xxx.mp4';\r\n        videoDom.load();\r\n        videoDom.addEventListener('canplay', this.canPlayVideo);\r\n        this.initPlayer();\r\n    },\r\n    methods: {\r\n        clickHandle() {\r\n            let url = this.$router.resolve({\r\n                path:'/admin/course/create'\r\n            });\r\n            window.open(url.href,'_blank');\r\n        },\r\n        canPlayVideo() {\r\n            const videoDom = this.$refs.videoRef;\r\n            if (!videoDom) return;\r\n            /* if (videoDom.currentTime > 0) {\r\n                videoDom.currentTime = 0;\r\n            } */\r\n            videoDom.currentTime = 60 * 30;\r\n            videoDom.play();\r\n            /* this.videoLoading = false;\r\n            this.isPaused = videoDom.paused;  */// 后续 UI 样式\r\n            videoDom.removeEventListener('canplay', this.canPlayVideo);\r\n        },\r\n        initPlayer() {\r\n            const config = {\r\n            id: 'xg-player',\r\n            url: '/public/uploads/魔女-2018_BD韩语中字.mp4',\r\n            width: 600,\r\n          };\r\n            const player = new xgplayer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](config);\r\n\r\n\r\n        }\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://chuangshiji/./src/views/admin/course/Course.vue?./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./src/views/admin/course/Course.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./src/views/admin/course/Course.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Course_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Course.vue?vue&type=script&lang=js& */ \"./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/admin/course/Course.vue?vue&type=script&lang=js&\");\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Course_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack://chuangshiji/./src/views/admin/course/Course.vue?");

/***/ }),

/***/ "./src/views/admin/course/Course.vue?vue&type=template&id=5b1a6776&":
/*!**************************************************************************!*\
  !*** ./src/views/admin/course/Course.vue?vue&type=template&id=5b1a6776& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Course_vue_vue_type_template_id_5b1a6776___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Course_vue_vue_type_template_id_5b1a6776___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Course_vue_vue_type_template_id_5b1a6776___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Course.vue?vue&type=template&id=5b1a6776& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/admin/course/Course.vue?vue&type=template&id=5b1a6776&\");\n\n\n//# sourceURL=webpack://chuangshiji/./src/views/admin/course/Course.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/admin/course/Course.vue?vue&type=template&id=5b1a6776&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/admin/course/Course.vue?vue&type=template&id=5b1a6776& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c\n  return _c(\n    \"div\",\n    { staticClass: \"admin-course\" },\n    [\n      _c(\"el-button\", { on: { click: _vm.clickHandle } }, [_vm._v(\"新建课程\")]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"upload-file\" }, [_c(\"uploadBigFile\")], 1),\n      _vm._v(\" \"),\n      _c(\"video\", {\n        ref: \"videoRef\",\n        attrs: {\n          src: \"/public/uploads/魔女-2018_BD韩语中字.mp4\",\n          poster: \"http://localhost:3001/static/img/home/3.jpg\",\n          preload: \"auto\",\n          width: \"500px\",\n          controls: \"\",\n          playsinline: \"\",\n          \"webkit-playsinline\": \"\",\n          muted: \"\",\n        },\n        domProps: { muted: true },\n      }),\n      _vm._v(\" \"),\n      _c(\"div\", { attrs: { id: \"xg-player\" } }),\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://chuangshiji/./src/views/admin/course/Course.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet%5B1%5D.rules%5B1%5D!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ })

}]);