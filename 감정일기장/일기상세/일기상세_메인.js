window.onload = () => {
//1. 주소에서 일기번호 가져오기 => 'URL → 쿼리스트링 → 특정 값 추출'
    const 쿼리스트링 = window.location.search;   /* ->브라우저 주소창에서 ? 뒤에 붙은 쿼리스트링을 가져옴*/
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

//2. 스토리지 안에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 =
     window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

//3. 일기목록에서 현재일기번호 가져오기
    const 일기담는박스 = 일기목록[일기번호];

    let 기분 = 일기담는박스.기분;
    let 기분메시지;                    

    switch (기분) {
    case "행복":
        기분메시지 = "행복해요";
        기분사진 = "../icons/joy.png";
        글자색 = "#EA5757";
        break;
    case "슬픔":
        기분메시지 = "슬퍼요";
        기분사진 = "../icons/sad.png";
        글자색 = "#28B4E1";
        break;
    case "놀람":
        기분메시지 = "놀랐어요";
        기분사진 = "../icons/surprise.png";
        글자색 = "#D59029";
        break;
    case "화남":
        기분메시지 = "화났어요";
        기분사진 = "../icons/angry.png";
        글자색 = "#777";
        break;
    case "기타":
        기분메시지 = "기타";
        기분사진 = "../icons/etc.png";
        글자색 = "#A229ED";
        break;
    }

//4.일기상세내용 화면에 그리기_요소중에서 필요한것만 뽑아서 사용
    window.document.getElementById("헤더_내용_타이틀id").innerHTML = 일기담는박스.제목;
    window.document.getElementById("헤더_내용_감정_이모티콘").src = 기분사진;
    window.document.getElementById("헤더_내용_감정_감정메시지").innerHTML = 기분메시지;
    window.document.getElementById("헤더_내용_감정_감정메시지").style.color = 글자색;
    window.document.getElementById("헤더_내용_날짜id").innerHTML = 일기담는박스.작성일;
    window.document.getElementById("헤더_내용_내용_내용이들어갑니다id").innerHTML = 일기담는박스.내용;

//5. 회고 화면에 그리기    
    회고그리기기능();

    회고로바로이동 ();



};


const 회고로바로이동 = () => {
    const 회고시작부분 = window.document.getElementById("회고");
    회고시작부분.scrollIntoView({behavior: "smooth"});
};


const 수정페이지이동 = () => {
    // 주소에서 일기번호 가져오기 -> 현재 보고있는 페이지에 담긴 데이터를 가져와서 수정해야 하니까 가져오는 거!
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

    // 수정버튼 누르면 수정페이지로 이동하기
    window. location. href = `./일기상세_수정.html?number=${일기번호}`
};

const 일기삭제기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");
    삭제하려는일기 = 일기번호;

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    if (삭제하려는일기 !== null) {
    //1.선택한 일기번호 삭제
        const 삭제후일기목록 = 일기목록.filter(
         (_, index) => index !== parseInt(일기번호, 10)
        );
    //2. 삭제완료한 새로운 일기목록 다시 저장
        window.localStorage.setItem(
            "민지의일기보관함",
            JSON.stringify(삭제후일기목록)
        );
        alert("삭제되었습니다");

    //3. 메인페이지로 다시 이동
        location.replace("../일기보관함/일기보관함_최초.html");
    }
};

const 회고추가기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

 //새로운 회고 추가하기
    const 회고내용담는통 = 
        window.document.getElementById("회고입력박스").value;

//현재 일기에 나머지 요소들은 그대로 둔 상태에서 새로운 회고만 회고목록에 추가하기
    const 기존회고목록 = 일기목록[일기번호].회고목록;

    const date = new Date();
    const 날짜자동추가 = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        date: date.getDate(),
    };

    const 회고작성일 = 날짜자동추가.year + ". " + 날짜자동추가.month + ". " + 날짜자동추가.date;

    if (기존회고목록 === undefined) {
        일기목록[일기번호].회고목록 = [
            {
             회고내용: 회고내용담는통,
             작성일: 회고작성일,
            },
        ];
    } else {
        일기목록[일기번호].회고목록.push({
             회고내용: 회고내용담는통,
             작성일: 회고작성일,
        });
    }
    window.localStorage.setItem("민지의일기보관함", JSON.stringify(일기목록));

    회고그리기기능();
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

 document.getElementById("회고입력박스").value = ""     /* 목록에 새로운 데이터 추가 후, 입력칸에 써있는 데이터 지우기 */
};

const 일기내용복사기능 = () => {
    //1.일기번호불러오기
    const 쿼리스트링 = window.location.search;
    const 일기담는통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통.get("number");

    //2.일기 목록 가져오기
    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    //3.번호에 맞는 일기정보들 가져오기
    const 일기담는박스 = 일기목록[일기번호];
 
    //4.내용 복사하기 기능
    navigator.clipboard.writeText(일기담는박스.내용);

    복사후토스트메시지기능();
};

const 복사후토스트메시지기능 = () => {
    window.document.getElementById("복사완료토스트메시지ID").style = "display: block";
    setTimeout(() => {
        window.document.getElementById("복사완료토스트메시지ID").style = "display: none";
      }, 1000);
}