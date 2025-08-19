// 페이지네이션 기능
document.addEventListener("DOMContentLoaded", function () {
  const pageItems = document.querySelectorAll(".pagination-item-page");
  const prevButton = document.querySelector(".pagination-item-prev");
  const nextButton = document.querySelector(".pagination-item-next");
  const prevIcon = document.querySelector(".pagination-item-prev-icon");
  const nextIcon = document.querySelector(".pagination-item-next-icon");

  let currentPage = 1;
  const totalPages = pageItems.length;

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
    currentPageItem.classList.add("active");
    const currentText = currentPageItem.querySelector(
      ".pagination-item-page-text"
    );
    currentText.classList.remove("text-cool-gray-60");

    // 이전/다음 버튼 상태 업데이트
    updateButtonStates();
  }

  // 버튼 상태 업데이트 함수
  function updateButtonStates() {
    // 이전 버튼 상태
    if (currentPage === 1) {
      prevIcon.src = "./public/icons/light/leftdisabled_outline_light_m.svg";
      prevButton.style.cursor = "not-allowed";
      prevButton.style.opacity = "0.5";
    } else {
      prevIcon.src = "./public/icons/light/leftenable_outline_light_m.svg";
      prevButton.style.cursor = "pointer";
      prevButton.style.opacity = "1";
    }

    // 다음 버튼 상태
    if (currentPage === totalPages) {
      nextIcon.src = "./public/icons/light/rightdisabled_outline_light_m.svg";
      nextButton.style.cursor = "not-allowed";
      nextButton.style.opacity = "0.5";
    } else {
      nextIcon.src = "./public/icons/light/rightenable_outline_light_m.svg";
      nextButton.style.cursor = "pointer";
      nextButton.style.opacity = "1";
    }
  }

  // 페이지 클릭 이벤트
  pageItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentPage = index + 1;
      updatePageState();
    });
  });

  // 이전 버튼 클릭 이벤트
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updatePageState();
    }
  });

  // 다음 버튼 클릭 이벤트
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      updatePageState();
    }
  });

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
