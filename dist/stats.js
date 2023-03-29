/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/stats.js":
/*!****************************!*\
  !*** ./assets/js/stats.js ***!
  \****************************/
/***/ (() => {

eval("// statsy\r\n\r\n$(document).ready(function() {\r\n    getDataFromApi();\r\n});\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar data_stats = '';\r\n\r\n\r\n\r\nfunction renderStats(dane) {\r\n    console.log(dane);\r\n    const template = document.getElementById('template').innerHTML;\r\n    const rendered = Mustache.render(template, data_stats);\r\n    document.getElementById('target').innerHTML = rendered;\r\n}\r\n\r\nfunction getDataFromApi() {\r\n\r\n    $.ajax({\r\n        url: 'https://api.tinyurl.com/analytics/general',\r\n        dataType: 'application/json',\r\n        type: 'GET',\r\n        async: false,\r\n        //contentType: 'application/x-www-form-urlencoded',\r\n        data: {\r\n            from : \"2021-08-10\",\r\n            api_token: \"io8NOrrVpBXZp23NDPut5BhllCmJVa0ejwCC5dqOaMsRcBmJWggErAPrXFWT\",\r\n        },\r\n        success: function(data, textStatus, jQxhr) {\r\n            var dane = jQuery.parseJSON(data);\r\n            console.log(dane);\r\n            data_stats = dane;\r\n            renderStats(data_stats);\r\n        },\r\n        error: function(jqXhr, textStatus, errorThrown) {\r\n            console.log(\" err: \" + textStatus + errorThrown);\r\n        }\r\n    });\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./assets/js/stats.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/stats.js"]();
/******/ 	
/******/ })()
;