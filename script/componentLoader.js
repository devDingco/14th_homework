// componentLoader.js

async function loadComponents() {
  const components = await Promise.all([
    fetch("./component/header.html").then(res => res.ok ? res.text() : Promise.reject("header.html 불러오기 실패")),
    fetch("./component/main.html").then(res => res.ok ? res.text() : Promise.reject("main.html 불러오기 실패")),
    fetch("./component/form.html").then(res => res.ok ? res.text() : Promise.reject("form.html 불러오기 실패")),
    fetch("./component/footer.html").then(res => res.ok ? res.text() : Promise.reject("footer.html 불러오기 실패")),
  ]);

  const [header, main, form, footerRaw] = components;

  const footer = footerRaw
    .replaceAll("{name}", "민지")
    .replaceAll("{year}", new Date().getFullYear())
    .replaceAll("{appTitle}", "민지의 다이어리");

  const headerEl = document.getElementById("header");
  const mainEl = document.getElementById("main");
  const formEl = document.getElementById("form");
  const footerEl = document.getElementById("footer");

  if (!headerEl || !mainEl || !formEl || !footerEl) {
    throw new Error("❌ 대상 요소(id)가 하나 이상 존재하지 않습니다.");
  }

  headerEl.innerHTML = header;
  mainEl.innerHTML = main;
  formEl.innerHTML = form;
  footerEl.innerHTML = footer;
}
