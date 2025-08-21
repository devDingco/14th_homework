document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("cardContainer");
    const filterBar = document.getElementById("filterBar");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    const filterDropdown = document.getElementById("filterDropdown");
    const searchInput = document.getElementById("searchInput");
    const searchInputDesktop = document.getElementById("searchInputDesktop");
    const modalDarkSwitch = document.getElementById("modalDarkSwitch");

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
    let searchQuery = "";
    
    const ITEMS_PER_PAGE = 8;
    let currentPage = 1;
    const paginationContainer = document.getElementById("pagination");
    const photoFilters = document.querySelector(".photo-filters");

    function saveToStorage() {
        localStorage.setItem("diaries", JSON.stringify(diaries));
    }

    function escapeHtml(s = "") {
        return String(s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function getSelectedEmotion() {
        const checkedInput = document.querySelector("input[name='emotion']:checked");
        return checkedInput ? checkedInput.value : null;
    }

    function debounce(fn, delay = 1000) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), delay);
        };
    }
    function throttle(fn, delay = 1000) {
        let last = 0;
        let timer = null;
        return (...args) => {
            const now = Date.now();
            const remaining = delay - (now - last);
            if (remaining <= 0) {
                last = now;
                fn(...args);
            } else if (!timer) {
                timer = setTimeout(() => {
                    last = Date.now();
                    timer = null;
                    fn(...args);
                }, remaining);
            }
        };
    }
    
    async function renderCards() {
        if (currentFilter !== "photos") {
            const q = searchQuery.trim().toLowerCase();
            let filtered = diaries.filter(d =>
                (currentFilter === "all" || d.emotion === currentFilter) &&
                (q === "" || (d.title || "").toLowerCase().includes(q))
            );
            
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedDiaries = filtered.slice(startIndex, endIndex);

            const html = paginatedDiaries.map(diary => `
                <a class="card-link" href="detail.html?id=${diary.id}">
                    <div class="card" data-id="${diary.id}">
                        <button class="delete-btn" data-id="${diary.id}" title="삭제">×</button>
                        <img src="${emotionImages[diary.emotion] || emotionImages.etc}" alt="${diary.emotion}">
                        <p>${escapeHtml(diary.date)} - ${escapeHtml(diary.title)}</p>
                    </div>
                </a>
            `).join("");
            cardContainer.innerHTML = html;
            photoFilters.style.display = "none";
            paginationContainer.style.display = "flex";
            
            renderPagination(filtered.length);

        } else {
            await fetchPhotos();
            paginationContainer.style.display = "none";
        }
    }

    function renderPagination(totalItems) {
        const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
        paginationContainer.innerHTML = "";
        
        // 항목이 없을 때도 1페이지는 항상 보이도록 수정
        if (totalPages === 1 && totalItems === 0) {
          const btn = document.createElement("button");
          btn.textContent = 1;
          btn.className = "pagination-btn active";
          btn.disabled = true;
          paginationContainer.appendChild(btn);
          return;
        }

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "<";
        prevBtn.className = "pagination-btn";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            currentPage--;
            renderCards();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = "pagination-btn";
            if (i === currentPage) {
                btn.classList.add("active");
            }
            btn.addEventListener("click", () => {
                currentPage = i;
                renderCards();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
            paginationContainer.appendChild(btn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.textContent = ">";
        nextBtn.className = "pagination-btn";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            currentPage++;
            renderCards();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        paginationContainer.appendChild(nextBtn);
    }

    cardContainer.addEventListener("click", (e) => {
        const del = e.target.closest(".delete-btn");
        if (del) {
            e.preventDefault();
            e.stopPropagation();
            const id = Number(del.dataset.id);
            diaries = diaries.filter(d => d.id !== id);
            saveToStorage();
            const totalItems = diaries.filter(d =>
                (currentFilter === "all" || d.emotion === currentFilter) &&
                (searchQuery.trim() === "" || (d.title || "").toLowerCase().includes(searchQuery.trim().toLowerCase()))
            ).length;
            const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
            if (currentPage > totalPages) {
                currentPage = totalPages;
            }
            renderCards();
        }
    });

    if (filterDropdown) {
        filterDropdown.addEventListener("change", () => {
            currentFilter = filterDropdown.value;
            currentPage = 1;
            renderCards();
        });
    }

    const doSearch = debounce((val) => {
        searchQuery = (val || "").toLowerCase();
        currentPage = 1;
        if (currentFilter !== "photos") renderCards();
    }, 1000);
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => doSearch(e.target.value));
    }
    if (searchInputDesktop) {
        searchInputDesktop.addEventListener("input", (e) => doSearch(e.target.value));
    }
    
    scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    function openModal(modal) {
        modal.classList.add("show");
        document.body.classList.add("no-scroll");
    }
    function closeModal(modal) {
        modal.classList.remove("show");
        const anyOpen = [...document.querySelectorAll(".modal")].some(m => m.classList.contains("show"));
        if (!anyOpen) document.body.classList.remove("no-scroll");
    }

    openWriteModalBtn.addEventListener("click", () => {
        diaryForm.reset();
        applyModalTheme(loadModalDarkPref());
        if (modalDarkSwitch) modalDarkSwitch.checked = loadModalDarkPref();
        openModal(writeModal);
    });
    closeWriteModalBtn.addEventListener("click", () => openModal(cancelModal));
    cancelWriteBtn.addEventListener("click", () => openModal(cancelModal));

    cancelModal.addEventListener("click", (e) => {
        const keep = e.target.closest("[data-close='keep']");
        const cancelAll = e.target.closest("[data-close='cancel-all']");
        const backdrop = e.target.closest(".modal__backdrop");
        if (keep || backdrop?.dataset.close === "backdrop") closeModal(cancelModal);
        else if (cancelAll) {
            closeModal(cancelModal);
            closeModal(writeModal);
            diaryForm.reset();
        }
    });

    successModal.addEventListener("click", (e) => {
        const ok = e.target.closest("[data-close='success']");
        const backdrop = e.target.closest(".modal__backdrop");
        if (ok || backdrop?.dataset.close === "backdrop") {
            closeModal(successModal);
            closeModal(writeModal);
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const opened = [...document.querySelectorAll(".modal.show")];
            if (opened.length) closeModal(opened[opened.length - 1]);
        }
    });

    [writeModal, successModal, cancelModal].forEach(modal => {
        modal.addEventListener("click", (e) => {
            const backdrop = e.target.closest(".modal__backdrop");
            if (!backdrop) return;
            if (modal === writeModal) closeModal(writeModal);
        });
    });

    function applyModalTheme(isDark) {
        [writeModal, successModal, cancelModal].forEach(m => m && m.classList.toggle("dark", !!isDark));
    }
    function loadModalDarkPref() {
        return localStorage.getItem("modalDark") === "1";
    }
    function saveModalDarkPref(on) {
        localStorage.setItem("modalDark", on ? "1" : "0");
    }

    applyModalTheme(loadModalDarkPref());
    if (modalDarkSwitch) {
        modalDarkSwitch.checked = loadModalDarkPref();
        modalDarkSwitch.addEventListener("change", (e) => {
            const on = e.target.checked;
            saveModalDarkPref(on);
            applyModalTheme(on);
        });
    }

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
        diaries.unshift(newDiary);
        saveToStorage();
        currentPage = 1; 
        renderCards();
        openModal(successModal);
    });

    const ratioBtns = document.querySelectorAll(".ratio-btn");
    let isLoadingPhotos = false;
    const PHOTOS_BATCH = 10;

    function getActiveRatio() {
        const active = document.querySelector(".ratio-btn.active");
        return active ? active.dataset.ratio : "square";
    }

    async function fetchPhotos(append = false) {
        photoFilters.style.display = "flex";
        if (!append) {
            cardContainer.innerHTML = Array.from({length:PHOTOS_BATCH}).map(()=>`<div class="card skeleton"></div>`).join("");
        }
        const ratio = getActiveRatio();
        try {
            isLoadingPhotos = true;
            const res = await fetch(`https://dog.ceo/api/breeds/image/random/${PHOTOS_BATCH}`);
            const data = await res.json();
            const html = (data.message || []).map(url => `
                <div class="card photo-card ${ratio === "all" ? "square" : ratio}">
                    <img src="${url}" alt="강아지">
                </div>
            `).join("");
            if (append) cardContainer.insertAdjacentHTML("beforeend", html);
            else cardContainer.innerHTML = html;
        } catch {
            if (!append) cardContainer.innerHTML = "<p>사진을 불러오는데 실패했습니다.</p>";
        } finally {
            isLoadingPhotos = false;
        }
    }

    ratioBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            ratioBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const ratio = btn.dataset.ratio;
            document.querySelectorAll(".photo-card").forEach(card => {
                card.classList.remove("square","landscape","portrait");
                if(ratio !== "all") card.classList.add(ratio);
                else card.classList.add("square");
            });
        });
    });

    const handleInfinite = throttle(() => {
        if (currentFilter !== "photos" || isLoadingPhotos) return;
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
        if (nearBottom) fetchPhotos(true);
    }, 1000);
    window.addEventListener("scroll", handleInfinite);

    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentFilter = tab.dataset.tab === "photos" ? "photos" : "all";
            currentPage = 1;
            renderCards();
        });
    });

    function syncDropdownToFilter() {
        if (filterDropdown) filterDropdown.value = currentFilter;
    }
    syncDropdownToFilter();
    renderCards();
});