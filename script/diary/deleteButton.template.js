// script/diary/deleteButton.template.js
(function (w, d) {
  "use strict";
  var URL = "./component/diary/deleteButton.html";
  var tpl = null, loading = null;

  function ensure(){
    if (tpl || loading) return loading || Promise.resolve();
    loading = fetch(URL, { cache: "no-store" })
      .then(function(res){ if(!res.ok) throw new Error("HTTP "+res.status); return res.text(); })
      .then(function(html){
        var wrap = d.createElement("div");
        wrap.innerHTML = (html || "").trim();
        var btn = wrap.firstElementChild;
        if (!btn || btn.tagName !== "BUTTON") throw new Error("invalid template");
        tpl = btn; loading = null;
      })
      .catch(function(){
        // 폴백(네트워크 실패 등)
        var b = d.createElement("button");
        b.type = "button";
        b.className = "btn-delete-card";
        b.setAttribute("data-role", "delete-card");
        b.textContent = "×";
        tpl = b; loading = null;
      });
    return loading;
  }

  function clone(){
    if (tpl) return tpl.cloneNode(true);
    var b = d.createElement("button");
    b.type = "button";
    b.className = "btn-delete-card";
    b.setAttribute("data-role", "delete-card");
    b.textContent = "×";
    return b;
  }

  w.DiaryDeleteButton = { ensure: ensure, clone: clone };

  // 미리 로드 시도(실패해도 무시)
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", ensure, { once: true });
  else ensure();
})(window, document);
