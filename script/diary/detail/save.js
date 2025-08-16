// script/diary/detail/save.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  var EU = w.DetailEditUtil;

  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }
  function txt(v, fb){ return isStr(v)? v : (fb||""); }

  function persistSession(list){
    try { sessionStorage.setItem("diaryCache", JSON.stringify(list)); } catch(_) {}
  }

  function findIndex(list, id){
    try { if (EU && EU.findIndex) return EU.findIndex(list, id); } catch(_) {}
    if (!Array.isArray(list) || !isStr(id)) return -1;
    var i = list.findIndex(function(x){ return x && (x.id===id || x.diaryId===id); });
    if (i >= 0) return i;
    for (var j=0;j<list.length;j++){
      var it=list[j]; if (!it) continue;
      var derive = (C&&C.deriveId) ? C.deriveId : (EU&&EU.deriveIdSafe) ? EU.deriveIdSafe : null;
      if (derive && derive(it) === id) return j;
    }
    return -1;
  }

  // 로컬 후퇴 저장 (store API가 없을 때)
  function updateLocal(id, patch){
    var list = Array.isArray(w.diaryList) ? w.diaryList : null;
    if (!list) return null;

    var idx = findIndex(list, id);
    if (idx < 0) return null;

    var prev = list[idx] || {};
    var mood = (EU && EU.normalizeMoodForForm) ? EU.normalizeMoodForForm(patch.mood || prev.mood) : (patch.mood || prev.mood);

    var EMO = (EU && EU.MOOD_TEXT) || { happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타" };

    // 이미지 갱신 규칙: 기본이미지였다면 새 기본으로 스위칭, 커스텀은 보존
    var newImageFromPatch = isStr(patch.image) ? patch.image : null;
    var defaultPrev = "./images/" + (prev.mood || "etc") + ".png";
    var defaultNew  = "./images/" + mood + ".png";
    var nextImage   = (newImageFromPatch != null)
                       ? newImageFromPatch
                       : (prev.image === defaultPrev ? defaultNew : (prev.image || defaultNew));

    var idFn = (C&&C.deriveId) ? C.deriveId : (EU&&EU.deriveIdSafe) ? EU.deriveIdSafe : null;
    var next = Object.freeze({
      id: prev.id || prev.diaryId || (idFn ? idFn(prev) : id),
      date: prev.date,
      image: nextImage,
      mood: mood,
      emotionText: isStr(patch.emotionText) ? patch.emotionText : (EMO[mood] || "기타"),
      title: txt(patch.title, prev.title),
      content: txt(patch.content, txt(prev.content, txt(prev.desc,"")))
    });

    list.splice(idx, 1, next);
    persistSession(list);
    return next;
  }

  // 공개 API: id + patch로 저장 시도 (store.updateDiary → 로컬 후퇴)
  function saveById(id, patch){
    var updated = null;
    try {
      if (typeof w.updateDiary === "function") {
        updated = w.updateDiary(id, patch);
      }
    } catch(_){}
    if (!updated) updated = updateLocal(id, patch);
    return updated;
  }

  w.DetailSave = { saveById: saveById };
})(window);
