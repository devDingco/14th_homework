// 페이지네이션 기능 (카드 리스트의 페이지 이동, 표시, 버튼 상태, 테마 연동)
document.addEventListener("DOMContentLoaded", function () {
  // 1) 페이지네이션 관련 DOM 요소 수집
  let pageItems;
  const prevButton = document.querySelector(".pagination-item-prev");
  const nextButton = document.querySelector(".pagination-item-next");
  const prevIcon = document.querySelector(".pagination-item-prev-icon");
  const nextIcon = document.querySelector(".pagination-item-next-icon");
  const ul = document.querySelector(".pagination-item-page-group");
  const cardData = window.cardData;

  // 2) 기본 상수 및 초기 상태 계산
  // - 한 페이지당 보여줄 카드 개수
  const ITEMS_PER_PAGE = 12;
  // - 전체 다이어리 데이터 (없을 경우 빈 배열)
  const diaries = cardData.getItem("diaryCardsData") || [];
  // - 총 페이지 수: 적어도 1페이지는 존재하도록 보정
  let totalPages = Math.max(1, Math.ceil(diaries.length / ITEMS_PER_PAGE));
  // - 현재 페이지: 전역 상태가 있으면 사용, 없으면 1로 초기화
  let currentPage =
    (window.pagination && Number(window.pagination.currentPage)) || 1;
  // - 현재 페이지 범위 보정 (1 ~ totalPages)
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  // 3) 전역 페이지네이션 상태 노출/동기화
  // - 다른 스크립트(예: 검색/필터)가 현재 페이지를 제어할 수 있도록 window.pagination에 저장
  window.pagination = window.pagination || {
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
  };
  window.pagination.itemsPerPage = ITEMS_PER_PAGE;
  window.pagination.currentPage = currentPage;

  // 4) 페이지 수만큼 페이지 버튼(li)을 렌더링
  const setPageOf = (pageNumber) => {
    ul.innerHTML = Array.from({ length: pageNumber }, (_, i) => {
      return `<li class="pagination-item-page">
        <p class="pagination-item-page-text body-medium-16 text-cool-gray-60">${
          i + 1
        }</p>
      </li>`;
    }).join("");
  };

  // 5) 페이지 버튼 클릭 핸들러 바인딩
  // - 클릭 시 currentPage 갱신, 상태 업데이트, 카드 재렌더링
  function bindPageClickHandlers() {
    pageItems = document.querySelectorAll(".pagination-item-page");
    pageItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        currentPage = index + 1;
        window.pagination.currentPage = currentPage;
        updatePageState();
        if (typeof window.renderCards === "function") {
          // 현재 필터 상태를 유지하면서 페이지 변경만 반영
          window.renderCards(window.currentFilter || "all");
        }
      });
    });
  }

  // 6) 좌우 이동 아이콘(버튼) 표시/숨김 처리
  function updateIconVisibility() {
    if (totalPages <= 1) {
      if (prevButton) prevButton.style.display = "none";
      if (nextButton) nextButton.style.display = "none";
    } else {
      if (prevButton) prevButton.style.display = "";
      if (nextButton) nextButton.style.display = "";
    }
  }

  setPageOf(totalPages);
  bindPageClickHandlers();

  // 7) 페이지 상태 업데이트 함수
  // - 페이지 버튼 active 표시, 텍스트 색상 조정, 전역 상태 동기화, 좌우 버튼 상태 갱신
  function updatePageState() {
    // 모든 페이지에서 active 클래스 제거
    pageItems.forEach((item) => {
      item.classList.remove("active");
      const text = item.querySelector(".pagination-item-page-text");
      text.classList.add("text-cool-gray-60");
    });

    // 현재 페이지에 active 클래스 추가
    const currentPageItem = pageItems[currentPage - 1];
    if (currentPageItem) {
      currentPageItem.classList.add("active");
      const currentText = currentPageItem.querySelector(
        ".pagination-item-page-text"
      );
      if (currentText) currentText.classList.remove("text-cool-gray-60");
    }

    // 전역 상태 동기화
    window.pagination.currentPage = currentPage;

    // 이전/다음 버튼 상태 업데이트
    updateButtonStates();
  }

  // 8) 이전/다음 버튼 상태 및 아이콘 업데이트
  // - 페이지 경계(첫/마지막)에서 비활성화 상태 및 아이콘 변경
  function updateButtonStates() {
    updateIconVisibility();

    // 이전 버튼 상태
    if (currentPage === 1) {
      if (prevIcon)
        prevIcon.src = "./public/icons/light/leftdisabled_outline_light_m.svg";
      if (prevButton) {
        prevButton.style.cursor = totalPages <= 1 ? "default" : "not-allowed";
        prevButton.style.opacity = totalPages <= 1 ? "0" : "0.5";
      }
    } else {
      if (prevIcon)
        prevIcon.src = "./public/icons/light/leftenable_outline_light_m.svg";
      if (prevButton) {
        prevButton.style.cursor = "pointer";
        prevButton.style.opacity = "1";
      }
    }

    // 다음 버튼 상태
    if (currentPage === totalPages) {
      if (nextIcon)
        nextIcon.src = "./public/icons/light/rightdisabled_outline_light_m.svg";
      if (nextButton) {
        nextButton.style.cursor = totalPages <= 1 ? "default" : "not-allowed";
        nextButton.style.opacity = totalPages <= 1 ? "0" : "0.5";
      }
    } else {
      if (nextIcon)
        nextIcon.src = "./public/icons/light/rightenable_outline_light_m.svg";
      if (nextButton) {
        nextButton.style.cursor = "pointer";
        nextButton.style.opacity = "1";
      }
    }
  }

  // 9) 이전 버튼 클릭 이벤트
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        window.pagination.currentPage = currentPage;
        updatePageState();
        if (typeof window.renderCards === "function") {
          // 현재 필터를 유지한 채 이전 페이지 데이터 렌더링
          window.renderCards(window.currentFilter || "all");
        }
      }
    });
  }

  // 10) 다음 버튼 클릭 이벤트
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        window.pagination.currentPage = currentPage;
        updatePageState();
        if (typeof window.renderCards === "function") {
          // 현재 필터를 유지한 채 다음 페이지 데이터 렌더링
          window.renderCards(window.currentFilter || "all");
        }
      }
    });
  }

  // 11) 외부에서 전체 페이지 수가 변경되었을 때 호출하는 업데이트 함수
  // - 예: 데이터 필터/검색 변경으로 총 아이템 수가 달라진 경우
  window.updatePagination = function (newTotalPages) {
    const normalized = Math.max(1, Number(newTotalPages) || 1);
    if (normalized !== totalPages) {
      totalPages = normalized;
      setPageOf(totalPages);
      bindPageClickHandlers();
    }
    if (currentPage > totalPages) {
      currentPage = totalPages;
      window.pagination.currentPage = currentPage;
    }
    updatePageState();
  };

  // 12) 초기 상태 설정 (현재 페이지 강조 및 버튼/아이콘 설정)
  updatePageState();
});

