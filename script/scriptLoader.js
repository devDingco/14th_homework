// scriptLoader.js

async function loadScriptsSequential() {
  const scriptsToLoad = [
    "./script/diaryDetail.js",
    "./script/diaryList.js",
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
