// script/diary/store.persist.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  if (!C) return;

  var LS = (C.keys && C.keys.LS) || "diaryList.v1";
  var SS = (C.keys && C.keys.SS) || "diaryCache";

  function saveToStorage() {
    try {
      var json = JSON.stringify(C.state);
      try { localStorage.setItem(LS, json); } catch (e) { console.warn("localStorage 저장 실패:", e); }
      try { sessionStorage.setItem(SS, json); } catch (_) {}
    } catch (e) {
      console.warn("리스트 직렬화 실패:", e);
    }
  }

  function loadFromStorage() {
    try {
      var raw = localStorage.getItem(LS);
      if (raw) { var arr = JSON.parse(raw); if (Array.isArray(arr)) return arr; }
    } catch (e) { console.warn("localStorage 로드 실패:", e); }
    try {
      var raw2 = sessionStorage.getItem(SS);
      if (raw2) { var arr2 = JSON.parse(raw2); if (Array.isArray(arr2)) return arr2; }
    } catch (_) {}
    return null;
  }

  function initFromStorage() {
    var persisted = loadFromStorage();
    if (!Array.isArray(persisted)) return;

    C.state.splice(0, C.state.length);
    for (var i = 0; i < persisted.length; i++) {
      var item = Object.assign({}, persisted[i]);
      try { C.validateDiary(item); } catch (_) {}
      C.state.push(Object.freeze(item));
    }
    C.scheduleRender();
  }

  C.saveToStorage  = saveToStorage;
  C.loadFromStorage = loadFromStorage;
  C.initFromStorage = initFromStorage;
})(window);
