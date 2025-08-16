// script/diary/render.js
(function (w) {
  "use strict";
  var DL = w.DiaryList = w.DiaryList || {};

  function renderDiaries(data, opts) {
    if (typeof DL.renderDiaries === "function") return DL.renderDiaries(data, opts);
    if (typeof w.renderDiaries === "function") return w.renderDiaries(data, opts);
    console.warn("renderDiaries 엔진 없음");
    return 0;
  }

  function renderDiariesFromUrl(url, opts) {
    if (typeof DL.renderDiariesFromUrl === "function") return DL.renderDiariesFromUrl(url, opts);
    if (typeof w.renderDiariesFromUrl === "function") return w.renderDiariesFromUrl(url, opts);
    console.warn("renderDiariesFromUrl 엔진 없음");
    return Promise.resolve(0);
  }

  // 기존 전역 API가 없으면 주입(호환 유지)
  if (!w.renderDiaries) w.renderDiaries = renderDiaries;
  if (!w.renderDiariesFromUrl) w.renderDiariesFromUrl = renderDiariesFromUrl;
})(window);
