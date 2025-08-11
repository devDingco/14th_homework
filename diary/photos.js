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


document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomSelect();

    getImages()
});

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
        customSelect.classList.toggle('open');
    });

    // 옵션 선택
    optionItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = item.dataset.value;
            const text = item.textContent;
                        
            // 선택된 텍스트 업데이트
            selectedText.textContent = text;
            
            // active 클래스 제거 후 선택된 항목에 추가
            optionItems.forEach(opt => opt.classList.remove('active'));
            item.classList.add('active');
            
            // 드롭다운 닫기
            customSelect.classList.remove('open');
            onClickSelect(value);
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
}

function onClickSelect(value) {
    const photo = document.querySelectorAll('.photos_item_image')
    if(value === 'default') {
        photo.forEach(item =>{
            item.style.aspectRatio = '1/1'
        })
    } else if (value === "row") {
        photo.forEach(item => {
            item.style.aspectRatio = '4/3'
        })
    } else {
        photo.forEach( item => {
            item.style.aspectRatio = '3/4'
        })
    }
}

async function getImages() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/5')
    const data = await response.json()
    const images = data.message
    console.log(images)

    images.forEach(image => {
        const photosItem = document.createElement('div')
        photosItem.classList.add('photos_item')
        photosItem.innerHTML = `<img src="${image}" alt="sampleImage" class="photos_item_image">`
        document.querySelector('.photos_contents').appendChild(photosItem)
    })
}

function infiniteScroll() {
    const isScrollEnded = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;
    if(isScrollEnded) {
        getImages()
    }
}
// 출처: https://dmswl98-dev.tistory.com/entry/Vanilla-Javascript-무한-스크롤infinite-scroll-구현하기

window.addEventListener('scroll', infiniteScroll)


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