// script/diaryStore.js
(function (global, document) {
  "use strict";

  // ------ 전역 상태(참조 유지) ------
  var state = Array.isArray(global.diaryList) ? global.diaryList : [];
  if (!Array.isArray(global.diaryList)) global.diaryList = state;

  // ------ 상수/유틸 ------
  var ALLOWED_MOODS = ["happy", "sad", "angry", "surprised", "etc"];
  var EMOJI_TO_MOOD = { "행복해요":"happy", "슬퍼요":"sad", "화나요":"angry", "놀랐어요":"surprised", "기타":"etc" };
  var LS_KEY = "diaryList.v1";
  var SS_KEY = "diaryCache";

  function isNonEmptyString(v){ return typeof v === "string" && v.trim().length > 0; }
  function txt(v, fb){ return isNonEmptyString(v) ? v : (fb || ""); }

  function normalizeMood(input){
    if (!isNonEmptyString(input)) return "etc";
    var s = String(input).trim().replace(/^[^\w가-힣]+/, "");
    if (EMOJI_TO_MOOD[s]) return EMOJI_TO_MOOD[s];
    s = s.toLowerCase();
    return ALLOWED_MOODS.indexOf(s) >= 0 ? s : "etc";
  }
  function normalizeDate(v){
    try{
      if (isNonEmptyString(v)){
        var x = String(v).replace(/[\/\-]/g,".").trim();
        var m = x.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})$/);
        if (m){
          var yy=m[1], mm=("0"+m[2]).slice(-2), dd=("0"+m[3]).slice(-2);
          return yy+"."+mm+"."+dd;
        }
      }
      var now = new Date(isNonEmptyString(v)?v:undefined);
      if (isNaN(+now)) now = new Date();
      var y=now.getFullYear(), mo=("0"+(now.getMonth()+1)).slice(-2), d=("0"+now.getDate()).slice(-2);
      return y+"."+mo+"."+d;
    }catch(_){
      var t=new Date(); return t.getFullYear()+"."+("0"+(t.getMonth()+1)).slice(-2)+"."+("0"+t.getDate()).slice(-2);
    }
  }
  function stableId(d){
    var key = [
      String(d.date||"").replace(/[\/\-]/g,".").trim().toLowerCase(),
      String(d.title||"").trim().toLowerCase(),
      String(d.mood||"").trim().toLowerCase()
    ].join("|");
    var h=0; for (var i=0;i<key.length;i++){ h=((h<<5)-h)+key.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }
  function existsId(id){
    if (!isNonEmptyString(id)) return false;
    for (var i=0;i<state.length;i++){
      var it=state[i]; if (it && (it.id===id || it.diaryId===id)) return true;
      if (it && stableId(it)===id) return true;
    }
    return false;
  }

  // ------ 렌더 예약 ------
  var renderScheduled=false;
  function scheduleRender(){
    if (renderScheduled) return;
    renderScheduled=true;
    requestAnimationFrame(function(){
      renderScheduled=false;
      try{
        if (global.DiaryList && typeof global.DiaryList.renderDiaries==="function") {
          global.DiaryList.renderDiaries(state);
        } else if (typeof global.renderDiaries==="function") {
          global.renderDiaries(state);
        }
      }catch(e){ console.error("렌더 호출 중 오류:", e); }
    });
  }

  // ------ 영속 저장/불러오기 ------
  function saveToStorage(){
    try{
      var json = JSON.stringify(state);
      try { localStorage.setItem(LS_KEY, json); } catch(e){ console.warn("localStorage 저장 실패:", e); }
      try { sessionStorage.setItem(SS_KEY, json); } catch(e){ /* optional */ }
    }catch(e){
      console.warn("리스트 직렬화 실패:", e);
    }
  }
  function loadFromStorage(){
    try{
      var raw = localStorage.getItem(LS_KEY);
      if (raw){ var arr=JSON.parse(raw); if (Array.isArray(arr)) return arr; }
    }catch(e){ console.warn("localStorage 로드 실패:", e); }
    try{
      var raw2 = sessionStorage.getItem(SS_KEY);
      if (raw2){ var arr2=JSON.parse(raw2); if (Array.isArray(arr2)) return arr2; }
    }catch(e){ /* ignore */ }
    return null;
  }
  function initFromStorage(){
    var persisted = loadFromStorage();
    if (!Array.isArray(persisted)) return;

    state.splice(0, state.length);
    for (var i=0;i<persisted.length;i++){
      var item = Object.assign({}, persisted[i]);
      try{ validateDiary(item); }catch(_){}
      state.push(Object.freeze(item));
    }
    scheduleRender();
  }

  // ------ 검증/보정 ------
  function validateDiary(d){
    if (!d || typeof d!=="object") throw new Error("newDiary는 객체여야 합니다.");
    d.mood = normalizeMood(d.mood);
    if (!isNonEmptyString(d.title)) throw new Error("title은 필수입니다.");
    d.date = normalizeDate(d.date);
    if (!isNonEmptyString(d.image)) d.image = "./images/"+d.mood+".png";
    if (!isNonEmptyString(d.emotionText)){
      var map={happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타"};
      d.emotionText = map[d.mood] || "기타";
    }
    if (!isNonEmptyString(d.id) && !isNonEmptyString(d.diaryId)) d.id = stableId(d);
  }

  // ------ API: 추가 ------
  function addDiary(newDiary){
    try{
      var draft = JSON.parse(JSON.stringify(newDiary||{}));
      validateDiary(draft);
      var id = draft.id || draft.diaryId || stableId(draft);
      if (existsId(id)) { console.warn("중복 id 일기 무시:", id); return; }
      state.push(Object.freeze(draft));
      saveToStorage();
      scheduleRender();
    }catch(err){
      console.error("❌ 일기 등록 실패:", err);
    }
  }

  // ------ API: 수정 ------
  function findIndexByIdOrStable(id){
    if (!isNonEmptyString(id)) return -1;
    for (var i=0;i<state.length;i++){
      var it = state[i];
      if (!it) continue;
      if (it.id === id || it.diaryId === id) return i;
    }
    for (var j=0;j<state.length;j++){
      var it2 = state[j];
      if (!it2) continue;
      if (stableId(it2) === id) return j;
    }
    return -1;
  }

  function updateDiary(id, patch){
    try{
      if (!isNonEmptyString(id)) throw new Error("id가 유효하지 않습니다.");
      if (!patch || typeof patch !== "object") throw new Error("patch가 유효하지 않습니다.");

      var idx = findIndexByIdOrStable(id);
      if (idx < 0) throw new Error("대상 일기를 찾을 수 없습니다.");

      var prev = state[idx] || {};
      var mood = normalizeMood(patch.mood || prev.mood);
      var EMO_TXT = { happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타" };

      var draft = Object.assign({}, prev, {
        id: prev.id || prev.diaryId || stableId(prev),
        date: prev.date,
        image: prev.image,
        mood: mood,
        emotionText: isNonEmptyString(patch.emotionText) ? patch.emotionText : (EMO_TXT[mood] || "기타"),
        title: txt(patch.title, prev.title),
        content: txt(patch.content, txt(prev.content, txt(prev.desc, "")))
      });

      var check = JSON.parse(JSON.stringify(draft));
      validateDiary(check);

      var next = Object.freeze(check);
      state.splice(idx, 1, next);
      saveToStorage();
      scheduleRender();
      return next;
    }catch(e){
      console.error("❌ updateDiary 실패:", e);
      return null;
    }
  }

  // ------ API: 초기 주입/동기화 ------
  function hydrateDiaries(data, mode){
    if (!Array.isArray(data)) { console.warn("hydrateDiaries: 배열이 아님:", data); return; }
    try{
      if (mode === "merge"){
        for (var i=0;i<data.length;i++){
          var item = JSON.parse(JSON.stringify(data[i]||{}));
          try { validateDiary(item); } catch(_){}
          var id = item.id || item.diaryId || stableId(item);
          if (!existsId(id)) state.push(Object.freeze(item));
        }
      }else{
        state.splice(0, state.length);
        for (var j=0;j<data.length;j++){
          var it = JSON.parse(JSON.stringify(data[j]||{}));
          try { validateDiary(it); } catch(_){}
          state.push(Object.freeze(it));
        }
      }
      saveToStorage();
      scheduleRender();
    }catch(e){
      console.error("hydrateDiaries 실패:", e);
    }
  }

  // ------ API: 삭제 (신규) ------
  function removeDiary(id){
    try{
      if (!isNonEmptyString(id)) throw new Error("id가 유효하지 않습니다.");

      var idx = findIndexByIdOrStable(id);
      if (idx < 0) {
        console.warn("removeDiary: 대상 없음", id);
        return false;
      }

      // 배열 참조 유지하며 제거
      state.splice(idx, 1);

      // 저장 + 리렌더
      saveToStorage();
      scheduleRender();
      return true;
    }catch(e){
      console.error("❌ removeDiary 실패:", e);
      return false;
    }
  }
  // 윈도우에도 노출(기존 코드 호환)
  window.removeDiary = removeDiary;

  // ------ API: 조회 ------
  function getDiaries(){ return state.slice(); }

  // ------ 외부 노출 ------
  global.diaryList = state;
  global.addDiary = addDiary;
  global.updateDiary = updateDiary;
  global.removeDiary = removeDiary;       // ★ 추가 노출
  global.getDiaries = getDiaries;
  global.hydrateDiaries = hydrateDiaries;
  global.persistDiaries = saveToStorage;

  // ------ 부팅 시 저장본 반영 ------
  initFromStorage();

})(window, document);
