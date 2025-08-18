// script/diary/list/card.click.js
(function (w, d) {
  "use strict";

  // 네임스페이스(선택 사용)
  var Nav = w.DiaryCardNav = w.DiaryCardNav || {};

  function saveCache() {
    try {
      var list = Array.isArray(w.diaryList) ? w.diaryList : [];
      sessionStorage.setItem("diaryCache", JSON.stringify(list));
    } catch (e) {
      console.warn("diaryCache 저장 실패:", e);
    }
  }

  function buildDetailURL(id) {
    // 현 위치 기준으로 안전하게 경로 계산(./subpage/detail.html)
    var u = new URL("./subpage/detail.html", w.location.href);
    u.searchParams.set("id", String(id));
    return u.toString();
  }

  function open(id, entry) {
    if (!id) {
      console.warn("상세 id 없음", entry);
      return;
    }
    saveCache();
    try {
      w.location.href = buildDetailURL(id);
    } catch (e) {
      console.error("상세 페이지 이동 실패:", e);
    }
  }

  // 공개 API (기존 전역 유지)
  Nav.open = open;
  w.openDiaryDetail = open;

})(window, document);
