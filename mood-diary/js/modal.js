// INFO: 모달 동작 관련 함수 모음
const openModal = (id) => {
  if (id === 'main-diary-form') {
    const toggleBtn = document.querySelector('.toggle-btn');
    toggleBtn.checked = false
    document.body.classList.remove('darkmode')
  }
  
  const modal = document.getElementById(id)
  modal.style = "display: block;"

  window.scrollTo({ top: 0, behavior: "smooth" })
  window.onscroll = () => {
    window.scrollTo(0, 0);
  };
}

const openDeleteModal = (event, modalId, id) => {
  event.preventDefault();
  const modal = document.getElementById(modalId)
  modal.style = "display: block"

  window.scrollTo({ top: 0, behavior: "smooth" })
  window.onscroll = () => {
    window.scrollTo(0, 0);
  };

  const deleteBtn = document.querySelector('#diary-delete-button')
  const onClick = (event) => {
    confirmDelete(event, id)
    btn.removeEventListener('click', onClick)
  }
  deleteBtn.addEventListener('click', onClick, {once: true})
}

const closeModal = (id) => {
  document.getElementById(id).style = "display: none"
  window.onscroll = null;
  // location.reload()
}

// CONSIDER: 중첩 모달 스택 관리
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal('main-diary-form')
    closeModal('nested-modal-cancel')
    location.reload()
  }
});