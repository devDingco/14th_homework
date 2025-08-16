(function (w, d) {
  "use strict";
  var FS = w.FilterSticky;
  if (!FS) return; // core가 먼저 로드되어야 함

  FS.update = function () {
    var bar = FS.getBar();
    if (!bar) return;

    var needFix = true; // FORCE_FIXED

    var sp = FS.ensureSpacer(bar);
    var container = FS.getSlot() || (function () { var s = FS.getSlotOf(bar); FS.setSlot(s); return s; })();
    var rect = container.getBoundingClientRect();
    var topOffset = FS.getTopOffset();

    if (needFix) {
      bar.style.position = "fixed";
      bar.style.top = topOffset + "px";
      bar.style.left = rect.left + "px";
      bar.style.width = rect.width + "px";

      var cssZ = parseInt(getComputedStyle(bar).zIndex, 10);
      var DEFAULT_Z = 4000;
      var targetZ = Number.isFinite(cssZ) ? Math.max(cssZ, DEFAULT_Z) : DEFAULT_Z;
      bar.style.zIndex = String(targetZ);

      bar.classList.add("is-scrolled");
      if (sp) sp.style.height = bar.offsetHeight + "px";
    } else {
      bar.style.position = bar.style.top = bar.style.left = bar.style.width = bar.style.zIndex = "";
      bar.classList.remove("is-scrolled");
      if (sp) sp.style.height = "0px";
    }
  };

  // core가 이미 init/schedule 했을 수 있으므로 한 번 트리거
  FS.schedule();
})(window, document);
