// script/diary/list/detail.bind.adapter.js
(function (w, d) {
  "use strict";

  function markOnce(el, key) {
    if (!el) return false;
    key = key || "__detailBound_card__";
    if (el[key]) return false;
    el[key] = true;
    return true;
  }

  function showPreview(entry) {
    var lines = ["[일기 상세 정보]"];
    if (entry && entry.date) lines.push("📅 날짜: " + entry.date);
    if (entry && entry.emotionText) lines.push("😊 기분: " + entry.emotionText);
    if (entry && entry.title) lines.push("📝 제목: " + entry.title);
    alert(lines.join("\n"));
  }

  // list.bind.js가 호출하는 표준 시그니처
  // 역할: "카드 전체 클릭시 alert"만 붙인다 (원래 폴백 UX를 그대로 재현)
  w.bindDiaryDetail = function (card, entry) {
    try {
      if (!card) return;
      // 버튼 클릭은 list.card.js가 이미 stopPropagation 처리 → 카드로 버블되지 않음
      if (!markOnce(card, "__detailBound_card__")) return;
      card.addEventListener("click", function () {
        showPreview(entry);
      }, { passive: true });
    } catch (e) {
      console.warn("bindDiaryDetail 오류:", e);
    }
  };
})(window, document);
