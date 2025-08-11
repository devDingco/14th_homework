// 전역 변수들
// 테마
let currentTheme = 'light';

// 일기 데이터
let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
let currentDisplayData = data; // 현재 표시할 데이터

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
            
            // "전체" 선택 시 필터링 제거
            if (value === 'all') {
                currentDisplayData = data;
            } else {
                // 영어 value를 한국어 feeling으로 매핑
                const feelingMap = {
                    'happy': '행복해요',
                    'sad': '슬퍼요',
                    'surprised': '놀랐어요',
                    'angry': '화나요',
                    'etc': '기타'
                };
                
                const koreanValue = feelingMap[value];
                currentDisplayData = data.filter(item => item.feeling === koreanValue);
            }
            
            // 필터링된 데이터에 맞게 페이지네이션 재계산
            const filteredTotalPages = Math.ceil(currentDisplayData.length / perPage);
            
            // 페이지네이션 UI 재생성
            const paginationWrapper = document.querySelector('.number_wrapper');
            paginationWrapper.innerHTML = ''; // 기존 페이지 번호 제거
            
            for (let i = 1; i <= filteredTotalPages; i++) {
                const paginationItem = document.createElement('span');
                paginationItem.classList.add('pagination_item');
                paginationItem.textContent = i;
                paginationItem.addEventListener('click', () => onClickPagination(i));
                
                // 첫 번째 페이지에 active 클래스 추가
                if (i === 1) {
                    paginationItem.classList.add('active');
                }
                
                paginationWrapper.appendChild(paginationItem);
            }
            
            // 페이지네이션 초기화
            currentPage = 1;
            
            // 화살표 상태 업데이트 (필터링된 페이지 수 기준)
            updateArrowStates(filteredTotalPages);
            
            // 필터링된 데이터 렌더링
            renderDiaries(currentDisplayData);

        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
}

// 페이지네이션 기능함수
// todo
// 1. 한페이지 12개씩 들어가게 세팅
// 2. 총 페이지수 계산 후 페이지네이션 버튼 활성화/비활성화
// 3. 페이지네이션 클릭시 해당 페이지의 일기만 보여주기

// 한페이지 12개씩 들어가게 세팅
const perPage = 12;
const totalPages = Math.ceil(data.length / perPage);
let currentPage = 1;

// totalpages 만큼 페이지네이션 버튼 생성
function setPagination() {
    const paginationWrapper = document.querySelector('.number_wrapper')
    const paginationArrows = document.querySelectorAll('.pagination_arrow')
    
    // 데이터가 12개 이하이면 화살표 비활성화
    if (data.length < 12) {
        paginationArrows.forEach(arrow => {
            arrow.style.display = 'none';
        });
    } else {
        paginationArrows.forEach(arrow => {
            arrow.style.display = 'flex';
        });
    }

    // 현재 페이지가 1페이지라면 왼쪽 화살표 비활성화
    if (currentPage === 1) {
        document.getElementById('arrow-left').classList.add('disabled');
        document.getElementById('arrow-left').removeEventListener('click', () => onClickArrow('left'));
    } else {
        document.getElementById('arrow-left').classList.remove('disabled');
        document.getElementById('arrow-left').addEventListener('click', () => onClickArrow('left'));
    }

    // 현재 페이지가 마지막 페이지라면 오른쪽 화살표 비활성화
    if (currentPage === totalPages) {
        document.getElementById('arrow-right').classList.add('disabled');
        document.getElementById('arrow-right').removeEventListener('click', () => onClickArrow('right'));
    } else {
        document.getElementById('arrow-right').classList.remove('disabled');
        document.getElementById('arrow-right').addEventListener('click', () => onClickArrow('right'));
    }

    for (let i = 1; i <= totalPages; i++) {
        const paginationItem = document.createElement('span');
        paginationItem.classList.add('pagination_item');
        paginationItem.textContent = i;
        paginationItem.addEventListener('click', () => onClickPagination(i));
        
        // 첫 번째 페이지에 active 클래스 추가
        if (i === 1 && data.length > 0) {
            paginationItem.classList.add('active');
        }
        
        paginationWrapper.appendChild(paginationItem);
    }
    
    // 초기 화살표 상태 설정
    updateArrowStates();
}

