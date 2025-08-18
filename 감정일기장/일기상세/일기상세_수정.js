window.onload = () => {
//브라우저 주소에서 일기번호'만' 가져옴 ex)나 5번이야!
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

//스토리지에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 = window.localStorage.getItem("민지의일기보관함");
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);


//위 2가지 행한 후, 일기번호에 맞는 데이터 가져오기
    const 일기담는박스 = 일기목록[일기번호];

//화면에 보이게 그리기 ___ 여기 잘 모
    window.document.getElementById("이것은타이틀입니다").value = 일기담는박스.제목;
    window.document.getElementById("내용이들어갑니다").value = 일기담는박스.내용;

    const 기분선택버튼 = window.document.getElementsByName("기분상태"); // ----

    for (let i = 0; i < 기분선택버튼.length; i++) {
       const el= 기분선택버튼[i] ;
        if (el.value === 일기담는박스.기분) {
            el.checked = true;
        }
    }

    회고그리기기능()
};

const 수정완료하기기능 = () => {
//일기번호'만' 가져오기
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

//스토리지에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 = window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
// =>얘네 가져오는 이유: 일기담는 통을 가져와서 수정된 데이터 저장해야하니까?!

// 1. 수정된 일기 다시 데이터 저장하기
    const 수정된제목담는박스 =
     window.document.getElementById("이것은타이틀입니다").value;
    const 수정된내용담는박스 =
     window.document.getElementById("내용이들어갑니다").value;
    let 수정된기분담는박스;
     window.document.getElementsByName("기분상태").forEach((el) => {
        if (el.checked) 수정된기분담는박스 = el.value
     });

     일기목록[일기번호] = {
        제목: 수정된제목담는박스,
        내용: 수정된내용담는박스,
        기분: 수정된기분담는박스,
        작성일: 일기목록[일기번호].작성일,
     };
// 2. 수정된일기 
    window.localStorage.setItem("민지의일기보관함", JSON.stringify(일기목록));

// 수정버튼 누르면 상세페이지로 다시 돌아가기
     location.replace(`./일기상세_메인.html?number=${일기번호}`);
};

const 수정취소하기기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

    window.location.replace(`./일기상세_메인.html?number=${일기번호}`);
};

const 회고그리기기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const 일기담는박스 = 일기목록[일기번호];
// =>일기번호와 일기내용 + 현재 일기번호 가져오기
    const 회고목록 = 일기담는박스.회고목록 ?? [];

//
 let 새로운회고목록 = "";
 회고목록.forEach((회고, index) => {
    const isLast = index === 회고목록.length - 1;       //->마지막 요소인지 확인하는거.
    
    새로운회고목록 += `
        <div class="회고목록${!isLast ? "" : "_마지막"}">
            <div class="새로운회고_내용"> ${회고.회고내용} </div>
            <div class="새로운회고_작성일"> [${회고.작성일}] </div>
        </div>
    `;
 });
 document.getElementById("회고목록프레임").innerHTML = 새로운회고목록;
};

