// script/diary/store.render.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  if (!C) return;

  function scheduleRender() {
    if (scheduleRender._t) return;
    scheduleRender._t = true;
    requestAnimationFrame(function () {
      scheduleRender._t = false;
      try {
        if (w.DiaryList && typeof w.DiaryList.renderDiaries === "function") {
          w.DiaryList.renderDiaries(C.state);
        } else if (typeof w.renderDiaries === "function") {
          w.renderDiaries(C.state);
        }
      } catch (e) {
        console.error("렌더 호출 중 오류:", e);
      }
    });
  }

  // 코어 함수 덮어쓰기(동일 API, 구현만 모듈로 분리)
  C.scheduleRender = scheduleRender;
})(window);
