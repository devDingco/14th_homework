// script/diary/viewButtonEnhancer.js
(function (w, d) {
  "use strict";

  var API = w.DiaryCardView; // 상세보기 버튼 주입 모듈

  function $all(sel, root){ return (root||d).querySelectorAll(sel); }

  // .card-meta 안에 버튼을 1회 주입
  function injectMeta(meta){
    if (!meta || !API || typeof API.inject !== "function") return;

    // .meta-right 보장
    var right = meta.querySelector(".meta-right");
    if (!right) {
      right = d.createElement("div");
      right.className = "meta-right";
      meta.appendChild(right);
    }

    // 현재 카드 ID resolver
    function getId(){
      var card = meta.closest(".diary-card");
      if (!card) return "";
      return card.dataset.diaryId
        || (w.DiaryId && typeof w.DiaryId.get === "function" ? w.DiaryId.get({}, card) : "")
        || "";
    }

    // 버튼 주입(중복이면 내부에서 무시)
    API.inject(right, getId, null);
  }

  // 최초 주입
  function attach(rootSel){
    var root = typeof rootSel === "string" ? d.querySelector(rootSel) : (rootSel || d);
    $all(".diary-card .card-meta", root).forEach(injectMeta);
  }

  // 이후 추가 카드 감지
  var observer = null;
  function observe(rootSel){
    var root = typeof rootSel === "string" ? d.querySelector(rootSel) : (rootSel || d);
    if (!root) return;
    if (observer) observer.disconnect();
    observer = new MutationObserver(function(muts){
      muts.forEach(function(m){
        (m.addedNodes || []).forEach(function(node){
          if (!(node instanceof Element)) return;
          if (node.matches && node.matches(".diary-card .card-meta")) injectMeta(node);
          else if (node.querySelectorAll) node.querySelectorAll(".diary-card .card-meta").forEach(injectMeta);
        });
      });
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  // 공개 API (기존 시그니처 유지)
  w.ViewButtonEnhancer = {
    init: function (rootSel) { attach(rootSel || "#diary-list"); observe(rootSel || "#diary-list"); },
    attach: function (rootSel) { attach(rootSel || "#diary-list"); }
  };

  // 자동 초기화
  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", function(){ w.ViewButtonEnhancer.init("#diary-list"); }, { once: true });
  } else {
    w.ViewButtonEnhancer.init("#diary-list");
  }
})(window, document);
