// app.js

(async () => {
  try {
    await loadComponents();        // componentLoader.js
    await loadScriptsSequential(); // scriptLoader.js
    bindDiaryCardClick();          // cardClickHandler.js
  } catch (err) {
    console.error("❌ 전체 로딩 중 예외 발생:", err);
  }
})();
