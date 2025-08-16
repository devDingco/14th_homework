// script/diary/form/form.save.js
(function (w) {
  "use strict";
  w.DiaryForm = w.DiaryForm || {};
  if (w.DiaryForm.save) return;

  async function save(entry){
    var S = w.DiaryStore || {};
    // 1) 정식 스토어
    if (S.api && typeof S.api.add==="function") return S.api.add(entry);
    // 2) 레거시 호환
    if (typeof w.addDiary==="function"){ w.addDiary(entry); return entry; }
    // 3) 최종 폴백: 메모리 push + 렌더
    var list = [];
    try {
      if (S.lookup && typeof S.lookup.all==="function") list = S.lookup.all().slice();
      else if (Array.isArray(w.diaryList)) list = w.diaryList;
    } catch(_){}
    list = Array.isArray(list)? list: [];
    list.push(entry);
    w.diaryList = list;

    if (w.DiaryList && typeof w.DiaryList.renderDiaries==="function") w.DiaryList.renderDiaries(list);
    else if (typeof w.renderDiaries==="function") w.renderDiaries(list);
    else if (w.DiaryList && typeof w.DiaryList.renderDiariesFromUrl==="function") w.DiaryList.renderDiariesFromUrl(location.href);

    return entry; // 예외 미전파(안전)
  }

  w.DiaryForm.save = save;
})(window);
