// script/diary/form/form.normalize.js
(function (w) {
  "use strict";
  w.DiaryForm = w.DiaryForm || {};
  if (w.DiaryForm.normalize) return;

  function s(v){ return typeof v === "string" ? v.trim() : ""; }

  function buildEntry(fd){
    var DC = w.DiaryConst || null;
    var rawMood = s(fd.get("mood") || "");
    var mood = (DC && typeof DC.moodFromInput === "function")
      ? DC.moodFromInput(rawMood)
      : (rawMood || "etc");

    var entry = {
      id: String(Date.now()),
      mood: mood,
      title: s(fd.get("title") || ""),
      content: s(fd.get("content") || ""),
      date: new Date().toISOString().slice(0,10),
      image: (DC && typeof DC.imageFor === "function")
        ? DC.imageFor(mood)
        : ("./images/" + mood + ".png"),
      emotionText: (DC && DC.emotionText)
        ? (DC.emotionText[mood] || DC.emotionText.etc)
        : (mood || "기타")
    };

    // DiaryId 계약 준수
    try {
      if (w.DiaryId) {
        if (typeof w.DiaryId.get === "function") entry.id = w.DiaryId.get() || entry.id;
        if ((!entry.id || entry.id === "undefined") && typeof w.DiaryId.deriveId === "function") entry.id = w.DiaryId.deriveId(entry);
        if (typeof w.DiaryId.set === "function") w.DiaryId.set(entry.id);
      }
    } catch(_){}

    return entry;
  }

  function validate(entry){
    return (entry && entry.title) ? null : "제목을 입력해 주세요.";
  }

  w.DiaryForm.normalize = function(fd){ return buildEntry(fd); };
  w.DiaryForm.validate = validate;
})(window);
