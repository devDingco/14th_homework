(function (w) { "use strict";
  var C=w.DiaryStoreCore; if(!C) return;

  function addDiary(newDiary){
    try{ var draft=JSON.parse(JSON.stringify(newDiary||{})); C.validateDiary(draft);
      var id=draft.id||draft.diaryId||C.deriveId(draft);
      if(C.existsId(id)){ console.warn("중복 id 일기 무시:", id); return; }
      C.state.push(Object.freeze(draft)); C.saveToStorage(); C.scheduleRender();
    }catch(err){ console.error("❌ 일기 등록 실패:", err); }
  }


  function updateDiary(id, patch){
  try{
    if(!C.isNonEmptyString(id)) throw new Error("id가 유효하지 않습니다.");
    if(!patch||typeof patch!=="object") throw new Error("patch가 유효하지 않습니다.");

    var idx = C.findIndexByIdOrStable(id);
    if (idx < 0) throw new Error("대상 일기를 찾을 수 없습니다.");

    var prev = C.state[idx] || {};
    var mood = C.normalizeMood(patch.mood || prev.mood);
    var EMO  = { happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타" };

    // ✅ 이미지 갱신 규칙
    // - 사용자가 patch.image를 주면 그대로 사용
    // - 아니면, 이전 이미지가 "기본이미지(./images/<prevMood>.png)"였을 때만 새 기본으로 스위칭
    // - 이전이 커스텀 이미지면 그대로 보존
    var newImageFromPatch = C.isNonEmptyString(patch.image) ? patch.image : null;
    var defaultPrev = "./images/" + (prev.mood || "etc") + ".png";
    var defaultNew  = "./images/" + mood + ".png";
    var nextImage   = (newImageFromPatch != null)
                      ? newImageFromPatch
                      : (prev.image === defaultPrev ? defaultNew
                         : (prev.image || defaultNew));

    var draft = Object.assign({}, prev, {
      id: prev.id || prev.diaryId || C.deriveId(prev),
      date: prev.date,
      image: nextImage,                // ← 여기!
      mood: mood,
      emotionText: C.isNonEmptyString(patch.emotionText) ? patch.emotionText : (EMO[mood] || "기타"),
      title: C.txt(patch.title, prev.title),
      content: C.txt(patch.content, C.txt(prev.content, C.txt(prev.desc, "")))
    });

    var chk = JSON.parse(JSON.stringify(draft));
    C.validateDiary(chk);

    var next = Object.freeze(chk);
    C.state.splice(idx, 1, next);
    C.saveToStorage();
    C.scheduleRender();
    return next;
  }catch(e){
    console.error("❌ updateDiary 실패:", e);
    return null;
  }
}


  function hydrateDiaries(data, mode){
    if(!Array.isArray(data)){ console.warn("hydrateDiaries: 배열이 아님:", data); return; }
    try{
      if(mode==="merge"){
        for(var i=0;i<data.length;i++){ var item=JSON.parse(JSON.stringify(data[i]||{}));
          try{ C.validateDiary(item);}catch(_){} var id=item.id||item.diaryId||C.deriveId(item);
          if(!C.existsId(id)) C.state.push(Object.freeze(item)); }
      }else{
        C.state.splice(0,C.state.length);
        for(var j=0;j<data.length;j++){ var it=JSON.parse(JSON.stringify(data[j]||{}));
          try{ C.validateDiary(it);}catch(_){} C.state.push(Object.freeze(it)); }
      }
      C.saveToStorage(); C.scheduleRender();
    }catch(e){ console.error("hydrateDiaries 실패:", e); }
  }

  function removeDiary(id){
    try{
      if(!C.isNonEmptyString(id)) throw new Error("id가 유효하지 않습니다.");
      var idx=C.findIndexByIdOrStable(id); if(idx<0){ console.warn("removeDiary: 대상 없음", id); return false; }
      C.state.splice(idx,1); C.saveToStorage(); C.scheduleRender(); return true;
    }catch(e){ console.error("❌ removeDiary 실패:", e); return false; }
  }

  function getDiaries(){ return C.state.slice(); }

  // 전역 API (기존 호환 유지)
  w.diaryList=C.state;
  w.addDiary=addDiary; w.updateDiary=updateDiary; w.removeDiary=removeDiary;
  w.getDiaries=getDiaries; w.hydrateDiaries=hydrateDiaries; w.persistDiaries=C.saveToStorage;

  // 부팅시 저장본 반영
  C.initFromStorage();
})(window);
