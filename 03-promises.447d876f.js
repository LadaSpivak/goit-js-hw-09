!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var i=r("6JpON"),u=document.querySelector(".form > button"),l=document.querySelector(".form"),a=document.querySelectorAll("input"),c={},d={intervalId:0,timeoutId:0};function f(e){u.disabled=e}u.addEventListener("click",(function(t){t.preventDefault(),a.forEach((function(e){return c[e.getAttribute("name")]=e.value})),clearTimeout(d.intervalId),clearTimeout(d.timeoutId),d.timeoutId=setTimeout((function(){d.intervalId=setInterval((function(){new Promise((function(e,t){var n=Math.random()>.3;setTimeout((function(){n?e():t()}),c.step)})).then((function(){console.log("✅ Fulfilled promise"),e(i).Notify.success("Fulfilled promise in ".concat(c.step,"ms"))})).catch((function(){console.log("❌ Rejected promise"),e(i).Notify.failure("Rejected promise in ".concat(c.step,"ms"))}))}),c.step)}),c.delay),f(!0)})),l.addEventListener("input",(function(){var e=!0,t=!1,n=void 0;try{for(var o,r=a[Symbol.iterator]();!(e=(o=r.next()).done);e=!0){var i=o.value;if(i.value<0||""===i.value)return f(!0)}}catch(e){t=!0,n=e}finally{try{e||null==r.return||r.return()}finally{if(t)throw n}}f(!1)})),f(!0)}();
//# sourceMappingURL=03-promises.447d876f.js.map
