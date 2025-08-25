const changeMenu = (clicked) => {
    // 선택된 메뉴 객체
    // 비활성화할 메뉴, 불러올 변수, 불러올 함수
    const targetMenu = {
        "click__diary__list":{
            disabledID: "click__image__list",
            content: diary__list,
            filter: diary__filter,
            filter_title: "전체",
            callback: addDiaryCard
        },
        "click__image__list":{
            disabledID: "click__diary__list",
            content: image__list,
            filter: image__filter,
            filter_title: "기본",
            callback: addImageCard
        }
    }

    const selected = targetMenu[clicked];

    if (!selected) return

    // 선택된 탭 활성화
    document.getElementById(clicked).classList.remove("tab__menu__disabled")
    document.getElementById(clicked).classList.add("content__tab__menu")

    // 다른 탭 비활성화
    document.getElementById(selected.disabledID).classList.remove("content__tab__menu")
    document.getElementById(selected.disabledID).classList.add("tab__menu__disabled")    

    // HTML추가
    document.getElementById("frame__diary__list").innerHTML = selected.content;
    document.getElementById("filter__menu").innerHTML = selected.filter;

    // 함수 실행
    selected.callback();

    // 드롭박스 제목
    document.getElementById("dropdown__title").style = `--filter-title: "${selected.filter_title}"`

    // 이미지 박스 선택 시, 기본 비율로 변경
    document.documentElement.style.setProperty('--image-ratio','1 / 1');


}


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

/* 스크롤 막기 */
const disabledScroll = () => {
    document.body.style.overflow = "hidden";
}

/* 스크롤 활성화 */
const enableScroll = () => {
    document.body.style.overflow = "auto";
}


/* 버튼 클릭 시, 모달 on */
const viewModal = (modal__name) => {
    document.getElementById("frame__diary__list").scrollTo({ top: 0, behavior: "smooth" })
    window.scrollTo({ top: 0, behavior: "smooth"})
    document.getElementById(modal__name).style = "display: block"
    disabledScroll()
}

/* 버튼 클릭 시, 모달 off */
const closeModal = (modal__name) => {
    document.getElementById(modal__name).style = "display: none"
    clearDiaryForm()
    enableScroll()
}

/* 취소모달에서 계속 작성 클릭 시, 해당 모달만 꺼지게끔하기? */
const keepWrite = (modal__name) => {
    document.getElementById(modal__name).style = "display: none"
}

/* 등록화면 모달에서 여백 클릭 시, 모달 종료 */

document.addEventListener("click", (event) => {
    const bgModal = document.getElementById('write__modal__background')
    const writeModal = document.getElementById('write__form__modal').style.display

    const isbgModal = bgModal.contains(event.target);

    if(writeModal === "block" && isbgModal){
        closeModal('write__form__modal')
    }
})


/* 등록화면 모달에서 ESC 키 입력 시, 모달 종료 */
window.addEventListener("keydown", (event) => {

    const writeModal = document.getElementById('write__form__modal').style.display

    if(event.key === "Escape" && writeModal === "block"){
        closeModal('write__form__modal')
    }
})


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
        comment: [] // 상세 화면에서 코멘트를 위한 빈 배열
    }

    diaryCard.push(submitcard)
    localStorage.setItem("diaryCardList",JSON.stringify(diaryCard))

    
    viewModal('write__submit__modal')




    // 등록하기 버튼을 다시 비활성화 시키기 위해 입력된 내용들 클리어하기
    clearDiaryForm()
    selectedFeeling = undefined;
    diaryTitle = undefined;
    diaryContext = undefined;

    // 등록하기 버튼 비활성화 하기
    document.getElementById("diary__write__button").disabled = true

    filterDiaryCard(diaryCard)

}

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

/* 페이지그리기 기능 */

// 시작페이지 설정
let firstPage = 1
let lastPage
const cardsPerPage = 12
const numPerPagegroup = 5
const prevPageElement = document.getElementById("prevpage__button")
const nextPageElement = document.getElementById("nextpage__button")

