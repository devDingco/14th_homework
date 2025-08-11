/* 다이어리 입력 폼을 다 채우면 버튼 활성화 */
// selectedFeeling: 기분 선택
let selectedFeeling;

// diaryTitle: 입력된 타이틀
let diaryTitle;

// diaryContext: 입력된 일기 내용
let diaryContext;

function isDiaryWritten() {

    // selectedFeeling: [선택된 기분, 선택된 기분 한글]
    const objectFeeling = {
        happy: "행복해요",
        sad: "슬퍼요",
        surprise: "놀랐어요",
        angry: "화나요",
        etc: "기타"
    } 

    // 기분 라디오 버튼 중 선택된 것 찾기
    const feelings = document.getElementsByName("radio__feeling");
    
    // 라디오 버튼 중 선택된 기분을 객체에서 찾아서 변수에 넣기
    for (i = 0; i < feelings.length; i++) {
        if (feelings[i].checked) {
            let select = feelings[i].id
            selectedFeeling = [select,objectFeeling[select]]
            //selectedFeeling[0]
            break;
        }
    }

    // diaryTitle: 입력된 타이틀 변수에 넣기
    diaryTitle = document.getElementById("title__feeling").value

    // diaryContext: 입력된 일기 내용 변수에 넣기
    diaryContext = document.getElementById("context__feeling").value

    // input 내용이 전부 채워지면, 등록하기 버튼 활성화
    if (selectedFeeling && diaryTitle && diaryContext) {
        document.getElementById("diary__write__button").disabled = false
    } else {
        document.getElementById("diary__write__button").disabled = true
    }
}


/* 등록하기 버튼이 클릭되면, 배열에 추가 */
let diaryCard = [];

function getDiaryCard() {

    // 날짜 넣기
    // 2025. 08. 08
    let date = new Date()
    const writeDate = [date.getFullYear(), String(date.getMonth() + 1).padStart(2,"0"), String(date.getDate()).padStart(2,"0")].join(". ")

    // 입력된 내용을 diaryCard에 밀어넣기
    const submitcard = {
        date: writeDate,
        feeling: selectedFeeling[0],
        feeling_title: selectedFeeling[1],
        card_title: diaryTitle,
        card_context: diaryContext
    }

    diaryCard.push(submitcard)
    localStorage.setItem("diaryCardList",JSON.stringify(diaryCard))

    alert(`
        일기 제출 완료!

        입력일: ${writeDate}

        오늘의 기분은? ${selectedFeeling[1]}
        제목: ${diaryTitle}

        ${diaryContext}


        `)



    /* 변수 초기화 하기 */
    function clearDiaryForm() {
        
        const feeling = document.getElementsByName("radio__feeling")
        
        for (let i = 0; i < feeling.length ; i++) {
            feeling[i].checked = false;
        }

        const title = document.getElementById("title__feeling")
        const context = document.getElementById("context__feeling")

        title.value = '';
        context.value = '';

    }

    // 등록하기 버튼을 다시 비활성화 시키기 위해 입력된 내용들 클리어하기
    clearDiaryForm()
    selectedFeeling = undefined;
    diaryTitle = undefined;
    diaryContext = undefined;

    // 등록하기 버튼 비활성화 하기
    document.getElementById("diary__write__button").disabled = true

    // 다이어리 카드 배열이 1개 이상일 때, 다이어리 카드 표시
    function addDiaryCard(){

        if (diaryCard >= 1){    
        } else {
        
            const diaryCard_HTML = diaryCard.map((el,index)=>`
            <a href="./detail.html?number=${index}">
            <div class="diary__card">
                <img class="diary__card__image" src="./assets/images/${diaryCard[index].feeling}_M.svg" />
                <div class="diary__card__text">
                    <div class="diary__card__subtitle">
                        <div class="diary__card__feeling ${diaryCard[index].feeling}">${diaryCard[index].feeling_title}</div>
                        <div id="diary__card__date">${diaryCard[index].date}</div>
                    </div>
                    <div class="diary__card__title">${diaryCard[index].card_title}</div>
                </div>
            </div>
            </a>    
        `).join("")
        
        document.getElementById("card__list").innerHTML = diaryCard_HTML
        }

    }    

    // 카드 추가하기
    addDiaryCard()


}