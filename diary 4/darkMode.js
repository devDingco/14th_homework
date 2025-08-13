const THEME_STORAGE_KEY = "isDarkTheme";

function applyTheme(isDark) {
  const root = document.documentElement;
  const body = document.body;
  const searchIcon = document.querySelector(".search-icon");
  const dropdownIcon = document.querySelector(".dropdown-icon");
  const checkIcon = document.querySelector(".check-icon");
  const plusIcon = document.querySelector(".add-diary-button-icon");
  const copyIcon = document.querySelector(".content-body-icon");

  if (isDark) {
    // 다크모드 활성화
    root.classList.add("dark-theme");
    body.classList.add("dark-theme");
    root.style.backgroundColor = "var(--gray-90)";
    root.style.color = "var(--white)";

    if (plusIcon) {
      plusIcon.src = "./public/icons/dark/plus_outline_dark_m.svg";
    }

    if (searchIcon) {
      searchIcon.src = "./public/icons/dark/search_outline_dark_m.svg";
    }

    if (dropdownIcon) {
      dropdownIcon.src = "./public/icons/dark/down_fill_dark_m.svg";
    }

    if (checkIcon) {
      checkIcon.src = "./public/icons/dark/check_outline_dark_xs.svg";
    }

    if (copyIcon) {
      copyIcon.src = "./public/icons/dark/copy_outline_dark_m.svg";
    }

    // 페이지네이션 아이콘 업데이트
    if (typeof updatePaginationForTheme === "function") {
      updatePaginationForTheme(true);
    }
  } else {
    // 라이트모드 활성화
    root.classList.remove("dark-theme");
    body.classList.remove("dark-theme");
    root.style.backgroundColor = "var(--white)";
    root.style.color = "var(--black)";

    if (searchIcon) {
      searchIcon.src = "./public/icons/light/search_outline_light_m.svg";
    }

    if (dropdownIcon) {
      dropdownIcon.src = "./public/icons/light/down_fill_light_m.svg";
    }

    if (checkIcon) {
      checkIcon.src = "./public/icons/light/check_outline_light_xs.svg";
    }

    if (plusIcon) {
      plusIcon.src = "./public/icons/light/plus_outline_light_m.svg";
    }

    if (copyIcon) {
      copyIcon.src = "./public/icons/light/copy_outline_light_m.svg";
    }

    if (typeof updatePaginationForTheme === "function") {
      updatePaginationForTheme(false);
    }
  }
}

function toggleTheme() {
  const toggleInput = document.getElementById("toggle");
  if (!toggleInput) return;
  const isDark = !!toggleInput.checked;
  applyTheme(isDark);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
  } catch (_) {}
}

// 초기 로드 시 저장된 테마 적용
document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("toggle");
  let isDark = false;
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw != null) {
      isDark = JSON.parse(raw) === true;
    }
  } catch (_) {}

  if (toggleInput) toggleInput.checked = isDark;
  applyTheme(isDark);
});
