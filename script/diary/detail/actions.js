// script/diary/detail/actions.js
(function (w, d) {
  "use strict";
  function qs(sel, root){ return (root||d).querySelector(sel); }
  function isStr(v){ return typeof v==="string" && v.trim().length>0; }
  function txt(v, fb){ return isStr(v)? v : (fb||""); }

  function getValues(form, di){
    var EU = w.DetailEditUtil || {};
    var mood = di.mood;
    try{
      var radios = form.querySelectorAll('input[name="mood"]');
      var moodLabel = "";
      radios.forEach(function(r){
        if (r.checked) {
          var lbl = r.closest("label");
          moodLabel = lbl ? lbl.textContent.trim() : "";
        }
      });
      if (moodLabel) {
        mood = (EU && EU.normalizeMoodForForm)
          ? EU.normalizeMoodForForm(moodLabel)
          : moodLabel.toLowerCase();
      }
    }catch(_){}

    var title   = txt(qs("#title", form)?.value, "");
    var content = txt(qs("#content", form)?.value, "");
    return { mood: mood, title: title, content: content };
  }

  function bind(form, di, opts){
    opts = opts || {};
    var EU = w.DetailEditUtil || {};
    var DS = w.DetailSave;
    var saving = false;

    var submitBtn = form.querySelector('button[type="submit"]');
    var cancelBtn = form.querySelector(".form-actions .btn-cancel");
    if (cancelBtn) {
      cancelBtn.onclick = function(){ if (typeof opts.onCancel === "function") opts.onCancel(); };
    }

    form.onsubmit = function(e){
      e.preventDefault();
      if (saving) return;

      var prevLabel = submitBtn ? submitBtn.textContent : "";
      try{
        var vals = getValues(form, di);
        if (!isStr(vals.title)) { alert("제목을 입력해 주세요."); return; }

        saving = true;
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "저장 중..."; }

        var rawId = di.id || di.diaryId || (EU && EU.deriveIdSafe ? EU.deriveIdSafe(di) : null);
        var updated = (DS && typeof DS.saveById === "function")
          ? DS.saveById(rawId, vals)
          : (typeof w.updateDiary === "function" ? w.updateDiary(rawId, vals) : null);

        if (!updated) { alert("저장에 실패했습니다."); return; }
        if (typeof opts.onSaved === "function") opts.onSaved(updated);

      }catch(err){
        console.error("❌ 저장 처리 실패:", err);
        alert("수정 중 오류가 발생했습니다.");
      }finally{
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = prevLabel || "수정하기"; }
        saving = false;
      }
    };
  }

  w.DetailActions = { bind: bind };
})(window, document);
