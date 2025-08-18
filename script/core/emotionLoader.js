// script/core/componentLoader.js
async function loadComponents() {
  try {
    const [header, main, form, footerRaw] = await Promise.all([
      fetch("./component/header.html").then(r => r.ok ? r.text() : Promise.reject("header.html 불러오기 실패")),
      fetch("./component/main.html").then(r => r.ok ? r.text() : Promise.reject("main.html 불러오기 실패")),
      fetch("./component/form.html").then(r => r.ok ? r.text() : Promise.reject("form.html 불러오기 실패")),
      fetch("./component/footer.html").then(r => r.ok ? r.text() : Promise.reject("footer.html 불러오기 실패")),
    ]);

    // 선택 컴포넌트: 필터/버튼 템플릿(없으면 건너뜀)
    let filter = "", viewBtn = "", delBtn = "";
    try { const r = await fetch("./component/filter.html"); if (r.ok) filter = await r.text(); } catch(e){ console.warn("⚠️ filter.html 로드 실패:", e); }
    try { const r = await fetch("./component/diary/viewButton.html"); if (r.ok) viewBtn = await r.text(); } catch(e){ /* optional */ }
    try { const r = await fetch("./component/diary/deleteButton.html"); if (r.ok) delBtn = await r.text(); } catch(e){ /* optional */ }

    const footer = footerRaw
      .replaceAll("{name}", "민지")
      .replaceAll("{year}", String(new Date().getFullYear()))
      .replaceAll("{appTitle}", "민지의 다이어리");

    const headerEl = document.getElementById("header");
    const mainEl   = document.getElementById("main");
    const formEl   = document.getElementById("form");
    const footerEl = document.getElementById("footer");
    if (!headerEl || !mainEl || !formEl || !footerEl) throw new Error("❌ 대상 요소(id)가 하나 이상 존재하지 않습니다.");

    headerEl.innerHTML = header;
    mainEl.innerHTML   = main;
    formEl.innerHTML   = form;
    footerEl.innerHTML = footer;
    if (window.initDiaryForm) window.initDiaryForm();

    // ── 필터 주입: 리스트 바로 위에, 단 한 번만 ──
    if (filter) {
      const listEl = mainEl.querySelector("#diary-list");
      let slot = mainEl.querySelector("#filter-slot");
      if (!slot) { slot = document.createElement("div"); slot.id = "filter-slot"; }
      if (listEl) mainEl.insertBefore(slot, listEl); else mainEl.prepend(slot);
      slot.innerHTML = filter;
      document.querySelectorAll("#diary-filter").forEach(el => { if (el.parentElement !== slot) el.remove(); });
      if (window.DiaryFilter?.init) window.DiaryFilter.init("#filter-select");
      if (window.alignFormToCardImageTop) window.alignFormToCardImageTop();
    }

    // ── 버튼 컴포넌트 템플릿을 코어 레지스트리에 등록 ──
    if (window.Templates) {
      if (viewBtn) window.Templates.set("diary.viewButton", viewBtn);
      if (delBtn)  window.Templates.set("diary.deleteButton", delBtn);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
