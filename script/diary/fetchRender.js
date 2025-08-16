// script/diary/fetchRender.js
(function (w) {
  "use strict";
  var DL = w.DiaryList = w.DiaryList || {};

  function renderFromUrl(url, opts) {
    // 1) 우선: 리스트 엔진이 있으면 거기로 위임(중복 제거)
    if (typeof DL.renderDiariesFromUrl === "function") {
      return DL.renderDiariesFromUrl(url, opts);
    }

    // 2) 폴백: 기존 fetch → renderDiaries 흐름
    if (!url || typeof url !== "string") {
      console.error("유효하지 않은 URL:", url);
      return Promise.resolve(0);
    }

    // detail/index 어디서 호출돼도 안전한 상대경로 처리
    var safeUrl;
    try { safeUrl = new URL(url, w.location.href).toString(); }
    catch(_) { safeUrl = url; }

    return fetch(safeUrl, { cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then(function (json) {
        var data = Array.isArray(json) ? json : [];
        if (typeof DL.renderDiaries === "function") return DL.renderDiaries(data, opts);
        if (typeof w.renderDiaries === "function")  return w.renderDiaries(data, opts);
        console.warn("renderDiaries 엔진 없음");
        return 0;
      })
      .catch(function (err) {
        console.error("데이터 로드 실패:", err);
        if (typeof DL.renderDiaries === "function") return DL.renderDiaries([], opts);
        if (typeof w.renderDiaries === "function")  return w.renderDiaries([], opts);
        return 0;
      });
  }

  // 전역 API 유지(없을 때만 주입; render.js와 충돌 없음)
  if (!w.renderDiariesFromUrl) w.renderDiariesFromUrl = renderFromUrl;
})(window);
