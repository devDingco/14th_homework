// script/core/componentLoader.js
(function (w, d) {
  "use strict";

  async function loadComponents() {
    try {
      const [header, main, form, footerRaw] = await Promise.all([
        fetch("./component/header.html").then(r => r.ok ? r.text() : Promise.reject("header.html 불러오기 실패")),
        fetch("./component/main.html").then(r => r.ok ? r.text() : Promise.reject("main.html 불러오기 실패")),
        fetch("./component/form.html").then(r => r.ok ? r.text() : Promise.reject("form.html 불러오기 실패")),
        fetch("./component/footer.html").then(r => r.ok ? r.text() : Promise.reject("footer.html 불러오기 실패")),
      ]);

      // 선택: 필터/버튼 템플릿 (없어도 계속)
      let filter = "", viewBtn = "", delBtn = "";
      try { const r = await fetch("./component/filter.html"); if (r.ok) filter = await r.text(); else console.warn("filter.html HTTP", r.status); }
      catch (e) { console.warn("⚠️ filter.html 로드 실패:", e); }
      try { const r = await fetch("./component/diary/viewButton.html"); if (r.ok) viewBtn = await r.text(); else console.warn("viewButton.html HTTP", r.status); }
      catch (e) { console.warn("⚠️ viewButton.html 로드 실패:", e); }
      try { const r = await fetch("./component/diary/deleteButton.html"); if (r.ok) delBtn = await r.text(); else console.warn("deleteButton.html HTTP", r.status); }
      catch (e) { console.warn("⚠️ deleteButton.html 로드 실패:", e); }

      const footer = footerRaw
        .replaceAll("{name}", "민지")
        .replaceAll("{year}", String(new Date().getFullYear()))
        .replaceAll("{appTitle}", "민지의 다이어리");

      const headerEl = d.getElementById("header");
      const mainEl   = d.getElementById("main");
      const formEl   = d.getElementById("form");
      const footerEl = d.getElementById("footer");
      if (!headerEl || !mainEl || !formEl || !footerEl) throw new Error("❌ 대상 요소(id)가 하나 이상 존재하지 않습니다.");

      headerEl.innerHTML = header;
      mainEl.innerHTML   = main;
      formEl.innerHTML   = form;
      footerEl.innerHTML = footer;

      if (w.initDiaryForm) w.initDiaryForm();

      // ── 필터: 리스트 바로 위에 한 번만 ──
      if (filter) {
        const listEl = mainEl.querySelector("#diary-list");
        let slot = mainEl.querySelector("#filter-slot");
        if (!slot) { slot = d.createElement("div"); slot.id = "filter-slot"; }

        if (listEl && listEl.parentNode) {
          // ✅ listEl의 ‘실제 부모’ 기준으로 삽입 (NotFoundError 방지)
          listEl.parentNode.insertBefore(slot, listEl);
        } else {
          // 리스트가 아직 없으면 <main> 안에 우선 배치
          const host = mainEl.querySelector("main") || mainEl;
          host.prepend(slot);
        }

        slot.innerHTML = filter;

        // 문서 내 중복된 #diary-filter 제거(항상 slot 내부 1개만 유지)
        d.querySelectorAll("#diary-filter").forEach(el => {
          if (el.parentElement !== slot) el.remove();
        });

        if (w.DiaryFilter && typeof w.DiaryFilter.init === "function") {
          w.DiaryFilter.init("#filter-select");
        }
        if (typeof w.alignFormToCardImageTop === "function") {
          w.alignFormToCardImageTop();
        }
      }

      // ── 버튼 템플릿: 코어 레지스트리에 등록 ──
      if (w.Templates) {
        if (viewBtn && viewBtn.trim()) w.Templates.set("diary.viewButton", viewBtn);
        if (delBtn  && delBtn.trim())  w.Templates.set("diary.deleteButton", delBtn);
        console.log("[templates] registered:", w.Templates.keys());
      } else {
        console.warn("Templates 레지스트리가 없음: template.registry.js가 먼저 로드되어야 합니다.");
      }
            // ✅ 컴포넌트/템플릿 주입 완료 신호
      d.dispatchEvent(new CustomEvent("components:ready"));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 🔸 이 파일이 로드되면 정확히 1회만 실행 (부트스트랩 유무와 무관)
  if (!w.__COMPONENTS_LOAD_ONCE__) {
    w.__COMPONENTS_LOAD_ONCE__ = true;
    if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", loadComponents, { once: true });
    else loadComponents();
  }

  // 외부에서도 호출 가능(기존 계약 유지)
  w.loadComponents = w.loadComponents || loadComponents;

})(window, document);
