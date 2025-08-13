// script/diary/list/list.utils.js
(function (w, d) {
  "use strict";

  var U = w.DiaryListUtils = w.DiaryListUtils || {};

  U.onReady = function (fn) {
    (d.readyState === "loading")
      ? d.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();
  };

  U.txt = function (v, fb) { return (v === null || v === undefined) ? (fb || "") : String(v); };

  U.clsSeg = function (v, fb) {
    var s = U.txt(v, fb || "unknown").toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    return s || fb || "unknown";
  };

  U.isThenable = function (x) { return x && typeof x.then === "function"; };

  // ✅ 안정적인 ID 생성기: 원본에 id/_id가 있으면 사용하고, 없으면 해시로 생성
  U.stableId = function (raw) {
    if (raw && raw.id)   return String(raw.id);
    if (raw && raw._id)  return String(raw._id);

    // 제목/날짜/감정을 기반으로 결정적 해시 생성
    var date = U.txt(raw && raw.date, "");
    var title = U.txt(raw && raw.title, "");
    var mood = U.txt(raw && (raw.mood || raw.emotion), "");

    var seed = [date, title, mood].join("|");

    // FNV-1a 변형 해시 (충돌 낮고 빠름)
    var h = 2166136261 >>> 0;
    for (var i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return "d" + h.toString(36);
  };

  // ✅ 다른 코드에서 DL.stableId로도 접근 가능하도록 별칭 제공
  var DL = w.DiaryList = w.DiaryList || {};
  if (typeof DL.stableId !== "function") {
    DL.stableId = U.stableId;
  }

})(window, document);
