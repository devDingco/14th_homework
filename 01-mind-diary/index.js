// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {
    // --- 변수 및 상수 그룹화 ---
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    let 삭제할일기 = null;

    // --- 페이지네이션 관련 변수 추가 ---
    let 현재페이지 = 1;
    const 페이지당항목수 = 12;
    // 페이지 번호 그룹화 관련 상수 및 변수
    const 페이지네이션_그룹_크기 = 10;
    let 현재_그룹_시작_페이지 = 1;

    // DOM 요소 선택
    const 카드목록 = document.querySelector(".카드목록");
    const 카드목록_offsetTop = 카드목록.offsetTop;
    const 기분필터 = document.querySelector("#기분필터");
    const 프로그레시브블러 = document.querySelector("#프로그레시브블러");
    const 제목텍스트 = document.querySelector('.일기텍스트 input[type="text"]');
    const 내용텍스트 = document.querySelector('.일기텍스트 textarea');
    const 기분라디오 = document.querySelectorAll('input[name="기분"]');
    const 등록하기버튼 = document.querySelector("#일기등록버튼");
    const 일기쓰기모달 = document.getElementById("일기쓰기모달");
    const 일기등록취소모달 = document.getElementById("일기등록취소모달");
    const 일기삭제확인모달 = document.getElementById("일기삭제확인모달");
    const 드롭다운버튼 = document.querySelector('.드롭다운-버튼');
    const 메뉴항목들 = document.querySelectorAll('.메뉴-항목');
    const 드롭다운토글 = document.getElementById('드롭다운-토글');
    const 일기검색입력 = document.querySelector("#일기검색입력");
    const 페이지네이션컨테이너 = document.querySelector("#페이지네이션컨테이너");

    let 삭제할일기 = null;

    // 모달관련기능
    const 모달열기 = (id) => {
        document.getElementById(id).style.display = "flex";
        document.body.classList.add("no-scroll");
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    const 모달닫기 = (id) => {
        document.getElementById(id).style.display = "none";
        document.body.classList.remove("no-scroll");
    };


    const 모달닫기 = (id) => {
        document.getElementById(id).style.display = "none";
        document.body.classList.remove("no-scroll");
    };

    // --- 일기 목록 렌더링 기능 ---
    const 렌더일기목록 = (필터값 = "전체", 검색어 = "", 페이지 = 1) => {
        const 검색된목록 = 일기목록.filter(diary =>
            diary.제목.includes(검색어) || diary.내용.includes(검색어)
        );

        const 필터된목록 = 필터값 === "전체" ? 검색된목록 : 검색된목록.filter(diary => diary.기분 === 필터값);

        // --- 페이지네이션 적용: 현재 페이지의 데이터만 잘라내기 ---
        const 시작인덱스 = (페이지 - 1) * 페이지당항목수;
        const 끝인덱스 = 시작인덱스 + 페이지당항목수;
        const 현재페이지목록 = 필터된목록.slice(시작인덱스, 끝인덱스);

    const 일기등록취소버튼 = document.querySelector("#일기등록취소버튼");
    일기등록취소버튼.addEventListener("click", () => {
        // 입력 필드 초기화
        document.querySelector('.일기텍스트 input[type="text"]').value = "";
        document.querySelector('.일기텍스트 textarea').value = "";

        // 라디오 버튼 초기화 (선택 해제)
        document.querySelectorAll('input[name="기분"]').forEach(radio => {
            radio.checked = false;
        });

        // 모달 닫기
        모달닫기('일기등록취소모달');
        모달닫기('일기쓰기모달');
    });

    const 일기삭제확인모달닫기버튼 = document.querySelector("#일기삭제취소버튼");
    일기삭제확인모달닫기버튼.addEventListener("click", () => 모달닫기('일기삭제확인모달'));

    // 모달 배경 클릭 시 닫기
    const 일기쓰기모달배경 = document.querySelector("#일기쓰기모달");
    일기쓰기모달배경.addEventListener("click", () => 모달닫기('일기쓰기모달'));
    const 일기등록취소모달배경 = document.querySelector("#일기등록취소모달");
    일기등록취소모달배경.addEventListener("click", () => 모달닫기('일기등록취소모달'));
    const 일기삭제확인모달배경 = document.querySelector("#일기삭제확인모달");
    일기삭제확인모달배경.addEventListener("click", () => 모달닫기('일기삭제확인모달'));

    // ESC 키 입력 시 모달 닫는 동작
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const 일기쓰기모달 = document.getElementById("일기쓰기모달");
            const 일기등록취소모달 = document.getElementById("일기등록취소모달");
            const 일기삭제확인모달 = document.getElementById("일기삭제확인모달");

            // 1. 일기등록취소모달이 열려있다면 먼저 닫는다. (가장 위에 있는 모달)
            if (일기등록취소모달 && 일기등록취소모달.style.display === "flex") {
                모달닫기('일기등록취소모달');
            }
            // 2. 그렇지 않고, 일기쓰기모달이 열려있다면 일기등록취소모달을 연다.
            else if (일기쓰기모달 && 일기쓰기모달.style.display === "flex") {
                모달열기('일기등록취소모달');
            }
            else { 모달닫기('일기삭제확인모달'); }
        }
    });

            const 카드HTML = 현재페이지목록.map(diary => `
                <div class="카드" data-id="${diary.고유아이디}">
                    <img src="./assets/icons/close-icon.svg" class="카드삭제버튼">
                    <div class="${diary.기분}카드썸네일"></div>
                    <div class="카드텍스트컨테이너">
                        <div class="기분과날짜">
                            <span class="${diary.기분}텍스트색상">${diary.기분}</span>
                            <span class="날짜">${diary.날짜}</span>
                        </div>
                        <div class="타이틀">
                            ${diary.제목}
                        </div>
                    </div>
                </div>
            `).join('');
            카드목록.innerHTML = 카드HTML;
        }

        // 전체 페이지 수 계산 및 페이지네이션 렌더링
        const 총페이지수 = Math.ceil(필터된목록.length / 페이지당항목수);
        렌더페이지네이션(총페이지수);
    };

    // --- 일기 목록 렌더링 기능 ---
    const 렌더일기목록 = (필터값 = "전체") => {
        const 필터된목록 = 필터값 === "전체" ? 일기목록 : 일기목록.filter(diary => diary.기분 === 필터값);
        const 카드HTML = 필터된목록.map(diary => `
            <div class="카드" data-id="${diary.고유아이디}">
                <img src="./assets/icons/close-icon.svg" class="카드삭제버튼">
                <div class="${diary.기분}카드썸네일"></div>
                <div class="카드텍스트컨테이너">
                    <div class="기분과날짜">
                        <span class="${diary.기분}텍스트색상">${diary.기분}</span>
                        <span class="날짜">${diary.날짜}</span>
                    </div>
                    <div class="타이틀">
                        ${diary.제목}
                    </div>
                </div>
            </div>
        `).join('');
        카드목록.innerHTML = 카드HTML;
    };
    렌더일기목록();

    // --- 기분 필터 드롭다운 변경 이벤트 ---
    기분필터.addEventListener("change", e => 렌더일기목록(e.target.value));


    // --- 일기 등록 기능 ---
    const handleDiarySubmit = () => {
        const selectedMood = document.querySelector('input[name="기분"]:checked');
        if (!selectedMood) return;

        const newDiary = {
            고유아이디: Date.now(),
            제목: 제목텍스트.value,
            내용: 내용텍스트.value,
            기분: selectedMood.value,
            날짜: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
            회고: []
        };

        일기목록.push(newDiary);
        localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
        모달열기('일기등록완료모달');
    };

    // --- 제출 버튼 활성화/비활성화 기능 ---
    const checkFormValidity = () => {
        const isMoodSelected = document.querySelector('input[name="기분"]:checked');
        const isTitleFilled = 제목텍스트.value.trim() !== "";
        const isContentFilled = 내용텍스트.value.trim() !== "";

    // 모달 여는 버튼
    document.querySelector("#일기쓰기모달여는버튼").addEventListener("click", () => 모달열기('일기쓰기모달'));
    document.querySelector("#일기쓰기닫기버튼").addEventListener("click", () => 모달열기('일기등록취소모달'));

    // 모달 닫는 버튼 및 초기화
    document.querySelector("#일기계속작성버튼").addEventListener("click", () => 모달닫기('일기등록취소모달'));
    document.querySelector("#일기등록취소버튼").addEventListener("click", () => {
        제목텍스트.value = "";
        내용텍스트.value = "";
        기분라디오.forEach(radio => radio.checked = false);
        모달닫기('일기등록취소모달');
        모달닫기('일기쓰기모달');
    });
    document.querySelector("#일기삭제취소버튼").addEventListener("click", () => 모달닫기('일기삭제확인모달'));

    // 모달 배경 클릭 시 닫기
    일기쓰기모달.addEventListener("click", () => 모달닫기('일기쓰기모달'));
    일기등록취소모달.addEventListener("click", () => 모달닫기('일기등록취소모달'));
    일기삭제확인모달.addEventListener("click", () => 모달닫기('일기삭제확인모달'));

    // 모달 패널(내부 컨텐츠) 클릭 시 이벤트 버블링 방지
    document.querySelectorAll(".모달패널").forEach(패널 => {
        패널.addEventListener("click", e => e.stopPropagation());
    });

    // --- 스크롤 이벤트 (컨트롤바 색상 변경) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 카드목록_offsetTop) {
            기분필터.classList.add('scrolled');
            프로그레시브블러.classList.add('scrolled');
        } else {
            기분필터.classList.remove('scrolled');
            프로그레시브블러.classList.remove('scrolled');
        }
    });

    // --- 이벤트 리스너 ---
    등록하기버튼.addEventListener("click", handleDiarySubmit);
    제목텍스트.addEventListener("input", checkFormValidity);
    내용텍스트.addEventListener("input", checkFormValidity);
    기분라디오.forEach(radio => radio.addEventListener("change", checkFormValidity));
    카드목록.addEventListener("click", (e) => {
        // 클릭된 요소가 삭제 버튼인지 확인합니다.
        if (e.target.classList.contains("카드삭제버튼")) {
            e.stopPropagation();
            const card = e.target.closest(".카드");
            if (card) {
                삭제할일기 = card.dataset.id;
                모달열기('일기삭제확인모달');
            }
        }
        // 삭제 버튼이 아닌 카드의 다른 부분을 클릭했을 때 상세 페이지로 이동
        else {
            const card = e.target.closest(".카드");
            if (card) {
                const diaryId = card.dataset.id;
                location.href = `detail.html?id=${diaryId}`;
            }
        }
    });
    const 일기삭제확인버튼 = document.querySelector("#일기삭제확인버튼");
    일기삭제확인버튼.addEventListener("click", () => {
        if (삭제할일기) {
            // 실제 삭제 로직: 일기목록 배열에서 해당 일기 삭제 후 localStorage 업데이트
            const 삭제후일기목록 = 일기목록.filter(일기 => 일기.고유아이디 !== Number(삭제할일기));
            localStorage.setItem("민지의일기목록", JSON.stringify(삭제후일기목록));

            // 페이지 새로고침
            location.reload();
        }
    });
});