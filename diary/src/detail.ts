// 상세페이지

import { getLocalStorage, type TCard } from './storageControl';
import { switchTextColor } from './utils/switchTextColor';

const detailTitleEl = document.querySelector('.detail-title-label')! as HTMLSpanElement;
const detailBodyEl = document.querySelector('.detail-body')! as HTMLSpanElement;
const detailTitleInputEl = document.querySelector('.detail-title-input')! as HTMLInputElement;
const detailBodyInputEl = document.querySelector('.detail-body-input')! as HTMLInputElement;
const detailDateEl = document.querySelector('.detail-date')! as HTMLSpanElement;
const detailStateEl = document.querySelector('.detail-state')! as HTMLSpanElement;
const detailEditBtnEl = document.querySelector('.detail-footer-editBtn')! as HTMLSpanElement;
const detailIsEditBtnEl = document.querySelector('.detail-footer-isEdit')! as HTMLSpanElement;
const detailIsEditCancelBtnEl = document.querySelector('.detail-footer-isEdit-cancelBtn')! as HTMLSpanElement;
const detailIsEditSaveBtnEl = document.querySelector('.detail-footer-isEdit-saveBtn')! as HTMLSpanElement;

let isEdit = false;

const getParams = () => {
  const params = location.search;
  const diaryId = new URLSearchParams(params).get('id');

  const allData = getLocalStorage();
  const findOneData = allData.filter((diary: TCard) => diary.id == +diaryId!);

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
