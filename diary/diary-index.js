// 새로운 일기를 등록받아 보자

let 일기들 = []; // 등록한 일기들 배열

// 일기등록하기 함수
function WriteNewDiary() {
    const feeling = document.querySelector('input[name="feel"]:checked').value
    const title = document.getElementById("제목__내용입력").value
    const blabla = document.getElementById("내용__내용입력").value
    const date = new Date().toLocaleDateString()

    const 새로운일기 = {
        feeling: feeling,
        title: title,
        content: blabla,
        date: date
    }

    일기들.push(새로운일기);

    const 일기틀 = document.createElement('div');
    일기틀.classname = '일기틀';
    일기틀.innerHTML =`
    <div id="감정이미지"></div>
    <div class="일기속성">
        <div class="일기속성1">
            <div id="감정">슬퍼요</div>
            <div id="날짜표시">2025. 8. 7.</div>
        </div>
        <div class="일기속성2">
            <div id="타이틀">
                타이틀 영역입니다. 한줄까지만 노출 됩니다.
            </div>
        </div>
    </div>`
;

    // 감정삽입
    document.getElementById("감정").innerText = feeling

    if (feeling === "행복해요") {
        document.getElementById("감정").style.color = "#EA5757";
        document.getElementById("감정이미지").style.backgroundImage =
            "url(./asset/image/happy.png)"
    } else if (feeling === "슬퍼요") {
        document.getElementById("감정").style.color = "#28B4E1";
        document.getElementById("감정이미지").style.backgroundImage =
            "url(./asset/image/sad.png)"
    } else if (feeling === "놀랐어요") {
        document.getElementById("감정").style.color = "#D59029";
        document.getElementById("감정이미지").style.backgroundImage =
            "url(./asset/image/surprised.png)"
    } else if (feeling === "화나요") {
        document.getElementById("감정").style.color = "#777";
        document.getElementById("감정이미지").style.backgroundImage =
            "url(./asset/image/mad.png)"

    // 날짜삽입
    document.getElementById("날짜표시").innerText = date

    //타이틀삽입
    document.getElementById("타이틀").innerText = title
}
}
