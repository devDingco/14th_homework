// script/formHandler.js
(function (w, d) {
  "use strict";

  // 중복 바인딩 방지
  if (w.__DIARY_FORM_BOUND__) return;

  // 라디오 값 → 내부 mood 코드 매핑
  var MOOD_MAP = {
    "😊 행복해요": "happy",
    "😢 슬퍼요": "sad",
    "😮 놀랐어요": "surprised",
    "😡 화나요": "angry",
    "❓ 기타": "etc"
  };

  function handleSubmit(e) {
    // .diary-form 의 submit만 처리 (위임)
    var form = e.target && e.target.closest && e.target.closest("form.diary-form");
    if (!form) return;

    e.preventDefault(); // ✅ 새로고침/페이지이동 방지

    try {
      var fd = new FormData(form);
      var rawMood = fd.get("mood") || "";
      var mood = MOOD_MAP[rawMood] || rawMood || "etc";

      var title = (fd.get("title") || "").trim();
      var content = (fd.get("content") || "").trim();

      // 최소 유효성 체크 (store에서 2차 검증/보정)
      if (!title) {
        alert("제목을 입력해 주세요.");
        return;
      }

      var entry = {
        id: String(Date.now()),
        mood: mood,
        title: title,
        content: content,
        date: new Date().toISOString().slice(0, 10),
        image: "./images/" + mood + ".png",
        emotionText: ({happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타"})[mood]
      };

      // ✅ 1순위: store 경유 (상태 push + 렌더 포함)
      if (typeof w.addDiary === "function") {
        w.addDiary(entry);
      } else {
        // ✅ 2순위: 직접 push 후 표준 렌더 호출 (폴백)
        w.diaryList = Array.isArray(w.diaryList) ? w.diaryList : [];
        w.diaryList.push(entry);

        if (w.DiaryList && typeof w.DiaryList.renderDiaries === "function") {
          w.DiaryList.renderDiaries(w.diaryList);
        } else if (typeof w.renderDiaries === "function") {
          w.renderDiaries(w.diaryList);
        } else {
          console.warn("⚠️ 렌더러를 찾지 못했습니다. 데이터만 추가됨.");
        }
      }

      // (선택) 필터로 가려진 카드가 있다면 해제해서 새 카드 보이게
      try { d.querySelectorAll(".diary-card.is-hidden").forEach(function(n){ n.classList.remove("is-hidden"); }); } catch {}

      // 폼 리셋
      try { form.reset(); } catch {}
    } catch (err) {
      console.error("❌ 폼 처리 중 오류:", err);
    }
  }

  // 문서 단위 위임: 동적 주입 폼도 항상 잡힘
  d.addEventListener("submit", handleSubmit, false);
  w.__DIARY_FORM_BOUND__ = true;

  // 선택: 주입 직후를 위해 initDiaryForm 훅도 노출(이미 componentLoader에서 호출 중이라면 그대로 둠)
  w.initDiaryForm = w.initDiaryForm || function(){ /* no-op: 위임이라 추가 작업 불필요 */ };

  console.log("[formHandler] submit delegation bound");
})(window, document);