// 배열 개수에 따른 마지막페이지 계산 후 HTML로 반환
const diaryPage = (Arr,clickedpage) => {


    // 마지막페이지 설정
    // 다이어리카드가 페이지 당 총 12개 보여져야하므로 배열의 길이에서 12를 나눔
    lastPage = Math.ceil(Arr.length / cardsPerPage)


    // 피그마 상 페이지가 5개 씩 보여짐
    // 
    const pagegroups = new Array (numPerPagegroup).fill(1)
    const pages = pagegroups.map((el, index) => {
        const pageNum = firstPage + index

        return pageNum <= lastPage ? `<button onclick="loaddiaryPage(indexOfFilteredNum, ${pageNum})" class=${clickedpage === pageNum ? "pageclickbtn" : "pagebtn"}>${pageNum}</button>` : ``
    }).join("")

    // 이전페이지 버튼
    const prevbutton = firstPage === 1 ? 
    `<img src="./assets/icons/leftdisabled_outline_light_m.svg" id="prevpage__button" onclick="prevPage(indexOfFilteredNum)" />` : `<img src="./assets/icons/leftenable_outline_light_m.svg" id="prevpage__button" onclick="prevPage(indexOfFilteredNum)" />`
    
    // 다음페이지 버튼
    const nextbutton = lastPage < firstPage + 5 ?
    `<img src="./assets/icons/rightdisabled_outline_light_m.svg" id="nextpage__button" onclick="nextPage(indexOfFilteredNum)"/>`:`<img src="./assets/icons/rightenable_outline_light_m.svg" id="nextpage__button" onclick="nextPage(indexOfFilteredNum)"/>`


    document.getElementById("page__group").innerHTML = prevbutton + `<div class="page__number">${pages}</div>` + nextbutton


}

// 페이지 별 카드 그리기
// Arr: 배열, 화면에 표시되어야하는(검색, 드롭다운 등등) 다이어리카드의 인덱스 번호를 모아둔 배열

const loaddiaryPage = (Arr,clickedpage) => {

    // firstIndexOfPage: 클릭된 페이지에서 보여줘야하는 가장 첫 번째 카드의 순서
    const firstIndexOfPage = (clickedpage - 1) * cardsPerPage

    // lastIndexOfPage: 클릭된 페이지에서 보여줘야하는 마지막 카드의 순서
    const lastIndexOfPage = firstIndexOfPage - 1

    // 표시되어야할 카드의 길이 중 클릭한 페이지에 해당되는 카드 새로 배열 만들기
    const list = Arr.filter((el, index) => {
        return lastIndexOfPage < index && index <= lastIndexOfPage + cardsPerPage
    })

    // 클릭한 페이지에 해당되는 카드 HTML로 집어넣기
    document.getElementById("card__list").innerHTML = list.map(el => `
            <a href="./detail.html?number=${el}">
            <div class="diary__card">
                <div>
                    <img class="diary__card__image" src="./assets/images/${diaryCard[el].feeling}_M.svg" />
                    <img id="delete__button" src="./assets/icons/close_outline_light_m.svg" onclick="deleteDiaryCard(event, ${el})" />
                </div>
                <div class="diary__card__text">
                    <div class="diary__card__subtitle">
                        <div class="diary__card__feeling ${diaryCard[el].feeling}">${diaryCard[el].feeling_title}</div>
                        <div id="diary__card__date">${diaryCard[el].date}</div>
                    </div>
                    <div class="diary__card__title">${diaryCard[el].card_title}</div>
                </div>
            </div>
            </a>    
        `).join("")

    // 배열에 해당되는 페이지 번호 그리기
    diaryPage(Arr,clickedpage)
}

// 이전페이지기능
const prevPage = (Arr) => {
    if(firstPage !== 1) {
        // 페이지 번호가 1이 아니면 페이지 그룹의 개수만큼 빼주기
        firstPage -= numPerPagegroup

        // 이전페이지 버튼을 누르면, 이전 페이지 그룹의 가장 마지막 번호가 표시되게끔 하기?(6 or 7페이지에서 이전페이지를 누르면, 1페이지가 아닌 5페이지로 넘어가게끔... ?)
        loaddiaryPage(Arr,firstPage+(numPerPagegroup-1))
        diaryPage(Arr,firstPage+(numPerPagegroup-1))

    } else (
        // 첫 페이지가 1일 때 이전 페이지 버튼을 누르면, 알럿 발생
        alert("현재 표시된 페이지들보다 더 앞으로 갈 수 없어요")
    )


}

