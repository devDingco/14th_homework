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
  const idx = diaries.findIndex(d => d.id === id);

  const notFound = document.getElementById("notFound");
  const detailArea = document.getElementById("detailArea");
  const currentImage = document.getElementById("currentImage");
  const editForm = document.getElementById("editForm");
  const saveBtn = document.getElementById("saveBtn");

  const commentsSection = document.getElementById("commentsSection");
  const commentsList = document.getElementById("commentsList");
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");

  if (idx === -1) {
    notFound.style.display = "block";
    detailArea.style.display = "none";
    return;
  }

  // 초기값 채우기
  const diary = diaries[idx];
  currentImage.src = emotionImages[diary.emotion] || emotionImages.etc;
  document.querySelectorAll('input[name="emotion"]').forEach(r => {
    r.checked = (r.value === diary.emotion);
  });
  document.getElementById("editTitle").value = diary.title;
  document.getElementById("editContent").value = diary.content;

  // 댓글 렌더
  function renderComments() {
    const comments = diaries[idx].comments || [];
    if (comments.length === 0) {
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

  function escapeHtml(s = '') {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  renderComments();

  // 진입 시 댓글 섹션으로 부드럽게 스크롤
  setTimeout(() => {
    if (commentsSection) commentsSection.scrollIntoView({ behavior: 'smooth' });
  }, 300);

  // 댓글 등록
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (!text) {
      alert('댓글을 입력해주세요.');
      return;
    }
    const newComment = { text, date: new Date().toLocaleString() };
    if (!diaries[idx].comments) diaries[idx].comments = [];
    diaries[idx].comments.push(newComment);
    localStorage.setItem('diaries', JSON.stringify(diaries));
    commentInput.value = '';
    renderComments();

    // 새로 추가된 댓글로 부드럽게 스크롤
    setTimeout(() => {
      const children = commentsList.children;
      if (children.length) children[children.length - 1].scrollIntoView({ behavior: 'smooth' });
    }, 50);
  });

  // 수정 저장 (원래 기능 유지)
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emotionEl = document.querySelector('input[name="emotion"]:checked');
    const title = document.getElementById("editTitle").value.trim();
    const content = document.getElementById("editContent").value.trim();

    if (!emotionEl || !title || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

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

});
