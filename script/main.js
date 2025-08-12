// script/main.js
(function (w, d) {
  "use strict";

  // 중복 실행 가드
  if (w.__DIARY_MAIN_INIT__) return;
  w.__DIARY_MAIN_INIT__ = true;

  // whenReady 폴리필 (dom.js에 있다면 이 줄은 무시됨)
  w.whenReady ||= function (fn) {
    if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  };

  // ---- (최후) 폴백: 컨테이너 확보 ----
  function ensureListContainer() {
    var el = d.getElementById("diary-list");
    if (!el) {
      var mainEl = d.getElementById("main");
      if (!mainEl) return null; // 컴포넌트 미주입 상태 → 부트스트랩에 재시도 맡김
      el = d.createElement("section");
      el.id = "diary-list";
      el.className = "diary-list";
      mainEl.appendChild(el);
    }
    return el;
  }

  // ---- (최후) 폴백: 아주 간단한 로컬 렌더러 ----
  function fallbackRender(diaries) {
    var list = ensureListContainer();
    if (!list) { console.error("❌ #diary-list가 없어 폴백 렌더를 중단합니다."); return; }
    list.innerHTML = "";
    (Array.isArray(diaries) ? diaries : []).forEach(function (entry, idx) {
      try {
        var card = d.createElement("div");
        card.className = "diary-card mood-" + (entry.mood || "etc");
        card.innerHTML =
          '<div class="card-top">' +
            '<div class="profile-wrapper">' +
              '<img class="profile-img" alt="' + (entry.mood || "") + '" src="' + (entry.image || "./images/etc.png") + '">' +
            "</div>" +
          "</div>" +
          '<div class="card-bottom">' +
            '<div class="card-meta">' +
              '<span class="emotion ' + (entry.mood || "") + '">' + (entry.emotionText || "") + "</span>" +
              '<span class="date">' + (entry.date || "") + "</span>" +
            "</div>" +
            '<div class="card-title">' + (entry.title || "(제목 없음)") + "</div>" +
          "</div>";
        list.appendChild(card);
      } catch (e) {
        console.error("❌ 카드 렌더링 실패(" + (idx + 1) + "):", e);
      }
    });
  }

  // ---- 폴백: JSON 로드 → 상태 주입 → 표준 렌더 (렌더러 없을 때만 최후 폴백 사용) ----
  async function fallbackBootstrap() {
    try {
      var res = await fetch("./script/json/data.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var data = await res.json();
      if (!Array.isArray(data)) data = [];

      // 1) 상태에 주입(참조 유지)
      if (typeof w.hydrateDiaries === "function") {
        try { w.hydrateDiaries(data, "replace"); } catch (e) { console.warn("hydrateDiaries 실패:", e); }
      } else {
        w.diaryList = Array.isArray(w.diaryList) ? w.diaryList : [];
        w.diaryList.splice(0, w.diaryList.length, ...data);
      }

      // 2) 표준 렌더 (가능하면 모듈 렌더 우선)
      if (w.DiaryList && typeof w.DiaryList.renderDiaries === "function") {
        w.DiaryList.renderDiaries(w.diaryList);
      } else if (typeof w.renderDiaries === "function") {
        w.renderDiaries(w.diaryList);
      } else {
        // 렌더러가 전혀 없을 때만 최후 폴백
        fallbackRender(w.diaryList);
      }
    } catch (e) {
      console.error("❌ 폴백 부트스트랩 실패:", e);
    }
  }

  // ---- 메인 초기화 ----
  w.whenReady(async function () {
    try {
      // 1) 컴포넌트 주입
      if (typeof w.loadComponents === "function") {
        try { await w.loadComponents(); } catch (e) { console.warn("⚠️ loadComponents 실패(계속):", e); }
      }

      // 2) 기능 스크립트(매니페스트) 로드
      if (typeof w.loadScriptsSequential === "function") {
        try { await w.loadScriptsSequential(); } catch (e) { console.warn("⚠️ loadScriptsSequential 실패(계속):", e); }
      }

      // 3) 안전 부트스트랩(있으면 사용), 없으면 폴백
      if (typeof w.bootstrapDiary === "function") {
        w.bootstrapDiary();
      } else {
        console.warn("⚠️ bootstrapDiary 없음 → 폴백 렌더 사용");
        await fallbackBootstrap();
      }
    } catch (err) {
      console.error("❌ 초기화 중 예외:", err);
    }
  });
})(window, document);
