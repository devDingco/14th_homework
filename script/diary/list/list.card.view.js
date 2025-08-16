// script/diary/list/list.card.view.js
(function (w, d) {
  "use strict";

  function makeButton() {
    try {
      if (w.DiaryViewButton && typeof w.DiaryViewButton.clone === "function") {
        return w.DiaryViewButton.clone();
      }
    } catch(_) {}
    var b = d.createElement("button");
    b.type = "button";
    b.className = "btn-view-detail";
    b.setAttribute("data-role", "view-detail");
    b.textContent = "상세보기";
    return b;
  }

  function goDetail(getId, entry){
    var id = (typeof getId === "function") ? getId() : "";
    if (!id) return;
    try {
      if (typeof w.openDiaryDetail === "function") {
        w.openDiaryDetail(id, entry);
        return;
      }
    } catch(_) {}
    try {
      var url = "./subpage/detail.html?id=" + encodeURIComponent(id);
      w.location.href = url;
    } catch(e){ console.error("❌ 상세보기 이동 실패:", e); }
  }

  function bind(btn, getId, entry){
    btn.addEventListener("click", function(ev){
      ev.preventDefault(); ev.stopPropagation();
      goDetail(getId, entry);
    });
    btn.addEventListener("keydown", function(ev){
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault(); ev.stopPropagation();
        goDetail(getId, entry);
      }
    });
    btn.setAttribute("aria-label", "상세보기");
  }

  /**
   * container(.meta-right)에 상세보기 버튼을 1회 주입한다.
   * @param {Element} container - 보통 .meta-right 컨테이너
   * @param {Function} getId - 현재 카드의 안전한 id를 반환하는 함수
   * @param {Object} entry - 카드의 데이터(라우팅 보조)
   */
  function inject(container, getId, entry){
    if (!container || !(container instanceof Element)) return null;
    if (container.querySelector(".btn-view-detail")) return null;

    var btn = makeButton();
    try {
      var id = (typeof getId === "function") ? getId() : "";
      if (id) btn.dataset.diaryId = id;
    } catch(_) {}

    bind(btn, getId, entry);

    var first = container.firstElementChild;
    if (first && first.classList && first.classList.contains("date")) {
      container.insertBefore(btn, first);
    } else {
      container.appendChild(btn);
    }
    return btn;
  }

  w.DiaryCardView = { inject: inject };
})(window, document);
