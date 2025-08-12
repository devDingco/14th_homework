// script/diaryDetail.js (안전 가드 버전)
(function () {
  "use strict";

  // ✅ detail 페이지가 아니면 바로 종료
  var root = document.querySelector("main.container.detail") || document.querySelector(".detail");
  if (!root) return;

  // DOM 준비 후 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  function qs(sel, scope) { return (scope || document).querySelector(sel); }
  function setText(el, v) { if (el) el.textContent = v ?? ""; }
  function setHTML(el, v) { if (el) el.innerHTML = v ?? ""; }

  function init() {
    var els = {
      title: qs(".title", root),
      date: qs(".meta-right .date", root),
      emotion: qs(".emotion", root),
      avatar: qs(".avatar img", root),
      body: qs(".body", root)
    };

    var DATA_URL = "../script/json/data.json"; // detail.html 기준
    var id = new URLSearchParams(location.search).get("id");

    function fmtDate(v){
      if (!v) return "";
      if (/^\d{4}\.\d{2}\.\d{2}$/.test(v)) return v;
      var d = new Date(v); if (isNaN(d)) return String(v);
      var yy=d.getFullYear(), mm=String(d.getMonth()+1).padStart(2,"0"), dd=String(d.getDate()).padStart(2,"0");
      return yy+"."+mm+"."+dd;
    }

    function render(entry){
      if (!entry) {
        setText(els.title, "일기를 찾을 수 없습니다.");
        setText(els.date, "");
        setText(els.emotion, "");
        if (els.avatar) { els.avatar.removeAttribute("src"); els.avatar.alt=""; }
        setHTML(els.body, "<p></p>");
        return;
      }
      setText(els.title, entry.title || "(제목 없음)");
      setText(els.date, fmtDate(entry.date || entry.createdAt || entry.created_at));
      setText(els.emotion, entry.emotionText || entry.moodText || entry.mood || "");

      if (els.avatar) {
        var mood = (entry.mood || "").toLowerCase();
        var fallback = mood ? ("../images/" + mood + ".png") : "";
        var src = entry.image || fallback;
        if (src) els.avatar.src = src;
        els.avatar.alt = els.emotion?.textContent || "emotion";
      }

      var content = entry.content || entry.body || entry.text || "";
      setHTML(els.body, "<p>"+ String(content).replace(/\n/g,"<br>") +"</p>");
    }

    function getFromSession(){
      try {
        var raw = sessionStorage.getItem("diary:lastEntry");
        if (!raw) return null;
        var e = JSON.parse(raw);
        if (!id) return e;
        if (String(e.id) === String(id) || String(e.diaryId) === String(id)) return e;
        return null;
      } catch { return null; }
    }

    var fromSession = getFromSession();
    if (fromSession && !id) { render(fromSession); return; }

    fetch(DATA_URL, { cache: "no-store" })
      .then(function(r){ if(!r.ok) throw new Error("HTTP "+r.status); return r.json(); })
      .then(function(data){
        var list = Array.isArray(data) ? data : (data.diaries || []);
        var found = null;
        if (id != null) {
          for (var i=0;i<list.length;i++){
            var it = list[i];
            if (String(it.id) === String(id) || String(it.diaryId) === String(id)) { found = it; break; }
          }
        }
        render(found || fromSession || null);
      })
      .catch(function(err){
        console.error("detail load error:", err);
        render(fromSession || null);
      });
  }
})();
