// componentLoader.js
async function loadComponents() {
  try {
    const [header, main, form, footerRaw] = await Promise.all([
      fetch("./component/header.html").then(res => res.ok ? res.text() : Promise.reject("header.html 불러오기 실패")),
      fetch("./component/main.html").then(res => res.ok ? res.text() : Promise.reject("main.html 불러오기 실패")),
      fetch("./component/form.html").then(res => res.ok ? res.text() : Promise.reject("form.html 불러오기 실패")),
      fetch("./component/footer.html").then(res => res.ok ? res.text() : Promise.reject("footer.html 불러오기 실패")),
    ]);

    // 선택 컴포넌트: 필터
    let filter = "";
    try {
      filter = await fetch("./component/filter.html").then(res => res.ok ? res.text() : Promise.reject("filter.html 불러오기 실패"));
    } catch (e) {
      console.warn("⚠️ filter.html 로드 실패(계속 진행):", e);
    }

    const footer = footerRaw
      .replaceAll("{name}", "민지")
      .replaceAll("{year}", String(new Date().getFullYear()))
      .replaceAll("{appTitle}", "민지의 다이어리");

    const headerEl = document.getElementById("header");
    const mainEl   = document.getElementById("main");
    const formEl   = document.getElementById("form");
    const footerEl = document.getElementById("footer");
    if (!headerEl || !mainEl || !formEl || !footerEl) {
      throw new Error("❌ 대상 요소(id)가 하나 이상 존재하지 않습니다.");
    }

    headerEl.innerHTML = header;
    mainEl.innerHTML   = main;
    formEl.innerHTML   = form;
    footerEl.innerHTML = footer;
if (window.initDiaryForm) window.initDiaryForm();

    // 필터 주입
    if (filter) {
      let slot = mainEl.querySelector("#filter-slot") || document.getElementById("filter-slot");
      if (!slot) {
        slot = document.createElement("div");
        slot.id = "filter-slot";
        const title = mainEl.querySelector(".section-title") || mainEl.firstElementChild;
        (title && title.parentNode) ? title.parentNode.insertBefore(slot, title.nextSibling) : mainEl.prepend(slot);
      }
      slot.innerHTML = filter;

      // 🔹 주입 ‘직후’ 초기화 (여기가 핵심)
      if (window.DiaryFilter && typeof window.DiaryFilter.init === "function") {
        window.DiaryFilter.init("#filter-select");
      }
      // 레이아웃 정렬 스크립트가 있다면 같이 호출
      if (typeof window.alignFormToCardImageTop === "function") {
        window.alignFormToCardImageTop();
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