// 다음페이지기능
const nextPage = (Arr) => {
    if(lastPage < firstPage + numPerPagegroup) {
        // 마지막 페이지보다 그룹의 첫 페이지 + 페이지 그룹수(5)가 클 때, 알럿 발생
        alert("현재 표시된 페이지들보다 더 뒤로 갈 수 없어요")
    } else {

        // 페이지 목록이 1~5까지 보여지므로, 이후페이지 클릭 시 5만큼 늘어남
        firstPage += numPerPagegroup

        // 다음페이지 버튼을 누르면, 다음 페이지 그룹의 첫 페이지로 넘어가게끔 하기
        diaryPage(Arr,firstPage)
        loaddiaryPage(Arr,firstPage)
    }



}


// function addDiaryCard() {

    // if (diaryCard.length >= 1){
    //     const diaryCard_HTML = diaryCard.map((el,index)=>`
    //     <a href="./detail.html?number=${index}">
    //         <div class="diary__card">
    //             <img class="diary__card__image" src="./assets/images/${diaryCard[index].feeling}_M.svg" />
    //             <img id="delete__button" src="./assets/icons/close_outline_light_m.svg" onclick="deleteDiaryCard(event, ${index})" />
    //             <div class="diary__card__text">
    //                 <div class="diary__card__subtitle">
    //                     <div class="diary__card__feeling ${diaryCard[index].feeling}">${diaryCard[index].feeling_title}</div>
    //                     <div id="diary__card__date">${diaryCard[index].date}</div>
    //                 </div>
    //                 <div class="diary__card__title">${diaryCard[index].card_title}</div>
    //             </div>
    //         </div>
    //         </a>
            
    //     `).join("")
    
    //     document.getElementById("card__list").innerHTML = diaryCard_HTML
    // } else {
    //     document.getElementById("card__list").innerText = "등록된 일기가 없습니다."
    // }

    
//     filterDiaryCard(diaryCard)

// }



// 드롭다운 선택 함수
const selectDropDown = (event) => {
    document.getElementById("dropdown__title").style = `--filter-title: "${event.target.id}"`
    document.getElementById("dropdown__title").click()
}

// 필터 메뉴 함수
// 1. 필터될 변수 설정
let select_filter = diaryCard;
let search_filter = diaryCard;

// 2. 1초 후 다이어리 제목 검색 후 select_filter로 반환
let searchTimer = "";
const inputSearch = (event) => {

    // 이전 설정된 타이머 취소
    clearTimeout(searchTimer);

    // 새로운 setTimeout 설정 => 입력 멈춘 후 1초 후 실행
    searchTimer = setTimeout(() => {

        const searchTitle = event.target.value
        search_filter = diaryCard.filter(el => el.card_title.includes(searchTitle))
        
        // 공통배열 검색
        const result = findCommonCard(search_filter, select_filter)
        // 검색한 카드 반환
        filterDiaryCard(result)
    },1000)
    
}

// 3. 드롭다운에서 이벤트 발생 시 필터 함수 실행
const dropdownEvent = (event) => {
    const selectFilter = event.target.id
    
    if (selectFilter === "행복해요"){
        select_filter = diaryCard.filter ((el) => el.feeling === "happy")
    } else if (selectFilter === "슬퍼요"){
        select_filter = diaryCard.filter ((el) => el.feeling === "sad")
    } else if (selectFilter === "놀랐어요"){
        select_filter = diaryCard.filter ((el) => el.feeling === "surprise")
    } else if (selectFilter === "화나요"){
        select_filter = diaryCard.filter ((el) => el.feeling === "angry")
    } else if (selectFilter === "기타"){
        select_filter = diaryCard.filter ((el) => el.feeling === "etc")
    } else {
        select_filter = diaryCard
    }

    // 공통배열 검색
    const result = findCommonCard(search_filter, select_filter)
    // 필터된 카드 반환
    filterDiaryCard(result)
}