// 13) 다크모드와 연동: 현재 페이지와 총 페이지를 고려하여 좌우 화살표 아이콘을 테마에 맞게 변경
function updatePaginationForTheme(isDark) {
  const prevIcon = document.querySelector(".pagination-item-prev-icon");
  const nextIcon = document.querySelector(".pagination-item-next-icon");

  if (!prevIcon || !nextIcon) return;

  // DOM에서 현재 active 페이지 번호와 총 페이지 수를 추출하여 아이콘 상태 결정
  const currentPage = document.querySelector(".pagination-item-page.active");
  const currentPageNumber = currentPage
    ? Array.from(document.querySelectorAll(".pagination-item-page")).indexOf(
        currentPage
      ) + 1
    : 1;
  const totalPages = document.querySelectorAll(".pagination-item-page").length;

  if (isDark) {
    // 다크모드 아이콘
    if (currentPageNumber === 1) {
      prevIcon.src = "./public/icons/dark/leftdisabled_outline_dark_m.svg";
    } else {
      prevIcon.src = "./public/icons/dark/leftenable_outline_dark_m.svg";
    }

    if (currentPageNumber === totalPages) {
      nextIcon.src = "./public/icons/dark/rightdisabled_outline_dark_m.svg";
    } else {
      nextIcon.src = "./public/icons/dark/rightenable_outline_dark_m.svg";
    }
  } else {
    // 라이트모드 아이콘
    if (currentPageNumber === 1) {
      prevIcon.src = "./public/icons/light/leftdisabled_outline_light_m.svg";
    } else {
      prevIcon.src = "./public/icons/light/leftenable_outline_light_m.svg";
    }

    if (currentPageNumber === totalPages) {
      nextIcon.src = "./public/icons/light/rightdisabled_outline_light_m.svg";
    } else {
      nextIcon.src = "./public/icons/light/rightenable_outline_light_m.svg";
    }
  }
}
