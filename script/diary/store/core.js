// script/diary/store.core.js
(function (w, d) {
  "use strict";

  // ── State ───────────────────────────────────────────────────────────────────
  var G = w;
  var S = Array.isArray(G.diaryList) ? G.diaryList : [];
  if (!Array.isArray(G.diaryList)) G.diaryList = S;

  // ── Const ───────────────────────────────────────────────────────────────────
  var LS = "diaryList.v1";
  var SS = "diaryCache";

  // ── Utils (local) ───────────────────────────────────────────────────────────
  function isStr(v) { return typeof v === "string" && v.trim().length > 0; }
  function txt(v, fb) { return isStr(v) ? v : (fb || ""); }

function normMood(x) {
  try { if (G.DiaryStoreUtil && G.DiaryStoreUtil.normalizeMood) return G.DiaryStoreUtil.normalizeMood(x); } catch(_) {}
  return "etc";
}
function normDate(v) {
  try { if (G.DiaryStoreUtil && G.DiaryStoreUtil.normalizeDate) return G.DiaryStoreUtil.normalizeDate(v); } catch(_) {}
  var t = new Date(); var y=t.getFullYear(), m=("0"+(t.getMonth()+1)).slice(-2), d=("0"+t.getDate()).slice(-2);
  return y+"."+m+"."+d;
}
function deriveId(dy) {
  try { if (G.DiaryStoreUtil && G.DiaryStoreUtil.deriveId) return G.DiaryStoreUtil.deriveId(dy); } catch(_) {}
  // 최소 안전값(실제 구현은 normalize.js가 주입)
  return "d"+Math.random().toString(36).slice(2);
}

  // ── Lookup / Validate ───────────────────────────────────────────────────────
 function existsId(id) {
   // delegated to script/diary/store.lookup.js
   // (여기서는 동작하지 않음; 실제 구현은 주입됨)
   return false;
 }

 function findIdx(id) {
   // delegated to script/diary/store.lookup.js
   // (여기서는 동작하지 않음; 실제 구현은 주입됨)
   return -1;
 }
  function validate(dy) {
    // delegated to script/diary/store.validate.js
    // (여기서는 아무 동작도 하지 않음; 실제 구현은 주입됨)
  }

  function schedule() {
    // delegated to script/diary/store.render.js
    // (여기서는 아무 동작도 하지 않음; 실제 구현은 주입됨)
  }

function save() {
  // delegated to store.persist.js
}

function load() {
  // delegated to store.persist.js
  return null;
}

function initFromStorage() {
  // delegated to store.persist.js
}

  // ── Export ──────────────────────────────────────────────────────────────────
  w.DiaryStoreCore = {
    state: S,
    isNonEmptyString: isStr,
    txt: txt,
    normalizeMood: normMood,
    normalizeDate: normDate,
    deriveId: deriveId,
    existsId: existsId,
    findIndexByIdOrStable: findIdx,
    validateDiary: validate,
    scheduleRender: schedule,
    saveToStorage: save,
    loadFromStorage: load,
    initFromStorage: initFromStorage,
    keys: { LS: LS, SS: SS }
  };
})(window, document);
