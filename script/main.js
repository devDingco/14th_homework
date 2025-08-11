// main.js (최상단)
window.diaryList = Array.isArray(window.diaryList) ? window.diaryList : [];

whenReady(() => {
  renderDiariesFromUrl("./script/json/data.json")
    .catch(err => console.error("초기 렌더 실패:", err));
});

function renderDiaries(diaries) {
  const list = document.getElementById("diary-list");
  if (!list) {
    console.error("❌ #diary-list가 존재하지 않습니다.");
    return;
  }

  list.innerHTML = "";

  diaries.forEach((entry, idx) => {
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
      list.appendChild(card);
    } catch (err) {
      console.error(`❌ 카드 ${idx + 1} 렌더링 실패:`, err);
    }
  });
}

// ✅ JSON 데이터 fetch
fetch("./script/json/data.json")
  .then((res) => res.json())
  .then((data) => {
    // ✅ 전역 diaryList에 초기 데이터 복사
    data.forEach((entry) => diaryList.push(entry));

    // ✅ 초기 렌더링
    renderDiaries(diaryList);
  })
  .catch((err) => {
    console.error("❌ JSON 로드 실패:", err);
  });

