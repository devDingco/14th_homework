document.addEventListener("DOMContentLoaded", () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const commentsKey = `comments:${id}`;
    const listEl = document.getElementById("commentList");
    const emptyEl = document.querySelector(".content-comment-no-data");
    const inputEl = document.getElementById("comment");
    const submitBtn = document.getElementById("commentSubmit");

    function loadComments() {
      try {
        const raw = localStorage.getItem(commentsKey);
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
      } catch (_) {
        return [];
      }
    }

    function saveComments(arr) {
      try {
        localStorage.setItem(commentsKey, JSON.stringify(arr));
      } catch (_) {}
    }

    function formatYmd(dateIso) {
      const d = dateIso ? new Date(dateIso) : new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}.${m}.${day}`;
    }

    function renderComments() {
      if (!listEl) return;
      const comments = loadComments();
      listEl.innerHTML = "";

      if (!comments.length) {
        if (emptyEl) emptyEl.style.display = "block";
        return;
      }
      if (emptyEl) emptyEl.style.display = "none";

      comments.forEach((c) => {
        const wrapper = document.createElement("div");
        wrapper.className = "content-comment-list-wrapper";

        const itemDiv = document.createElement("div");
        itemDiv.className = "content-comment-list-item";

        const titleSpan = document.createElement("span");
        titleSpan.className = "content-comment-list-item-title body-medium-16";
        titleSpan.textContent = c.text;

        const dateSpan = document.createElement("span");
        dateSpan.className = "content-comment-list-item-date body-regular-16";
        dateSpan.textContent = `[${formatYmd(c.createdAt)}]`;

        itemDiv.appendChild(titleSpan);
        itemDiv.appendChild(dateSpan);
        wrapper.appendChild(itemDiv);

        const underline = document.createElement("div");
        underline.className = "content-comment-list-item-under-line";
        wrapper.appendChild(underline);

        listEl.appendChild(wrapper);
      });

      const wrappers = listEl.querySelectorAll(".content-comment-list-wrapper");
      if (wrappers.length) {
        wrappers[wrappers.length - 1].style.border = "none";
      }
    }

    function addComment() {
      const text = inputEl?.value?.trim();
      if (!text) return;
      const comments = loadComments();
      comments.push({
        id: `${Date.now()}`,
        text,
        createdAt: new Date().toISOString(),
      });
      saveComments(comments);
      inputEl.value = "";
      renderComments();
    }

    if (submitBtn) submitBtn.addEventListener("click", addComment);
    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          addComment();
        }
      });
    }

    renderComments();
  } catch (e) {
    console.error(e);
  }
});
