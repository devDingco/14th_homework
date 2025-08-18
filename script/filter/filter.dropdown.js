// script/filterDropdown.js
(function () {
  "use strict";

  // 카드에서 감정 추출: mood-happy / diary-mood-happy 둘 다 지원
  function getCardMood(card) {
    const s = card.className || "";
    const m = s.match(/\b(?:mood-|diary-mood-)([a-z0-9_-]+)/i);
    return m ? m[1].toLowerCase() : "";
  }

  function applyVisibility(want) {
    const target = (want || "all").toLowerCase();
    document.querySelectorAll(".diary-card").forEach(card => {
      const mood = getCardMood(card);
      const show = target === "all" || mood === target || mood.includes(target);
      card.classList.toggle("is-hidden", !show);
      card.setAttribute("aria-hidden", show ? "false" : "true");
      if (!show) card.tabIndex = -1; else card.removeAttribute("tabindex");
    });
  }

  function bindOnce() {
    const sel = document.querySelector("#filter-select");
    if (!sel || sel.dataset.bound === "1") return false;

    // 현재 값으로 1회 적용
    applyVisibility(sel.value);

    // 변경 시 적용
    sel.addEventListener("change", (e) => {
      const v = e.target.value;
      console.log("[filter] selected mood:", v);
      applyVisibility(v);
    }, { passive: true });

    sel.dataset.bound = "1";
    console.log("✅ filter-select bound");
    return true;
  }

  // 즉시 바인딩 시도 + 주입 지연 대비
  if (!bindOnce() && "MutationObserver" in window) {
    const mo = new MutationObserver(() => { if (bindOnce()) mo.disconnect(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  // 리스트가 리렌더되었을 때도 다시 적용
  const list = document.getElementById("diary-list");
  if (list && "MutationObserver" in window) {
    const mo2 = new MutationObserver(() => {
      const sel = document.querySelector("#filter-select");
      if (sel) applyVisibility(sel.value);
    });
    mo2.observe(list, { childList: true });
  }
})();
