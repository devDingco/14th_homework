window.bindDiaryDetail = function(cardElement, diaryData) {
  try {
    if (!(cardElement instanceof HTMLElement)) {
      throw new Error("cardElement는 유효한 DOM 요소가 아닙니다.");
    }
    if (!diaryData || typeof diaryData !== "object") {
      throw new Error("diaryData는 유효한 객체여야 합니다.");
    }

    // 기존 이벤트 제거
    cardElement.removeEventListener("click", cardElement._diaryClickHandler || (() => {}));

    // 고정된 핸들러 생성
    const handler = () => {
      alert(`📖 상세 정보\n\n📅 날짜: ${diaryData.date}\n😊 기분: ${diaryData.emotionText}\n📝 제목: ${diaryData.title}`);
    };

    // 핸들러 저장 후 바인딩
    cardElement._diaryClickHandler = handler;
    cardElement.addEventListener("click", handler);

    console.log(`✅ 바인딩 완료: ${diaryData.title}`);
  } catch (err) {
    console.error("❌ bindDiaryDetail 오류:", err);
  }
};