function onClickPagination(pageNum) {
    console.log('클릭한 페이지:', pageNum);
    // 현재 페이지 업데이트
    currentPage = pageNum;
    
    // 페이지네이션 UI 업데이트 (active 클래스 변경)
    document.querySelectorAll('.pagination_item').forEach(item => {
        item.classList.remove('active');
    });
    // 클릭한 페이지에 active 클래스 추가
    const targetPageItem = document.querySelector(`.pagination_item:nth-child(${pageNum})`);
    if (targetPageItem) {
        targetPageItem.classList.add('active');
    }
    
    // 화살표 상태 업데이트
    updateArrowStates();
    
    // 페이지별 데이터 생성 및 렌더링
    currentDisplayData = data.slice((pageNum - 1) * perPage, pageNum * perPage);
    renderDiaries(currentDisplayData);
}

// 화살표 상태 업데이트 함수
function updateArrowStates(customTotalPages = null) {
    const totalPagesToUse = customTotalPages || totalPages;
    
    // 현재 페이지가 1페이지라면 왼쪽 화살표 비활성화
    if (currentPage === 1) {
        document.getElementById('arrow-left').classList.add('disabled');
    } else {
        document.getElementById('arrow-left').classList.remove('disabled');
    }

    // 현재 페이지가 마지막 페이지라면 오른쪽 화살표 비활성화
    if (currentPage === totalPagesToUse) {
        document.getElementById('arrow-right').classList.add('disabled');
    } else {
        document.getElementById('arrow-right').classList.remove('disabled');
    }
}

function onClickArrow(arrow) {
    if (arrow === 'left') {
        currentPage = 1;
        onClickPagination(currentPage);
        console.log('현재 페이지 번호', currentPage);
    } else {
        currentPage = totalPages;
        onClickPagination(currentPage);
    }
}

// 통합된 렌더링 함수
function renderDiaries(dataToRender) {
    const cardSection = document.querySelector('.card_section');
    cardSection.innerHTML = ''; // 기존 카드 제거
    
    if (dataToRender.length === 0) {
        document.querySelector('.card_section_empty').style.display = 'block';
        return;
    }
    
    document.querySelector('.card_section_empty').style.display = 'none';
    
    const diaryCards = dataToRender.map((item, index) => {
        const feelingColor = getFeelingColor(item.feeling);
        const diaryCard = document.createElement('a');
        diaryCard.href = `detail.html?id=${data.indexOf(item)}`; // 전체 데이터에서의 인덱스
        diaryCard.classList.add('card_item');
        diaryCard.innerHTML = `
            <div class="card_item_image" style="background-image: url(${item.image}) ; background-size: cover; background-position: center; background-repeat: no-repeat;">
            </div>
            <img src="./public/icons/close icon.svg" alt="close_icon" class="close_icon" onclick="onClickDelete(${data.indexOf(item)}, event)">
            <div class="card_item_content">
                <div class="card_item_top">
                    <span class="card_item_feeling" style="color: ${feelingColor}">${item.feeling}</span>
                    <span class="card_item_date">${item.date}</span>
                </div>
                <div class="card_item_title">${item.title}</div>
            </div>
        `;
        return diaryCard;
    });
    
    // 생성된 카드들을 한 번에 추가
    diaryCards.forEach(card => cardSection.appendChild(card));
}

// todo2
// 셀렉트바 값에 따른 데이터 sort 기능
// 1. 현재 셀렉트 값을 전역변수로 설정  - selectedValue
// 2. 전역변수 값에 따라 데이터 sort 함수 실행
// 3. sort 된 데이터를 이벤트리스너에서 map


// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomSelect();
    setPagination();

    // 첫 페이지 데이터로 초기 렌더링
    currentDisplayData = data.slice(0, perPage);
    renderDiaries(currentDisplayData);

    // 입력 필드 이벤트 리스너 추가
    document.getElementById('diary_title').addEventListener('input', checkInputs);
    document.getElementById('diary_content').addEventListener('input', checkInputs);
    
    // 라디오 버튼 이벤트 리스너 추가
    const radioButtons = document.querySelectorAll('input[name="feeling"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', checkInputs);
    });

});


// 일기쓰기 모달 열기
function onClickOpenModal() {
    document.getElementById('modal').classList.add("open")
}
function onClickCloseModal() {
    onClickCloseCancelModal()
    resetInputFields();
}

// 일기 등록후 확인모달 열기
function onClickOpenConfirmModal() {
    document.getElementById('confirm_modal').classList.add("open")
}
function onClickCloseConfirmModal() {
    document.getElementById('confirm_modal').classList.remove("open")
    document.getElementById('modal').classList.remove("open")
    resetInputFields();
}

// 일기 쓰기 취소 모달 열기
function onClickOpenCancelModal() {
    document.getElementById('cancel_modal').classList.add("open")
}

// 입력 필드 초기화 함수
function resetInputFields() {
    document.getElementById('diary_title').value = '';
    document.getElementById('diary_content').value = '';
    
    // 라디오 버튼 초기화
    const radioButtons = document.querySelectorAll('input[name="feeling"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // 버튼 비활성화
    checkInputs();
}

// 일기쓰기 취소시 중첩모달 모두 닫기 입력필드도 초기화
function onClickCancelWriting() {
    document.getElementById('cancel_modal').classList.remove("open")
    document.getElementById('modal').classList.remove("open")
    resetInputFields();
}

// 일기쓰기 취소 모달 open시 취소 모달만 닫기
function onClickCloseCancelModal() {
    document.getElementById('cancel_modal').classList.remove("open")
}



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

// feeling이미지 저장용 함수 (작은 이미지)
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

// 입력값 감지 함수
function checkInputs() {
    const diaryTitle = document.getElementById('diary_title').value;
    const diaryContent = document.getElementById('diary_content').value;
    const feelingData = document.querySelector('input[name="feeling"]:checked');
    const registerButton = document.getElementById('register_button');
    
    if(diaryTitle && diaryContent && feelingData) {
        registerButton.disabled = false;
        registerButton.classList.add('active');
    } else {
        registerButton.disabled = true;
        registerButton.classList.remove('active');
    }
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

    data.push({ 
        title: diaryTitle,
        content: diaryContent,
        date: diaryDate,
        feeling: feeling,
        image: getFeelingImage(feeling),
        smallImage: saveSmallImage(feeling)
    });

    localStorage.setItem('data', JSON.stringify(data));

    // 현재 페이지에 맞게 데이터 업데이트 및 렌더링
    currentDisplayData = data.slice((currentPage - 1) * perPage, currentPage * perPage);
    renderDiaries(currentDisplayData);
    
    // 입력 필드 초기화
    document.getElementById('diary_title').value = '';
    document.getElementById('diary_content').value = '';
    feelingData.checked = false;

    checkInputs();
    
    onClickOpenConfirmModal();
}

// 일기 삭제 함수 (모달 열기)
function onClickDelete(id, event) {
    event.preventDefault();
    event.stopPropagation();
    // 모달의 삭제 버튼에 ID 설정
    const deleteButton = document.querySelector('#delete_modal .active');
    deleteButton.onclick = () => onClickConfirmDelete(id);
    document.getElementById('delete_modal').classList.add("open");
}

// 모달 닫기
function onClickCloseDeleteModal() {
    document.getElementById('delete_modal').classList.remove("open");
}

// 실제 삭제 실행
function onClickConfirmDelete(id) {
    data.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    window.location.href = 'index.html';
}