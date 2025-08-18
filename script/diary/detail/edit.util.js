// script/diary/detail/edit.util.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore, U = w.DiaryStoreUtil;

  var MOOD_TEXT = { happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타" };
  var KO2EN = { "행복해요":"happy", "슬퍼요":"sad", "화나요":"angry", "놀랐어요":"surprised", "기타":"etc" };

  function normalizeMoodForForm(input){
    try { if (C && C.normalizeMood) return C.normalizeMood(input); } catch(_) {}
    try { if (U && U.normalizeMood) return U.normalizeMood(input); } catch(_) {}
    if (typeof input !== "string") return "etc";
    var s = input.replace(/^[^\w가-힣]+/, "").trim();   // "😊 행복해요" → "행복해요"
    if (KO2EN[s]) return KO2EN[s];
    s = s.toLowerCase();
    return ["happy","sad","angry","surprised","etc"].indexOf(s) >= 0 ? s : "etc";
  }

  function deriveIdSafe(obj){
    try { if (C && C.deriveId) return C.deriveId(obj); } catch(_) {}
    try { if (U && U.deriveId) return U.deriveId(obj); } catch(_) {}
    obj = obj || {};
    var date = String(obj.date||"").replace(/[\/\-]/g,".").trim();
    var title= String(obj.title||"").trim();
    var mood = String(obj.mood ||"").trim();
    var key  = (date+"|"+title+"|"+mood).toLowerCase();
    var h=0; for (var i=0;i<key.length;i++){ h=((h<<5)-h)+key.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }

  function findIndex(list, id){
    if (C && typeof C.findIndexByIdOrStable === "function") return C.findIndexByIdOrStable(id);
    if (!Array.isArray(list) || typeof id!=="string" || !id.trim()) return -1;
    var i = list.findIndex(function(x){ return x && (x.id===id || x.diaryId===id); });
    if (i >= 0) return i;
    for (var j=0;j<list.length;j++){
      var it = list[j]; if (!it) continue;
      if (deriveIdSafe(it) === id) return j;
    }
    return -1;
  }

  w.DetailEditUtil = {
    normalizeMoodForForm: normalizeMoodForForm,
    deriveIdSafe: deriveIdSafe,
    findIndex: findIndex,
    MOOD_TEXT: MOOD_TEXT
  };
})(window);
