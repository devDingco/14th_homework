// script/diary/store.validate.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  if (!C) return;

  // emotionText: DiaryConst 우선, 실패 시 안전한 기본값
  // 간결 폴백: 로더가 기본값을 주입하므로 최소만 유지
  function emoText(mood) {
    var map = w.DiaryConst && w.DiaryConst.emotionText;
    return (map && map[mood]) || (map && map.etc) || "기타";
  }
  function validateDiary(dy) {
    if (!dy || typeof dy !== "object") throw new Error("newDiary는 객체여야 합니다.");

    // 정규화 (코어/유틸 위임 사용)
    dy.mood = C.normalizeMood(dy.mood);
    if (!C.isNonEmptyString(dy.title)) throw new Error("title은 필수입니다.");
    dy.date = C.normalizeDate(dy.date);

    // 파생 필드 채움
    if (!C.isNonEmptyString(dy.image)) {
      dy.image = (w.DiaryConst && typeof w.DiaryConst.imageFor === "function")
        ? w.DiaryConst.imageFor(dy.mood)
        : ("./images/" + dy.mood + ".png"); // 안전 폴백
    }   if (!C.isNonEmptyString(dy.emotionText)) dy.emotionText = emoText(dy.mood);
    // ID 보장
    if (!C.isNonEmptyString(dy.id) && !C.isNonEmptyString(dy.diaryId)) {
      dy.id = C.deriveId(dy);
    }
  }

  // 코어에 주입(동일 이름으로 덮어쓰기)
  C.validateDiary = validateDiary;
})(window);
