(function (g) {
  "use strict";
  function renderDiariesFromUrl(url, opts) {
    if (!url || typeof url !== "string") { console.error("유효하지 않은 URL:", url); return Promise.resolve(0); }
    return fetch(url, { cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then(function (json) { return g.renderDiaries(Array.isArray(json) ? json : [], opts); })
      .catch(function (err) { console.error("데이터 로드 실패:", err); return g.renderDiaries([], opts); });
  }
  g.renderDiariesFromUrl = renderDiariesFromUrl;
})(window);
