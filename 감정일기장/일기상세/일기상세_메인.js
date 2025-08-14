window.onload = () => {
    //1. 주소에서 일기번호 가져오기 => 'URL → 쿼리스트링 → 특정 값 추출'
    const 쿼리스트링 = window.location.search;   /* ->브라우저 주소창에서 ? 뒤에 붙은 쿼리스트링을 가져옴*/
    const 일기담는통의요소 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 일기담는통의요소.get("number");

    //2. 스토리지 안에 저장된 일기목록 가져오기
    const 스토리지에저장된일기목록 =
     window.localStorage.getItem("민지의일기보관함") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    //3. 일기목록에서 현재일기번호 가져오기
    const 일기담는박스 = 일기목록[일기번호];

    let 기분 = 일기담는박스.기분;
    let 기분메시지;                    /* ->왜 let..? */

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

};