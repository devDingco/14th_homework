// script/diary/detail/loader.js
(function (w, d) {
  "use strict";

  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }

  function deriveId(obj){
    try {
      if (w.DiaryStoreCore && typeof w.DiaryStoreCore.deriveId === "function") return w.DiaryStoreCore.deriveId(obj);
      if (w.DetailUtil && typeof w.DetailUtil.deriveId === "function") return w.DetailUtil.deriveId(obj);
    } catch(_) {}
    // 안전 폴백(상세의 stableId 규칙)
    var date=(obj?.date||"").toString().replace(/[\/\-]/g,".").trim();
    var title=(obj?.title||"").toString().trim();
    var mood=(obj?.mood||"").toString().trim();
    var key=(date+"|"+title+"|"+mood).toLowerCase();
    var h=0; for(var i=0;i<key.length;i++){ h=((h<<5)-h)+key.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }

  function pickDiaryById(arr, id){
    if (!Array.isArray(arr) || !isStr(id)) return null;
    var found = arr.find(function(x){ return x && (x.id===id || x.diaryId===id); });
    if (found) return found;
    return arr.find(function(x){ return x && deriveId(x) === id; }) || null;
  }

  function getCurrentId(){
    try { return new URL(location.href).searchParams.get("id") || ""; }
    catch(_) { return ""; }
  }

  function fromWindow(id){
    try{
      if (typeof w.findDiaryById === "function") {
        var f = w.findDiaryById(id);
        if (f) return f;
      }
      if (Array.isArray(w.diaryList)) return pickDiaryById(w.diaryList, id);
    }catch(_){}
    return null;
  }

  function fromSession(id){
    try{
      var raw = sessionStorage.getItem("diaryCache");
      if (!raw) return null;
      var arr = JSON.parse(raw);
      return pickDiaryById(arr, id);
    }catch(_){ return null; }
  }

  async function fromDataJson(id){
    try{
      // detail.html 기준 경로
      var res = await fetch("../script/json/data.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP "+res.status);
      var arr = await res.json();
      return pickDiaryById(arr, id);
    }catch(_){ return null; }
  }

  async function loadDiaryById(id){
    return fromWindow(id) || fromSession(id) || await fromDataJson(id);
  }

  w.DetailLoader = {
    getCurrentId: getCurrentId,
    pickDiaryById: pickDiaryById,
    fromWindow: fromWindow,
    fromSession: fromSession,
    fromDataJson: fromDataJson,
    loadDiaryById: loadDiaryById
  };
})(window, document);
