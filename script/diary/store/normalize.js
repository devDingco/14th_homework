// script/diary/store/normalize.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  if (!C) return;

  // ── Fallbacks ───────────────────────────────────────────────────────────────
  function fbMood(x) {
    if (typeof x !== "string" || !x.trim()) return "etc";
    var s = String(x).trim().replace(/^[^\w가-힣]+/, "");
    var MAP = { "행복해요":"happy", "슬퍼요":"sad", "화나요":"angry", "놀랐어요":"surprised", "기타":"etc" };
    if (MAP[s]) return MAP[s];
    s = s.toLowerCase();
    return ["happy","sad","angry","surprised","etc"].indexOf(s) >= 0 ? s : "etc";
  }

  function fbDate(v) {
    try {
      if (typeof v === "string" && v.trim()) {
        var x = v.replace(/[\/\-]/g, ".").trim();
        var m = x.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})$/);
        if (m) {
          var yy = m[1], mm = ("0" + m[2]).slice(-2), dd = ("0" + m[3]).slice(-2);
          return yy + "." + mm + "." + dd;
        }
      }
      var now = new Date(typeof v === "string" && v.trim() ? v : undefined);
      if (isNaN(+now)) now = new Date();
      var y = now.getFullYear(), mo = ("0" + (now.getMonth() + 1)).slice(-2), d = ("0" + now.getDate()).slice(-2);
      return y + "." + mo + "." + d;
    } catch(_) {
      var t = new Date();
      return t.getFullYear() + "." + ("0"+(t.getMonth()+1)).slice(-2) + "." + ("0"+t.getDate()).slice(-2);
    }
  }

  function fbId(dy) {
    dy = dy || {};
    var k = [
      String(dy.date || "").replace(/[\/\-]/g,".").trim().toLowerCase(),
      String(dy.title||"").trim().toLowerCase(),
      String(dy.mood ||"").trim().toLowerCase()
    ].join("|");
    var h = 0; for (var i=0;i<k.length;i++){ h=((h<<5)-h)+k.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }

  // ── Injection (DiaryStoreUtil 우선, 실패 시 fallback) ─────────────────────
  C.normalizeMood = function (x) {
    try { if (w.DiaryStoreUtil && w.DiaryStoreUtil.normalizeMood) return w.DiaryStoreUtil.normalizeMood(x); } catch(_) {}
    return fbMood(x);
  };
  C.normalizeDate = function (v) {
    try { if (w.DiaryStoreUtil && w.DiaryStoreUtil.normalizeDate) return w.DiaryStoreUtil.normalizeDate(v); } catch(_) {}
    return fbDate(v);
  };
  C.deriveId = function (dy) {
    try { if (w.DiaryStoreUtil && w.DiaryStoreUtil.deriveId) return w.DiaryStoreUtil.deriveId(dy); } catch(_) {}
    return fbId(dy);
  };
})(window);
