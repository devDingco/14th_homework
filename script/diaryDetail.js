// ../script/diaryDetail.js
(function (w, d) {
  "use strict";

  // ---------- helpers ----------
  function qs(sel, root){ return (root||d).querySelector(sel); }
  function getIdFromURL(){
    try { return new URL(location.href).searchParams.get("id") || ""; }
    catch(_) { return ""; }
  }
  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }

  // id가 없을 때 fallback으로 계산(리스트쪽과 규칙을 맞춤)
  function stableId(obj){
    var date=(obj?.date||"").toString().replace(/[\/\-]/g,".").trim();
    var title=(obj?.title||"").toString().trim();
    var mood=(obj?.mood||"").toString().trim();
    var key=(date+"|"+title+"|"+mood).toLowerCase();
    var h=0; for(var i=0;i<key.length;i++){ h=((h<<5)-h)+key.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }

  function pickDiaryById(arr, id){
    if (!Array.isArray(arr) || !isStr(id)) return null;
    // 1) id/diaryId 직접 매칭
    var found = arr.find(function(x){ return x && (x.id===id || x.diaryId===id); });
    if (found) return found;
    // 2) 없으면 추정 id로 매칭
    return arr.find(function(x){ return x && stableId(x) === id; }) || null;
  }

  function fromWindow(id){
    try {
      // findDiaryById가 있으면 사용
      if (typeof w.findDiaryById === "function") {
        var f = w.findDiaryById(id);
        if (f) return f;
      }
      if (Array.isArray(w.diaryList)) {
        return pickDiaryById(w.diaryList, id);
      }
    } catch(_) {}
    return null;
  }

  function fromSession(id){
    try {
      var raw = sessionStorage.getItem("diaryCache");
      if (!raw) return null;
      var arr = JSON.parse(raw);
      return pickDiaryById(arr, id);
    } catch(_){ return null; }
  }

  async function fromDataJson(id){
    try{
      // detail.html 기준 상대경로
      var res = await fetch("../script/json/data.json", { cache: "no-store" });
      if(!res.ok) throw new Error("HTTP "+res.status);
      var arr = await res.json();
      return pickDiaryById(arr, id);
    }catch(e){
      console.warn("data.json 로드 실패:", e);
      return null;
    }
  }

  async function loadDiaryById(id){
    return fromWindow(id) || fromSession(id) || await fromDataJson(id);
  }

  // --- emotion class normalizer (색 적용을 위해 mood class 부여) ---
  function moodClass(v){
    try {
      var s = String(v || "").trim();
      // "😊 행복해요" 같은 형태 → 이모지 제거
      s = s.replace(/^[^\w가-힣]+/, "").trim();
      // 영문/한글 모두 매핑
      var map = {
        "happy":"happy","행복해요":"happy",
        "sad":"sad","슬퍼요":"sad",
        "angry":"angry","화나요":"angry",
        "surprised":"surprised","놀랐어요":"surprised",
        "etc":"etc","기타":"etc"
      };
      var low = s.toLowerCase();
      if (map[low]) return map[low];
      // 혹시 공백 제거한 한글 키
      var ko = s.replace(/\s+/g,"");
      if (map[ko]) return map[ko];
    } catch(_) {}
    return "etc";
  }

  // ---------- render ----------
  function renderNotFound(){
    var read = qs("#read-view");
    if (!read) return;
    var t = qs(".title", read);
    if (t) t.textContent = "일기를 찾을 수 없습니다.";
    var body = qs(".body", read);
    if (body) body.innerHTML = "";
    // 감정/이미지도 초기화
    var emoEl = qs(".submeta .emotion", read);
    if (emoEl) { emoEl.className = "emotion"; emoEl.textContent = ""; }
    var imgEl = qs(".submeta .avatar img", read);
    if (imgEl) { imgEl.src = "../images/etc.png"; imgEl.alt = ""; }
  }

  function renderReadView(di){
    var read = qs("#read-view");
    if (!read || !di) return;

    try {
      // 제목 / 날짜
      var t = qs(".title", read);
      if (t) t.textContent = di.title || "(제목 없음)";

      var dateEl = qs(".meta-right .date", read);
      if (dateEl) dateEl.textContent = di.date || "";

      // 감정 텍스트 + 색상 클래스
      var emoText = di.emotionText || di.moodText || di.mood || "기타";
      var emoEl = qs(".submeta .emotion", read);
      if (emoEl) {
        var cls = moodClass(di.mood || emoText);
        emoEl.className = ("emotion " + cls).trim();   // ← 색상 적용 핵심
        emoEl.textContent = emoText;
      }

      // 아바타 이미지
      var imgEl = qs(".submeta .avatar img", read);
      if (imgEl) {
        var moodKey = moodClass(di.mood || emoText);
        imgEl.src = "../images/" + moodKey + ".png";
        imgEl.alt = emoText;
        imgEl.onerror = function(){
          // 이미지가 없을 경우 안전 폴백
          if (imgEl && imgEl.src.indexOf("etc.png") === -1) {
            imgEl.src = "../images/etc.png";
          }
        };
      }

      // 본문
      var body = qs(".body", read);
      if (body) {
        body.innerHTML = "";
        var p = d.createElement("p");
        p.textContent = di.content || di.desc || di.body || "";
        body.appendChild(p);
      }

      // 수정 버튼 → edit 모드 진입
      var editBtn = qs("#read-view .btn");
      if (editBtn) {
        editBtn.onclick = function(){
          if (typeof w.enterEditMode === "function") {
            try { w.enterEditMode(di); } catch (e) { console.error(e); }
          } else {
            console.log("enterEditMode 미정의:", di);
          }
        };
      }
    } catch (e) {
      console.error("❌ 상세 렌더 실패:", e);
    }
  }

  // ---------- bootstrap ----------
  (async function init(){
    var id = getIdFromURL();
    if (!isStr(id)) { renderNotFound(); return; }

    try {
      var di = await loadDiaryById(id);
      if (!di) { renderNotFound(); return; }

      // 전역에 현재 아이템 공유(수정 모드에서 재활용)
      w.__CURRENT_DIARY__ = di;
      renderReadView(di);
    } catch (e) {
      console.error("❌ 상세 로드 실패:", e);
      renderNotFound();
    }
  })();

})(window, document);
