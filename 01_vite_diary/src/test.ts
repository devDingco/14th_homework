import { moveScrollTop } from './utils/utils';

// const appEl = document.querySelector('#app') as HTMLDivElement;
const testEl = document.querySelector('#testModal') as HTMLDivElement;
const submitEl = document.querySelector('#submitDiaryBtn') as HTMLDivElement;

/**
 * 이벤트 전파 차단
 */
const blockEvent = (e: Event) => {
  e.stopPropagation();
};

// export const closeAddModal = () => {
//   newModalBackdrop.remove();
// };
export function closeAddModal(this: HTMLDivElement) {
  this.remove();
}

const viewModal = () => {
  moveScrollTop();

  const newModalBackdrop = document.createElement('div');
  newModalBackdrop.classList.add('modal-backdrop-add');
  newModalBackdrop.addEventListener('click', closeAddModal);

  const newModal = document.createElement('dialog');
  newModal.classList.add('modal-container-add');
  newModal.addEventListener('click', blockEvent);
  newModal.innerText = 'dw';
  newModal.addEventListener('close', closeAddModal);

  newModalBackdrop.append(newModal);
  // document.body.append(newDialog);
  document.body.append(newModalBackdrop);
};

testEl?.addEventListener('click', viewModal);
submitEl.addEventListener('click', viewModal);
