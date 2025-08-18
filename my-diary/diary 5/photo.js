(function () {
  const DEFAULT_LIMIT = 10;
  const INFINITE_SCROLL_LIMIT = 3;

  async function getPhotoList({ limit = DEFAULT_LIMIT } = {}) {
    const url = `https://dog.ceo/api/breeds/image/random/${encodeURIComponent(
      limit
    )}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch photos: ${res.status}`);
    }
    const data = await res.json();
    // data.message는 문자열 URL 배열
    return Array.isArray(data.message) ? data.message : [];
  }

  // 전역에 노출
  window.getPhotoList = getPhotoList;

  window.renderPhotoList = async function renderPhotoList({
    containerSelector = ".photo-list",
    page = 1,
    limit = DEFAULT_LIMIT,
  } = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";
    try {
      const photos = await getPhotoList({ page, limit });
      const html = photos
        .map(
          (url) => `
        <div class="photo-card ratio-square">
          <img class="photo-img" src="${url}" alt="dog image">
        </div>
      `
        )
        .join("");
      container.innerHTML = html;
      // 현재 선택된 레이아웃 재적용
      applyPhotoRatio(window.photoLayoutMode || "기본");
    } catch (e) {
      container.innerHTML = `<p class="body-medium-16">사진을 불러오는 중 오류가 발생했습니다.</p>`;
      console.error(e);
    }
  };

  function applyPhotoRatio(mode) {
    const cards = document.querySelectorAll(".photo-card");
    const normalized =
      mode === "가로형"
        ? "landscape"
        : mode === "세로형"
        ? "portrait"
        : "square";
    cards.forEach((el) => {
      el.classList.remove("ratio-square", "ratio-landscape", "ratio-portrait");
      el.classList.add(`ratio-${normalized}`);
    });
    window.photoLayoutMode = mode;
  }

  function setupPhotoDropdownFilter() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (!dropdownMenu) return;
    const items = dropdownMenu.querySelectorAll(".dropdown-item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        const text = this.querySelector("span")?.textContent?.trim() || "기본";
        applyPhotoRatio(text);
      });
    });
  }

  window.appendPhotoList = async function appendPhotoList({
    containerSelector = ".photo-list",
    limit = DEFAULT_LIMIT,
  } = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    try {
      const photos = await getPhotoList({ limit });
      const frag = document.createDocumentFragment();
      photos.forEach((url) => {
        const div = document.createElement("div");
        div.className = "photo-card ratio-square";
        div.innerHTML = `<img class="photo-img" src="${url}" alt="dog image">`;
        frag.appendChild(div);
      });
      container.appendChild(frag);
      applyPhotoRatio(window.photoLayoutMode || "기본");
    } catch (e) {
      console.error(e);
    }
  };

  function setupInfiniteScroll() {
    let isLoading = false;
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      if (nearBottom && !isLoading) {
        isLoading = true;
        window.appendPhotoList({ limit: INFINITE_SCROLL_LIMIT }).finally(() => {
          isLoading = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupPhotoDropdownFilter();
    setupInfiniteScroll();
  });
})();
