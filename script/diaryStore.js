// script/diaryStore.js
(function (global, document) {
  "use strict";

  // ------ 전역 상태(참조 유지) ------
  var state = Array.isArray(global.diaryList) ? global.diaryList : [];
  if (!Array.isArray(global.diaryList)) global.diaryList = state;

  // ------ 상수/유틸 ------
  var ALLOWED_MOODS = ["happy", "sad", "angry", "surprised", "etc"];
  var EMOJI_TO_MOOD = { "행복해요":"happy", "슬퍼요":"sad", "화나요":"angry", "놀랐어요":"surprised", "기타":"etc" };
  var LS_KEY = "diaryList.v1";                 // ← 영속 저장 키
  var SS_KEY = "diaryCache";                   // ← 보조(세션) 캐시

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
    // 1) localStorage 우선
    try{
      var raw = localStorage.getItem(LS_KEY);
      if (raw){ var arr=JSON.parse(raw); if (Array.isArray(arr)) return arr; }
    }catch(e){ console.warn("localStorage 로드 실패:", e); }

    // 2) sessionStorage 보조
    try{
      var raw2 = sessionStorage.getItem(SS_KEY);
      if (raw2){ var arr2=JSON.parse(raw2); if (Array.isArray(arr2)) return arr2; }
    }catch(e){ /* ignore */ }

    return null;
  }
  function initFromStorage(){
    var persisted = loadFromStorage();
    if (!Array.isArray(persisted)) return;           // 저장된게 없으면 아무것도 안 함

    // state 참조 유지하며 교체
    state.splice(0, state.length);
    for (var i=0;i<persisted.length;i++){
      var item = Object.assign({}, persisted[i]);
      try{
        validateDiary(item);                          // 관대하게 보정
      }catch(_){}
      state.push(Object.freeze(item));
    }
    // 화면에 즉시 반영
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
      saveToStorage();           // ← 변경 즉시 영속 저장
      scheduleRender();
    }catch(err){
      console.error("❌ 일기 등록 실패:", err);
    }
  }

  // ------ API: 수정 (★추가) ------
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

      // 확장 필드 보존을 위해 prev를 먼저 펼치고, 업데이트 필드로 덮어씀
      var draft = Object.assign({}, prev, {
        id: prev.id || prev.diaryId || stableId(prev),
        date: prev.date,                  // 날짜는 수정하지 않음(폼에도 없음)
        image: prev.image,                // 이미지 경로 유지(없으면 validate에서 보정)
        mood: mood,
        emotionText: txt(patch.emotionText, txt(prev.emotionText, EMO_TXT[mood] || "기타")),
        title: txt(patch.title, prev.title),
        content: txt(patch.content, txt(prev.content, txt(prev.desc, "")))
      });

      // 검증/보정(필수값/기본값/경로 등)
      var check = JSON.parse(JSON.stringify(draft));
      validateDiary(check);

      var next = Object.freeze(check);

      // 같은 배열 참조 유지(사이드이펙트 최소화)
      state.splice(idx, 1, next);

      // 영속 저장 + 필요 시 목록 리렌더
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
      saveToStorage();           // ← 영속 저장
      scheduleRender();
    }catch(e){
      console.error("hydrateDiaries 실패:", e);
    }
  }

  // ------ API: 조회 ------
  function getDiaries(){ return state.slice(); }

  // ------ 외부 노출 ------
  global.diaryList = state;
  global.addDiary = addDiary;
  global.updateDiary = updateDiary;        // ★ 추가 노출
  global.getDiaries = getDiaries;
  global.hydrateDiaries = hydrateDiaries;
  global.persistDiaries = saveToStorage;   // 필요시 외부에서 강제 저장 호출

  // ------ 부팅 시 저장본 반영 ------
  initFromStorage();

})(window, document);
