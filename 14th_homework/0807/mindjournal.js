document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const filterBar = document.getElementById("filterBar");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // 모달 엘리먼트들
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
  // 렌더 (filter -> map -> join)
  // -----------------------------
  function renderCards() {
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
  }

  function escapeHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // -----------------------------
  // 라디오 forEach로 추출
  // -----------------------------
  function getSelectedEmotion() {
    let value = null;
    document.querySelectorAll("input[name='emotion']").forEach(r => {
      if (r.checked) value = r.value;
    });
    return value;
  }

  // -----------------------------
  // 카드 삭제 (버블링 방지)
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
  // 필터
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
  // 스크롤 효과 & 플로팅 버튼(고정은 CSS)
  // -----------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) filterBar.classList.add("inverted");
    else filterBar.classList.remove("inverted");
  });
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // -----------------------------
  // 모달 유틸
  // -----------------------------
  function openModal(modal) {
    modal.classList.add("show");
    document.body.classList.add("no-scroll");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function closeModal(modal) {
    modal.classList.remove("show");
    // 다른 모달이 남아있으면 스크롤 잠금 유지
    const anyOpen = [...document.querySelectorAll(".modal")].some(m => m.classList.contains("show"));
    if (!anyOpen) document.body.classList.remove("no-scroll");
  }

  // 등록 모달 열기/닫기
  openWriteModalBtn.addEventListener("click", () => {
    diaryForm.reset();
    openModal(writeModal);
  });
  closeWriteModalBtn.addEventListener("click", () => {
    openModal(cancelModal); // 닫기 누르면 '등록 취소' 중첩 모달
  });
  cancelWriteBtn.addEventListener("click", () => {
    openModal(cancelModal);
  });

  // 등록 취소 모달 버튼들
  cancelModal.addEventListener("click", (e) => {
    const keep = e.target.closest("[data-close='keep']");
    const cancelAll = e.target.closest("[data-close='cancel-all']");
    const backdrop = e.target.closest(".modal__backdrop");

    if (keep || backdrop?.dataset.close === "backdrop") {
      // 계속 작성: 취소 모달만 닫기
      closeModal(cancelModal);
    } else if (cancelAll) {
      // 등록 취소: 두 모달 모두 닫기
      closeModal(cancelModal);
      closeModal(writeModal);
      diaryForm.reset();
    }
  });

  // 등록 완료(중첩) 모달: 닫기/확인
  successModal.addEventListener("click", (e) => {
    const ok = e.target.closest("[data-close='success']");
    const backdrop = e.target.closest(".modal__backdrop");
    if (ok || backdrop?.dataset.close === "backdrop") {
      closeModal(successModal);
      closeModal(writeModal); // 완료하면 작성 모달도 닫기
    }
  });

  // ESC로 모달 닫기 (최상단 모달만)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // 열려있는 모달 중 마지막(최상단) 닫기
      const opened = [...document.querySelectorAll(".modal.show")];
      if (opened.length) closeModal(opened[opened.length - 1]);
    }
  });

  // 모달 바깥(배경) 클릭으로 닫기
  [writeModal, successModal, cancelModal].forEach(modal => {
    modal.addEventListener("click", (e) => {
      const backdrop = e.target.closest(".modal__backdrop");
      if (!backdrop) return;
      // 요구사항: 등록 모달은 여백 클릭 시 종료
      if (modal === writeModal) closeModal(writeModal);
      // 중첩 모달들은 이미 자체 로직에서 처리(위의 click 핸들러)
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

    // 완료 중첩 모달 표시
    openModal(successModal);
  });

  // 최초 렌더
  renderCards();
});
