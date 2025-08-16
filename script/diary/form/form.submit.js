// script/diary/form/form.submit.js
(function (w, d) {
  "use strict";
  if (w.__DIARY_FORM_SUBMIT_INIT__) return;
  w.__DIARY_FORM_SUBMIT_INIT__ = true;

  function onSubmit(e){
    var form = e.target && e.target.closest && e.target.closest("form.diary-form");
    if (!form) return;
    e.preventDefault(); e.stopPropagation();

    var btn = form.querySelector("[type=submit]");
    if (btn && btn.disabled) return;
    if (btn){ btn.disabled = true; btn.dataset.loading = "1"; }

    try {
      var fd = new FormData(form);
      var entry = (w.DiaryForm && w.DiaryForm.normalize) ? w.DiaryForm.normalize(fd) : null;
      if (!entry){ throw new Error("normalize missing"); }

      var err = (w.DiaryForm && w.DiaryForm.validate) ? w.DiaryForm.validate(entry) : null;
      if (err){ alert(err); return; }

      Promise.resolve(w.DiaryForm.save(entry)).then(function(saved){
        if (form.dataset.redirect==="detail" && typeof w.openDiaryDetail==="function") {
          var id = (saved && saved.id) || entry.id;
          if (id) w.openDiaryDetail(id, saved || entry);
        }
        try { form.reset(); } catch(_){}
        try { d.querySelectorAll(".diary-card.is-hidden").forEach(function(n){ n.classList.remove("is-hidden"); }); } catch(_){}
      }).catch(function(err){
        console.error("❌ diary form submit failed:", err);
        alert("저장 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }).finally(function(){
        if (btn){ btn.disabled = false; delete btn.dataset.loading; }
      });
    } catch (err){
      console.error("❌ diary form submit failed:", err);
      if (btn){ btn.disabled = false; delete btn.dataset.loading; }
      alert("저장 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  // 문서 위임(캡처): 동적 폼 포함, 상위 핸들러 충돌 최소화
  d.addEventListener("submit", onSubmit, true);
  console.log("[form.submit] delegation bound");
})(window, document);
