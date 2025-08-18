// script/diary/list/list.card.view.js
(function (w, d) {
  "use strict";

  var API = w.DiaryCardView = w.DiaryCardView || {};
  if (API.inject) return; // 중복 정의 방지

  function pickTemplateHTML() {
    // 1) 코어 레지스트리 우선
    if (w.Templates && typeof w.Templates.get === "function") {
      var h = w.Templates.get("diary.viewButton");
      if (typeof h === "string" && h.trim()) return h;
    }
    // 2) 레거시 JS 템플릿(현 매니페스트에 존재)
    if (w.viewButtonTemplate && typeof w.viewButtonTemplate.html === "string") {
      return w.viewButtonTemplate.html;
    }
    // 3) 초소형 폴백(문자열)
    return '<button type="button" class="diary-view-btn" aria-label="상세 보기">자세히</button>';
  }

  function makeButton(html) {
    var wrap = d.createElement("span");
    wrap.className = "meta-action meta-view";
    wrap.innerHTML = html;

    // 다양한 마크업을 폭넓게 지원
    var btn = wrap.querySelector(
      '[data-role="view-button"], .view-button, .btn-view, .diary-view-btn, button, a'
    );
    if (!btn) {
      btn = d.createElement("button");
      btn.type = "button";
      btn.className = "diary-view-btn";
      btn.textContent = "자세히";
      wrap.appendChild(btn);
    }
    return { wrap: wrap, btn: btn };
  }

  API.inject = function inject(metaRight, getId, entry) {
    try {
      if (!metaRight) return;

      var html = pickTemplateHTML();
      var ui = makeButton(html);

      // 이벤트: 카드 클릭과 충돌 없게 선 캡처 후 전파 차단
      ui.btn.addEventListener(
        "click",
        function (e) {
          try {
            e.preventDefault();
            e.stopPropagation();
            var id =
              (typeof getId === "function" ? getId() : null) ||
              (entry && (entry.id || entry.diaryId)) ||
              (w.DiaryId && typeof w.DiaryId.get === "function" ? w.DiaryId.get() : null);

            if (typeof w.openDiaryDetail === "function") {
              w.openDiaryDetail(id, entry || null);
            }
          } catch (err) {
            console.error("view button click failed:", err);
          }
        },
        true // capture 단계에서 먼저 잡아서 카드 클릭과 충돌 방지
      );

      metaRight.appendChild(ui.wrap);
    } catch (e) {
      console.error("DiaryCardView.inject failed:", e);
    }
  };
})(window, document);
