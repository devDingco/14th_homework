// 상세페이지

import { getLocalStorageDetail } from './storageControl';
import type { TCard, TComment } from './types';
import { formatDate } from './utils/formatDate';
import { switchTextColor } from './utils/switchTextColor';

const appEl = document.querySelector('#app-detail')! as HTMLDivElement;

const detailTitleEl = document.querySelector('.detail-title-label')! as HTMLSpanElement;
const detailBodyEl = document.querySelector('.detail-body')! as HTMLSpanElement;
const detailTitleInputEl = document.querySelector('.detail-title-input')! as HTMLInputElement;
const detailBodyInputEl = document.querySelector('.detail-body-input')! as HTMLInputElement;
const detailDateEl = document.querySelector('.detail-date-label')! as HTMLSpanElement;
const detailStateEl = document.querySelector('.detail-state')! as HTMLSpanElement;
const detailEditBtnEl = document.querySelector('.detail-footer-editBtn')! as HTMLSpanElement;
// const detailDeleteBtnEl = document.querySelector('.detail-footer-deleteBtn')! as HTMLSpanElement;
const detailIsEditBtnEl = document.querySelector('.detail-footer-isEdit')! as HTMLSpanElement;
const detailIsEditCancelBtnEl = document.querySelector('.detail-footer-isEdit-cancelBtn')! as HTMLSpanElement;
const detailIsEditSaveBtnEl = document.querySelector('.detail-footer-isEdit-saveBtn')! as HTMLSpanElement;
const textCopyEl = document.querySelector('.text-copy')! as HTMLSpanElement;

const submitEl = document.querySelector('.comment-layout')! as HTMLSpanElement;

let isEdit = false;

const realgetParams = () => {
  const params = location.search;
  const diaryId = new URLSearchParams(params).get('id');

  if (diaryId) {
    return parseInt(diaryId);
  }
};

const getParams = () => {
  const params = location.search;
  const diaryId = new URLSearchParams(params).get('id');

  const allData = getLocalStorageDetail();
  console.log(allData);
  const findOneData = allData.filter((diary: TCard) => diary.id == +diaryId!);
  console.log(findOneData);

  detailTitleEl.innerText = `${findOneData[0].title}`;
  detailBodyEl.innerText = `${findOneData[0].content}`;
  detailDateEl.innerText = `${findOneData[0].date}`;
  detailStateEl.innerText = `${findOneData[0].state}`;
  detailStateEl.style.color = switchTextColor(findOneData[0].state);
};

getParams();

const onEditCancel = () => {
  isEdit = !isEdit;

  if (isEdit) {
    detailEditBtnEl.style.display = 'none';
    detailIsEditBtnEl.style.display = 'flex';

    detailTitleEl.style.display = 'none';
    detailBodyEl.style.display = 'none';

    detailTitleInputEl.style.display = 'flex';
    detailBodyInputEl.style.display = 'flex';

    detailTitleInputEl.value = detailTitleEl.innerText;
    detailBodyInputEl.value = detailBodyEl.innerText;
  } else if (!isEdit) {
    detailEditBtnEl.style.display = 'block';
    detailIsEditBtnEl.style.display = 'none';
    detailTitleEl.style.display = 'flex';
    detailBodyEl.style.display = 'flex';
    detailTitleInputEl.style.display = 'none';
    detailBodyInputEl.style.display = 'none';
  }
};

const onEditBtn = () => {
  isEdit = !isEdit;

  if (isEdit) {
    detailEditBtnEl.style.display = 'none';
    detailIsEditBtnEl.style.display = 'flex';

    detailTitleEl.style.display = 'none';
    detailBodyEl.style.display = 'none';

    detailTitleInputEl.style.display = 'flex';
    detailBodyInputEl.style.display = 'flex';

    detailTitleInputEl.value = detailTitleEl.innerText;
    detailBodyInputEl.value = detailBodyEl.innerText;
    detailEditBtnEl.classList.remove('test');
  } else if (!isEdit) {
    detailEditBtnEl.style.display = 'block';
    detailIsEditBtnEl.style.display = 'none';
    detailTitleEl.style.display = 'flex';
    detailBodyEl.style.display = 'flex';
    detailTitleInputEl.style.display = 'none';
    detailBodyInputEl.style.display = 'none';

    detailTitleEl.innerText = detailTitleInputEl.value;
    detailBodyEl.innerText = detailBodyInputEl.value;
    detailEditBtnEl.classList.add('test');
  }
};

detailEditBtnEl.addEventListener('click', onEditBtn);
detailIsEditCancelBtnEl.addEventListener('click', onEditCancel);
detailIsEditSaveBtnEl.addEventListener('click', onEditBtn);

submitEl.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('submit!');

  const commentInputEl = document.querySelector('.comment-input')! as HTMLInputElement;
  const newComment: TComment = {
    id: realgetParams() || 1,
    text: commentInputEl.value,
    date: formatDate(),
  };

  console.log(newComment);

  // // Save the new comment to local storage
  // const diaryId = new URLSearchParams(location.search).get('id');
  // const allData = getLocalStorageDetail();
  // const targetDiary = allData.find((diary: TCard) => diary.id === +diaryId!);
  // if (targetDiary) {
  //   targetDiary.comments.push(newComment);
  //   setLocalStorage(targetDiary);
  // }

  // commentInputEl.value = '';
});

const onToast = (message: string) => {
  const toastEl = document.createElement('div');
  toastEl.classList.add('toast');
  toastEl.classList.add('x-container');
  toastEl.innerHTML = message;
  appEl.appendChild(toastEl);

  console.log('Run!');

  setTimeout(() => {
    toastEl.remove();
  }, 3000);
};

const copyText = async () => {
  const textToCopy = `${detailTitleEl.innerText}\n${detailBodyEl.innerText}`;
  await navigator.clipboard.writeText(textToCopy);
  onToast('내용이 복사되었습니다.');
};

textCopyEl.addEventListener('click', copyText);
