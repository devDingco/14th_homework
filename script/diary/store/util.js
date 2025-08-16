// script/diary/store.util.js
(function (w) {
  "use strict";

  var ALLOWED_MOODS = ["happy", "sad", "angry", "surprised", "etc"];
  var EMOJI_TO_MOOD = {
    "행복해요": "happy",
    "슬퍼요": "sad",
    "화나요": "angry",
    "놀랐어요": "surprised",
    "기타": "etc"
  };

  function isNonEmptyString(v) {
    return typeof v === "string" && v.trim().length > 0;
  }

  function normalizeMood(input) {
    if (!isNonEmptyString(input)) return "etc";
    var s = String(input).trim();
    s = s.replace(/^[^\w가-힣]+/, "").trim();     // 이모지 등 제거
    if (EMOJI_TO_MOOD[s]) return EMOJI_TO_MOOD[s];

    var low = s.toLowerCase();
    return ALLOWED_MOODS.indexOf(low) >= 0 ? low : "etc";
  }

  function normalizeDate(v) {
    try {
      if (isNonEmptyString(v)) {
        var x = String(v).replace(/[\/\-]/g, ".").trim();
        var m = x.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})$/);
        if (m) {
          var yy = m[1], mm = ("0" + m[2]).slice(-2), dd = ("0" + m[3]).slice(-2);
          return yy + "." + mm + "." + dd;
        }
      }
      var now = new Date(isNonEmptyString(v) ? v : undefined);
      if (isNaN(+now)) now = new Date();
      var y = now.getFullYear(), mo = ("0" + (now.getMonth() + 1)).slice(-2), d = ("0" + now.getDate()).slice(-2);
      return y + "." + mo + "." + d;
    } catch (_e) {
      var t = new Date();
      var y2 = t.getFullYear(), m2 = ("0" + (t.getMonth() + 1)).slice(-2), d2 = ("0" + t.getDate()).slice(-2);
      return y2 + "." + m2 + "." + d2;
    }
  }

  function deriveId(d) {
    var key = [
      String(d.date || "").trim().toLowerCase(),
      String(d.title || "").trim().toLowerCase(),
      String(d.mood || "").trim().toLowerCase()
    ].join("|");
    var h = 0;
    for (var i = 0; i < key.length; i++) { h = ((h << 5) - h) + key.charCodeAt(i); h |= 0; }
    return "d" + Math.abs(h);
  }

  w.DiaryStoreUtil = {
    ALLOWED_MOODS: ALLOWED_MOODS,
    EMOJI_TO_MOOD: EMOJI_TO_MOOD,
    isNonEmptyString: isNonEmptyString,
    normalizeMood: normalizeMood,
    normalizeDate: normalizeDate,
    deriveId: deriveId
  };
})(window);
