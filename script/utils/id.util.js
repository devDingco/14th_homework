// script/utils/id.util.js
(function (w, d) {
  "use strict";

  function str(v){ return (v == null) ? "" : String(v); }

  function fromEntry(entry){
    if (!entry) return "";
    // 우선순위: id → diaryId → _id/idx → _raw.id/diaryId
    var direct = entry.id || entry.diaryId || entry._id || entry.idx;
    if (direct) return str(direct);

    try {
      var raw = entry._raw || {};
      if (raw.id || raw.diaryId) return str(raw.id || raw.diaryId);
    } catch(_) {}

    // 최후 보조: 스토어 유틸의 deriveId
    try {
      if (w.DiaryStoreUtil && typeof w.DiaryStoreUtil.deriveId === "function") {
        return str(w.DiaryStoreUtil.deriveId(entry) || "");
      }
    } catch(_) {}

    return "";
  }

  function fromEl(el){
    if (!el) return "";
    // 자신 → data-* → 상위 .diary-card → 버튼(data-diary-id)
    var id = (el.dataset && (el.dataset.diaryId || el.dataset.id))
          || el.getAttribute("data-diary-id")
          || el.getAttribute("data-id");

    if (id) return str(id);

    var card = el.closest ? el.closest(".diary-card") : null;
    if (card) {
      var cid = (card.dataset && (card.dataset.diaryId || card.dataset.id))
             || card.getAttribute("data-diary-id")
             || card.getAttribute("data-id");
      if (cid) return str(cid);

      // 카드 내부 버튼에도 달려 있을 수 있음
      var btn = card.querySelector && card.querySelector("[data-role='view-detail']");
      if (btn && btn.dataset && btn.dataset.diaryId) return str(btn.dataset.diaryId);
    }

    return "";
  }

  function get(entry, el){
    return fromEntry(entry) || fromEl(el) || "";
  }

  function set(el, id){
    if (!el) return;
    try {
      if (el.dataset) el.dataset.diaryId = str(id);
      else el.setAttribute("data-diary-id", str(id));
    } catch(_) {}
  }

  w.DiaryId = { get: get, set: set };
})(window, document);
