// 페이지네이션 기능
document.addEventListener("DOMContentLoaded", function () {
  let pageItems;
  const prevButton = document.querySelector(".pagination-item-prev");
  const nextButton = document.querySelector(".pagination-item-next");
  const prevIcon = document.querySelector(".pagination-item-prev-icon");
  const nextIcon = document.querySelector(".pagination-item-next-icon");
  const ul = document.querySelector(".pagination-item-page-group");
  const cardData = window.cardData;

  const ITEMS_PER_PAGE = 12;
  const diaries = cardData.getItem("diaryCardsData") || [];
  let totalPages = Math.max(1, Math.ceil(diaries.length / ITEMS_PER_PAGE));
  let currentPage =
    (window.pagination && Number(window.pagination.currentPage)) || 1;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  // 전역 페이지네이션 상태 노출
  window.pagination = window.pagination || {
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
  };
  window.pagination.itemsPerPage = ITEMS_PER_PAGE;
  window.pagination.currentPage = currentPage;

  const setPageOf = (pageNumber) => {
    ul.innerHTML = Array.from({ length: pageNumber }, (_, i) => {
      return `<li class="pagination-item-page">
        <p class="pagination-item-page-text body-medium-16 text-cool-gray-60">${
          i + 1
        }</p>
      </li>`;
    }).join("");
  };

  function bindPageClickHandlers() {
    pageItems = document.querySelectorAll(".pagination-item-page");
    pageItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        currentPage = index + 1;
        window.pagination.currentPage = currentPage;
        updatePageState();
        if (typeof window.renderCards === "function") {
          window.renderCards(window.currentFilter || "all");
        }
      });
    });
  }

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

  // 페이지 상태 업데이트 함수
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

  // 버튼 상태 업데이트 함수
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

  // 이전 버튼 클릭 이벤트
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        window.pagination.currentPage = currentPage;
        updatePageState();
        if (typeof window.renderCards === "function") {
          window.renderCards(window.currentFilter || "all");
        }
      }
    });
  }

  // 다음 버튼 클릭 이벤트
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        window.pagination.currentPage = currentPage;
        updatePageState();
        if (typeof window.renderCards === "function") {
          window.renderCards(window.currentFilter || "all");
        }
      }
    });
  }

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

  // 초기 상태 설정
  updatePageState();
});

// 다크모드와 연동
function updatePaginationForTheme(isDark) {
  const prevIcon = document.querySelector(".pagination-item-prev-icon");
  const nextIcon = document.querySelector(".pagination-item-next-icon");

  if (!prevIcon || !nextIcon) return;

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
