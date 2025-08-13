(function () {
  const tagColorMap = {
    슬퍼요: "#28b4e1",
    행복해요: "#ea5757",
    놀랐어요: "#d99000",
    화나요: "var(--gray-60)",
    기타: "#a229ed",
  };

  const moodMap = {
    행복해요: {
      tagId: "card-tag-happy",
      tag: "행복해요",
      image: "./public/images/행복해요 (m).png",
      color: tagColorMap.행복해요,
    },
    슬퍼요: {
      tagId: "card-tag-sad",
      tag: "슬퍼요",
      image: "./public/images/슬퍼요 (m).png",
      color: tagColorMap.슬퍼요,
    },
    놀랐어요: {
      tagId: "card-tag-surprised",
      tag: "놀랐어요",
      image: "./public/images/놀랐어요 (m).png",
      color: tagColorMap.놀랐어요,
    },
    화나요: {
      tagId: "card-tag-angry",
      tag: "화나요",
      image: "./public/images/화나요 (m).png",
      color: tagColorMap.화나요,
    },
    기타: {
      tagId: "card-tag-etc",
      tag: "기타",
      image: "./public/images/기타 (m).png",
      color: tagColorMap.기타,
    },
  };

  const moods = ["행복해요", "슬퍼요", "놀랐어요", "화나요", "기타"];

  function formatDateToYmdDot(dateStr) {
    try {
      const d = dateStr ? new Date(dateStr) : new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}. ${m}. ${day}`;
    } catch (_) {
      return new Date().toLocaleDateString();
    }
  }

  function buildCardsFromDiaries(diaries) {
    return diaries.map((item) => {
      const mood = item.mood || "기타";
      const map = moodMap[mood] || moodMap["기타"];
      const id = item.id;
      return {
        id: id,
        title: item.title || "무제",
        date: formatDateToYmdDot(item.date),
        tagId: map.tagId,
        tag: map.tag,
        image: map.image,
        color: map.color,
      };
    });
  }

  function loadFromLocalStorage() {
    const result = [];

    try {
      const raw = localStorage.getItem("diaries");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          result.push(...buildCardsFromDiaries(parsed));
        }
      }
    } catch (_) {}

    if (!result.length) {
      try {
        const legacy = localStorage.getItem("diary");
        if (legacy) {
          const obj = JSON.parse(legacy);
          if (obj && typeof obj === "object") {
            result.push(...buildCardsFromDiaries([obj]));
          }
        }
      } catch (_) {}
    }

    if (!result.length) {
      try {
        const rawCards = localStorage.getItem("diaryCardsData");
        if (rawCards) {
          const parsedCards = JSON.parse(rawCards);
          if (Array.isArray(parsedCards) && parsedCards.length) {
            return parsedCards;
          }
        }
      } catch (_) {}
    }

    return result;
  }

  function buildSampleCards(count = "") {
    return Array.from({ length: count }, (_, i) => {
      const mood = moods[i % moods.length];
      const map = moodMap[mood];
      const id = i;
      return {
        id: id,
        title: "타이틀 영역 입니다.",
        date: "2024. 03. 12",
        tagId: map.tagId,
        tag: map.tag,
        image: map.image,
        color: map.color,
      };
    });
  }

  window.cardData = {
    getItem(key) {
      if (key !== "diaryCardsData") return null;
      const fromStorage = loadFromLocalStorage();
      if (Array.isArray(fromStorage) && fromStorage.length) return fromStorage;
      return buildSampleCards();
    },
  };
})();
