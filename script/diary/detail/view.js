// script/diary/detail/view.js
(function (w, d) {
  "use strict";

  var C  = w.DiaryStoreCore || {};
  var DC = w.DiaryConst || {};

  function qs(sel, root){ return (root||d).querySelector(sel); }

  // ── 공통 유틸: 상수/스토어 의존으로 간소화 ───────────────────────────────
  function normalizeMoodKey(v){
    if (typeof C.normalizeMood === "function") return C.normalizeMood(v);
    if (typeof DC.moodFromInput === "function") return DC.moodFromInput(v);
    var s = (typeof v === "string" ? v.trim().toLowerCase() : "");
    var allowed = (Array.isArray(DC.EMOTIONS) ? DC.EMOTIONS : ["happy","sad","angry","surprised","etc"]);
    return allowed.indexOf(s) >= 0 ? s : "etc";
  }
  function emotionTextOf(m){
    var map = DC.emotionText;
    return (map && map[m]) || (map && map.etc) || "기타";
  }
  // detail.html은 /subpage 아래에 있으므로 ./images → ../images 로 보정
  function imageOf(m){
    var p = (typeof DC.imageFor === "function") ? DC.imageFor(m) : ("./images/" + m + ".png");
    return p.indexOf("./images/") === 0 ? p.replace("./images/","../images/") : p;
  }

  function renderNotFound(){
    var read = qs("#read-view"); if (!read) return;
    var t = qs(".title", read); if (t) t.textContent = "일기를 찾을 수 없습니다.";
    var body = qs(".body", read); if (body) body.innerHTML = "";
    var emoEl = qs(".submeta .emotion", read);
    if (emoEl) { emoEl.className = "emotion"; emoEl.textContent = ""; }
    var imgEl = qs(".submeta .avatar img", read);
    if (imgEl) { imgEl.src = "../images/etc.png"; imgEl.alt = ""; }
  }

  function renderRead(di){
    var read = qs("#read-view"); if (!read || !di) return;

    var title = (typeof di.title === "string" && di.title.trim()) ? di.title : "(제목 없음)";
    var date  = di.date || "";

    var moodKey = normalizeMoodKey(di.mood || di.emotion || di.emotionText);
    var emoText = di.emotionText || emotionTextOf(moodKey);
    var imgSrc  = imageOf(moodKey);

    var t = qs(".title", read); if (t) t.textContent = title;
    var dateEl = qs(".meta-right .date", read); if (dateEl) dateEl.textContent = date;

    var emoEl = qs(".submeta .emotion", read);
    if (emoEl) { emoEl.className = ("emotion " + moodKey).trim(); emoEl.textContent = emoText; }

    var imgEl = qs(".submeta .avatar img", read);
    if (imgEl) {
      imgEl.src = imgSrc;
      imgEl.alt = emoText;
      imgEl.onerror = function(){
        if (imgEl && imgEl.src.indexOf("etc.png") === -1) imgEl.src = "../images/etc.png";
      };
    }

    var body = qs(".body", read);
    if (body) {
      body.innerHTML = "";
      var p = d.createElement("p");
      p.textContent = di.content || di.desc || di.body || "";
      body.appendChild(p);
    }

    var editBtn = qs("#read-view .btn");
    if (editBtn) {
      editBtn.onclick = function(){
        if (typeof w.enterEditMode === "function") {
          try { w.enterEditMode(); } catch (e) { console.error(e); }
        }
      };
    }
  }

  w.DetailView = { renderRead: renderRead, renderNotFound: renderNotFound };
})(window, document);
