let listEl;
document.addEventListener("DOMContentLoaded", function () {
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
        // 카드 필터링 렌더링
        if (typeof window.renderCards === "function") {
          const mood = this.getAttribute("data-value") || "all";
          if (window.pagination) window.pagination.currentPage = 1; // 필터 변경 시 1페이지로 이동
          window.renderCards(mood === "all" ? "all" : selectedText);
        }
      });
    });
  }

  // 검색 기능: 제목 기준, Enter 즉시 검색 + 1초 디바운스 자동 검색
  const searchInput = document.querySelector(".search-input");
  function performSearch() {
    const term = (searchInput?.value || "").trim();
    window.currentSearchTerm = term; // 전역 상태로 저장하여 렌더에서 사용
    if (window.pagination) window.pagination.currentPage = 1;
    if (typeof window.renderCards === "function") {
      window.renderCards(window.currentFilter || "all");
    }
  }
  if (searchInput) {
    let debounceTimer;
    // 입력 후 1초 정지 시 자동 검색
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(performSearch, 1000);
    });
    // Enter로 즉시 검색
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(debounceTimer);
        performSearch();
      }
    });
  }
});

function sortCardsLocalStorage() {
  const result = {
    happy: [],
    sad: [],
    surprised: [],
    angry: [],
    etc: [],
  };

  try {
    const raw = localStorage.getItem("diaries", JSON.stringify(result));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        result.happy = parsed.filter((item) => item.mood === "행복해요");
        result.sad = parsed.filter((item) => item.mood === "슬퍼요");
        result.surprised = parsed.filter((item) => item.mood === "놀랐어요");
        result.angry = parsed.filter((item) => item.mood === "화나요");
      }
    }
  } catch (_) {}

  return result;
}

function sortCards() {
  const result = document.querySelector(".body-card-list");
  if (!result) return;

  const data =
    window.cardData && Array.isArray(cardData.getItem("diaryCardsData"))
      ? cardData.getItem("diaryCardsData")
      : [];

  if (!data.length) {
    listEl.style.display = "none";
    return;
  }
}
