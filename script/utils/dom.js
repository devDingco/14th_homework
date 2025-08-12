// utils/dom.js
(function (w, d) {
  "use strict";
  if (typeof w.whenReady !== "function") {
    w.whenReady = function (fn) {
      if (typeof fn !== "function") return;
      if (d.readyState === "loading") {
        d.addEventListener("DOMContentLoaded", fn, { once: true });
      } else {
        fn();
      }
    };
  }
  if (typeof w.onReady !== "function") w.onReady = w.whenReady;
})(window, document);
