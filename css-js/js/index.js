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
const diaryCard_list = localStorage.getItem("diaryCardList")
const diaryCard = JSON.parse(diaryCard_list === null ? "[]" : diaryCard_list)

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
        card_context: diaryContext,
        comment: []
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

    addDiaryCard()

}

/* 다이어리 카드 리스트가 1개 이상일 때, 카드 추가하기 */
function addDiaryCard() {

    if (diaryCard.length >= 1){
        const diaryCard_HTML = diaryCard.map((el,index)=>`
        <a href="./detail.html?number=${index}">
            <div class="diary__card">
                <img class="diary__card__image" src="./assets/images/${diaryCard[index].feeling}_M.svg" />
                <img id="delete__button" src="./assets/icons/close_outline_light_m.svg" onclick="deleteDiaryCard(event, ${index})" />
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
    } else {
        document.getElementById("card__list").innerText = "등록된 일기가 없습니다."
    }


}

// 페이지가 로드될 때 마다, 카드 추가하기 함수 실행
window.addEventListener("load",addDiaryCard)


// 드롭다운에서 필터링 기능 추가하기
const viewFiltering = (event) => {

    // 드롭다운에서 선택한 기분이 XX일때, 배열에서 기분이 XX인 객체만 골라 배열로 만들기
    const selectFilter = event.target.value
    let select_filter;
    if (selectFilter === "happy"){
        select_filter = diaryCard.filter ((el) => el.feeling === "happy")
    } else if (selectFilter === "sad"){
        select_filter = diaryCard.filter ((el) => el.feeling === "sad")
    } else if (selectFilter === "surprise"){
        select_filter = diaryCard.filter ((el) => el.feeling === "surprise")
    } else if (selectFilter === "angry"){
        select_filter = diaryCard.filter ((el) => el.feeling === "angry")
    } else if (selectFilter === "etc"){
        select_filter = diaryCard.filter ((el) => el.feeling === "etc")
    } else {
        console.log(diaryCard)
    }

    // 필터된 배열을 기반으로 카드리스트HTML 만들어넣는 함수
    function filterDiaryCard() {

        if (select_filter.length >= 1){
            const select_filter_HTML = select_filter.map((el,index)=>`
                <a href="./detail.html?number=${index}">
                <div class="diary__card">
                    <div>
                        <img class="diary__card__image" src="./assets/images/${select_filter[index].feeling}_M.svg" />
                        <img id="delete__button" src="./assets/icons/close_outline_light_m.svg" />
                    </div>
                    <div class="diary__card__text">
                        <div class="diary__card__subtitle">
                            <div class="diary__card__feeling ${select_filter[index].feeling}">${select_filter[index].feeling_title}</div>
                            <div id="diary__card__date">${select_filter[index].date}</div>
                        </div>
                        <div class="diary__card__title">${select_filter[index].card_title}</div>
                    </div>
                </div>
                </a>    
            `).join("")
        
            document.getElementById("card__list").innerHTML = select_filter_HTML
        } else {
            // 기존 배열 중 드롭다운에서 선택하지 않은 기분을 골랐을 때는 배열이 0이므로, 안내 문구 노출
            document.getElementById("card__list").innerText = "선택한 기분으로 작성된 일기가 없습니다."
        }
    
    }

    // 위에서 만든 필터된 카드 배열 넣는 함수 실행
    filterDiaryCard()

}

// 스크롤 내릴 시, 필터 드롭다운 배경색 반전
window.onload = () => {

    document.getElementById("frame__diary__list").addEventListener("scroll", () => {

        const scrolling = document.getElementById("frame__diary__list").scrollTop

        if (scrolling > 0) {
            document.getElementById("filter").style = "background-color: #1C1C1C; color: #FFFFFF; border: none;"
        } else {
            document.getElementById("filter").style = "background-color: #FFFFFF; color:  #1C1C1C; border: 1px solid #C7C7C7;"
        }

    })

}
window.addEventListener("scroll", floatingButton)
window.addEventListener("resize", floatingButton)
window.addEventListener("load", floatingButton)

// 플로팅 버튼 선택 시, 요소 맨 위로 이동
function scrollpage () {

    document.getElementById("frame__diary__list").scrollTo({ top: 0, behavior: "smooth" })

}

// 다이어리 카드 삭제 함수
function deleteDiaryCard (event, index) {

    // 이벤트 버블링 방지
    event.preventDefault();

    // 현재 카드 배열에서 삭제 버튼 누른 카드 삭제
    diaryCard.splice(index, 1);
    
    // 삭제 후 카드 재배치를 위한 localstorage 업데이트
    localStorage.setItem("diaryCardList",JSON.stringify(diaryCard))

    alert("선택한 일기가 삭제되었습니다.");
    
    // 다이어리 카드 만들기 함수 실행
    addDiaryCard();

}

function floatingButton(){
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth

    document.getElementById("floating__button").style = `
        position: fixed;
        top: ${innerHeight*0.9}px;
        left: ${innerWidth*0.9}px;

        z-index: 99;
    `
}