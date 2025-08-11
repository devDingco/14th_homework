(function (g) {
  "use strict";
  function safeText(v, fallback) {
    if (v === null || v === undefined) return fallback || "";
    return String(v);
  }
  function sanitizeClassSegment(v, fallback) {
    var s = safeText(v, fallback || "unknown").toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    return s || (fallback || "unknown");
  }
  g.safeText = safeText;
  g.sanitizeClassSegment = sanitizeClassSegment;
})(window);
