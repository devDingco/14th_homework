// script/filter/filter.sticky.core.js
(function (w) {
  "use strict";
  // ✅ CSS-only sticky로 전환: 레거시 DOM 이동/복제를 전부 중단
  // 외부에서 존재 체크를 해도 안전하도록 얕은 스텁만 유지
  w.DiaryFilterSticky = w.DiaryFilterSticky || {};
  w.DiaryFilterSticky.init = function () { /* no-op */ };
  w.DiaryFilterSticky.enable = false;
})(window);
