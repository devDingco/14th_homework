// script/diary/detail/view.js
(function (w, d) {
  "use strict";

  function qs(sel, root){ return (root||d).querySelector(sel); }

  function normalizeMoodKey(v){
    try {
      if (w.DetailUtil && typeof w.DetailUtil.normalizeMoodKey === "function") {
        return w.DetailUtil.normalizeMoodKey(v);
      }
    } catch(_) {}
    // 폴백(디테일 기존 매핑과 동일)
    try {
      var s = String(v || "").trim().replace(/^[^\w가-힣]+/, "");
      var map = {
        "happy":"happy","행복해요":"happy",
        "sad":"sad","슬퍼요":"sad",
        "angry":"angry","화나요":"angry",
        "surprised":"surprised","놀랐어요":"surprised",
        "etc":"etc","기타":"etc"
      };
      var low = s.toLowerCase(); if (map[low]) return map[low];
      var ko = s.replace(/\s+/g,""); if (map[ko]) return map[ko];
    } catch(_) {}
    return "etc";
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
    try {
      var t = qs(".title", read); if (t) t.textContent = di.title || "(제목 없음)";
      var dateEl = qs(".meta-right .date", read); if (dateEl) dateEl.textContent = di.date || "";

      var emoText = di.emotionText || di.moodText || di.mood || "기타";
      var moodKey = normalizeMoodKey(di.mood || emoText);

      var emoEl = qs(".submeta .emotion", read);
      if (emoEl) { emoEl.className = ("emotion " + moodKey).trim(); emoEl.textContent = emoText; }

      var imgEl = qs(".submeta .avatar img", read);
      if (imgEl) {
        imgEl.src = "../images/" + moodKey + ".png";
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
    } catch (e) {
      console.error("❌ 상세 렌더 실패:", e);
    }
  }

  w.DetailView = { renderRead: renderRead, renderNotFound: renderNotFound };
})(window, document);
