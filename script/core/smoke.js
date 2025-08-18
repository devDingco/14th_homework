// script/core/smoke.js
(function (w, d) {
  "use strict";
  if (w.__SMOKE_ONCE__) return; w.__SMOKE_ONCE__ = true;

  function snapshot() {
    var keys = (w.Templates && w.Templates.keys && w.Templates.keys()) || [];
    var mainEl = d.getElementById("main");
    var slot = mainEl && mainEl.querySelector("#filter-slot");
    var list = mainEl && mainEl.querySelector("#diary-list");
    var f = slot && slot.querySelector("#diary-filter");
    var fpos = (f && w.getComputedStyle) ? w.getComputedStyle(f).position : null;
    var ft = d.querySelector("footer, .site-footer");
    var ftpos = (ft && w.getComputedStyle) ? w.getComputedStyle(ft).position : null;

    return {
      templatesPresent: !!(w.Templates && typeof w.Templates.get === "function"),
      templateKeys: keys,
      slotExists: !!slot,
      listExists: !!list,
      beforeOk: !!(slot && list && list.previousElementSibling === slot),
      filterCount: slot ? slot.querySelectorAll("#diary-filter").length : 0,
      filterPos: fpos,
      footerFixed: ftpos === "fixed"
    };
  }

  function printOnce(st) {
    function ok(name, cond){ console[cond ? "log" : "warn"]("[smoke]", cond ? "✅" : "❌", name); }
    ok("Templates registry present", st.templatesPresent);
    ok("Templates has view/delete",
       st.templateKeys.indexOf("diary.viewButton") >= 0 &&
       st.templateKeys.indexOf("diary.deleteButton") >= 0);

    ok("#filter-slot exists in main", st.slotExists);
    ok("#diary-list exists in main", st.listExists);

    if (st.slotExists && st.listExists) {
      ok("filter-slot is immediately before diary-list", st.beforeOk);
      ok("exactly one #diary-filter in slot", st.filterCount === 1);
      ok("filter is not fixed", st.filterPos !== "fixed");
    }

    ok("footer not fixed", st.footerFixed === false);
  }

  function arm() {
    var timeoutAt = Date.now() + 5000;  // 최대 5초 대기
    var tid = null;

    function tick() {
      var st = snapshot();
      var ready = st.templateKeys.length >= 2 && st.slotExists && st.listExists;
      if (ready || Date.now() > timeoutAt) {
        clearInterval(tid);
        printOnce(st);
      }
    }

    // components:ready가 오면 즉시 한 번 체크
    d.addEventListener("components:ready", tick, { once: true });
    // 주기적으로 대기하다가 준비되면 한 번만 출력
    tid = setInterval(tick, 150);
  }

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", arm, { once: true });
  else arm();

})(window, document);
