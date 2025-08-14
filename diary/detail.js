// 전역 변수들
let currentTheme = 'light';

// 저장된 테마 가져오기
function getStoredTheme() {
    return localStorage.getItem('theme');
}

// 시스템 테마 감지
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 테마 설정
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
}

// 테마 토글
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// 테마 초기화
function initTheme() {
    currentTheme = getStoredTheme() || getSystemTheme();
    setTheme(currentTheme);
    
    // 토글 버튼 이벤트 리스너
    const themeToggle = document.querySelector('.theme_toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// 다이어리 데이터 가져오기
const id = new URLSearchParams(window.location.search).get('id');
console.log(id);

const diary = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
const diaryDetail = diary[id];
console.log(diaryDetail);

// 다이어리 데이터 표시
function displayDiaryDetail() {
    if (!diaryDetail) {
        console.error('다이어리 데이터를 찾을 수 없습니다.');
        return;
    }

    // 제목 표시
    const titleElement = document.querySelector('.detail_title');
    if (titleElement) {
        titleElement.textContent = diaryDetail.title;
    }

    // 기분 표시
    const feelingElement = document.querySelector('.detail_feeling_section span:last-child');
    if (feelingElement) {
        feelingElement.textContent = diaryDetail.feeling;
    }

    // 날짜 표시
    const dateElement = document.querySelector('.detail_date span:first-child');
    if (dateElement) {
        dateElement.textContent = diaryDetail.date;
    }

    // 내용 표시
    const contentElement = document.querySelector('.detail_content_text');
    if (contentElement) {
        contentElement.textContent = diaryDetail.content;
    }
}

// feeling 값에 따른 이미지 함수 (큰 이미지)
function getFeelingImage(feeling) {
    const image = {
        '행복해요': './public/images/happy_image.png',
        '슬퍼요': './public/images/sad_image.png',
        '놀랐어요': './public/images/wow_image.png',
        '화나요': './public/images/anger_image.png',
        '기타': './public/images/etc_image.png'
    };
    
    return image[feeling];
}

// feeling 이미지 저장용 함수 (작은 이미지)
function saveSmallImage(feeling) {
    const image = {
        '행복해요': './public/images/happy_small.png',
        '슬퍼요': './public/images/sad_small.png',
        '놀랐어요': './public/images/wow_small.png',
        '화나요': './public/images/anger_small.png',
        '기타': './public/images/etc_small.png'
    };
    
    return image[feeling];
}

// feeling 색상 변경 함수
function getFeelingColor(feeling) {
    const color = {
        '행복해요': '#EA5757',
        '슬퍼요': '#28B4E1',
        '놀랐어요': '#D59029',
        '화나요': '#777',
        '기타': '#A229ED'
    };
    
    return color[feeling];
}

// 기분 폰트 색상 변경 함수 (기존 함수와 동일하지만 getFeelingColor 사용)
function changeFeelingColor(feeling) {
    return getFeelingColor(feeling);
}
// 기분 텍스트 변경
function changeFeelingText(feeling) {
    const text = document.querySelector('.detail_feeling_text');
    if (text) {
        text.style.color = changeFeelingColor(feeling);
        text.textContent = diaryDetail.feeling;
    }
}

// 내용 수정 로직
// 수정 화면 open
function openEditBox() {
    document.querySelector(".original_wrapper").style.display="none"
    document.querySelector(".detail_edit_wrapper").style.display="flex"
    document.querySelector(".detail_review_input_area").classList.add('disabled')

    document.querySelector(".detail_review_input_area").style.display='none'
    document.querySelector(".detail_review_input_area_disabled").style.display='flex'

    bindDataToEditForm()
}
// 수정화면 close
function closeEditBox() {
    document.querySelector(".original_wrapper").style.display="block"
    document.querySelector(".detail_edit_wrapper").style.display="none"

    document.querySelector(".detail_review_input_area").style.display='flex'
    document.querySelector(".detail_review_input_area_disabled").style.display='none'
}

// 수정시 내용 바인딩
function bindDataToEditForm() {
    if (!diaryDetail) return;
    
    // 제목 바인딩
    const editTitleInput = document.getElementById('edit_diary_title');
    if (editTitleInput) {
        editTitleInput.value = diaryDetail.title;
    }
    
    // 내용 바인딩
    const editContentTextarea = document.getElementById('edit_diary_content');
    if (editContentTextarea) {
        editContentTextarea.value = diaryDetail.content;
    }
    
    // 기분 라디오 버튼 바인딩 (name="feeling" 사용)
    const feelingRadios = document.querySelectorAll('input[name="feeling"]');
    feelingRadios.forEach(radio => {
        if (radio.value === diaryDetail.feeling) {
            radio.checked = true;
        }
    });
}

// 수정 완료 버튼 클릭
function completeEdit() {
    // 편집 폼에서 데이터 가져오기
    const editTitle = document.getElementById('edit_diary_title').value;
    const editContent = document.getElementById('edit_diary_content').value;
    const editFeeling = document.querySelector('input[name="feeling"]:checked');
    
    // 유효성 검사
    if (!editFeeling) {
        alert('기분을 선택해주세요.');
        return;
    }
    if (editTitle === '') {
        alert('제목을 입력해주세요.');
        return;
    }
    if (editContent === '') {
        alert('내용을 입력해주세요.');
        return;
    }
    
    // diaryDetail 데이터 업데이트
    diaryDetail.title = editTitle;
    diaryDetail.content = editContent;
    diaryDetail.feeling = editFeeling.value;
    diaryDetail.image = saveSmallImage(editFeeling.value); // 새로운 이미지 경로
    
    // localStorage 업데이트
    const diary = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    const id = new URLSearchParams(window.location.search).get('id');
    diary[id] = diaryDetail;
    localStorage.setItem('data', JSON.stringify(diary));
    
    // 화면 업데이트
    updateDisplay();
    
    // 편집 모드 종료
    closeEditBox();
}

//화면 업데이트 함수
function updateDisplay() {
    // 제목 업데이트
    const titleElement = document.querySelector('.detail_title');
    if (titleElement) {
        titleElement.textContent = diaryDetail.title;
    }
    
    // 내용 업데이트
    const contentElement = document.querySelector('.detail_content_text');
    if (contentElement) {
        contentElement.textContent = diaryDetail.content;
    }
    
    // 기분 텍스트 업데이트
    const feelingTextElement = document.querySelector('.detail_feeling_text');
    if (feelingTextElement) {
        feelingTextElement.textContent = diaryDetail.feeling;
        feelingTextElement.style.color = getFeelingColor(diaryDetail.feeling);
    }
    
    // 기분 이미지 업데이트
    const feelingImageElement = document.querySelector('.detail_feeling_image');
    if (feelingImageElement) {
        feelingImageElement.style.backgroundImage = `url(${diaryDetail.image})`;
    }
}

// 내용 복사 로직
function showToast(message) {
    const toast = document.getElementById('toast-message');
    const toastText = toast.querySelector('.toast-text');
    
    toastText.textContent = message;
    toast.classList.add('show');
    
    // 3초 후 숨기기
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function onClickCopyButton() {
    const content = document.querySelector('.detail_content_text').textContent;
    
    navigator.clipboard.writeText(content).then(() => {
        showToast('내용이 복사되었습니다.');
    });
    document.querySelector('.copy_text').textContent = '복사완료 !';
    setTimeout(() => {
        document.querySelector('.copy_text').textContent = '내용 복사';
    }, 2000);
}
// 삭제모달 로직
function onClickDeleteButton() {
    document.getElementById('cancel_modal').classList.add("open")
}
function onClickCloseModal() {
    document.getElementById('cancel_modal').classList.remove("open")
}
function onClickDelete() {
    const id = new URLSearchParams(window.location.search).get('id');
    diary.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(diary));
    window.location.href = 'index.html';
    // console.log(diary);
}

// 회고 로직
function onClickReview() {
    const reviewText = document.getElementById('review_input').value
    const date = new Date().toLocaleDateString();
    const today = date.replace(/\./g, '-').replace(/\s/g, '').replace(/-$/, '');
    // 월/일을 2자리로 만들기
    const parts = today.split('-');
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    if (reviewText) {
        document.querySelector(".detail_review_empty").style.display = "none"

        const newReview = document.createElement('div');
        newReview.className = 'detail_review';
        newReview.innerHTML = `
            <span class="detail_review_text">${reviewText}</span>
            <span class="detail_review_date">[${formattedToday}]</span>
        `;
        
        document.querySelector('.detail_review_list').appendChild(newReview);
        document.getElementById('review_input').value = '';
    } else {
        showToast("내용을 입력하세요!")
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    displayDiaryDetail();
    changeFeelingColor(diaryDetail.feeling);
    changeFeelingText(diaryDetail.feeling);
    document.querySelector('.detail_feeling_image').style.backgroundImage = `url(${diaryDetail.smallImage})`;

    document.querySelector('.detail_header_title_mobile').addEventListener('click', () => {
        window.history.back();
    });
});


// 탑 스크롤 버튼
function scrollToTop() {
    const topButton = document.getElementById('top_button');
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}