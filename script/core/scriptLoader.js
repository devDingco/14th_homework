// script/core/scriptLoader.js
(function (w, d) {
  "use strict";

  const MANIFEST_URL = "./script/json/script.manifest.json";
  const loaded = new Set();

  async function loadOne(src) {
    if (loaded.has(src)) return;
    loaded.add(src);
    await new Promise((resolve, reject) => {
      const s = d.createElement("script");
      s.src = src;
      s.onload = () => (console.log(`✅ ${src} 로드 성공`), resolve());
      s.onerror = () => (console.error(`❌ ${src} 로드 실패`), reject(new Error(src)));
      d.body.appendChild(s);
    });
  }

  async function loadList(list) {
    for (const src of list) await loadOne(src);
  }

  // ✅ 외부에서 호출 가능한 API로 노출
  w.loadScriptsSequential = async function () {
    try {
      const r = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!r.ok) throw new Error(`manifest HTTP ${r.status}`);
      const arr = await r.json();
      if (!Array.isArray(arr) || arr.length === 0) throw new Error("manifest empty");
      await loadList(arr);
    } catch (e) {
      console.warn("⚠️ 매니페스트 사용 불가 → 최소 폴백으로 진행:", e.message);
      const FALLBACK = [
        "./script/utils/safe.js",
        "./script/utils/dom.js",
        "./script/diaryList.js" // 구 렌더러(있는 경우 가장 안전)
      ];
      await loadList(FALLBACK);
    }
  };
})(window, document);
