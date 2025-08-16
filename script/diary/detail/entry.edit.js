// script/diaryDetail.edit.js
(function (w, d) {
  "use strict";
  if (w.__DETAIL_EDIT_INIT__) return;
  w.__DETAIL_EDIT_INIT__ = true;

  function qs(sel, root){ return (root||d).querySelector(sel); }
  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }

  // 최신 스토어 상태로 대상 일기를 보정
  function resolveCurrent(di){
    di = di || w.__CURRENT_DIARY__;
    if (!di) return null;
    try{
      var EU = w.DetailEditUtil;
      var id = di.id || di.diaryId || (EU && EU.deriveIdSafe ? EU.deriveIdSafe(di) : null);
      var list = Array.isArray(w.diaryList) ? w.diaryList : null;
      if (!list || !isStr(id)) return di;
      var idx = EU && EU.findIndex ? EU.findIndex(list, id) : -1;
      return (idx >= 0 ? list[idx] : di);
    }catch(_){ return di; }
  }

  // 읽기 화면 갱신은 DetailView로 위임 (폴백: 제목만)
  function applyReadView(di){
    try{
      if (w.DetailView && typeof w.DetailView.renderRead === "function") {
        return w.DetailView.renderRead(di);
      }
    }catch(_){}
    var read = qs("#read-view");
    var t = read && qs(".title", read);
    if (t) t.textContent = (di && isStr(di.title)) ? di.title : "(제목 없음)";
  }

  // 공개 API: 편집 모드 진입
  w.enterEditMode = async function (di) {
    // 1) 대상 확정 + 최신화
    di = resolveCurrent(di);
    if (!di) { console.warn("수정 대상 일기 없음"); return; }

    // 2) 폼 로딩 + 프리필
    var slot = (w.DetailForm && w.DetailForm.loadTemplate)
      ? await w.DetailForm.loadTemplate("#edit-slot")
      : qs("#edit-slot");
    if (!slot) return;

    // 템플릿이 없다면 로드 실패로 종료
    var form = slot.querySelector(".diary-form");
    if (!form) { console.warn("form 템플릿에 .diary-form 없음"); return; }

    var pf = (w.DetailForm && w.DetailForm.prefill)
      ? w.DetailForm.prefill(form, di)
      : { submitBtn: form.querySelector('button[type="submit"]'),
          cancelBtn: form.querySelector(".form-actions .btn-cancel") };

    // 3) 화면 토글
    var read = qs("#read-view");
    if (read) read.hidden = true;
    slot.hidden = false;

    // 4) 저장/취소 바인딩을 모듈에 위임
    if (w.DetailActions && typeof w.DetailActions.bind === "function") {
      w.DetailActions.bind(form, di, {
        onSaved: function(updated){
          w.__CURRENT_DIARY__ = updated;
          applyReadView(updated);
          slot.hidden = true; if (read) read.hidden = false;
        },
        onCancel: function(){
          slot.hidden = true; if (read) read.hidden = false;
        }
      });
    } else {
      // 최소 폴백: 취소만 동작
      if (pf.cancelBtn) pf.cancelBtn.onclick = function(){
        slot.hidden = true; if (read) read.hidden = false;
      };
    }
  };
})(window, document);
