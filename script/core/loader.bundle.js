// script/core/loader.bundle.js
(function (w, d) {
  "use strict";
  if (w.__CORE_BUNDLE_LOADED__) return;
  w.__CORE_BUNDLE_LOADED__ = true;

  // ✅ 순서가 중요합니다.
  const CORE = [
    "./script/core/template.registry.js", // Templates 먼저
    "./script/core/smoke.js",             // 준비 상태 모니터(폴링이라 순서 안전)
    "./script/core/componentLoader.js",   // header/main/form + filter + templates 등록
    "./script/core/scriptLoader.js",      // manifest 순차 로딩
    "./script/core/bootstrap.js",         // 기존 부트스트랩
    "./script/main.js"                    // 앱 엔트리
  ];

  const loaded = new Set();

  function loadOne(src) {
    if (loaded.has(src)) return Promise.resolve();
    loaded.add(src);
    return new Promise((resolve, reject) => {
      const s = d.createElement("script");
      s.src = src;
      s.onload = () => (console.log("✅ core loaded:", src), resolve());
      s.onerror = () => (console.error("❌ core failed:", src), reject(new Error(src)));
      // 순서를 지키기 위해 즉시 실행(append된 순서대로)
      d.body.appendChild(s);
    });
  }

  function loadSeq(list) {
    return list.reduce((p, src) => p.then(() => loadOne(src)), Promise.resolve());
  }

  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", () => loadSeq(CORE), { once: true });
  } else {
    loadSeq(CORE);
  }
})(window, document);
