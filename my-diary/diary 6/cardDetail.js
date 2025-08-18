document.addEventListener("DOMContentLoaded", () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const {
      loadDiaries,
      saveDiaries,
      applyMoodUI,
      tagColorMap,
      moodToImgSmall,
    } = window.diaryUtils || {};

    const list = typeof loadDiaries === "function" ? loadDiaries() : [];
    const idx = list.findIndex((d) => String(d.id) === String(id));
    if (idx < 0) return;
    const item = list[idx];

    const titleEl = document.querySelector(".content-header-title");
    const moodEl = document.querySelector(".content-header-mood-title");
    const dateEl = document.querySelector(".content-header-date");
    const textarea = document.querySelector(".content-body-text");
    const moodImg = document.querySelector(".content-header-icon");

    // 댓글 영역 엘리먼트
    const commentWrapper = document.querySelector(
      ".content-comment-input-wrapper"
    );
    const commentInput = document.getElementById("comment");
    const commentSubmit = document.getElementById("commentSubmit");

    if (titleEl) titleEl.textContent = item.title || "무제";
    if (dateEl) {
      const d = item.date ? new Date(item.date) : new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      dateEl.textContent = `${y}. ${m}. ${day}`;
    }
    if (textarea) textarea.value = item.content || "";

    if (typeof applyMoodUI === "function") {
      applyMoodUI({ moodEl, moodImgEl: moodImg, mood: item.mood, size: "s" });
    } else {
      // 폴백
      if (moodEl) {
        moodEl.textContent = item.mood || "기타";
        if (tagColorMap && tagColorMap[item.mood])
          moodEl.style.color = tagColorMap[item.mood];
      }
      if (moodImg && moodToImgSmall && moodToImgSmall[item.mood]) {
        moodImg.src = moodToImgSmall[item.mood];
      }
    }

    // 레이아웃 토글 요소
    const detailWrap = document.querySelector(".card-detail-body-contents");
    const updateWrap = document.querySelector(".update-content-wrapper");

    const openBtn = document.getElementById("editOpenBtn");
    const cancelBtn = document.getElementById("editCancelBtn");
    const submitBtn = document.getElementById("editSubmitBtn");
    const editTitle = document.getElementById("editTitle");
    const editContent = document.getElementById("editContent");

    function setCommentDisabled(disabled) {
      if (commentInput) commentInput.disabled = !!disabled;
      if (commentSubmit) commentSubmit.disabled = !!disabled;
      if (commentWrapper) {
        if (disabled) commentWrapper.classList.add("comment-disabled");
        else commentWrapper.classList.remove("comment-disabled");
      }
    }

    function showDetail() {
      if (detailWrap) detailWrap.style.display = "block";
      if (updateWrap) updateWrap.style.display = "none";
      setCommentDisabled(false);
    }

    function showUpdate() {
      if (detailWrap) detailWrap.style.display = "none";
      if (updateWrap) updateWrap.style.display = "block";
      setCommentDisabled(true);
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
      const nextItem = {
        ...item,
        title: newTitle,
        content: newContent,
        mood: newMood,
      };
      const nextList = [...list];
      nextList[idx] = nextItem;
      if (typeof saveDiaries === "function") saveDiaries(nextList);

      // 메모리의 item 업데이트
      item.title = newTitle;
      item.content = newContent;
      item.mood = newMood;

      // 화면 반영
      if (titleEl) titleEl.textContent = newTitle;
      if (textarea) textarea.value = newContent;
      if (typeof applyMoodUI === "function") {
        applyMoodUI({ moodEl, moodImgEl: moodImg, mood: newMood, size: "s" });
      }

      showDetail();
    }

    // 초기 상태: 상세 보이기
    showDetail();

    openBtn?.addEventListener("click", openUpdateView);
    cancelBtn?.addEventListener("click", cancelUpdate);
    submitBtn?.addEventListener("click", saveEdit);

    // 삭제 버튼에 삭제 확인 모달 바인딩
    const deleteBtn = document.getElementById("deleteOpenBtn");
    if (deleteBtn) {
      deleteBtn.removeAttribute("onclick");
      deleteBtn.addEventListener("click", (e) => {
        if (typeof window.openDeleteConfirm === "function") {
          window.openDeleteConfirm(e, id);
        }
      });
    }

    // 내용 복사 기능
    const copyWrapper = document.querySelector(".content-body-icon-wrapper");
    const copyTitle = document.querySelector(".content-body-icon-title");
    function copyContentToClipboard() {
      const text = (textarea?.value ?? item.content ?? "").toString();
      const done = () => {
        if (copyTitle) {
          const prev = copyTitle.textContent;
          copyTitle.textContent = "복사 완료";
          setTimeout(() => (copyTitle.textContent = prev || "내용 복사"), 1200);
        }
      };
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        navigator.clipboard
          .writeText(text)
          .then(done)
          .catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    }
    function fallbackCopy(text, cb) {
      try {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "fixed";
        temp.style.top = "-1000px";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        cb && cb();
      } catch (_) {}
    }
    if (copyWrapper) {
      copyWrapper.style.cursor = "pointer";
      copyWrapper.addEventListener("click", copyContentToClipboard);
    }
  } catch (e) {
    console.error(e);
  }
});
