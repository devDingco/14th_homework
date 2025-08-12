// 전역 기본값 (불변)
(function (w) {
  "use strict";
  w.DiaryList = w.DiaryList || {};
  w.DiaryList.DEFAULTS = Object.freeze({
    containerId: "diary-list",
    emptyMessage: "등록된 일기가 없습니다.",
    defaultImage: "./assets/profile-placeholder.png"
  });
})(window);
