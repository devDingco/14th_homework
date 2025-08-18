// script/diary/list/list.card.delete.js
(function (w, d) {
  "use strict";

  var API = w.DiaryCardDelete = w.DiaryCardDelete || {};
  if (API.inject) return; // 중복 정의 방지

  // ── 템플릿 선택: Templates 레지스트리 우선 → 레거시 clone → 문자열 폴백 ──
  function pickTemplateHTML() {
    try {
      if (w.Templates && typeof w.Templates.get === "function") {
        var h = w.Templates.get("diary.deleteButton");
        if (typeof h === "string" && h.trim()) return h;
      }
    } catch (_) {}
    return ""; // 없으면 비워서 다음 단계로
  }

  function makeButtonFromHTML(html) {
    if (typeof html === "string" && html.trim()) {
      var wrap = d.createElement("span");
      wrap.innerHTML = html;
      var btn = wrap.querySelector(
        '[data-role="delete-card"], .btn-delete-card, .delete-button, button, a'
      );
      if (btn) return btn;
    }
    return null;
  }

  function makeButton() {
    // 1) 레지스트리 템플릿
    var html = pickTemplateHTML();
    var fromTpl = makeButtonFromHTML(html);
    if (fromTpl) return fromTpl;

    // 2) 레거시: component/diary/deleteButton.html 기반 전역 클론
    try {
      if (w.DiaryDeleteButton && typeof w.DiaryDeleteButton.clone === "function") {
        return w.DiaryDeleteButton.clone();
      }
    } catch (_) {}

    // 3) 초소형 폴백
    var b = d.createElement("button");
    b.type = "button";
    b.className = "btn-delete-card";
    b.setAttribute("data-role", "delete-card");
    b.textContent = "x";
    return b;
  }

  function removeWithFallback(id) {
    try {
      if (typeof w.removeDiary === "function") return !!w.removeDiary(id);
      var list = Array.isArray(w.diaryList) ? w.diaryList : null;
      if (!list) return false;
      var idx = list.findIndex(function (x) { return x && (x.id === id || x.diaryId === id); });
      if (idx < 0) return false;
      list.splice(idx, 1);
      try { w.persistDiaries && w.persistDiaries(); } catch (_) {}
      try {
        if (w.DiaryList && typeof w.DiaryList.renderDiaries === "function") w.DiaryList.renderDiaries(list);
        else if (typeof w.renderDiaries === "function") w.renderDiaries(list);
      } catch (_) {}
      return true;
    } catch (_) { return false; }
  }

  API.inject = function inject(card, getIdFn) {
    if (!card || !(card instanceof Element)) return null;
    if (card.__delInjected__) return card.__delInjected__;

    var btn = makeButton();

    // 앵커 템플릿 대비
    if (btn.tagName === "A") {
      if (!btn.getAttribute("href")) btn.setAttribute("href", "#");
      btn.setAttribute("role", "button");
    }

    // 카드 id 계산 + 접근성
    var safeId = (card.dataset && card.dataset.diaryId) || (typeof getIdFn === "function" ? getIdFn() : "");
    if (safeId) {
      btn.dataset.diaryId = safeId;
      if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "이 일기 삭제");
      if (!btn.title) btn.title = "삭제";
    } else {
      btn.disabled = true;
      btn.title = "삭제할 ID를 찾을 수 없습니다.";
    }

    // ✅ 카드 클릭과 충돌 방지: 'down' 계열은 캡처 단계에서 차단
    function swallow(ev) { ev.stopPropagation(); }
    ["pointerdown", "mousedown", "touchstart"].forEach(function (t) {
      btn.addEventListener(t, swallow, { capture: true });
    });

    // 실제 삭제 동작
    var deleting = false;
    btn.addEventListener("click", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (deleting || btn.disabled) return;

      var id = btn.dataset.diaryId
        || (card.dataset && card.dataset.diaryId)
        || (typeof getIdFn === "function" ? getIdFn() : "");
      if (!id) { alert("삭제할 일기의 ID를 찾을 수 없습니다."); return; }
      if (!confirm("정말 삭제할까요? 삭제는 되돌릴 수 없습니다.")) return;

      deleting = true; btn.disabled = true;
      var ok = removeWithFallback(id);
      if (!ok) {
        alert("삭제 중 오류가 발생했습니다.");
        btn.disabled = false; deleting = false;
      }
    }, { passive: false });

    // 키보드 보조
    btn.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        ev.stopPropagation();
        btn.click();
      }
    });

    card.appendChild(btn);
    card.__delInjected__ = btn;
    return btn;
  };
})(window, document);
