document.addEventListener("DOMContentLoaded", () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const raw = localStorage.getItem("diaries");
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return;

    const item = list.find((d) => String(d.id) === String(id));
    if (!item) return;

    const titleEl = document.querySelector(".content-header-title");
    const moodEl = document.querySelector(".content-header-mood-title");
    const dateEl = document.querySelector(".content-header-date");
    const textarea = document.querySelector(".content-body-text");
    const moodImg = document.querySelector(".content-header-icon");

    if (titleEl) titleEl.textContent = item.title || "무제";
    if (moodEl) moodEl.textContent = item.mood || "기타";
    if (dateEl) {
      const d = item.date ? new Date(item.date) : new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      dateEl.textContent = `${y}. ${m}. ${day}`;
    }
    if (textarea) textarea.value = item.content || "";

    const moodToImg = {
      행복해요: "./public/images/행복해요 (s).png",
      슬퍼요: "./public/images/슬퍼요 (s).png",
      놀랐어요: "./public/images/놀랐어요 (s).png",
      화나요: "./public/images/화나요 (s).png",
      기타: "./public/images/기타 (s).png",
    };

    const tagColor = {
      슬퍼요: "#28b4e1",
      행복해요: "#ea5757",
      놀랐어요: "#d99000",
      화나요: "var(--gray-60)",
      기타: "#a229ed",
    };

    if (moodImg && item.mood && moodToImg[item.mood]) {
      moodImg.src = moodToImg[item.mood];
    }
    if (moodEl && item.mood && tagColor[item.mood]) {
      moodEl.style.color = tagColor[item.mood];
    }

    // 레이아웃 토글 요소
    const detailWrap = document.querySelector(".card-detail-body-contents");
    const updateWrap = document.querySelector(".update-content-wrapper");

    const openBtn = document.getElementById("editOpenBtn");
    const cancelBtn = document.getElementById("editCancelBtn");
    const submitBtn = document.getElementById("editSubmitBtn");
    const editTitle = document.getElementById("editTitle");
    const editContent = document.getElementById("editContent");

    function showDetail() {
      if (detailWrap) detailWrap.style.display = "block";
      if (updateWrap) updateWrap.style.display = "none";
    }

    function showUpdate() {
      if (detailWrap) detailWrap.style.display = "none";
      if (updateWrap) updateWrap.style.display = "block";
    }

    function openUpdateView() {
      if (!updateWrap) return;
      // 현재 값 프리필
      if (editTitle) editTitle.value = item.title || "";
      if (editContent) editContent.value = item.content || "";
      const radios = updateWrap.querySelectorAll('input[name="editMood"]');
      radios.forEach((r) => {
        r.checked = r.value === (item.mood || "기타");
      });
      showUpdate();
    }

    function cancelUpdate() {
      showDetail();
    }

    function saveEdit() {
      // 값 수집
      const selectedMoodEl = updateWrap.querySelector(
        'input[name="editMood"]:checked'
      );
      const newMood = selectedMoodEl ? selectedMoodEl.value : item.mood;
      const newTitle = editTitle ? editTitle.value.trim() : item.title;
      const newContent = editContent ? editContent.value.trim() : item.content;

      // 리스트 갱신 및 저장
      const nextList = list.map((d) =>
        String(d.id) === String(id)
          ? { ...d, title: newTitle, content: newContent, mood: newMood }
          : d
      );
      localStorage.setItem("diaries", JSON.stringify(nextList));

      // 메모리의 item도 최신 값으로 반영 (다음 수정 시 라디오 프리필용)
      item.title = newTitle;
      item.content = newContent;
      item.mood = newMood;

      // 화면 반영
      if (titleEl) titleEl.textContent = newTitle;
      if (textarea) textarea.value = newContent;
      if (moodEl) {
        moodEl.textContent = newMood;
        if (tagColor[newMood]) moodEl.style.color = tagColor[newMood];
      }
      if (moodImg && newMood && moodToImg[newMood]) {
        moodImg.src = moodToImg[newMood];
      }

      showDetail();
    }

    // 초기 상태: 상세 보이기
    showDetail();

    openBtn?.addEventListener("click", openUpdateView);
    cancelBtn?.addEventListener("click", cancelUpdate);
    submitBtn?.addEventListener("click", saveEdit);
  } catch (e) {
    console.error(e);
  }
});
