// scriptLoader.js

async function loadScriptsSequential() {
  const scriptsToLoad = [
    "./script/utils/safe.js",
    "./script/utils/dom.js",
    "./script/diary/card.js",
    "./script/diary/render.js",
    "./script/diary/fetchRender.js",   // ← JSON 로드용
    "./script/diaryDetail.js",         // 클릭 상세(커스텀 바인딩)
    "./script/formHandler.js",
    "./script/main.js"
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
}
