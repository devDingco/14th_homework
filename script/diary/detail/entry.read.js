// ../script/diaryDetail.js
(function (w, d) {
  "use strict";

  // ---------- helpers ----------
  function qs(sel, root){ return (root||d).querySelector(sel); }
  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }

  // DetailLoader 위임 + 폴백
  function getIdFromURL(){
    try {
      if (w.DetailLoader && typeof w.DetailLoader.getCurrentId === "function") {
        return w.DetailLoader.getCurrentId();
      }
    } catch(_) {}
    try { return new URL(location.href).searchParams.get("id") || ""; }
    catch(_) { return ""; }
  }

  // DetailLoader 위임 + 폴백
  async function loadDiaryById(id){
    try{
      if (w.DetailLoader && typeof w.DetailLoader.loadDiaryById === "function") {
        return w.DetailLoader.loadDiaryById(id);
      }
    }catch(_){}
    // 폴백: 세션/전역/데이터 파일 순
    try {
      if (Array.isArray(w.diaryList)) {
        var arr = w.diaryList;
        var found = arr.find(function(x){ return x && (x.id===id || x.diaryId===id); });
        if (found) return found;
      }
    } catch(_) {}
    try {
      var raw = sessionStorage.getItem("diaryCache");
      if (raw) {
        var arr2 = JSON.parse(raw);
        var f2 = (arr2||[]).find(function(x){ return x && (x.id===id || x.diaryId===id); });
        if (f2) return f2;
      }
    } catch(_){}
    try{
      var res = await fetch("../script/json/data.json", { cache: "no-store" });
      if (res.ok) {
        var arr3 = await res.json();
        return (arr3||[]).find(function(x){ return x && (x.id===id || x.diaryId===id); }) || null;
      }
    }catch(_){}
    return null;
  }

  // ---------- render 위임 ----------
  function renderNotFound(){
    if (w.DetailView && typeof w.DetailView.renderNotFound === "function") {
      return w.DetailView.renderNotFound();
    }
    var read = qs("#read-view"); if (!read) return;
    var t = qs(".title", read); if (t) t.textContent = "일기를 찾을 수 없습니다.";
  }

  function renderReadView(di){
    if (w.DetailView && typeof w.DetailView.renderRead === "function") {
      return w.DetailView.renderRead(di);
    }
    // 모듈 누락 시 렌더 생략
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
