(function (w, d) {
  "use strict";

  var BAR_SELECTOR = '#filter-slot [data-sticky="filter"], [data-sticky="filter"], #diary-filter, .diary-filter';
  var FORCE_FIXED = true; // 요구사항: 항상 상단 고정

  var S = { bar: null, inited: false, listeners: false, spacer: null, slot: null };

  function pickBar() {
    return d.querySelector(BAR_SELECTOR);
  }
  function getSlotOf(barEl) {
    return d.getElementById("filter-slot") || (barEl && barEl.closest(".container")) || (barEl && barEl.parentElement) || d.body;
  }
  function ensureSpacer(barEl) {
    if (!barEl) return null;
    if (S.spacer && S.spacer.isConnected) return S.spacer;
    var sp = d.createElement("div");
    sp.id = "filter-spacer";
    sp.style.cssText = "height:0;pointer-events:none;";
    if (barEl.parentNode) barEl.parentNode.insertBefore(sp, barEl.nextSibling);
    S.spacer = sp;
    return sp;
  }
  function getTopOffset() {
    try {
      var header = d.querySelector(".page-header");
      if (!header) return 0;
      var cs = getComputedStyle(header);
      var rect = header.getBoundingClientRect();
      return (cs.position === "fixed" || cs.position === "sticky") ? rect.height : 0;
    } catch (_) { return 0; }
  }
  function promoteToBody(barEl) {
    if (!barEl || barEl.parentNode === d.body) return;
    ensureSpacer(barEl);
    d.body.appendChild(barEl);
  }

  function schedule() {
    if (schedule._t) return;
    schedule._t = true;
    w.requestAnimationFrame(function () {
      schedule._t = false;
      if (w.FilterSticky && typeof w.FilterSticky.update === "function") w.FilterSticky.update();
    });
  }

  function bind() {
    if (S.listeners) return;
    S.listeners = true;

    w.addEventListener("scroll", schedule, { passive: true });
    w.addEventListener("resize", function () { S.slot = null; schedule(); }, { passive: true });

    ["wheel", "mousewheel", "DOMMouseScroll", "touchmove"].forEach(function (t) {
      d.addEventListener(t, schedule, { passive: true });
    });

    d.addEventListener("keydown", function (e) {
      var keys = ["Space", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp"];
      if (keys.includes(e.code) || keys.includes(e.key)) schedule();
    });

    var root = d.scrollingElement || d.documentElement;
    var re = /(auto|scroll)/i;
    var cur = S.bar ? S.bar.parentElement : null;
    if (root) root.addEventListener("scroll", schedule, { passive: true });
    while (cur && cur !== d.body && cur !== d.documentElement) {
      try {
        var cs = getComputedStyle(cur);
        if ((re.test(cs.overflow) || re.test(cs.overflowY) || re.test(cs.overflowX)) && (cur.scrollHeight > cur.clientHeight)) {
          cur.addEventListener("scroll", schedule, { passive: true });
        }
      } catch (_) {}
      cur = cur.parentElement;
    }
  }

  function init() {
    if (S.inited) return;
    S.bar = pickBar();
    if (!S.bar) return;
    promoteToBody(S.bar);
    bind();
    schedule();
    S.inited = true;
  }

  function watch() {
    var root = d.getElementById("filter-slot") || d.body;
    var mo = new MutationObserver(function () {
      if (!S.inited) { init(); }
      else {
        var nb = pickBar();
        if (nb && nb !== S.bar) { S.bar = nb; S.spacer = null; S.slot = null; }
        schedule();
      }
    });
    mo.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
  }

  w.FilterSticky = {
    consts: { BAR_SELECTOR: BAR_SELECTOR, FORCE_FIXED: FORCE_FIXED },
    getBar: function () { return S.bar; },
    setBar: function (b) { S.bar = b; },
    getSlot: function () { return S.slot; },
    setSlot: function (s) { S.slot = s; },
    ensureSpacer: ensureSpacer,
    getSlotOf: getSlotOf,
    getTopOffset: getTopOffset,
    promoteToBody: promoteToBody,
    schedule: schedule,
    bind: bind,
    init: init,
    watch: watch,
    update: function () {} // runtime에서 주입
  };

  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", function () { init(); watch(); }, { once: true });
  } else {
    init(); watch();
  }
})(window, document);
