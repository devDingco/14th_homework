// script/diary/list/list.bind.js
(function (w) {
  "use strict";
  var DL = w.DiaryList = w.DiaryList || {};

  /**
   * 카드에 "상세 UX"를 바인딩한다.
   * - 실제 동작은 detail.bind.adapter.js의 w.bindDiaryDetail이 전담
   * - 어댑터가 없을 경우, 여기서는 아무것도 하지 않는다(중복 방지)
   */
  DL.bindDetail = function (card, entry) {
    try {
      if (typeof w.bindDiaryDetail === "function") {
        // 어댑터가 자체적으로 중복 방지(markOnce) 처리함
        w.bindDiaryDetail(card, entry);
      } else {
        // 어댑터 누락 시: 조용히 패스 (중복/충돌 방지)
        // 필요 시 여기에 최소 폴백을 넣을 수 있지만, 중복 방지를 위해 비워둔다.
      }
    } catch (e) {
      console.warn("DL.bindDetail 위임 중 오류:", e);
    }
  };
})(window);
