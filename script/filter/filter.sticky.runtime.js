// script/filter/filter.sticky.runtime.js
(function (w, d) {
  "use strict";
  if (w.__FILTER_STICKY_NOOP__) return;
  w.__FILTER_STICKY_NOOP__ = true;

  function setHeaderHeightVar() {
    var h = 0, hd = d.querySelector("header, .page-header");
    try {
      if (hd) {
        var pos = w.getComputedStyle(hd).position;
        var isFixed = (pos === "fixed" || pos === "sticky");
        h = isFixed ? Math.round(hd.getBoundingClientRect().height) : 0; // ✅ 핵심
      }
    } catch (_) {}
    d.documentElement.style.setProperty("--header-h", h + "px");
    d.documentElement.style.setProperty("--sticky-top", "var(--header-h)");
  }

  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", setHeaderHeightVar, { once: true });
  } else {
    setHeaderHeightVar();
  }
  w.addEventListener("resize", setHeaderHeightVar);
})(window, document);
