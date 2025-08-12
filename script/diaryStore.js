// script/diaryStore.js
(function (global) {
  "use strict";

  // --- 상태: 전역 배열 참조 유지(재할당 금지) ---
  // 기존에 window.diaryList가 배열이면 '그 참조'를 그대로 사용
  // 아니면 새 배열을 만들고 그 참조를 전역에 등록
  var state = Array.isArray(global.diaryList) ? global.diaryList : [];
  if (!Array.isArray(global.diaryList)) {
    global.diaryList = state;
  }

  var ALLOWED_MOODS = ["happy", "sad", "angry", "surprised", "etc"];

  // --- 유틸 ---
  function isNonEmptyString(v) {
    return typeof v === "string" && v.trim().length > 0;
  }

  function safeRender() {
    try {
      // 모듈 방식(권장)
      if (global.DiaryList && typeof global.DiaryList.renderDiaries === "function") {
        return global.DiaryList.renderDiaries(state);
      }
      // 구 전역 방식
      if (typeof global.renderDiaries === "function") {
        return global.renderDiaries(state);
      }
      // 렌더러가 아직 없을 수 있음(초기 부트 경합)
      // 이 경우는 조용히 넘어감
    } catch (e) {
      console.error("렌더 호출 중 오류:", e);
    }
  }

  // --- 검증/보정 ---
  function validateDiary(d) {
    if (!d || typeof d !== "object") {
      throw new Error("newDiary는 객체여야 합니다.");
    }

    if (!isNonEmptyString(d.mood)) {
      throw new Error("mood는 필수입니다.");
    }
    if (!ALLOWED_MOODS.includes(d.mood)) {
      console.warn("허용하지 않는 mood 입니다. etc로 대체합니다.", d.mood);
      d.mood = "etc";
      if (!isNonEmptyString(d.emotionText)) d.emotionText = "기타";
    }

    if (!isNonEmptyString(d.title)) {
      throw new Error("title은 필수입니다.");
    }

    if (!isNonEmptyString(d.date)) {
      // 날짜 없으면 오늘 날짜(YYYY.MM.DD)로 보정
      var now = new Date();
      var yy = now.getFullYear();
      var mm = String(now.getMonth() + 1).padStart(2, "0");
      var dd = String(now.getDate()).padStart(2, "0");
      d.date = yy + "." + mm + "." + dd;
    }

    // 이미지 없거나 경로 이상하면 기본 이미지 보정
    if (!isNonEmptyString(d.image)) {
      d.image = "./images/" + d.mood + ".png";
    }

    // 감정 텍스트 보정
    if (!isNonEmptyString(d.emotionText)) {
      var map = { happy: "행복해요", sad: "슬퍼요", angry: "화나요", surprised: "놀랐어요", etc: "기타" };
      d.emotionText = map[d.mood] || "기타";
    }

    // id 보정(없으면 간단 생성)
    if (!isNonEmptyString(d.id) && !isNonEmptyString(d.diaryId)) {
      d.id = String(Date.now());
    }
  }

  // --- API: 추가 ---
  function addDiary(newDiary) {
    try {
      var draft = JSON.parse(JSON.stringify(newDiary)); // 원본 보호
      validateDiary(draft);

      var frozen = Object.freeze(draft); // 외부 변조 방지
      state.push(frozen);

      // 다음 페인트에 안전 렌더
      requestAnimationFrame(safeRender);
    } catch (err) {
      console.error("❌ 일기 등록 실패:", err);
    }
  }

  // --- API: 초기 데이터 주입/동기화(참조 유지) ---
  // data 배열을 현재 state 배열 '참조를 유지한 채' 채워넣는다.
  // mode: 'replace'(기본) → 전체 교체 / 'merge' → 뒤에 붙이기
  function hydrateDiaries(data, mode) {
    if (!Array.isArray(data)) {
      console.warn("hydrateDiaries: 배열이 아닙니다. 무시:", data);
      return;
    }
    try {
      if (mode === "merge") {
        for (var i = 0; i < data.length; i++) {
          var item = JSON.parse(JSON.stringify(data[i]));
          try { validateDiary(item); } catch (_) {} // 초기 데이터는 관대하게
          state.push(Object.freeze(item));
        }
      } else {
        // replace: 기존 요소 제거 후 새로 채움 (참조 유지)
        state.splice(0, state.length);
        for (var j = 0; j < data.length; j++) {
          var it = JSON.parse(JSON.stringify(data[j]));
          try { validateDiary(it); } catch (_) {}
          state.push(Object.freeze(it));
        }
      }
      requestAnimationFrame(safeRender);
    } catch (e) {
      console.error("hydrateDiaries 실패:", e);
    }
  }

  // --- API: 조회(사본) ---
  function getDiaries() {
    return state.slice();
  }

  // --- 전역 노출 ---
  global.diaryList = state;       // 동일 참조 유지
  global.addDiary = addDiary;
  global.getDiaries = getDiaries;
  global.hydrateDiaries = hydrateDiaries;

})(window);
