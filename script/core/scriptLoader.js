// script/core/scriptLoader.js
(function (w, d) {
  "use strict";

  var MANIFEST_URL = "./script/json/script.manifest.json";
  var TARGET = d.head || d.documentElement;   // ✅ head로 주입(레이아웃 간섭 없음)
  var loaded = new Set();

  function loadOne(src) {
    if (loaded.has(src)) return Promise.resolve();
    loaded.add(src);

    return new Promise(function (resolve, reject) {
      var s = d.createElement("script");
      s.src = src;
      s.async = false; // ✅ 순서 보장
      s.onload = function () { console.log("✅ " + src + " 로드 성공"); resolve(); };
      s.onerror = function () { console.error("❌ " + src + " 로드 실패"); reject(new Error(src)); };
      TARGET.appendChild(s); // ✅ head에만 붙임
    });
  }

  function loadList(list) {
    // 순차 로드(의존 관계 보존)
    var p = Promise.resolve();
    list.forEach(function (src) { p = p.then(function(){ return loadOne(src); }); });
    return p;
  }

  // 외부 호출 API (기존 계약 유지)
  w.loadScriptsSequential = function () {
    return fetch(MANIFEST_URL, { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("manifest HTTP " + r.status); return r.json(); })
      .then(function (arr) {
        if (!Array.isArray(arr) || arr.length === 0) throw new Error("manifest empty");
        return loadList(arr);
      })
      .catch(function (e) {
        console.warn("⚠️ 매니페스트 사용 불가 → 최소 폴백으로 진행:", e.message);
        // ✅ 존재 보장되는 최소 유틸만 폴백으로 로드(레거시 삭제 파일 제거)
        var FALLBACK = [
          "./script/utils/safe.js",
          "./script/utils/dom.js",
          "./script/utils/id.util.js"
        ];
        return loadList(FALLBACK);
      });
  };
})(window, document);
