let modal;
let openModalBtn;
let submitBtn;
let titleInput;
let contentTextarea;
let moodRadios;
let infoModal;
function clearForm() {
  if (moodRadios && moodRadios.length) {
    moodRadios.forEach((radio) => {
      radio.checked = false;
    });
  }
  if (titleInput) titleInput.value = "";
  if (contentTextarea) contentTextarea.value = "";
}

function initializeForm() {
  const hasTitle = !!titleInput && titleInput.value.trim().length > 0;
  const hasContent =
    !!contentTextarea && contentTextarea.value.trim().length > 0;
  const hasMood = !!document.querySelector('input[name="mood"]:checked');

  if (!submitBtn) return;
  submitBtn.disabled = !(hasTitle && hasContent && hasMood);
}

function openModal() {
  if (!modal) return;
  modal.style.display = "block";
  // 성공/취소 오버레이가 떠있을 수 있으므로 열 때 항상 숨김
  const overlay = document.getElementById("infoOverlay");
  if (overlay) overlay.style.display = "none";
  const closeOverlay = document.getElementById("infoCloseOverlay");
  if (closeOverlay) closeOverlay.style.display = "none";
  clearForm();
  initializeForm();
}

function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
  const overlay = document.getElementById("infoOverlay");
  if (overlay) overlay.style.display = "none";
  const closeOverlay = document.getElementById("infoCloseOverlay");
  if (closeOverlay) closeOverlay.style.display = "none";
}

// 앞쪽에 있던 단순 closeInfoModal 정의는 제거됨. 아래의 상세 정의를 사용.

document.addEventListener("DOMContentLoaded", function () {
  modal = document.querySelector(".modal-wrapper");
  openModalBtn = document.querySelector(".add-diary-button");
  submitBtn = document.querySelector(".modal-submit-btn");
  titleInput = document.querySelector(".diary-title-input");
  contentTextarea = document.querySelector(".diary-content-textarea");
  moodRadios = Array.from(document.querySelectorAll('input[name="mood"]'));
  infoModal = document.querySelector(".info-modal-wrapper");

  if (titleInput) titleInput.addEventListener("input", initializeForm);
  if (contentTextarea)
    contentTextarea.addEventListener("input", initializeForm);
  if (moodRadios && moodRadios.length) {
    moodRadios.forEach((radio) =>
      radio.addEventListener("change", initializeForm)
    );
  }

  if (openModalBtn) {
    openModalBtn.addEventListener("click", function () {
      openModal();
    });
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  if (infoModal) {
    infoModal.addEventListener("click", function (event) {
      if (event.target === infoModal) {
        closeInfoModal();
      }
    });
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  initializeForm();
});

function postDiary() {
  const title = titleInput?.value?.trim() ?? "";
  const content = contentTextarea?.value?.trim() ?? "";
  const checked = document.querySelector('input[name="mood"]:checked');
  if (!checked) return;
  const mood = checked.value;

  const overlay = document.getElementById("infoOverlay");
  if (overlay) overlay.style.display = "flex";

  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const nowIso = new Date().toISOString();
  const diary = { id, title, content, mood, date: nowIso };

  let diaries = [];

  const diariesRaw = localStorage.getItem("diaries");
  if (diariesRaw) {
    const parsed = JSON.parse(diariesRaw);
    if (Array.isArray(parsed)) diaries = parsed;
  }

  diaries.push(diary);
  localStorage.setItem("diaries", JSON.stringify(diaries));
  if (window.renderCards) window.renderCards();
  // 폼은 유지한 채로 성공 모달만 띄우고, 본 모달은 닫지 않음. 확인 시 닫힘 처리
}

function cencelDiary() {
  const overlay = document.getElementById("infoCloseOverlay");
  if (overlay) overlay.style.display = "flex";
}

function closeInfoModal() {
  // 성공 모달만 닫기
  const overlay = document.getElementById("infoOverlay");
  if (overlay) overlay.style.display = "none";
  // 성공 확인 시 작성 모달 닫고 폼 초기화
  closeModal();
  clearForm();
  initializeForm();
}

function closeInfoCloseModal() {
  const overlay = document.getElementById("infoCloseOverlay");
  if (overlay) overlay.style.display = "none";
}
