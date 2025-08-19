(function () {
  const tagColorMap = {
    슬퍼요: "#28b4e1",
    행복해요: "#ea5757",
    놀랐어요: "#d99000",
    화나요: "var(--gray-60)",
    기타: "#a229ed",
  };

  const moods = ["행복해요", "슬퍼요", "놀랐어요", "화나요", "기타"];

  // 상세 페이지(s), 카드 목록(m)에서 쓰는 이미지 맵
  const moodToImgSmall = {
    행복해요: "./public/images/행복해요 (s).png",
    슬퍼요: "./public/images/슬퍼요 (s).png",
    놀랐어요: "./public/images/놀랐어요 (s).png",
    화나요: "./public/images/_화나요 (s).png",
    기타: "./public/images/기타 (s).png",
  };

  const moodMapMedium = {
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

  function loadDiaries() {
    try {
      const raw = localStorage.getItem("diaries");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {}

    // legacy 단일 오브젝트 지원
    try {
      const legacy = localStorage.getItem("diary");
      if (legacy) {
        const obj = JSON.parse(legacy);
        if (obj && typeof obj === "object") return [obj];
      }
    } catch (_) {}

    return [];
  }

  function saveDiaries(diaries) {
    try {
      localStorage.setItem("diaries", JSON.stringify(diaries || []));
    } catch (_) {}
  }

  function buildCardsFromDiaries(diaries) {
    return (diaries || []).map((item) => {
      const mood = item.mood || "기타";
      const map = moodMapMedium[mood] || moodMapMedium["기타"];
      return {
        id: item.id,
        title: item.title || "무제",
        date: formatDateToYmdDot(item.date),
        tagId: map.tagId,
        tag: map.tag,
        image: map.image,
        color: map.color,
      };
    });
  }

  function applyMoodUI({ moodEl, moodImgEl, mood, size = "s" }) {
    if (moodEl) {
      moodEl.textContent = mood || "기타";
      const color = tagColorMap[mood || "기타"];
      if (color) moodEl.style.color = color;
    }
    if (moodImgEl) {
      const src =
        size === "m"
          ? moodMapMedium[mood || "기타"].image
          : moodToImgSmall[mood || "기타"];
      if (src) moodImgEl.src = src;
    }
  }

  window.diaryUtils = {
    tagColorMap,
    moods,
    moodToImgSmall,
    moodMapMedium,
    formatDateToYmdDot,
    loadDiaries,
    saveDiaries,
    buildCardsFromDiaries,
    applyMoodUI,
  };
})();
