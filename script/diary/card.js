// script/diary/card.js — compatibility wrapper (no duplicate logic)
(function (w, d) {
  "use strict";

  var DL = w.DiaryList = w.DiaryList || {};

  // 기존 card.js가 노출하던 API 대체: 템플릿은 DiaryViewButton에 위임
  function cloneViewBtn() {
    try {
      if (w.DiaryViewButton && typeof w.DiaryViewButton.clone === "function") {
        return w.DiaryViewButton.clone();
      }
    } catch (_) {}
    // 최소 폴백
    var b = d.createElement("button");
    b.type = "button";
    b.className = "btn-view-detail";
    b.setAttribute("data-role", "view-detail");
    b.textContent = "상세보기";
    return b;
  }

  // 과거 createCard 호출 호환 → 표준 엔진으로 위임
  function createCard(entry, opts) {
    if (DL && typeof DL.createDiaryCard === "function") {
      return DL.createDiaryCard(entry, opts);
    }
    // 엔진 부재 폴백(크래시 방지용 최소 카드)
    var card = d.createElement("div");
    card.className = "diary-card";
    var title = d.createElement("div");
    title.className = "card-title";
    title.textContent = (entry && entry.title) || "(제목 없음)";
    card.appendChild(title);
    return { card: card, data: entry || {} };
  }

  // 전역 호환(과거 코드가 참조할 수 있음)
  if (!w.cloneViewBtn) w.cloneViewBtn = cloneViewBtn;
  if (!w.createCard) w.createCard = createCard;

  // 템플릿 선로딩은 전용 모듈에 위임(있을 때만)
  try {
    if (w.DiaryViewButton && typeof w.DiaryViewButton.ensure === "function") {
      if (d.readyState === "loading") {
        d.addEventListener("DOMContentLoaded", function () { w.DiaryViewButton.ensure(); }, { once: true });
      } else {
        w.DiaryViewButton.ensure();
      }
    }
  } catch (_) {}
})(window, document);
