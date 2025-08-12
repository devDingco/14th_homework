(function (w) {
  "use strict";
  var U = w.DiaryListUtils, DL = w.DiaryList = w.DiaryList || {};
  DL.normalizeEntry = function (raw) {
    raw = raw || {};
    var mood = U.clsSeg(raw.mood || raw.emotion || "unknown", "unknown");
    var title = U.txt(raw.title, "(제목 없음)");
    var emotionText = U.txt(raw.emotionText || raw.moodText || raw.mood, "기분 미상");
    var image = U.txt(raw.image, "");
    var d = new Date(U.txt(raw.date, ""));
    if (isNaN(d)) { var n = Number(raw.date); d = isNaN(n) ? new Date() : new Date(n); }
    var displayDate = d.toISOString().slice(0, 10);
    return { mood: mood, title: title, emotionText: emotionText, image: image, date: displayDate, _raw: raw };
  };
})(window);
