(function (g) {
  "use strict";
  function whenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }
  g.whenReady = whenReady;
})(window);
