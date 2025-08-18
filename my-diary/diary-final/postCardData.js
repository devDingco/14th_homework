(function () {
  const { moodMapMedium, buildCardsFromDiaries, loadDiaries } =
    window.diaryUtils || {};

  function loadFromLocalStorage() {
    const diaries = typeof loadDiaries === "function" ? loadDiaries() : [];
    const cards =
      typeof buildCardsFromDiaries === "function"
        ? buildCardsFromDiaries(diaries)
        : [];

    if (cards.length) return cards;

    // diaryCardsData 키에 카드형 데이터가 직접 저장된 경우 호환
    try {
      const rawCards = localStorage.getItem("diaryCardsData");
      if (rawCards) {
        const parsedCards = JSON.parse(rawCards);
        if (Array.isArray(parsedCards) && parsedCards.length) {
          return parsedCards;
        }
      }
    } catch (_) {}

    return [];
  }

  function buildSampleCards(count = "") {
    const moods = (window.diaryUtils && diaryUtils.moods) || [
      "행복해요",
      "슬퍼요",
      "놀랐어요",
      "화나요",
      "기타",
    ];
    return Array.from({ length: count }, (_, i) => {
      const mood = moods[i % moods.length];
      const map =
        (moodMapMedium && moodMapMedium[mood]) ||
        (moodMapMedium && moodMapMedium["기타"]) ||
        {};
      return {
        id: i,
        title: "타이틀 영역 입니다.",
        date: "2024. 03. 12",
        tagId: map.tagId,
        tag: map.tag,
        image: map.image,
        color: map.color,
      };
    });
  }

  function renderCards(filterMood = "all") {
    const listEl = document.querySelector(".body-card-list");
    const emptyEl = document.querySelector(".body-contents-undefined-data");
    if (!listEl) return;

    const data =
      window.cardData && Array.isArray(cardData.getItem("diaryCardsData"))
        ? cardData.getItem("diaryCardsData")
        : [];

    // mood 필터
    let filtered =
      filterMood && filterMood !== "all"
        ? data.filter((card) => card.tag === filterMood)
        : data;

    // 검색어(제목 포함) 필터
    const term = (window.currentSearchTerm || "").trim();
    if (term) {
      const lower = term.toLowerCase();
      filtered = filtered.filter((card) =>
        String(card.title || "")
          .toLowerCase()
          .includes(lower)
      );
    }

    // 전역 필터 상태 저장
    window.currentFilter = filterMood;

    if (!filtered.length) {
      listEl.style.display = "none";
      if (emptyEl) emptyEl.style.display = "flex";
      listEl.innerHTML = "";
      // 페이지네이션도 1페이지로 맞춤
      if (typeof window.updatePagination === "function") {
        window.pagination = window.pagination || {
          currentPage: 1,
          itemsPerPage: 12,
        };
        window.pagination.currentPage = 1;
        window.updatePagination(1);
      }
      return;
    }

    const itemsPerPage =
      (window.pagination && window.pagination.itemsPerPage) || 12;
    let currentPage = (window.pagination && window.pagination.currentPage) || 1;

    const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

    // 현재 페이지 보정
    if (currentPage > pageCount) {
      currentPage = pageCount;
      if (window.pagination) window.pagination.currentPage = currentPage;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageSlice = filtered.slice(start, end);

    const cardsHTML = pageSlice
      .map(
        (card, index) => `
            <a class="diary-card-link" href="./cardDetail.html?id=${encodeURIComponent(
              card.id
            )}">
                <div class="diary-card" data-index="${start + index}">
                <div class="diary-card-image">
                <button class="diary-card-delete-button" onclick="deleteCard(event, '${
                  card.id
                }')">
                    <img src="./public/icons/light/close_outline_light_m.svg" alt="삭제">
                </button>
                <img class="diary-card-main-image" src="${
                  card.image
                }" alt="일기 이미지">
                    </div>
                    <div class="diary-card-content">
                        <div class="card-tag-date-wrapper">
                            <p id="${
                              card.tagId
                            }" class="card-tag body-regular-14">${card.tag}</p>
                            <p class="diary-card-date body-regular-14">${
                              card.date
                            }</p>
                        </div>
                        <p class="diary-card-title title-bold-18">${
                          card.title
                        }</p>
                    </div>
                </div>
            </a>
        `
      )
      .join("");

    listEl.innerHTML = cardsHTML;
    listEl.style.display = "grid";
    if (emptyEl) emptyEl.style.display = "none";

    if (typeof window.updatePagination === "function") {
      window.updatePagination(pageCount);
    }
  }

  window.cardData = {
    getItem(key) {
      if (key !== "diaryCardsData") return null;
      const fromStorage = loadFromLocalStorage();
      if (Array.isArray(fromStorage) && fromStorage.length) return fromStorage;
      return buildSampleCards();
    },
  };

  window.renderCards = renderCards;

  document.addEventListener("DOMContentLoaded", () => {
    // index 페이지에서만 동작하도록 존재 여부 체크
    if (document.querySelector(".body-card-list")) {
      renderCards();
    }
  });
})();
