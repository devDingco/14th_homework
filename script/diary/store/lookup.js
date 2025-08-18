// script/diary/store.lookup.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  if (!C) return;

  // id 존재 여부 확인
  function existsId(id) {
    if (!C.isNonEmptyString(id)) return false;
    var s = C.state;
    for (var i = 0; i < s.length; i++) {
      var it = s[i];
      if (it && (it.id === id || it.diaryId === id)) return true;
      if (it && C.deriveId(it) === id) return true;
    }
    return false;
  }

  // id로 인덱스 찾기(직접 id → 파생 id 순)
  function findIndexByIdOrStable(id) {
    if (!C.isNonEmptyString(id)) return -1;
    var s = C.state;
    for (var i = 0; i < s.length; i++) {
      var it = s[i];
      if (it && (it.id === id || it.diaryId === id)) return i;
    }
    for (var j = 0; j < s.length; j++) {
      var it2 = s[j];
      if (it2 && C.deriveId(it2) === id) return j;
    }
    return -1;
  }

  // 코어에 주입(동일 이름으로 덮어쓰기)
  C.existsId = existsId;
  C.findIndexByIdOrStable = findIndexByIdOrStable;
})(window);
