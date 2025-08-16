// script/diary/detail/save.js
(function (w) {
  "use strict";
  var C  = w.DiaryStoreCore || {};
  var EU = w.DetailEditUtil || {};
  var DC = w.DiaryConst || {};

  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }
  function txt(v, fb){ return isStr(v) ? v : (fb || ""); }

  function persistSession(list){
    try { sessionStorage.setItem("diaryCache", JSON.stringify(list)); } catch(_) {}
  }

  function findIndex(list, id){
    try { if (EU && typeof EU.findIndex === "function") return EU.findIndex(list, id); } catch(_) {}
    if (!Array.isArray(list) || !isStr(id)) return -1;

    var i = list.findIndex(function(x){ return x && (x.id === id || x.diaryId === id); });
    if (i >= 0) return i;

    // 파생 ID 비교(코어 우선, 유틸 폴백)
    var derive = (C && typeof C.deriveId === "function") ? C.deriveId
               : (EU && typeof EU.deriveIdSafe === "function") ? EU.deriveIdSafe
               : null;
    if (!derive) return -1;
    for (var j = 0; j < list.length; j++){
      var it = list[j]; if (!it) continue;
      try { if (derive(it) === id) return j; } catch(_) {}
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

    // 1) 기본 병합 – 파생 필드는 나중에 validate가 채움
    var next = {
      id:       prev.id || prev.diaryId || (typeof C.deriveId === "function" ? C.deriveId(prev) : id),
      date:     isStr(patch.date) ? patch.date : prev.date,
      // mood는 원본 값 우선 병합 후, normalize는 아래에서 수행
      mood:     isStr(patch.mood) ? patch.mood : prev.mood,
      title:    txt(patch.title,   prev.title),
      content:  txt(patch.content, txt(prev.content, txt(prev.desc, ""))),
      // image/emotionText는 validate가 보강하므로 우선 병합만
      image:       txt(patch.image,       prev.image),
      emotionText: txt(patch.emotionText, prev.emotionText)
    };

    // 2) 무드 정규화 (코어 사용)
    try { if (typeof C.normalizeMood === "function") next.mood = C.normalizeMood(next.mood); } catch(_){}

    // 3) '기본값에서 기본값으로' 갱신되는 경우, 변경된 mood에 맞춰 재계산되도록 비워주기
    //    (이전 이미지/라벨이 "이전 무드의 기본값"과 동일하면 비워 validate가 새 무드의 기본으로 채우게 함)
    try {
      var prevDefaultImg = (typeof DC.imageFor === "function")
        ? DC.imageFor(prev.mood)
        : ("./images/" + (prev.mood || "etc") + ".png");

      var prevDefaultTxt = (DC.emotionText && (DC.emotionText[prev.mood] || DC.emotionText.etc)) || null;

      var moodChanged = String(prev.mood || "").trim().toLowerCase() !== String(next.mood || "").trim().toLowerCase();

      if (!isStr(patch.image) && moodChanged && isStr(prev.image) && prev.image === prevDefaultImg) {
        next.image = ""; // validate가 새 무드의 기본 이미지로 채우도록 유도
      }
      if (!isStr(patch.emotionText) && moodChanged && isStr(prev.emotionText) && prevDefaultTxt && prev.emotionText === prevDefaultTxt) {
        next.emotionText = ""; // validate가 새 무드의 기본 라벨로 채우도록 유도
      }
    } catch(_){}

    // 4) 파생 필드 채움(단일 진실원: validateDiary)
    try { if (typeof C.validateDiary === "function") C.validateDiary(next); } catch(_){}

    // 5) 불변 객체로 치환
    var frozen = Object.freeze(next);
    list.splice(idx, 1, frozen);
    persistSession(list);
    return frozen;
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
