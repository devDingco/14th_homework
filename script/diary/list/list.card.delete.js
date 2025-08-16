// script/diary/list/list.card.delete.js
(function (w, d) {
  "use strict";

  function makeButton() {
    try {
      if (w.DiaryDeleteButton && typeof w.DiaryDeleteButton.clone === "function") {
        return w.DiaryDeleteButton.clone(); // component/diary/deleteButton.html 기반
      }
    } catch(_) {}
    var b = d.createElement("button");
    b.type = "button";
    b.className = "btn-delete-card";
    b.setAttribute("data-role", "delete-card");
    b.textContent = "x";
    return b;
  }

  function removeWithFallback(id){
    try {
      if (typeof w.removeDiary === "function") {
        return !!w.removeDiary(id);
      }
      var list = Array.isArray(w.diaryList) ? w.diaryList : null;
      if (!list) return false;
      var idx = list.findIndex(function(x){ return x && (x.id===id || x.diaryId===id); });
      if (idx < 0) return false;
      list.splice(idx, 1);
      try { w.persistDiaries && w.persistDiaries(); } catch(_) {}
      try {
        if (w.DiaryList && typeof w.DiaryList.renderDiaries === "function") w.DiaryList.renderDiaries(list);
        else if (typeof w.renderDiaries === "function") w.renderDiaries(list);
      } catch(_) {}
      return true;
    } catch(_) { return false; }
  }

  function inject(card, getIdFn){
    if (!card || !(card instanceof Element)) return null;
    if (card.__delInjected__) return card.__delInjected__;

    var btn = makeButton();

    // 카드 id 계산
    var safeId = (card.dataset && card.dataset.diaryId) || (typeof getIdFn === "function" ? getIdFn() : "");
    if (safeId) {
      btn.dataset.diaryId = safeId;
      btn.title = "삭제";
      btn.setAttribute("aria-label", "이 일기 삭제");
    } else {
      btn.disabled = true;
      btn.title = "삭제할 ID를 찾을 수 없습니다.";
    }

    // ✅ 카드 클릭과 충돌 방지: 'down' 계열만 캡처 단계에서 버블 차단
    function swallow(ev){ ev.stopPropagation(); }
    ['pointerdown','mousedown','touchstart'].forEach(function(t){
      btn.addEventListener(t, swallow, { capture: true });
    });

    // 실제 삭제 동작 (타깃 단계)
    var deleting = false;
    btn.addEventListener("click", function(ev){
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

    // 키보드 보조 (타깃 단계)
    btn.addEventListener("keydown", function(ev){
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        ev.stopPropagation();
        btn.click();
      }
    });

    card.appendChild(btn);
    card.__delInjected__ = btn;
    return btn;
  }

  w.DiaryCardDelete = { inject: inject };
})(window, document);
