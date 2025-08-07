const diaryList = [];

function renderDiaries(data) {
  const list = document.getElementById("diary-list");
  if (!list) {
    console.error("❌ #diary-list가 없습니다.");
    return;
  }

  list.innerHTML = "";

  data.forEach((entry, idx) => {
    try {
      const card = document.createElement("div");
      card.className = `diary-card mood-${entry.mood}`;
      card.innerHTML = `
        <div class="card-top">
          <div class="profile-wrapper">
            <img src="${entry.image}" alt="${entry.mood}" class="profile-img" />
          </div>
        </div>
        <div class="card-bottom">
          <div class="card-meta">
            <span class="emotion ${entry.mood}">${entry.emotionText}</span>
            <span class="date">${entry.date}</span>
          </div>
          <div class="card-title">${entry.title}</div>
        </div>
      `;

      if (typeof bindDiaryDetail === "function") {
        bindDiaryDetail(card, entry);
        console.log(`✅ bindDiaryDetail 호출 완료: ${entry.title}`);
      } else {
        console.warn(`⚠️ bindDiaryDetail 미정의 → fallback alert 바인딩`);
        card.addEventListener("click", () => {
          alert(`📘 [일기 상세 정보]\n📅 날짜: ${entry.date}\n😊 기분: ${entry.emotionText}\n📝 제목: ${entry.title}`);
        });
      }

      // 확인 로그
      card.addEventListener("mouseenter", () => {
        console.log(`🟡 카드 활성됨: ${entry.title}`);
      });

      list.appendChild(card);

    } catch (err) {
      console.error(`❌ 카드 렌더링 실패: ${entry.title}`, err);
    }
  });

  console.log("✅ 전체 카드 렌더링 완료");
}
function addDiary(newDiary) {
  try {
    if (!newDiary || typeof newDiary !== "object") {
      throw new Error("newDiary는 유효한 객체여야 합니다.");
    }
    diaryList.push(newDiary);
    renderDiaries(diaryList);
  } catch (err) {
    console.error("❌ 일기 등록 실패:", err);
  }
}
addDiary({
  
    mood: "surprised",
    emotionText: "놀랐어요",
    date: "2024.03.12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "images/surprised.png"
  
});


