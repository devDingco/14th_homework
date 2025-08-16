// script/diary/store.validate.js
(function (w) {
  "use strict";
  var C = w.DiaryStoreCore;
  if (!C) return;

  // emotionText 기본값 맵
  var EMO = { happy: "행복해요", sad: "슬퍼요", angry: "화나요", surprised: "놀랐어요", etc: "기타" };

  function validateDiary(dy) {
    if (!dy || typeof dy !== "object") throw new Error("newDiary는 객체여야 합니다.");

    // 정규화 (코어/유틸 위임 사용)
    dy.mood = C.normalizeMood(dy.mood);
    if (!C.isNonEmptyString(dy.title)) throw new Error("title은 필수입니다.");
    dy.date = C.normalizeDate(dy.date);

    // 파생 필드 채움
    if (!C.isNonEmptyString(dy.image)) dy.image = "./images/" + dy.mood + ".png";
    if (!C.isNonEmptyString(dy.emotionText)) dy.emotionText = EMO[dy.mood] || "기타";

    // ID 보장
    if (!C.isNonEmptyString(dy.id) && !C.isNonEmptyString(dy.diaryId)) {
      dy.id = C.deriveId(dy);
    }
  }

  // 코어에 주입(동일 이름으로 덮어쓰기)
  C.validateDiary = validateDiary;
})(window);
