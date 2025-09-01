// 상세페이지

import { getLocalStorageDetail, handleDeleteDiaryDetail } from './dataStorage';
import type { TCard, TComment } from './types';
import { switchTextColor } from './utils/utils';

const appEl = document.querySelector('#app-detail')! as HTMLDivElement;

const detailTitleEl = document.querySelector('.detail-title-label')! as HTMLSpanElement;
const detailBodyEl = document.querySelector('.detail-body')! as HTMLSpanElement;
const detailTitleInputEl = document.querySelector('.detail-title-input')! as HTMLInputElement;
const detailBodyInputEl = document.querySelector('.detail-body-input')! as HTMLTextAreaElement;
const detailDateEl = document.querySelector('.detail-date-label')! as HTMLSpanElement;
const detailCategoryEl = document.querySelector('.detail-category')! as HTMLSpanElement;
const detailUpdateBtnEl = document.querySelector('#detail-updateBtn')! as HTMLSpanElement;
const detailDeleteBtnEl = document.querySelector('#detail-deleteBtn')! as HTMLSpanElement;
const detailIsEditBtnEl = document.querySelector('.detail-footer-isEdit')! as HTMLSpanElement;
const detailIsEditCancelBtnEl = document.querySelector('.detail-footer-isEdit-cancelBtn')! as HTMLSpanElement;
const detailIsEditSaveBtnEl = document.querySelector('.detail-footer-isEdit-saveBtn')! as HTMLSpanElement;
const textCopyEl = document.querySelector('.text-copy')! as HTMLSpanElement;

const commentDisplayEl = document.querySelector('.displayComment')! as HTMLParagraphElement;

let isEdit = false;

const findOneData = (diaryId: string) => {
  const allData = getLocalStorageDetail();
  console.log(allData);
  const findOneData = allData.filter((diary: TCard) => diary.id == +diaryId!);
  console.log(findOneData);
  return findOneData;
};

const getParams = () => {
  const params = location.search;
  const diaryId = new URLSearchParams(params).get('id') ?? '';

  const findData = findOneData(diaryId);

  detailTitleEl.innerText = `${findData[0].title}`;
  detailBodyEl.innerText = `${findData[0].content}`;
  detailDateEl.innerText = `${findData[0].date}`;
  detailCategoryEl.innerText = `${findData[0].category}`;
  detailCategoryEl.style.color = switchTextColor(findData[0].category);

  if (findData.length > 0) {
    const textEl = findData[0].comments
      .map(
        (comment: TComment) =>
          `
          <div class='djqwdwqdqw'>
            <span class='comdqwdwq'>${comment.comment}</span>
            <span class='comdqwdwq'>[${comment.date}]</span>
          </div>
      `,
      )
      .join('');
    console.log(textEl);
    commentDisplayEl.innerHTML = textEl;
  } else {
    commentDisplayEl.innerHTML = `<p>등록된 회고가 없습니다</p>`;
  }
};

getParams();

const onEditCancel = () => {
  isEdit = !isEdit;

  if (isEdit) {
    detailUpdateBtnEl.style.display = 'none';
    detailDeleteBtnEl.style.display = 'none';
    detailIsEditBtnEl.style.display = 'flex';

    detailTitleEl.style.display = 'none';
    detailBodyEl.style.display = 'none';

    detailTitleInputEl.style.display = 'flex';
    detailBodyInputEl.style.display = 'flex';

    detailTitleInputEl.value = detailTitleEl.innerText;
    detailBodyInputEl.value = detailBodyEl.innerText;
  } else if (!isEdit) {
    detailUpdateBtnEl.style.display = 'block';
    detailDeleteBtnEl.style.display = 'block';
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
    detailUpdateBtnEl.style.display = 'none';
    detailDeleteBtnEl.style.display = 'none';
    detailIsEditBtnEl.style.display = 'flex';

    detailTitleEl.style.display = 'none';
    detailBodyEl.style.display = 'none';

    detailTitleInputEl.style.display = 'flex';
    detailBodyInputEl.style.display = 'flex';

    detailTitleInputEl.value = detailTitleEl.innerText;
    detailBodyInputEl.value = detailBodyEl.innerText;
    const calcH = detailBodyEl.innerText.length / 25;
    detailBodyInputEl.rows = calcH;
    detailUpdateBtnEl.classList.remove('test');
    detailDeleteBtnEl.classList.remove('test');
  } else if (!isEdit) {
    detailUpdateBtnEl.style.display = 'block';
    detailDeleteBtnEl.style.display = 'block';
    detailIsEditBtnEl.style.display = 'none';
    detailTitleEl.style.display = 'flex';
    detailBodyEl.style.display = 'flex';
    detailTitleInputEl.style.display = 'none';
    detailBodyInputEl.style.display = 'none';

    detailTitleEl.innerText = detailTitleInputEl.value;
    detailBodyEl.innerText = detailBodyInputEl.value;
    detailUpdateBtnEl.classList.add('test');
  }
};

detailUpdateBtnEl.addEventListener('click', onEditBtn);
detailIsEditCancelBtnEl.addEventListener('click', onEditCancel);
detailIsEditSaveBtnEl.addEventListener('click', onEditBtn);

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
  const textToCopy = `${detailBodyEl.innerText}`;
  await navigator.clipboard.writeText(textToCopy);
  onToast('내용이 복사되었습니다.');
};

textCopyEl.addEventListener('click', copyText);

detailDeleteBtnEl.addEventListener('click', handleDeleteDiaryDetail);
