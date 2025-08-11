// script/formHandler.js
(function (w) {
  "use strict";

  // 라디오 value(이모지/한글/영문 어떤 형태든) → 내부 코드로 정규화
  function normalizeMood(v) {
    v = String(v || "").toLowerCase();
    if (v.includes("행복") || v.includes("happy") || v.includes("😊")) return { mood: "happy",     emotionText: "행복해요" };
    if (v.includes("슬퍼") || v.includes("sad")   || v.includes("😢")) return { mood: "sad",       emotionText: "슬퍼요" };
    if (v.includes("놀랐") || v.includes("surpris")|| v.includes("😮")) return { mood: "surprised", emotionText: "놀랐어요" };
    if (v.includes("화나") || v.includes("angry") || v.includes("😡")) return { mood: "angry",     emotionText: "화나요" };
    return { mood: "etc", emotionText: "기타" };
  }

  function bind() {
    // componentLoader로 주입되었을 때/직접 있을 때 모두 지원
    const root = document.getElementById("form");
    const form = (root && root.querySelector("form.diary-form")) || document.querySelector("form.diary-form");
    if (!form || form.dataset.bound === "1") return false;

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();

      const fd = new FormData(form);
      const moodRaw = fd.get("mood");
      const { mood, emotionText } = normalizeMood(moodRaw);
      const title   = (fd.get("title")   || "").trim();
      const content = (fd.get("content") || "").trim();

      if (!title) {
        alert("제목을 입력해 주세요.");
        form.querySelector("#title")?.focus();
        return;
      }

      const newDiary = { mood, emotionText, title, content };
      if (typeof w.addDiary === "function") {
        w.addDiary(newDiary);           // ➜ diaryStore.js가 이미지/날짜 등 보정 후 renderDiaries 호출
        // 입력값 정리(라디오는 유지, 텍스트만 초기화)
        const t = form.querySelector("#title");   if (t) t.value = "";
        const c = form.querySelector("#content"); if (c) c.value = "";
      } else {
        console.warn("addDiary 가 없습니다. diaryStore.js 로딩 순서를 확인하세요.");
      }
    }, { passive: false });

    form.dataset.bound = "1";
    console.log("✅ initDiaryForm: bound");
    return true;
  }

  function init() {
    if (bind()) return;
    // 폼이 나중에 주입되는 경우 관찰 → 발견 즉시 바인딩
    if ("MutationObserver" in w) {
      const mo = new MutationObserver(() => { if (bind()) mo.disconnect(); });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  // 외부에서 부를 수 있게 공개 + 자동 초기화
  w.initDiaryForm = init;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

})(window);
