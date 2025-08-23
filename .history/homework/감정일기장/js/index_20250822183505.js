// 1단계: 페이지가 다 로드되면 실행하기 (HTML, CSS 등 모든 요소가 준비된 후 JavaScript 실행)
document.addEventListener('DOMContentLoaded', function () {
  // 2단계: HTML 요소들 찾아서 변수에 저장 (모든 요소를 변수로 만들기)
  const titleInput = document.getElementById('titleInput'); // 제목 입력창
  const textInput = document.getElementById('textInput'); // 내용 입력창
  const submitBtn = document.getElementById('submitBtn'); // 등록 버튼
  const scrollBtn = document.getElementById('scrollTopBtn');
  const footer = document.querySelector('footer');

  // 버튼들
  const 일기보관함버튼 = document.getElementById('일기보관함버튼');
  const 사진보관함버튼 = document.getElementById('사진보관함버튼');

  // 일기보관함 버튼 클릭하면 일기카드 보이기
  일기보관함버튼.addEventListener('click', function () {
    const diaryListContainer = document.getElementById('diaryList');
    diaryListContainer.innerHTML = '';
    diaryList.map((일기) => 일기를화면에그리기(일기));
  });

  // 사진보관함 버튼 클릭하면 사진보관함 보이기
  사진보관함버튼.addEventListener('click', function () {
    const diaryListContainer = document.getElementById('diaryList');
    diaryListContainer.innerHTML =
      '<p style="text-align: center; font-size: 18px; color: #999; margin-top: 50px;">사진보관함은 준비중입니다.</p>';
  });
  const 모달열기버튼 = document.getElementById('모달열기버튼');
  const 모달닫기버튼 = document.getElementById('모달닫기버튼');
  const 모달확인버튼 = document.getElementById('모달확인버튼');
  const 모달계속작성버튼 = document.getElementById('모달계속작성버튼');
  const 모달등록취소버튼 = document.getElementById('모달등록취소버튼');
  const 인덱스모달삭제버튼 = document.getElementById('인덱스모달삭제버튼');
  const 인덱스모달삭제취소버튼 =
    document.getElementById('인덱스모달삭제취소버튼');

  // 모달들
  const 일기쓰기모달 = document.getElementById('모달등록');
  const 등록완료모달 = document.getElementById('등록완료모달');
  const 등록취소모달 = document.getElementById('등록취소모달');
  const 일기삭제확인모달 = document.getElementById('일기삭제확인모달');

  // 배경들
  const 모달배경 = document.getElementById('모달배경');

  // 강아지불러오기

  // 모달 열기/닫기 함수 (실제 요소를 받는 방식으로 변경)
  function 모달열기(모달요소) {
    모달요소.style.display = 'block';
  }

  function 모달닫기(모달요소) {
    모달요소.style.display = 'none';
  }

  // 1. 일기쓰기 버튼 클릭 → 일기쓰기 모달 열기
  모달열기버튼.addEventListener('click', function () {
    모달열기(일기쓰기모달);
  });

  // 2. 배경 클릭 → 일기쓰기 모달 닫기
  모달배경.addEventListener('click', function () {
    모달닫기(일기쓰기모달);
  });

  // 3. 닫기 버튼 클릭 → 등록취소 확인 모달 열기
  모달닫기버튼.addEventListener('click', function () {
    모달닫기(일기쓰기모달); // 일기쓰기 모달 먼저 닫기
    모달열기(등록취소모달); // 등록취소 확인 모달 열기
  });

  // 4. 등록완료모달의 확인 버튼 - 모든 모달 닫기
  모달확인버튼.addEventListener('click', function () {
    모달닫기(등록완료모달);
    모달닫기(일기쓰기모달); // 뒤에 있던 일기쓰기 모달도 닫기
    // 입력창 초기화
    titleInput.value = '';
    textInput.value = '';
    // 라디오 버튼 초기화
    const 라디오버튼들 = document.querySelectorAll('input[name="mood"]');
    라디오버튼들.forEach((radio) => (radio.checked = false));
  });

  // 5. 등록취소모달의 "계속 작성" 버튼
  모달계속작성버튼.addEventListener('click', function () {
    모달닫기(등록취소모달); // 등록취소 모달 닫기
    모달열기(일기쓰기모달); // 일기쓰기 모달 다시 열기
  });

  // 6. 등록취소모달의 "등록 취소" 버튼
  모달등록취소버튼.addEventListener('click', function () {
    모달닫기(등록취소모달); // 등록취소 모달 닫기
    // 입력창 초기화
    titleInput.value = '';
    textInput.value = '';
    // 라디오 버튼 초기화
    const 라디오버튼들 = document.querySelectorAll('input[name="mood"]');
    라디오버튼들.forEach((radio) => (radio.checked = false));
  });

  // 7. 일기삭제확인모달의 "삭제" 버튼
  인덱스모달삭제버튼.addEventListener('click', function () {
    // 임시 저장된 일기 정보로 삭제 실행
    if (삭제할일기정보) {
      일기삭제하기(삭제할일기정보.title, 삭제할일기정보.date);
      삭제할일기정보 = null; // 임시 정보 초기화
    }
    모달닫기(일기삭제확인모달); // 모달 닫기
  });

  // 8. 일기삭제확인모달의 "취소" 버튼
  인덱스모달삭제취소버튼.addEventListener('click', function () {
    삭제할일기정보 = null; // 임시 정보 초기화
    모달닫기(일기삭제확인모달); // 모달만 닫기
  });

  const 스크롤올리기 = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const 푸터체크 = () => {
    const footerTop = footer.offsetTop; // 푸터 시작 위치
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // 화면 아래쪽이 (푸터위치 - 40px)에 도달하면
    if (scrollY + windowHeight >= footerTop + 40) {
      // 버튼을 푸터 위 40px 위치에 고정
      scrollBtn.style.position = 'absolute';
      scrollBtn.style.top = footerTop - 70 + 'px'; // 푸터에서 70px 위
      scrollBtn.style.bottom = 'auto';
    } else {
      // 평소에는 화면에 고정
      scrollBtn.style.position = 'fixed';
      scrollBtn.style.bottom = '30px';
      scrollBtn.style.top = 'auto';
    }
  };

  scrollBtn.addEventListener('click', 스크롤올리기);
  window.addEventListener('scroll', 푸터체크);

  // 3단계: 일기들을 저장할 빈 배열 만들기 (모든 일기 데이터가 여기에 저장됨)
  let diaryList = [];

  // 삭제할 일기 정보를 임시로 저장하는 변수
  let 삭제할일기정보 = null;

  // 삭제 함수 - 제목과 날짜로 구분 (같은 제목 문제 해결)
  function 일기삭제하기(삭제할제목, 삭제할날짜) {
    // 제목과 날짜 둘 다 일치하는 일기만 삭제
    diaryList = diaryList.filter(
      (일기) => !(일기.title === 삭제할제목 && 일기.date === 삭제할날짜)
    );
    // localStorage에 저장
    localStorage.setItem('저장된일기', JSON.stringify(diaryList));

    // 새로고침 대신 화면만 다시 그리기
    const diaryListContainer = document.getElementById('diaryList');
    diaryListContainer.innerHTML = ''; // 기존 카드들 모두 지우기

    // 남은 일기들 다시 그리기
    diaryList.map((일기) => {
      일기를화면에그리기(일기);
    });
  }

  // 삭제 모달을 여는 함수 (X 버튼 클릭시 호출)
  function 삭제모달열기(삭제할제목, 삭제할날짜) {
    // 삭제할 일기 정보를 임시 저장
    삭제할일기정보 = { title: 삭제할제목, date: 삭제할날짜 };
    // 삭제 확인 모달 열기
    모달열기(일기삭제확인모달);
  }
  window.삭제모달열기 = 삭제모달열기;
  window.일기삭제하기 = 일기삭제하기;

  // 공통 함수: 일기를 화면에 그리는 함수 (중복 코드를 줄이기 위해 함수로 만듦)
  function 일기를화면에그리기(일기데이터) {
    // 감정 텍스트에 따라 어떤 이미지를 보여줄지 정하는 객체
    const 이미지맵 = {
      행복해요: 'main4.png',
      슬퍼요: 'main1.png',
      화나요: 'main3.png',
      놀랐어요: 'main2.png',
      기타: 'main5.png',
    };

    // 일기의 감정에 맞는 이미지 파일명 가져오기
    const 일기이미지 = 이미지맵[일기데이터.emotion];

    // 일기가 들어갈 HTML 컨테이너 찾기
    const diaryListContainer = document.getElementById('diaryList');

    // 새로운 일기 카드를 위한 div 요소 생성 (중요: 이벤트 추가 전에 먼저 생성!)
    const 새일기 = document.createElement('div');

    // 일기 카드의 HTML 내용 설정 (제목과 날짜 둘 다 전달)
    새일기.innerHTML = `
  <div class='diaryCard'> 
  <div class="image-container">
    <img src="./assets/images/${일기이미지}" alt="" />
    <button class="delete-btn" onclick="event.stopPropagation();삭제모달열기('${
      일기데이터.title
    }', '${일기데이터.date}')">
      <img src="./assets/images/close icon.png" alt="삭제" class="delete-icon">
    </button>
  </div>
  <div class="title__text__main">
    <div class="title__text">
      <div class="title__happy">${일기데이터.emotion}</div>    
      <div>${
        일기데이터.displayDate || 일기데이터.date
      }</div>                            
    </div>
    <div>${일기데이터.title}</div>     
  </div>
</div>
  `;

    // 일기 카드를 클릭했을 때 실행할 이벤트 추가 (요소 생성 후에 이벤트 추가!)
    새일기.addEventListener('click', function () {
      // 클릭한 일기의 전체 정보를 localStorage에 저장 (detail.html에서 사용하기 위해)
      localStorage.setItem('선택된일기', JSON.stringify(일기데이터));
      // 상세 페이지로 이동
      location.href = './detail.html';
    });

    // 완성된 일기 카드를 화면에 추가
    diaryListContainer.appendChild(새일기);
  }

  // 4단계: 브라우저에 저장된 일기들 불러오기 (새로고침해도 일기가 남아있게 하기)
  const 저장 = localStorage.getItem('저장된일기'); // 브라우저 저장소에서 '저장된일기' 키로 데이터 가져오기
  if (저장) {
    // 저장된 데이터가 있다면 (null이 아니라면)
    diaryList = JSON.parse(저장); // 텍스트 형태의 데이터를 배열로 변환해서 diaryList에 저장
    console.log('불러온일기들', diaryList); // 콘솔에서 확인용

    // 5단계: 불러온 일기들을 하나씩 화면에 그리기 (반복문 사용)
    diaryList.map((각일기) => {
      console.log(각일기);
      일기를화면에그리기(각일기);
    });
  }

  // 6단계: 등록 버튼을 클릭했을 때 실행될 함수 설정
  submitBtn.addEventListener('click', function () {
    console.log('버튼이클릭됨'); // 버튼 클릭 확인용

    // 7단계: 사용자가 입력한 제목과 내용 가져오기
    const userTitle = titleInput.value; // 제목 입력창에서 입력된 값
    const userContent = textInput.value; // 내용 입력창에서 입력된 값

    // 8단계: 라디오 버튼에서 선택된 기분 알아내기
    let userEmotion = 'happy'; // 기본값은 행복으로 설정

    const 라디오버튼들 = document.querySelectorAll('input[name="mood"]');
    라디오버튼들.forEach((라디오) => {
      if (라디오.checked) {
        userEmotion = 라디오.id;
      }
    });

    // 9단계: 라디오 버튼의 영어 값을 한글 텍스트로 변환
    const 텍스트맵 = {
      happy: '행복해요', // 'happy' → '행복해요'
      sad: '슬퍼요', // 'sad' → '슬퍼요'
      angry: '화나요', // 'angry' → '화나요'
      surprised: '놀랐어요', // 'surprised' → '놀랐어요'
      other: '기타', // 'other' → '기타'
    };

    // 선택된 기분의 한글 텍스트 가져오기
    const 감정텍스트 = 텍스트맵[userEmotion];

    // 10단계: 입력받은 정보들로 일기 객체 만들기
    const diary = {
      title: userTitle, // 사용자가 입력한 제목
      content: userContent, // 사용자가 입력한 내용
      date: new Date().toLocaleString(), // 밀리초까지 포함한 날짜 (중복 방지)
      displayDate: new Date().toLocaleDateString(), // 화면에 보여줄 날짜 (시간 제외)
      emotion: 감정텍스트, // 선택된 감정의 한글 텍스트
    };

    // 11단계: 새로 만든 일기를 배열에 추가하고 브라우저에 저장하기
    diaryList.push(diary); // diaryList 배열 맨 뒤에 새 일기 추가
    localStorage.setItem('저장된일기', JSON.stringify(diaryList)); // 배열을 텍스트로 변환해서 브라우저에 저장

    // 12단계: 새로 등록한 일기를 화면에 즉시 보여주기
    일기를화면에그리기(diary); // 위에서 만든 함수를 호출해서 화면에 그리기

    console.log('새일기 추가완료'); // 완료 확인용

    // ⭐ 중요: 일기쓰기 모달은 닫지 않고, 등록완료 모달만 열기 (중첩 모달)
    모달열기(등록완료모달); // 등록완료 모달을 일기쓰기 모달 위에 열기
  });

  // 드롭다운 관련 코드 - 수정된 부분
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  // 페이지 로드 시 "전체" 항목 숨기기 (기본 선택된 상태이므로)
  const 전체항목 = document.querySelector('.dropdown-item[data-mood="전체"]');
  if (전체항목) {
    전체항목.style.display = 'none';
  }

  dropdownBtn.addEventListener('click', function () {
    const isOpen = dropdownMenu.style.display === 'block';

    if (isOpen) {
      // 닫기
      dropdownMenu.style.display = 'none';
      dropdownBtn.classList.remove('open'); // 클래스 제거 - 다시 둥글게
    } else {
      // 열기
      dropdownMenu.style.display = 'block';
      dropdownBtn.classList.add('open'); // 클래스 추가 - 위만 둥글게
    }
  });

  const dropdownItems = document.querySelectorAll('.dropdown-item');

  dropdownItems.forEach((item) => {
    item.addEventListener('click', function () {
      const selectedText = this.getAttribute('data-mood');

      dropdownBtn.textContent = selectedText;

      // 모든 드롭다운 아이템 다시 보이게 하기
      dropdownItems.forEach((dropdownItem) => {
        dropdownItem.style.display = 'block';
      });

      // 선택된 항목만 숨기기
      this.style.display = 'none';

      dropdownMenu.style.display = 'none';
      dropdownBtn.classList.remove('open');

      필터링하기(selectedText);
    });
  });

  // "전체"로 되돌아가는 기능 추가
  dropdownBtn.addEventListener('dblclick', function () {
    dropdownBtn.textContent = '전체';

    // 모든 드롭다운 아이템 다시 보이게 하기
    dropdownItems.forEach((dropdownItem) => {
      dropdownItem.style.display = 'block';
    });

    // "전체" 항목은 다시 숨기기
    if (전체항목) {
      전체항목.style.display = 'none';
    }

    필터링하기('전체');
  });

  // 필터링 함수는 밖으로 빼기
  function 필터링하기(선택된감정) {
    const diaryListContainer = document.getElementById('diaryList');
    diaryListContainer.innerHTML = '';

    if (선택된감정 === '전체') {
      diaryList.map((일기) => 일기를화면에그리기(일기));
    } else {
      diaryList.map((일기) => {
        if (일기.emotion === 선택된감정) {
          일기를화면에그리기(일기);
        }
      });
    }
  }

  // 드롭다운 외부 클릭 시 닫기 (추가 기능)
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.filter-dropdown')) {
      dropdownMenu.style.display = 'none';
      dropdownBtn.classList.remove('open');
    }
  });

  // ESC 키를 누르면 모든 모달 닫기
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      // 열린 모달들 모두 닫기
      모달닫기(일기쓰기모달);
      모달닫기(등록완료모달);
      모달닫기(등록취소모달);
      모달닫기(일기삭제확인모달);
      // 삭제할 일기 정보도 초기화
      삭제할일기정보 = null;
    }
  });
});
