import { fetchDogData } from './dataStorage';

const tabDiaryEl = document.querySelector('.tab_diary') as HTMLDivElement;
const tabimageEl = document.querySelector('.tab_image') as HTMLDivElement;

const diarySectionEl = document.querySelector('.section-main') as HTMLDivElement;
// const diarySectionsubEl = document.querySelector('.section-sub') as HTMLDivElement;
const imageSectionEl = document.querySelector('.section-image') as HTMLDivElement;
// const storageListEl = document.querySelector('.cardList') as HTMLDivElement;

const skeletonListEl = document.querySelector('.skeleton-list') as HTMLDivElement;

const dropdownDiaryEl = document.querySelector('.dropdown-diary') as HTMLDivElement;
const dropdownImageEl = document.querySelector('.dropdown-img') as HTMLDivElement;

// let currentActive: 'diary' | 'image' = 'diary';

const pictureBasic = document.querySelector('#basic') as HTMLLIElement;
const pictureHorizontal = document.querySelector('#horizontal') as HTMLLIElement;
const pictureVertical = document.querySelector('#vertical') as HTMLLIElement;

const tabDiary = () => {
  tabDiaryEl.classList.add('activeMenu');
  tabimageEl.classList.remove('activeMenu');
  diarySectionEl.style = 'display: flex;';
  imageSectionEl.style = 'display: none;';
  dropdownDiaryEl.style.display = 'flex';
  dropdownImageEl.style.display = 'none';
};

let dogData: string[] | undefined;

const displayImg = (dogData: string[], type?: string) => {
  const imgCard = document.createElement('img');

  if (type) {
    imgCard.classList.add(type);
  }

  dogData?.forEach((item: string) => {
    const imgClone = imgCard.cloneNode() as HTMLImageElement;
    imgClone.setAttribute('src', item);
    imageSectionEl.insertAdjacentElement('beforeend', imgClone);
  });
};

const tabImage = async (type: string) => {
  tabDiaryEl.classList.remove('activeMenu');
  tabimageEl.classList.add('activeMenu');
  diarySectionEl.style = 'display: none;';
  imageSectionEl.style = 'display: flex;';
  dropdownDiaryEl.style.display = 'none';
  dropdownImageEl.style = 'display: flex;';
  dogData = await fetchDogData();
  // console.log(dogData);

  skeletonListEl.style = 'display: none;';

  imageSectionEl.innerHTML = '';
  displayImg(dogData, type);
};

// TODO
const mutateImageSection = (type: string) => {
  imageSectionEl.innerHTML = '';
  const imgCard = document.createElement('img');
  imgCard.classList.add(type);
  dogData?.forEach((item: string) => {
    const imgClone = imgCard.cloneNode() as HTMLImageElement;
    imgClone.setAttribute('src', item);
    imageSectionEl.insertAdjacentElement('beforeend', imgClone);
  });
};

tabDiaryEl?.addEventListener('click', tabDiary);
tabimageEl?.addEventListener('click', tabImage.bind(null, 'basic-ratio-1-1'));

pictureBasic.addEventListener('click', mutateImageSection.bind(null, 'basic-ratio-1-1'));
pictureHorizontal.addEventListener('click', mutateImageSection.bind(null, 'basic-ratio-4-3'));
pictureVertical.addEventListener('click', mutateImageSection.bind(null, 'basic-ratio-3-4'));

let delay: null | number = null;

const scrollFn = async () => {
  const all = document.documentElement.scrollHeight; // SCROLL_HEIGHT: 전체 높이
  const top = document.documentElement.scrollTop; // SCROLL_TOP: 내려온 높이
  const rest = document.documentElement.clientHeight; // CLIENT_HEIGHTs

  const scrollPer = top / (all - rest);

  if (scrollPer < 0.7) return;
  if (delay !== null) return;

  delay = setTimeout(async () => {
    const data = await fetchDogData();
    displayImg(data, 'basic-ratio-1-1');
    delay = null;

    if (Math.ceil(top + rest) >= all) {
      const data = await fetchDogData();
      displayImg(data, 'basic-ratio-1-1');
    }
  }, 1000);
};

window.addEventListener('scroll', scrollFn);
