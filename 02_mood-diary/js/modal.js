// INFO: 모달 동작 관련 함수 모음
const openModal = (id) => {
  const modal = document.getElementById(id)
  modal.style = 'display: block;'

  window.scrollTo({ top: 0, behavior: 'smooth' })
  window.onscroll = () => {
    window.scrollTo(0, 0)
  }
}

const openDeleteModal = (event, modalId, id) => {
  event.preventDefault()
  const modal = document.getElementById(modalId)
  modal.style = 'display: block'

  window.scrollTo({ top: 0, behavior: 'smooth' })
  window.onscroll = () => {
    window.scrollTo(0, 0)
  }

  const deleteBtn = document.querySelector('#diary-delete-button')
  const onClick = (event) => {
    confirmDelete(event, id)
    deleteBtn.removeEventListener('click', onClick)
  }
  deleteBtn.addEventListener('click', onClick, { once: true })
}

const closeModal = (id) => {
  const el = document.getElementById(id)
  if (!el) return // INFO: 해당하는 id가 있을 경우만 closeModal 동작
  el.style.display = 'none'
  window.onscroll = null
  resetForm()
  // location.reload()
}

// CONSIDER: 중첩 모달 스택 관리
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal('main-diary-form')
    closeModal('nested-modal-cancel')
    closeModal('nested-modal-complete')
    closeModal('nested-modal-delete')
    closeModal('modal-delete')
    location.reload()
  }
})

// ERROR: 해당 resetForm 사용시, form 리셋 + reload되는 상황 발생
const resetForm = () => {
  const form = document.getElementById('myForm')
  form.reset()
}
