document.addEventListener("DOMContentLoaded", () => {
  const emotionImages = {
    happy: "./행복해요 (m).png",
    sad: "./슬퍼요 (m).png",
    surprised: "./놀랐어요 (m).png",
    angry: "./화나요 (m).png",
    etc: "./기타 (m).png"
  };

  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  let diaries = JSON.parse(localStorage.getItem("diaries")) || [];
  let idx = diaries.findIndex(d => d.id === id);

  const notFound = document.getElementById("notFound");
  const detailArea = document.getElementById("detailArea");
  const currentImage = document.getElementById("currentImage");
  const editForm = document.getElementById("editForm");
  const saveBtn = document.getElementById("saveBtn");

  const commentsSection = document.getElementById("commentsSection");
  const commentsList = document.getElementById("commentsList");
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");

  const copyBtn = document.getElementById("copyContent");
  const toast = document.getElementById("toast");

  // 삭제 모달
  const confirmDeleteModal = document.getElementById("confirmDeleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const askDeleteBtn = document.getElementById("askDelete");

  if (idx === -1) {
    notFound.style.display = "block";
    detailArea.style.display = "none";
    return;
  }

  // 초기값
  const diary = diaries[idx];
  currentImage.src = emotionImages[diary.emotion] || emotionImages.etc;
  document.querySelectorAll('input[name="emotion"]').forEach(r => r.checked = (r.value === diary.emotion));
  document.getElementById("editTitle").value = diary.title;
  document.getElementById("editContent").value = diary.content;

  // 댓글 렌더
  function renderComments() {
    const comments = diaries[idx].comments || [];
    if (!comments.length) {
      commentsList.innerHTML = '<p style="color:#666;">등록된 댓글이 없습니다.</p>';
      return;
    }
    commentsList.innerHTML = comments.map(c => `
      <div style="background:#fff;padding:10px;border-radius:6px;margin-bottom:8px;">
        <div style="color:#666;font-size:12px;">${escapeHtml(c.date)}</div>
        <div style="margin-top:6px; white-space:pre-wrap;">${escapeHtml(c.text)}</div>
      </div>
    `).join('');
  }
  function escapeHtml(s=''){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}

  renderComments();

  // 진입 시 댓글 위치로 부드럽게 스크롤
  setTimeout(() => commentsSection?.scrollIntoView({ behavior: 'smooth' }), 300);

  // 댓글 등록
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (!text) return alert('댓글을 입력해주세요.');
    const newComment = { text, date: new Date().toLocaleString() };
    if (!diaries[idx].comments) diaries[idx].comments = [];
    diaries[idx].comments.push(newComment);
    localStorage.setItem('diaries', JSON.stringify(diaries));
    commentInput.value = '';
    renderComments();
    setTimeout(() => {
      const children = commentsList.children;
      if (children.length) children[children.length - 1].scrollIntoView({ behavior: 'smooth' });
    }, 50);
  });

  // 수정 저장
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emotionEl = document.querySelector('input[name="emotion"]:checked');
    const title = document.getElementById("editTitle").value.trim();
    const content = document.getElementById("editContent").value.trim();
    if (!emotionEl || !title || !content) return alert("모든 항목을 입력해주세요.");

    diaries[idx].emotion = emotionEl.value;
    diaries[idx].title = title;
    diaries[idx].content = content;
    diaries[idx].date = new Date().toLocaleString();
    localStorage.setItem("diaries", JSON.stringify(diaries));

    saveBtn.classList.add("rotate");
    setTimeout(() => saveBtn.classList.remove("rotate"), 600);
    currentImage.src = emotionImages[emotionEl.value] || emotionImages.etc;
    alert("일기 수정이 저장되었습니다.");
  });

  // 내용 복사 -> 클립보드 + 토스트
  copyBtn.addEventListener("click", async () => {
    const title = document.getElementById("editTitle").value;
    const content = document.getElementById("editContent").value;
    const text = `제목: ${title}\n\n${content}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast("복사되었습니다!");
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      showToast("복사되었습니다!");
    }
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.transform = "translateX(-50%) translateY(0%)";
    setTimeout(() => {
      toast.style.transform = "translateX(-50%) translateY(120%)";
    }, 1400);
  }

  // 삭제 확인 모달
  function openModal(modal){ modal.classList.add("show"); document.body.classList.add("no-scroll"); window.scrollTo({top:0, behavior:"instant"}); }
  function closeModal(modal){ modal.classList.remove("show"); const anyOpen=[...document.querySelectorAll(".modal")].some(m=>m.classList.contains("show")); if(!anyOpen) document.body.classList.remove("no-scroll"); }

  askDeleteBtn.addEventListener("click", () => openModal(confirmDeleteModal));
  confirmDeleteModal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close='cancel']")) closeModal(confirmDeleteModal);
    const backdrop = e.target.closest(".modal__backdrop");
    if (backdrop?.dataset.close === "backdrop") closeModal(confirmDeleteModal);
  });
  window.addEventListener("keydown", (e)=>{ if(e.key==="Escape" && confirmDeleteModal.classList.contains("show")) closeModal(confirmDeleteModal); });

  confirmDeleteBtn.addEventListener("click", () => {
    diaries = diaries.filter(d => d.id !== id);
    localStorage.setItem("diaries", JSON.stringify(diaries));
    closeModal(confirmDeleteModal);
    location.href = "mindjournal.html";
  });
});
