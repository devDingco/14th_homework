(function (w) {
  "use strict";
  var U = w.DiaryListUtils;
  U.onReady(function () {
    if (Array.isArray(w.diaryList) && typeof w.renderDiaries === "function") {
      try { w.renderDiaries(w.diaryList); } catch (e) { console.error(e); }
    }
  });
})(window);
