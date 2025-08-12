(function (w) {
  "use strict";
  var DL = w.DiaryList = w.DiaryList || {};
  DL.bindDetail = function (card, entry) {
    if (typeof w.bindDiaryDetail === "function") {
      try { w.bindDiaryDetail(card, entry); return; } catch (_) {}
    }
    card.addEventListener("click", function () {
      alert(["[일기 상세 정보]", "📅 날짜: " + entry.date, "😊 기분: " + entry.emotionText, "📝 제목: " + entry.title].join("\n"));
    });
  };
})(window);
