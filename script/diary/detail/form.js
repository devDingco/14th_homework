// script/diary/detail/form.js
(function (w, d) {
  "use strict";

  function qs(sel, root){ return (root||d).querySelector(sel); }
  function isStr(v){ return typeof v === "string" && v.trim().length > 0; }
  var MOOD_TEXT = (w.DetailEditUtil && w.DetailEditUtil.MOOD_TEXT) || { happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타" };

  var _loaded = false;

  async function loadTemplate(slotSelector){
    var slot = qs(slotSelector || "#edit-slot");
    if (!slot) return null;
    if (_loaded) return slot;
    try{
      var res = await fetch("../component/form.html", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP "+res.status);
      slot.innerHTML = await res.text();
      _loaded = true;
      return slot;
    }catch(e){
      console.error("❌ form.html 로드 실패:", e);
      return null;
    }
  }

  function prefill(form, di){
    if (!form || !di) return { submitBtn:null, cancelBtn:null };

    // mood 라디오
    var want = MOOD_TEXT[di.mood] || "기타";
    form.querySelectorAll('input[name="mood"]').forEach(function(r){
      var label = r.closest("label");
      var text = label ? label.textContent.trim() : "";
      r.checked = text.includes(want);
    });

    // title / content
    var titleEl = form.querySelector("#title");
    var contentEl = form.querySelector("#content");
    if (titleEl)   titleEl.value   = isStr(di.title) ? di.title : "";
    if (contentEl) contentEl.value = isStr(di.content) ? di.content : (isStr(di.desc) ? di.desc : "");

    // 버튼/레이아웃
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.textContent = "수정하기"; submitBtn.classList.add("is-edit-submit"); }
    form.classList.add("is-edit-mode");

    var actions = form.querySelector(".form-actions");
    if (!actions && submitBtn && submitBtn.parentNode) {
      actions = d.createElement("div");
      actions.className = "form-actions";
      submitBtn.parentNode.insertBefore(actions, submitBtn);
      actions.appendChild(submitBtn);
    }
    var cancelBtn = actions && actions.querySelector(".btn-cancel");
    if (!cancelBtn && actions) {
      cancelBtn = d.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "btn-cancel";
      cancelBtn.textContent = "취소";
      actions.insertBefore(cancelBtn, actions.firstChild);
    }
    return { submitBtn: submitBtn || null, cancelBtn: cancelBtn || null };
  }

  w.DetailForm = { loadTemplate: loadTemplate, prefill: prefill };
})(window, document);