// 4. 공통으로 포함된 배열 찾기
function findCommonCard(arr1, arr2){
    const commonCard = arr1.filter( el => arr2.includes(el));

    return commonCard
}

// 필터된 카드의 인덱스를 모아둔 배열 로컬스토리지에서 뽑아오기(굳이 필요없나..?)
let getFilteredNum = localStorage.getItem("filteredCardNum")
let indexOfFilteredNum = JSON.parse(getFilteredNum)


// 필터된 다이어리 카드의 길이에 따라 카드 이미지 생성
function filterDiaryCard(result) {
    
    // 필터된 다이어리 카드의 길이가 1보다 작으면(검색된 내용이 없으면) 작성된 일기 없음 안내
    if (result.length < 1){
        document.getElementById("card__list").innerText = "검색한 내용으로 작성된 일기가 없습니다."
        return
    }

    // localstorage에 저장된 다이어리 카드의 인덱스 번호를 빼올 빈 배열 생성
    const resultOfCard = [];

    // 필터링(검색, 드롭다운)된 다이어리 카드의 인덱스를 뽑아오기(indexOf)
    result.map(el => {
        const indexResult = diaryCard.indexOf(el)
        resultOfCard.push(indexResult)
    })

    // 로컬스토리지에 배열 저장
    localStorage.setItem("filteredCardNum", JSON.stringify(resultOfCard))

    getFilteredNum = localStorage.getItem("filteredCardNum")
    indexOfFilteredNum = JSON.parse(getFilteredNum)

    // 페이지그리기 기능
    diaryPage(indexOfFilteredNum,1)

    // 페이지에 해당하는 카드 불러오기
    loaddiaryPage(indexOfFilteredNum,1)

}

// addDiaryCard: 전체 다이어리 리스트 불러오는 기능
// 새롭게 카드 작성하였을 때, 페이지 로드했을 때 등등
const addDiaryCard = () => {filterDiaryCard(diaryCard)}


const imageRatio = (event) => {

    const root = document.documentElement;
    if(event.target.id === "기본"){
        root.style.setProperty('--image-ratio','1 / 1');
    } else if(event.target.id === "가로형"){
        root.style.setProperty('--image-ratio','4 / 3');
    } else if(event.target.id === "세로형"){
        root.style.setProperty('--image-ratio','3 / 4');
    }
}

// 플로팅 버튼 선택 시, 화면 맨 위로 이동
function scrollpage () {

    window.scrollTo({ top: 0, behavior: "smooth" })

}

// 다이어리 카드 삭제 함수
function deleteDiaryCard (event, index) {

    // 이벤트 버블링 방지
    event.preventDefault();

    // 카드 삭제 모달 두두둥장
    viewModal('delete__modal')

    const button = document.getElementById("delete__card");
    button.addEventListener('click', () => {
        
        // 현재 카드 배열에서 삭제 버튼 누른 카드 삭제
        diaryCard.splice(index, 1);
        
        // 삭제 후 카드 재배치를 위한 localstorage 업데이트
        localStorage.setItem("diaryCardList",JSON.stringify(diaryCard))

    })
    
    // 다이어리 카드 만들기 함수 실행
    addDiaryCard();

}

// 플로팅 버튼
// 플로팅 버튼 클릭 시 현재 화면 제일 위로 이동
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

// 페이지 로드가 될 때 첫 화면 세팅
// 필터메뉴(일기보관함, 사진보관함), 전체 다이어리 카드 불러오기
window.onload = () => {

    document.getElementById("filter__menu").innerHTML = diary__filter;
    addDiaryCard()

}


// 페이지가 로드될 때 마다, 카드 추가하기 함수 실행
window.addEventListener("load",addDiaryCard)


// 플로팅 버튼 실행
window.addEventListener("scroll", floatingButton)
window.addEventListener("resize", floatingButton)
window.addEventListener("load", floatingButton)