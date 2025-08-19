// 조건별 HTML 표시 함수
function toggleContentDisplay() {
  const cardListElement = document.querySelector(".body-card-list");
  const undefinedElement = document.querySelector(
    ".body-contents-undefined-data"
  );
  const existingCards = cardListElement
    ? cardListElement.querySelectorAll(".diary-card")
    : [];

  if (
    window.diaryCardsData &&
    window.diaryCardsData.length > 0 &&
    existingCards.length > 0
  ) {
    cardListElement.style.display = "grid";
    undefinedElement.style.display = "none";
  } else {
    cardListElement.style.display = "none";
    undefinedElement.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  toggleContentDisplay();

  // 드롭다운 기능
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const dropdownText = document.querySelector(".dropdown-text");

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener("click", function () {
      dropdownMenu.classList.toggle("show");
      dropdownButton.classList.toggle("active");
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", function (event) {
      if (!dropdownButton.contains(event.target)) {
        dropdownMenu.classList.remove("show");
        dropdownButton.classList.remove("active");
      }
    });

    // 드롭다운 아이템 클릭 처리
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function () {
        // 모든 아이템에서 active 클래스 제거
        dropdownItems.forEach((i) => i.classList.remove("active"));
        // 클릭된 아이템에 active 클래스 추가
        this.classList.add("active");
        // 텍스트 업데이트
        const selectedText = this.querySelector("span").textContent;
        dropdownText.textContent = selectedText;
        // 드롭다운 닫기
        dropdownMenu.classList.remove("show");
        dropdownButton.classList.remove("active");
      });
    });
  }
});

// 전역 함수로 노출
window.toggleContentDisplay = toggleContentDisplay;
