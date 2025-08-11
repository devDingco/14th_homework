document.addEventListener("DOMContentLoaded", () => {
  const diaryForm = document.getElementById("diaryForm");
  const cardContainer = document.getElementById("cardContainer");
  const filterBar = document.getElementById("filterBar");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // 감정별 이미지 매핑 (파일명 그대로)
  const emotionImages = {
    happy: "./행복해요 (m).png",
    sad: "./슬퍼요 (m).png",
    surprised: "./놀랐어요 (m).png",
    angry: "./화나요 (m).png",
    etc: "./기타 (m).png"
  };

  // localStorage에서 불러오기
  let diaries = JSON.parse(localStorage.getItem("diaries")) || [];
  let currentFilter = "all";

  // 저장
  function saveToStorage() {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }

  // map으로 렌더링 (요구사항)
  function renderCards() {
    // filter -> map -> join
    const filtered = diaries.filter(d => currentFilter === "all" || d.emotion === currentFilter);

    const html = filtered.map(diary => {
      return `
        <a class="card-link" href="detail.html?id=${diary.id}">
          <div class="card" data-id="${diary.id}">
            <button class="delete-btn" data-id="${diary.id}">×</button>
            <img src="${emotionImages[diary.emotion] || emotionImages.etc}" alt="${diary.emotion}">
            <p>${escapeHtml(diary.date)} - ${escapeHtml(diary.title)}</p>
          </div>
        </a>
      `;
    }).join("");

    cardContainer.innerHTML = html;
  }

  // 안전한 텍스트 출력
  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // forEach로 라디오 추출 (요구)
  function getSelectedEmotion() {
    let value = null;
    document.querySelectorAll("input[name='emotion']").forEach(r => {
      if (r.checked) value = r.value;
    });
    return value;
  }

  // 폼 제출 (등록)
  diaryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emotion = getSelectedEmotion(); // forEach 사용
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!emotion) {
      alert("기분을 선택해주세요!");
      return;
    }
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

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
    diaryForm.reset();
  });

  // 삭제 버튼: 이벤트 위임으로 처리 (삭제 시 버블링 막음)
  cardContainer.addEventListener("click", (e) => {
    const del = e.target.closest(".delete-btn");
    if (del) {
      e.preventDefault(); // 앵커 이동 막기
      e.stopPropagation(); // 부모로 버블링 막기
      const id = Number(del.dataset.id);
      diaries = diaries.filter(d => d.id !== id);
      saveToStorage();
      renderCards();
    }
  });

  // 필터 버튼: 클릭 시 active 토글 & 필터 적용
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.emotion;
      renderCards();
    });
  });

  // 스크롤 감지: filter-bar 배경 반전 + 플로팅 버튼 토글
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      filterBar.classList.add("inverted");
      // show floating button
      scrollTopBtn.style.display = "block";
    } else {
      filterBar.classList.remove("inverted");
      scrollTopBtn.style.display = "none";
    }
  });

  // 플로팅 버튼: 위로 부드럽게 스크롤
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 초기에 렌더
  renderCards();
});
