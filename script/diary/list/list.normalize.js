// script/diary/list/list.normalize.js
(function (w, d) {
  "use strict";

  var DL = w.DiaryList = w.DiaryList || {};
  var U  = w.DiaryListUtils || {};

  // 감정 텍스트 기본 매핑
  var EMO_MAP = {
    happy: "행복해요",
    sad: "슬퍼요",
    angry: "화나요",
    surprised: "놀랐어요",
    etc: "기타"
  };

  // 날짜를 안전하게 표시값으로 포맷
  function toDisplayDate(input) {
    try {
      if (!input) throw new Error("empty");
      // 숫자 타임스탬프 문자열일 수도 있음
      var n = Number(input);
      var dt = isNaN(n) ? new Date(String(input)) : new Date(n);
      if (isNaN(dt.getTime())) throw new Error("invalid");
      // YYYY-MM-DD (이전 코드와 최대한 호환)
      return dt.toISOString().slice(0, 10);
    } catch (_) {
      // 오늘 날짜로 폴백
      var now = new Date();
      return now.toISOString().slice(0, 10);
    }
  }

  /**
   * ✅ 핵심: normalizeEntry
   * - id: 항상 존재하도록 U.stableId(raw)를 사용(원본 id/_id 있으면 그대로)
   * - mood/title/emotionText/image/date 등 안전 보정
   * - _raw: 원본 객체 참조 유지 (추후 편집/비교에 유용)
   */
  DL.normalizeEntry = function normalizeEntry(raw) {
    raw = raw || {};

    // 1) id 보장
    var id = null;
    try {
      id = raw.id || raw._id || (U && typeof U.stableId === "function" ? U.stableId(raw) : null);
      if (!id) throw new Error("no-id");
    } catch (_) {
      // 최후의 폴백: 시간+랜덤
      id = "tmp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
    }

    // 2) 감정(클래스 세그먼트로 정규화)
    var moodRaw = raw.mood || raw.emotion || "etc";
    var mood = (U && typeof U.clsSeg === "function") ? U.clsSeg(moodRaw, "etc") : String(moodRaw || "etc");

    // 3) 텍스트류 안전
    var title = (U && typeof U.txt === "function") ? U.txt(raw.title, "(제목 없음)") : (raw.title || "(제목 없음)");
    var emotionText = raw.emotionText || EMO_MAP[mood] || "기타";

    // 4) 이미지 경로 보정
    var image = raw.image;
    if (!image || typeof image !== "string" || !image.trim()) {
      image = "./images/" + mood + ".png";
    }

    // 5) 날짜 표시값
    var date = toDisplayDate(raw.date);

    return {
      id: String(id),
      mood: mood,
      title: title,
      emotionText: emotionText,
      image: image,
      date: date,
      _raw: raw
    };
  };

})(window, document);
