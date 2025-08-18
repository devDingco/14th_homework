// script/diary/list/list.autorender.js
(function (w, d) {
  "use strict";

  var DL = w.DiaryList = w.DiaryList || {};

  // 현재 문서에 카드가 이미 그려졌는지 체크 (중복 렌더 방지)
  function hasCards(root) {
    root = root || d;
    return !!root.querySelector(".diary-card");
  }

  // 초기 한 번만 시도: 데이터가 준비돼 있고 화면이 비어있을 때만 렌더
  function tryInitialRender() {
    if (hasCards()) return;                              // 이미 다른 곳에서 렌더함
    if (!DL || typeof DL.renderDiaries !== "function") return;

    var data = w.diaryList;
    if (Array.isArray(data) && data.length) {
      try { DL.renderDiaries(data); } catch (e) { console.warn("[autorender] render 실패:", e); }
    }
  }

  function onReady() { tryInitialRender(); }

  // DOM 준비 후 1회 시도
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", onReady, { once: true });
  else onReady();

  // (선택) 데이터가 비동기로 준비될 경우를 위한 신호 — 중복 렌더는 여전히 차단
  // 다른 모듈에서: window.dispatchEvent(new CustomEvent("diary:data-ready", { detail: { list } }));
  w.addEventListener("diary:data-ready", function (ev) {
    if (hasCards()) return;                               // 이미 렌더된 상태면 무시
    var list = ev && ev.detail && ev.detail.list;
    if (Array.isArray(list) && list.length) {
      try { DL.renderDiaries(list); } catch (e) { console.warn("[autorender] event render 실패:", e); }
    }
  });
})(window, document);
