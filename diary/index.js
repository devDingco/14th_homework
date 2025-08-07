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

// 커스텀 드롭다운 기능
function initCustomSelect() {
    const customSelect = document.querySelector('.custom_select');
    const selectTrigger = document.querySelector('.select_trigger');
    const optionItems = document.querySelectorAll('.option_item');
    const selectedText = document.querySelector('.selected_text');

    if (!customSelect || !selectTrigger) {
        console.error('셀렉트박스 요소를 찾을 수 없습니다!');
        return;
    }

    // 드롭다운 열기/닫기
    selectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('셀렉트박스 클릭됨');
        customSelect.classList.toggle('open');
        console.log('open 클래스 토글됨:', customSelect.classList.contains('open'));
    });

    // 옵션 선택
    optionItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = item.dataset.value;
            const text = item.textContent;
            
            console.log('옵션 선택됨:', { value, text });
            
            // 선택된 텍스트 업데이트
            selectedText.textContent = text;
            
            // active 클래스 제거 후 선택된 항목에 추가
            optionItems.forEach(opt => opt.classList.remove('active'));
            item.classList.add('active');
            
            // 드롭다운 닫기
            customSelect.classList.remove('open');
            
            console.log('선택된 값:', value);
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomSelect();
});


// 일기쓰기 로직

// feeling 값에 따른 이미지 함수
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

// feeling 색상 변경 함수 관리 함수
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

// 일기 등록 함수
function onClickRegisterButton() {
    const diaryTitle = document.getElementById('diary_title').value;
    const diaryContent = document.getElementById('diary_content').value;
    const diaryDate = new Date().toLocaleDateString();
    const feelingData = document.querySelector('input[name="feeling"]:checked');
    
    if (!feelingData) {
        alert('기분을 선택해주세요.');
        return;
    }
    if (diaryTitle === '') {
        alert('제목을 입력해주세요.');
        return;
    }
    if(diaryContent === '') {
        alert('내용을 입력해주세요.');
        return;
    }

    const feeling = feelingData.value;


    const cardSection = document.querySelector('.card_section');

    const diaryCard = document.createElement('div');
    diaryCard.classList.add('card_item');
    
    console.log('일기 생성 완료')
    // diaryCard.style.backgroundImage = `url(${getFeelingImage(feeling)})`;
    // diaryCard.style.backgroundSize = 'cover';
    // diaryCard.style.backgroundPosition = 'center';
    // diaryCard.style.backgroundRepeat = 'no-repeat';
    diaryCard.style.borderRadius = '16px';
    // diaryCard.style.height = '357px';

    diaryCard.innerHTML = `
        <div class="card_item_image" style="background-image: url(${getFeelingImage(feeling)}) ; background-size: cover; background-position: center; background-repeat: no-repeat;">
            <img src="./public/icons/close icon.svg" alt="close_icon" class="close_icon">
        </div>
        <div class="card_item_content">
            <div class="card_item_top">
                <span class="card_item_feeling" style="color: ${getFeelingColor(feeling)}">${feeling}</span>
                <span class="card_item_date">${diaryDate}</span>
            </div>
            <div class="card_item_title">${diaryTitle}</div>
        </div>
    `;

    cardSection.appendChild(diaryCard);

    // 카드 클릭 이벤트 추가
    diaryCard.addEventListener('click', () => {
        alert(`
            제목: ${diaryTitle}
            기분: ${feeling}
            내용: ${diaryContent}
            날짜: ${diaryDate}
        `);
    });
    
    // 입력 필드 초기화
    diaryTitle.value = '';
    diaryContent.value = '';
    feeling.checked = false;
}