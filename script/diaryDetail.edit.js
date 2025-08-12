// script/diaryDetail.edit.js
(function (w, d) {
  "use strict";
  if (w.__DETAIL_EDIT_INIT__) return;
  w.__DETAIL_EDIT_INIT__ = true;

  // ---------- small utils ----------
  function qs(sel, root){ return (root||d).querySelector(sel); }
  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }
  function txt(v, fb){ return isStr(v) ? v : (fb || ""); }

  // form.html 라디오 값과 store 보정 규칙에 맞춤
  var MOOD_MAP = { "행복해요":"happy", "슬퍼요":"sad", "화나요":"angry", "놀랐어요":"surprised", "기타":"etc" };
  var MOOD_TEXT = { happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타" };

  function normalizeMood(input){
    if (!isStr(input)) return "etc";
    var s = input.replace(/^[^\w가-힣]+/, "").trim(); // "😊 행복해요" -> "행복해요"
    if (MOOD_MAP[s]) return MOOD_MAP[s];
    s = s.toLowerCase();
    return ["happy","sad","angry","surprised","etc"].includes(s) ? s : "etc";
  }
  function stableId(obj){
    var date=(obj?.date||"").toString().replace(/[\/\-]/g,".").trim();
    var title=(obj?.title||"").toString().trim();
    var mood=(obj?.mood||"").toString().trim();
    var key=(date+"|"+title+"|"+mood).toLowerCase();
    var h=0; for(var i=0;i<key.length;i++){ h=((h<<5)-h)+key.charCodeAt(i); h|=0; }
    return "d"+Math.abs(h);
  }
  function pickIndexById(list, id){
    if (!Array.isArray(list) || !isStr(id)) return -1;
    var i = list.findIndex(x => x && (x.id===id || x.diaryId===id));
    if (i >= 0) return i;
    return list.findIndex(x => x && stableId(x)===id);
  }
  function applyReadView(di){ // 읽기 화면 즉시 갱신(저장 후 사용)
    var read = qs("#read-view"); if (!read) return;
    var t = qs(".title", read);          if (t) t.textContent = txt(di.title,"(제목 없음)");
    var dateEl = qs(".meta-right .date", read); if (dateEl) dateEl.textContent = txt(di.date,"");
    var emoTxt = txt(di.emotionText, MOOD_TEXT[di.mood] || "기타");
    var emoEl = qs(".submeta .emotion", read);  if (emoEl) emoEl.textContent = emoTxt;
    var imgEl = qs(".submeta .avatar img", read);
    if (imgEl) { imgEl.src = "../images/"+(di.mood||"etc")+".png"; imgEl.alt = emoTxt; }
    var body = qs(".body", read);
    if (body) { body.innerHTML = ""; var p=d.createElement("p"); p.textContent = txt(di.content, txt(di.desc,"")); body.appendChild(p); }
  }
  function persistSession(list){
    try { sessionStorage.setItem("diaryCache", JSON.stringify(list)); } catch(_) {}
  }

  // ---------- form 주입/프리필 ----------
  let formLoaded = false;
  async function ensureFormLoaded(){
    const slot = qs("#edit-slot");
    if (!slot || formLoaded) return slot;
    try{
      const res = await fetch("../component/form.html",{cache:"no-store"});
      if(!res.ok) throw new Error("HTTP "+res.status);
      slot.innerHTML = await res.text();
      formLoaded = true;
      return slot;
    }catch(e){
      console.error("❌ form.html 로드 실패:", e);
      return null;
    }
  }
  function prefillForm(form, di){
    // mood
    const radios = form.querySelectorAll('input[name="mood"]');
    const want = MOOD_TEXT[di.mood] || "기타";
    radios.forEach(r => {
      const label = r.closest("label");
      const text = label ? label.textContent.trim() : "";
      r.checked = text.includes(want);
    });
    // title / content
    const titleEl = form.querySelector("#title");
    const contentEl = form.querySelector("#content");
    if (titleEl)  titleEl.value  = txt(di.title,"");
    if (contentEl) contentEl.value = txt(di.content, txt(di.desc, ""));
    // 버튼 텍스트/레이아웃
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = "수정하기";
    let actions = form.querySelector(".form-actions");
    if (!actions && submitBtn) {
      actions = d.createElement("div");
      actions.className = "form-actions";
      submitBtn.parentNode.insertBefore(actions, submitBtn);
      actions.appendChild(submitBtn);
    }
    let cancelBtn = actions?.querySelector(".btn-cancel");
    if (!cancelBtn && actions) {
      cancelBtn = d.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "btn-cancel";
      cancelBtn.textContent = "취소";
      actions.insertBefore(cancelBtn, actions.firstChild);
    }
    return { submitBtn, cancelBtn: actions?.querySelector(".btn-cancel") || null };
  }

  // ---------- 저장(로컬 업데이트) ----------
  function updateDiaryLocal(id, patch){
    if (!isStr(id)) return null;
    const list = Array.isArray(w.diaryList) ? w.diaryList : null;
    if (!list) return null;

    const idx = pickIndexById(list, id);
    if (idx < 0) return null;

    const prev = list[idx] || {};
    const mood = normalizeMood(patch.mood || prev.mood);
    const next = Object.freeze({
      ...prev,
      mood,
      emotionText: txt(patch.emotionText, MOOD_TEXT[mood]),
      title: txt(patch.title, prev.title),
      content: txt(patch.content, txt(prev.content, txt(prev.desc,""))),
      // id/date/image는 유지
      id: prev.id || prev.diaryId || stableId(prev),
      date: prev.date,
      image: prev.image
    });

    // 같은 배열 참조 유지
    list.splice(idx, 1, next);
    persistSession(list);
    return next;
  }

  // ---------- 공개 API: enterEditMode ----------
  w.enterEditMode = async function (di) {
    try{
      // 현재 항목 보강(없으면 전역 보관분 사용)
      di = di || w.__CURRENT_DIARY__;
      if (!di) { console.warn("수정 대상 일기 없음"); return; }

      const read = qs("#read-view");
      const slot = await ensureFormLoaded();
      if (!slot) return;

      const form = slot.querySelector(".diary-form");
      if (!form) { console.warn("form 템플릿에 .diary-form 없음"); return; }

      const { cancelBtn } = prefillForm(form, di);

      // 화면 토글
      if (read) read.hidden = true;
      slot.hidden = false;

      // 취소
      cancelBtn && (cancelBtn.onclick = function(){
        slot.hidden = true;
        if (read) read.hidden = false;
      });

      // 제출(저장)
      form.onsubmit = function (e) {
        e.preventDefault();
        try{
          // 수집
          const radios = form.querySelectorAll('input[name="mood"]');
          let moodLabel = "";
          radios.forEach(r => { if (r.checked) { const lbl=r.closest("label"); moodLabel = (lbl? lbl.textContent.trim(): ""); }});
          const mood = normalizeMood(moodLabel);
          const title = txt(form.querySelector("#title")?.value, "");
          const content = txt(form.querySelector("#content")?.value, "");

          if (!isStr(title)) { alert("제목을 입력해 주세요."); return; }

          const updated = updateDiaryLocal(di.id || di.diaryId || stableId(di), {
            mood, title, content
          });
          if (!updated) { alert("저장에 실패했습니다."); return; }

          // 읽기 화면 갱신 + 토글 복귀
          w.__CURRENT_DIARY__ = updated;
          applyReadView(updated);
          slot.hidden = true;
          if (read) read.hidden = false;

        }catch(err){
          console.error("❌ 수정 저장 실패:", err);
          alert("수정 중 오류가 발생했습니다.");
        }
      };
    }catch(e){
      console.error("❌ enterEditMode 실패:", e);
    }
  };

})(window, document);
