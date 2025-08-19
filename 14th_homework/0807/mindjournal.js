document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const filterBar = document.getElementById("filterBar");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // ✅ 추가: 드롭다운/검색/모달 다크토글 참조
  const filterDropdown = document.getElementById("filterDropdown");
  const searchInput = document.getElementById("searchInput");
  const modalDarkSwitch = document.getElementById("modalDarkSwitch");

  // 모달 엘리먼트
  const writeModal = document.getElementById("writeModal");
  const successModal = document.getElementById("successModal");
  const cancelModal = document.getElementById("cancelModal");
  const openWriteModalBtn = document.getElementById("openWriteModal");
  const closeWriteModalBtn = document.getElementById("closeWriteModal");
  const cancelWriteBtn = document.getElementById("cancelWrite");
  const diaryForm = document.getElementById("diaryForm");

  const emotionImages = {
    happy: "./행복해요 (m).png",
    sad: "./슬퍼요 (m).png",
    surprised: "./놀랐어요 (m).png",
    angry: "./화나요 (m).png",
    etc: "./기타 (m).png"
  };

  let diaries = JSON.parse(localStorage.getItem("diaries")) || [];
  let currentFilter = "all";
  // ✅ 추가: 검색어 상태
  let searchQuery = "";

  function saveToStorage() {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }

  // -----------------------------
  // 유틸: escape
  // -----------------------------
  function escapeHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSelectedEmotion() {
    let value = null;
    document.querySelectorAll("input[name='emotion']").forEach(r => {
      if (r.checked) value = r.value;
    });
    return value;
  }

  // ✅ 추가: 디바운스/스로틀
  function debounce(fn, delay = 1000) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }
  function throttle(fn, delay = 1000) {
    let last = 0;
    let timer = null;
    return (...args) => {
      const now = Date.now();
      const remaining = delay - (now - last);
      if (remaining <= 0) {
        last = now;
        fn(...args);
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          fn(...args);
        }, remaining);
      }
    };
  }

  // -----------------------------
  // 카드 렌더링
  // -----------------------------
  const photoFilters = document.querySelector(".photo-filters");

  async function renderCards() {
    if (currentFilter !== "photos") {
      // ✅ 검색 + 감정 필터 동시 적용
      const q = searchQuery.trim().toLowerCase();
      const filtered = diaries.filter(d =>
        (currentFilter === "all" || d.emotion === currentFilter) &&
        (q === "" || (d.title || "").toLowerCase().includes(q))
      );
      const html = filtered.map(diary => `
        <a class="card-link" href="detail.html?id=${diary.id}">
          <div class="card" data-id="${diary.id}">
            <button class="delete-btn" data-id="${diary.id}" title="삭제">×</button>
            <img src="${emotionImages[diary.emotion] || emotionImages.etc}" alt="${diary.emotion}">
            <p>${escapeHtml(diary.date)} - ${escapeHtml(diary.title)}</p>
          </div>
        </a>
      `).join("");
      cardContainer.innerHTML = html;
      photoFilters.style.display = "none";
    } else {
      await fetchPhotos(); // 사진 탭 처음 진입 시 10개 로드
    }
  }

  // -----------------------------
  // 카드 삭제
  // -----------------------------
  cardContainer.addEventListener("click", (e) => {
    const del = e.target.closest(".delete-btn");
    if (del) {
      e.preventDefault();
      e.stopPropagation();
      const id = Number(del.dataset.id);
      diaries = diaries.filter(d => d.id !== id);
      saveToStorage();
      renderCards();
    }
  });

  // -----------------------------
  // 감정 필터 버튼
  // -----------------------------
  function syncDropdownToFilter() {
    if (filterDropdown) filterDropdown.value = currentFilter;
  }
  function syncButtonsToFilter() {
    filterBtns.forEach(b => b.classList.toggle("active", b.dataset.emotion === currentFilter));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.emotion;
      syncDropdownToFilter();
      renderCards();
    });
  });

  // ✅ 드롭다운으로도 필터 변경 (디자인 과제)
  if (filterDropdown) {
    filterDropdown.addEventListener("change", () => {
      currentFilter = filterDropdown.value;
      syncButtonsToFilter();
      renderCards();
    });
  }

  // -----------------------------
  // 스크롤 & 플로팅 버튼
  // -----------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) filterBar.classList.add("inverted");
    else filterBar.classList.remove("inverted");
  });
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // -----------------------------
  // 모달
  // -----------------------------
  function openModal(modal) {
    modal.classList.add("show");
    document.body.classList.add("no-scroll");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function closeModal(modal) {
    modal.classList.remove("show");
    const anyOpen = [...document.querySelectorAll(".modal")].some(m => m.classList.contains("show"));
    if (!anyOpen) document.body.classList.remove("no-scroll");
  }

  openWriteModalBtn.addEventListener("click", () => {
    diaryForm.reset();
    // 저장된 모달 다크모드 적용 보장
    applyModalTheme(loadModalDarkPref());
    if (modalDarkSwitch) modalDarkSwitch.checked = loadModalDarkPref();
    openModal(writeModal);
  });
  closeWriteModalBtn.addEventListener("click", () => openModal(cancelModal));
  cancelWriteBtn.addEventListener("click", () => openModal(cancelModal));

  cancelModal.addEventListener("click", (e) => {
    const keep = e.target.closest("[data-close='keep']");
    const cancelAll = e.target.closest("[data-close='cancel-all']");
    const backdrop = e.target.closest(".modal__backdrop");
    if (keep || backdrop?.dataset.close === "backdrop") closeModal(cancelModal);
    else if (cancelAll) {
      closeModal(cancelModal);
      closeModal(writeModal);
      diaryForm.reset();
    }
  });

  successModal.addEventListener("click", (e) => {
    const ok = e.target.closest("[data-close='success']");
    const backdrop = e.target.closest(".modal__backdrop");
    if (ok || backdrop?.dataset.close === "backdrop") {
      closeModal(successModal);
      closeModal(writeModal);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const opened = [...document.querySelectorAll(".modal.show")];
      if (opened.length) closeModal(opened[opened.length - 1]);
    }
  });

  [writeModal, successModal, cancelModal].forEach(modal => {
    modal.addEventListener("click", (e) => {
      const backdrop = e.target.closest(".modal__backdrop");
      if (!backdrop) return;
      if (modal === writeModal) closeModal(writeModal);
    });
  });

  // -----------------------------
  // ✅ 모달 다크모드 (토글 → 세 모달 모두 적용)
  // -----------------------------
  function applyModalTheme(isDark) {
    [writeModal, successModal, cancelModal].forEach(m => m && m.classList.toggle("dark", !!isDark));
  }
  function loadModalDarkPref() {
    return localStorage.getItem("modalDark") === "1";
  }
  function saveModalDarkPref(on) {
    localStorage.setItem("modalDark", on ? "1" : "0");
  }
  // 초기 적용
  applyModalTheme(loadModalDarkPref());
  if (modalDarkSwitch) {
    modalDarkSwitch.checked = loadModalDarkPref();
    modalDarkSwitch.addEventListener("change", (e) => {
      const on = e.target.checked;
      saveModalDarkPref(on);
      applyModalTheme(on);
    });
  }

  // -----------------------------
  // 일기 등록
  // -----------------------------
  diaryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emotion = getSelectedEmotion();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    if (!emotion) return alert("기분을 선택해주세요!");
    if (!title || !content) return alert("제목과 내용을 모두 입력해주세요!");
    const newDiary = {
      id: Date.now(),
      emotion,
      title,
      content,
      date: new Date().toLocaleString(),
      comments: []
    };
    diaries.push(newDiary);
    saveToStorage();
    renderCards();
    openModal(successModal);
  });

  // -----------------------------
  // 사진보관함 + ✅ 무한스크롤(스로틀 1000ms)
  // -----------------------------
  const ratioBtns = document.querySelectorAll(".ratio-btn");
  let isLoadingPhotos = false;
  const PHOTOS_BATCH = 10;

  function getActiveRatio() {
    const active = document.querySelector(".ratio-btn.active");
    return active ? active.dataset.ratio : "square";
  }

  async function fetchPhotos(append = false) {
    photoFilters.style.display = "flex";
    if (!append) {
      cardContainer.innerHTML = Array.from({length:PHOTOS_BATCH}).map(()=>`<div class="card skeleton"></div>`).join("");
    }
    const ratio = getActiveRatio();
    try {
      isLoadingPhotos = true;
      const res = await fetch(`https://dog.ceo/api/breeds/image/random/${PHOTOS_BATCH}`);
      const data = await res.json();
      const html = (data.message || []).map(url => `
        <div class="card photo-card ${ratio === "all" ? "square" : ratio}">
          <img src="${url}" alt="강아지">
        </div>
      `).join("");
      if (append) cardContainer.insertAdjacentHTML("beforeend", html);
      else cardContainer.innerHTML = html;
    } catch {
      if (!append) cardContainer.innerHTML = "<p>사진을 불러오는데 실패했습니다.</p>";
    } finally {
      isLoadingPhotos = false;
    }
  }

  ratioBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      ratioBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const ratio = btn.dataset.ratio;
      document.querySelectorAll(".photo-card").forEach(card => {
        card.classList.remove("square","landscape","portrait");
        if(ratio !== "all") card.classList.add(ratio);
        else card.classList.add("square");
      });
    });
  });

  // ✅ 스크롤 하단 도달 시 10개씩 추가 로드 (스로틀 1000ms)
  const handleInfinite = throttle(() => {
    if (currentFilter !== "photos" || isLoadingPhotos) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (nearBottom) fetchPhotos(true);
  }, 1000);
  window.addEventListener("scroll", handleInfinite);

  // -----------------------------
  // 탭 클릭 처리
  // -----------------------------
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.tab === "photos" ? "photos" : "all";
      // 탭 전환 시 검색은 유지하되, 사진탭에서는 적용하지 않음
      renderCards();
    });
  });

  // -----------------------------
  // ✅ 검색(디바운싱 1000ms)
  // -----------------------------
  if (searchInput) {
    const doSearch = debounce((val) => {
      searchQuery = (val || "").toLowerCase();
      if (currentFilter !== "photos") renderCards();
    }, 1000);
    searchInput.addEventListener("input", (e) => doSearch(e.target.value));
  }

  // 최초 렌더 + 초기 동기화
  syncDropdownToFilter();
  renderCards();
});
