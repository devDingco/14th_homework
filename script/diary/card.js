// --- card.js 상단 근처: 버튼 템플릿 준비 ---
const VIEW_BTN_URL = "./component/diary/viewButton.html";
let viewBtnTpl = null;                 // <button> element (클론용)

function preloadViewBtn() {
  if (viewBtnTpl) return;
  fetch(VIEW_BTN_URL, { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(html => {
      const wrap = document.createElement("div");
      wrap.innerHTML = html.trim();
      const btn = wrap.firstElementChild;
      if (!btn || btn.tagName !== "BUTTON") throw new Error("invalid template");
      viewBtnTpl = btn;
    })
    .catch(() => {
      // 폴백: 텍스트 버튼
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn-view-detail";
      b.setAttribute("data-role", "view-detail");
      b.textContent = "상세보기";
      viewBtnTpl = b;
    });
}
preloadViewBtn();

function cloneViewBtn() {
  return viewBtnTpl ? viewBtnTpl.cloneNode(true) : (function(){
    const b = document.createElement("button");
    b.type = "button"; b.className = "btn-view-detail"; b.setAttribute("data-role","view-detail"); b.textContent = "상세보기";
    return b;
  })();
}

// --- 여기서부터 "카드 DOM 생성" 함수 본문에서 .card-meta 만드는 부분만 교체 ---
function createCard(entry) {
  // ... (상단 이미지/기본 구조는 기존대로)

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const emotion = document.createElement("span");
  emotion.className = "emotion " + entry.mood;
  emotion.textContent = entry.emotionText;

  // 날짜 span
  const date = document.createElement("span");
  date.className = "date";
  date.textContent = entry.date;

  // 🔹 오른쪽 묶음: 버튼 + 날짜
  const right = document.createElement("div");
  right.className = "meta-right";

  const btn = cloneViewBtn();
  // 카드 id 표시(데이터에 맞게 id/diaryId 등 우선순위)
  const diaryId = entry.id || entry.diaryId || (entry._raw && (entry._raw.id || entry._raw.diaryId)) || "";
  if (diaryId) btn.dataset.diaryId = diaryId;

  // 클릭 시 카드 클릭과 충돌 방지 및 라우팅 위임
  btn.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (typeof window.openDiaryDetail === "function") {
      try { window.openDiaryDetail(diaryId, entry); } catch (e) { /* noop */ }
    } else {
      // 임시: 디버그 로그
      console.log("[view-detail]", diaryId, entry);
      // 필요 시 임시 이동:
      // if (diaryId) location.href = `./subpage/detail.html?id=${encodeURIComponent(diaryId)}`;
    }
  });

  right.appendChild(btn);
  right.appendChild(date);

  meta.appendChild(emotion);
  meta.appendChild(right);

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = entry.title;

  bottom.appendChild(meta);
  bottom.appendChild(title);

  const card = document.createElement("div");
  card.className = "diary-card mood-" + entry.mood;
  // 카드에도 data-id를 남겨두면 이후 활용 용이
  if (diaryId) card.dataset.diaryId = diaryId;

  // ... (상단 .card-top 등 기존 코드 그대로 이어붙이기)
  // card.appendChild(top);
  card.appendChild(bottom);

  return card;
}
