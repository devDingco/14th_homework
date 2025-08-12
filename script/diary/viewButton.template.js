// script/diary/viewButton.template.js
(function (w, d) {
  "use strict";
  var URL = "./component/diary/viewButton.html";
  var tpl = null, loading = null;

  function ensure() {
    if (tpl || loading) return loading || Promise.resolve();
    loading = fetch(URL, { cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.text(); })
      .then(function (html) {
        var wrap = d.createElement("div");
        wrap.innerHTML = (html || "").trim();
        var btn = wrap.firstElementChild;
        if (!btn || btn.tagName !== "BUTTON") throw new Error("invalid template");
        tpl = btn; loading = null;
      })
      .catch(function () { tpl = null; loading = null; /* 폴백은 clone()에서 처리 */ });
    return loading;
  }

  function clone() {
    if (tpl) return tpl.cloneNode(true);
    // 폴백: 기본 텍스트 버튼
    var b = d.createElement("button");
    b.type = "button";
    b.className = "btn-view-detail";
    b.setAttribute("data-role", "view-detail");
    b.textContent = "상세보기";
    return b;
  }

  w.DiaryViewButton = { ensure: ensure, clone: clone };
  // 미리 로드 시도(실패해도 문제 없음)
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", ensure, { once: true });
  else ensure();
})(window, document);
