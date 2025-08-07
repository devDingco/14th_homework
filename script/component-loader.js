(async () => {
  try {
    // 1. 컴포넌트 fetch
    const components = await Promise.all([
      fetch("./component/header.html").then(res => res.ok ? res.text() : Promise.reject("header.html 불러오기 실패")),
      fetch("./component/main.html").then(res => res.ok ? res.text() : Promise.reject("main.html 불러오기 실패")),
      fetch("./component/form.html").then(res => res.ok ? res.text() : Promise.reject("form.html 불러오기 실패")),
      fetch("./component/footer.html").then(res => res.ok ? res.text() : Promise.reject("footer.html 불러오기 실패")),
    ]);

    const [header, main, form, footerRaw] = components;

    
    // 2. 푸터 내용 치환
    const footer = footerRaw
      .replaceAll("{name}", "민지")
      .replaceAll("{year}", new Date().getFullYear())
      .replaceAll("{appTitle}", "민지의 다이어리");

    // 3. DOM 삽입
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

    // 4. 스크립트 순차 로딩
    const scriptsToLoad = [
      "./script/diaryDetail.js",  // 먼저 bindDiaryDetail 정의
      "./script/diaryList.js",    // 그 다음 renderDiaries 등
      "./script/main.js"          // 마지막으로 실행 로직
    ];

    for (const src of scriptsToLoad) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          console.log(`✅ ${src} 로드 성공`);
          resolve();
        };
        script.onerror = () => {
          console.error(`❌ ${src} 로드 실패`);
          reject(new Error(`${src} 로드 실패`));
        };
        document.body.appendChild(script);
      });
    }

document.addEventListener("click", (e) => {
  const card = e.target.closest(".diary-card");
  if (card) {
    const title = card.querySelector(".card-title")?.innerText || "제목 없음";
    const date = card.querySelector(".date")?.innerText || "날짜 없음";
    const mood = card.className.split("mood-")[1] || "기분 없음";

    alert(`📖 상세 정보\n\n📅 날짜: ${date}\n😊 기분: ${mood}\n📝 제목: ${title}`);
  }
});
  } catch (err) {
    console.error("❌ 전체 로딩 중 예외 발생:", err);
  }

})();
