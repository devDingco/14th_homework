// 메인 리스트 DOM 참조용 변수
// 주의: 실제 DOM 요소를 할당하는 로직이 별도로 필요합니다.
let listEl;
document.addEventListener("DOMContentLoaded", function () {
  // 1) 드롭다운 관련 요소 수집 및 토글/선택 처리
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const dropdownText = document.querySelector(".dropdown-text");

  if (dropdownButton && dropdownMenu) {
    // 드롭다운 버튼 클릭 시 메뉴 열기/닫기
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

  // 2) 검색 기능: 제목 기준, Enter 즉시 검색 + 1초 디바운스 자동 검색
  const searchInput = document.querySelector(".search-input");
  function performSearch() {
    const term = (searchInput?.value || "").trim();
    // 현재 검색어를 전역 상태로 저장하고, 페이지를 1로 리셋
    window.currentSearchTerm = term; // 전역 상태로 저장하여 렌더에서 사용
    if (window.pagination) window.pagination.currentPage = 1; // 검색 조건 변경 시 첫 페이지로 이동
    if (typeof window.renderCards === "function") {
      // 현재 필터 상태를 유지한 채 검색어만 반영하여 리스트 렌더링
      window.renderCards(window.currentFilter || "all");
    }
  }
  if (searchInput) {
    let debounceTimer;
    // 입력 중 과도한 호출 방지를 위한 디바운스: 1초 정지 시 검색 실행
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(performSearch, 1000);
    });
    // Enter 키 입력 시 즉시 검색 실행
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(debounceTimer);
        performSearch();
      }
    });
  }
});

/**
 * 로컬스토리지의 일기 데이터를 기분(감정)별로 분류하여 반환합니다.
 * 반환 객체 형식: { happy: [], sad: [], surprised: [], angry: [], etc: [] }
 * - 사용 키: "diaries"
 * - 각 아이템은 { mood: "행복해요" | "슬퍼요" | "놀랐어요" | "화나요" | ... } 형태를 가정합니다.
 */
function sortCardsLocalStorage() {
  const result = {
    happy: [],
    sad: [],
    surprised: [],
    angry: [],
    etc: [],
  };

  try {
    // 주의: getItem은 두 번째 매개변수를 사용하지 않습니다. 저장된 값이 없으면 raw는 null입니다.
    const raw = localStorage.getItem("diaries", JSON.stringify(result));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        // 감정값에 따라 분류
        result.happy = parsed.filter((item) => item.mood === "행복해요");
        result.sad = parsed.filter((item) => item.mood === "슬퍼요");
        result.surprised = parsed.filter((item) => item.mood === "놀랐어요");
        result.angry = parsed.filter((item) => item.mood === "화나요");
      }
    }
  } catch (_) {
    // 파싱 실패 등 예외는 무시하고 빈 분류 결과를 반환
  }

  return result;
}

/**
 * 전역 저장소(window.cardData)에서 카드 데이터를 가져와 리스트 렌더링 전 기본 유효성 검사를 수행합니다.
 * - 렌더링 대상 컨테이너가 없으면 조기 종료합니다.
 * - 데이터가 비어 있으면 리스트를 숨기고 종료합니다.
 */
function sortCards() {
  const result = document.querySelector(".body-card-list");
  if (!result) return;

  const data =
    window.cardData && Array.isArray(cardData.getItem("diaryCardsData"))
      ? cardData.getItem("diaryCardsData")
      : [];

  if (!data.length) {
    // 주의: listEl은 상단에서 선언만 되었고 실제 DOM 할당이 필요합니다.
    listEl.style.display = "none";
    return;
  }
}
