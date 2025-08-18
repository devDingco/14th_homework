document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const filterBar = document.getElementById("filterBar");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

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

  function saveToStorage() {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }

  // -----------------------------
  // 카드 렌더링
  // -----------------------------
  const photoFilters = document.querySelector(".photo-filters");
  async function renderCards() {
    if (currentFilter !== "photos") {
      const filtered = diaries.filter(d => currentFilter === "all" || d.emotion === currentFilter);
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
      await fetchPhotos();
    }
  }

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
  // 감정 필터
  // -----------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.emotion;
      renderCards();
    });
  });

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
  // 사진보관함
  // -----------------------------
  const ratioBtns = document.querySelectorAll(".ratio-btn");
  async function fetchPhotos() {
    photoFilters.style.display = "flex";
    cardContainer.innerHTML = Array.from({length:10}).map(()=>`<div class="card skeleton"></div>`).join("");
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random/10");
      const data = await res.json();
      const html = data.message.map(url => `<div class="card photo-card square"><img src="${url}" alt="강아지"></div>`).join("");
      cardContainer.innerHTML = html;
    } catch {
      cardContainer.innerHTML = "<p>사진을 불러오는데 실패했습니다.</p>";
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
      });
    });
  });

  // -----------------------------
  // 탭 클릭 처리
  // -----------------------------
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.tab === "photos" ? "photos" : "all";
      renderCards();
    });
  });

  // 최초 렌더
  renderCards();
});
