// cardClickHandler.js

function bindDiaryCardClick() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".diary-card");
    if (card) {
      const title = card.querySelector(".card-title")?.innerText || "제목 없음";
      const date = card.querySelector(".date")?.innerText || "날짜 없음";
      const mood = card.className.split("mood-")[1] || "기분 없음";

      alert(`📖 상세 정보\n\n📅 날짜: ${date}\n😊 기분: ${mood}\n📝 제목: ${title}`);
    }
  });
}
