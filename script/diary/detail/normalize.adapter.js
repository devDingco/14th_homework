// script/diary/detail/normalize.adapter.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore || null;

  function normalizeMoodKey(v) {
    try {
      // 스토어 유틸 우선
      if (C && typeof C.normalizeMood === "function") return C.normalizeMood(v);
      if (w.DiaryStoreUtil && typeof w.DiaryStoreUtil.normalizeMood === "function")
        return w.DiaryStoreUtil.normalizeMood(v);
    } catch (_) {}
    // 폴백 (detail 기존 로직과 동일 매핑)
    try {
      var s = String(v || "").trim().replace(/^[^\w가-힣]+/, "");
      var map = {
        "happy":"happy","행복해요":"happy",
        "sad":"sad","슬퍼요":"sad",
        "angry":"angry","화나요":"angry",
        "surprised":"surprised","놀랐어요":"surprised",
        "etc":"etc","기타":"etc"
      };
      var low = s.toLowerCase(); if (map[low]) return map[low];
      var ko = s.replace(/\s+/g,""); if (map[ko]) return map[ko];
    } catch (_) {}
    return "etc";
  }

  function deriveId(obj) {
    try {
      if (C && typeof C.deriveId === "function") return C.deriveId(obj);
      if (w.DiaryStoreUtil && typeof w.DiaryStoreUtil.deriveId === "function")
        return w.DiaryStoreUtil.deriveId(obj);
    } catch (_) {}
    // 폴백 (detail의 stableId와 동일한 해시 규칙)
    obj = obj || {};
    var date = String(obj.date || "").replace(/[\/\-]/g,".").trim();
    var title= String(obj.title||"").trim();
    var mood = String(obj.mood ||"").trim();
    var key  = (date+"|"+title+"|"+mood).toLowerCase();
    var h=0; for (var i=0;i<key.length;i++){ h=((h<<5)-h)+key.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }

  w.DetailUtil = { normalizeMoodKey: normalizeMoodKey, deriveId: deriveId };
})(window);
