(function () {
  const DEFAULT_LIMIT = 10;
  const INFINITE_SCROLL_LIMIT = 10;

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

  // 간단한 지연 유틸리티
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 스로틀 유틸리티 (leading 우선, 최소 wait 간격 보장)
  function throttle(fn, wait = 1000) {
    let last = 0;
    let timer = null;
    return function throttled(...args) {
      const now = Date.now();
      const remaining = wait - (now - last);
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        last = now;
        fn.apply(this, args);
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          fn.apply(this, args);
        }, remaining);
      }
    };
  }

  // 전역에 노출
  window.getPhotoList = getPhotoList;

  function modeToRatio(mode) {
    return mode === "가로형"
      ? "landscape"
      : mode === "세로형"
      ? "portrait"
      : "square";
  }

  function makeSkeletonHTML(count = 3, mode = "기본") {
    const ratio = modeToRatio(mode);
    return `
      <div class="photo-Skeleton-wrapper">
        ${Array.from({ length: count })
          .map(
            () => `
          <div class="photo-Skeleton-item ratio-${ratio}">
            <div class="photo-Skeleton-stick"></div>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  window.renderPhotoList = async function renderPhotoList({
    containerSelector = ".photo-list",
    page = 1,
    limit = DEFAULT_LIMIT,
  } = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const currentMode = window.photoLayoutMode || "기본";
    const normalized = modeToRatio(currentMode);

    // 스켈레톤 먼저 표시
    container.innerHTML = makeSkeletonHTML(3, currentMode);

    try {
      // API 호출 전 3초 지연
      await sleep(1500);
      const photos = await getPhotoList({ page, limit });
      const html = photos
        .map(
          (url) => `
        <div class="photo-card ratio-${normalized}">
          <img class="photo-img" src="${url}" alt="dog image">
        </div>
      `
        )
        .join("");
      container.innerHTML = html;
      // 현재 선택된 레이아웃 재적용 (보정)
      applyPhotoRatio(currentMode);
    } catch (e) {
      container.innerHTML = `<p class="body-medium-16">사진을 불러오는 중 오류가 발생했습니다.</p>`;
      console.error(e);
    }
  };

  function applyPhotoRatio(mode) {
    const cards = document.querySelectorAll(".photo-card");
    const normalized = modeToRatio(mode);
    cards.forEach((el) => {
      el.classList.remove("ratio-square", "ratio-landscape", "ratio-portrait");
      el.classList.add(`ratio-${normalized}`);
    });
    window.photoLayoutMode = mode;
  }

  function applyPhotoSkeleton(mode) {
    const skeleton = document.querySelectorAll(".photo-Skeleton-item");
    const normalized = modeToRatio(mode);
    skeleton.forEach((el) => {
      el.classList.remove("ratio-square", "ratio-landscape", "ratio-portrait");
      el.classList.add(`ratio-${normalized}`);
    });
    window.photoSkeletonLayoutMode = mode;
  }

  function setupPhotoDropdownFilter() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (!dropdownMenu) return;
    const items = dropdownMenu.querySelectorAll(".dropdown-item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        const text = this.querySelector("span")?.textContent?.trim() || "기본";
        applyPhotoRatio(text);
        applyPhotoSkeleton(text);
      });
    });
  }

  window.appendPhotoList = async function appendPhotoList({
    containerSelector = ".photo-list",
    limit = DEFAULT_LIMIT,
  } = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const currentMode = window.photoLayoutMode || "기본";
    // 로딩 스켈레톤 추가
    const tempWrapper = document.createElement("div");
    tempWrapper.innerHTML = makeSkeletonHTML(3, currentMode);
    const loadingSkeleton = tempWrapper.firstElementChild;
    container.appendChild(loadingSkeleton);

    try {
      // API 호출 전 3초 지연
      await sleep(1500);
      const photos = await getPhotoList({ limit });
      const frag = document.createDocumentFragment();
      const normalized = modeToRatio(currentMode);
      photos.forEach((url) => {
        const div = document.createElement("div");
        div.className = `photo-card ratio-${normalized}`;
        div.innerHTML = `<img class=\"photo-img\" src=\"${url}\" alt=\"dog image\">`;
        frag.appendChild(div);
      });
      if (loadingSkeleton && loadingSkeleton.parentNode) {
        loadingSkeleton.parentNode.removeChild(loadingSkeleton);
      }
      container.appendChild(frag);
      applyPhotoRatio(currentMode);
    } catch (e) {
      console.error(e);
      if (loadingSkeleton && loadingSkeleton.parentNode) {
        loadingSkeleton.parentNode.removeChild(loadingSkeleton);
      }
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
    window.addEventListener("scroll", throttle(onScroll, 1000), {
      passive: true,
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupPhotoDropdownFilter();
    setupInfiniteScroll();
    // 초기 스켈레톤/레이아웃 동기화
    const initial = window.photoLayoutMode || "기본";
    applyPhotoSkeleton(initial);
  });
})();
