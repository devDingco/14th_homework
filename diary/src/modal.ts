const modalBackdropEl = document.querySelector('#modal-new-diary-backdrop') as HTMLSpanElement;
const modalContainerEl = document.querySelector('#modal-new-diary-container') as HTMLSpanElement;
const modalCloseBtnEl = document.querySelector('.modalCloseBtn') as HTMLSpanElement;
const formDiaryEl = document.querySelector('.formDiary') as HTMLSpanElement;

/**
 * 이벤트 전파 차단
 */
const blockEvent = (e: Event) => {
  e.stopPropagation();
};

// ==================== 모달 ====================

export const handleOpenModal = () => {
  modalBackdropEl.style = 'display: flex';
  modalContainerEl.style = 'display: flex';
  document.body.style.overflow = 'hidden';
  // 스크롤 최상단으로 이동
  mvTop();
};

export const handleCloseModal = () => {
  modalBackdropEl.style = 'display: none';
  modalContainerEl.style = 'display: none';
  document.body.style.overflow = 'auto';
};

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    handleCloseModal();
  }
});

modalBackdropEl.addEventListener('click', handleCloseModal);
modalCloseBtnEl.addEventListener('click', handleCloseModal);
formDiaryEl.addEventListener('click', blockEvent);

// ==================== 스크롤 ====================

const topScrollEl = document.querySelector('.topscroll') as HTMLButtonElement;
const mvTop = () => {
  window.scrollTo({ top: 0 });
};

if (topScrollEl) {
  topScrollEl.addEventListener('click', mvTop);
}
