// script/diaryStore.js
(function (global) {
  "use strict";

  // 전역 단일 상태 보존 (중복 로딩 시에도 하나만 유지)
  const state = Array.isArray(global.diaryList) ? global.diaryList : [];
  const ALLOWED_MOODS = ["happy", "sad", "angry", "surprised", "etc"];

  function isNonEmptyString(v) {
    return typeof v === "string" && v.trim().length > 0;
  }

  function validateDiary(d) {
    if (!d || typeof d !== "object") {
      throw new Error("newDiary는 객체여야 합니다.");
    }
    if (!isNonEmptyString(d.mood)) throw new Error("mood는 필수입니다.");
    if (!ALLOWED_MOODS.includes(d.mood)) {
      console.warn("허용하지 않는 mood 입니다. etc로 대체합니다.", d.mood);
      d.mood = "etc";
      d.emotionText = d.emotionText || "기타";
    }

    if (!isNonEmptyString(d.title)) throw new Error("title은 필수입니다.");
    if (!isNonEmptyString(d.date)) {
      // 날짜 없으면 오늘 날짜(YYYY.MM.DD)로 보정
      const now = new Date();
      const yy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      d.date = `${yy}.${mm}.${dd}`;
    }

    // 이미지 없거나 경로 이상하면 기본 이미지로 보정
    if (!isNonEmptyString(d.image)) {
      d.image = `images/${d.mood}.png`;
    }

    // 감정 텍스트 보정
    if (!isNonEmptyString(d.emotionText)) {
      const map = { happy: "행복해요", sad: "슬퍼요", angry: "화나요", surprised: "놀랐어요", etc: "기타" };
      d.emotionText = map[d.mood] || "기타";
    }
  }

  function addDiary(newDiary) {
    try {
      // 원본 오염 방지
      const draft = JSON.parse(JSON.stringify(newDiary));
      validateDiary(draft);

      // 불변 스냅샷으로 저장
      const frozen = Object.freeze(draft);
      state.push(frozen);

      // 렌더러가 준비되어 있으면 다음 틱에서 그리기
      if (typeof global.renderDiaries === "function") {
        // 렌더 중첩 방지 및 페인트 타이밍 안정화를 위해 rAF 사용
        requestAnimationFrame(() => {
          try {
            global.renderDiaries(state);
          } catch (e) {
            console.error("렌더 호출 중 오류:", e);
          }
        });
      } else {
        console.warn("renderDiaries가 아직 없습니다. 나중에 수동 호출이 필요합니다.");
      }
    } catch (err) {
      console.error("❌ 일기 등록 실패:", err);
    }
  }

  function getDiaries() {
    // 외부에서 직접 수정 못하도록 사본 제공
    return state.slice();
  }

  // 전역 노출 (필수 최소한만)
  global.diaryList = state;
  global.addDiary = addDiary;
  global.getDiaries = getDiaries;
})(window);
