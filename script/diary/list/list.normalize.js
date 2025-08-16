// script/diary/list/list.normalize.js
(function (w, d) {
  "use strict";

  var DL = w.DiaryList = w.DiaryList || {};
  var U  = w.DiaryListUtils || {};
  var C  = w.DiaryStoreCore || {};
  var DC = w.DiaryConst || {};

  function s(v){ return typeof v === "string" ? v.trim() : ""; }

  // YYYY.MM.DD(코어 규격) → YYYY-MM-DD(리스트 표시용) 변환
  function toDisplayDate(input) {
    try {
      var norm = (typeof C.normalizeDate === "function")
        ? C.normalizeDate(input)
        : null;
      if (typeof norm === "string" && norm.includes(".")) {
        return norm.replace(/\./g, "-"); // 2025.08.16 → 2025-08-16
      }
      // 숫자/ISO 등 다양한 입력 안전 처리
      var n = Number(input);
      var dt = isNaN(n) ? new Date(String(input)) : new Date(n);
      if (isNaN(dt.getTime())) throw 0;
      return dt.toISOString().slice(0, 10);
    } catch (_){
      var now = new Date();
      return now.toISOString().slice(0, 10);
    }
  }

  function normMood(m) {
    if (typeof C.normalizeMood === "function") return C.normalizeMood(m);
    if (typeof DC.moodFromInput === "function") return DC.moodFromInput(m);
    return "etc";
  }
  function labelOf(m) {
    var map = DC.emotionText;
    return (map && map[m]) || (map && map.etc) || "기타";
  }
  function imageOf(m) {
    if (typeof DC.imageFor === "function") return DC.imageFor(m);
    return "./images/" + m + ".png";
  }

  DL.normalizeEntry = function normalizeEntry(raw) {
    raw = raw || {};

    // id 보장: 주어진 값 → 코어 파생 → 임시
    var id = s(raw.id || raw._id || "");
    if (!id && typeof C.deriveId === "function") id = C.deriveId(raw);
    if (!id) id = "tmp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,8);

    // mood/label/image
    var mood = normMood(raw.mood || raw.emotion || "etc");
    var title = (typeof U.txt === "function") ? U.txt(raw.title, "(제목 없음)") : (s(raw.title) || "(제목 없음)");
    var emotionText = s(raw.emotionText) || labelOf(mood);
    var image = s(raw.image) || imageOf(mood);

    // 날짜(표시용)
    var date = toDisplayDate(raw.date);

    return {
      id: String(id),
      mood: mood,
      title: title,
      emotionText: emotionText,
      image: image,
      date: date,
      _raw: raw
    };
  };

})(window, document);
