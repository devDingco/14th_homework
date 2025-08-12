(function (w, d) {
  "use strict";
  var U = w.DiaryListUtils = w.DiaryListUtils || {};
  U.onReady = function (fn) {
    (d.readyState === "loading") ? d.addEventListener("DOMContentLoaded", fn, { once: true }) : fn();
  };
  U.txt = function (v, fb) { return (v === null || v === undefined) ? (fb || "") : String(v); };
  U.clsSeg = function (v, fb) {
    var s = U.txt(v, fb || "unknown").toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    return s || fb || "unknown";
  };
  U.isThenable = function (x) { return x && typeof x.then === "function"; };
})(window, document);
