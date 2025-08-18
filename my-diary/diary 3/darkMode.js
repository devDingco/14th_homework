function toggleTheme() {
  const toggleInput = document.getElementById("toggle");
  const root = document.documentElement;
  const body = document.body;
  const searchIcon = document.querySelector(".search-icon");
  const dropdownIcon = document.querySelector(".dropdown-icon");
  const checkIcon = document.querySelector(".check-icon");
  const plusIcon = document.querySelector(".add-diary-button-icon");

  if (toggleInput.checked) {
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

    if (typeof updatePaginationForTheme === "function") {
      updatePaginationForTheme(false);
    }
  }
}
