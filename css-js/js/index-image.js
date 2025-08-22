let image__list = `<div id=dog__list></div>`;
let dogImageURL = ''
const skeleton__list = new Array(10).fill(`<div class="skeleton__background"></div>`).join("")
let result ;
let resultJSON ;
let imageURL ;

/* 강아지 이미지 불러오는 함수 (API) */
async function dogImageAPI() {
    result = await fetch('https://dog.ceo/api/breeds/image/random/10');

    resultJSON = await result.json();

    imageURL = resultJSON.message;

    dogImageURL = dogImageURL + imageURL.map(el => `
        <img id="dog__image" class="dog__image" src="${el}"/>
        `).join("")

    document.getElementById("dog__list").innerHTML = dogImageURL
}

/* 처음 메뉴 진입 시 강아지 사진 불러오는 함수 */
async function addImageCard() {

    // 메뉴 처음 눌렀을 때 기존 URL 주소 초기화 후 새로 이미지 불러오기
    dogImageURL = ''
    document.getElementById("dog__list").innerHTML = skeleton__list

    dogImageAPI()

}


/* 무한 스크롤 */
let timer = ""
window.addEventListener("scroll", ()=>{
    
    // 스크롤되었을 때 선택된 메뉴가 사진보관함 일 때, 무한 스크롤 시작
    const tabMenuClass = document.getElementById("click__image__list").classList.value
    if(tabMenuClass!=="content__tab__menu") return

    
    if(timer !== "") return

    timer = setTimeout(()=>{
        timer = ""
    },1000)

    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    const scrolled = scrollTop / (scrollHeight - clientHeight)

    if (scrolled < 0.85) return

    
    document.getElementById("dog__list").innerHTML = dogImageURL + skeleton__list

    dogImageAPI()
    

})







const image__filter = `
    <div class="dropdown__group">
        <img class="dropdown__img" src="./assets/icons/down_fill_light_m.svg"/>
        <input type="checkbox" id="dropdown__title" class="dropdown__title"/>
        <ul class="dropdown__list">
            <li>
                <input type="radio" id="기본" name="dropdown" onclick="selectDropDown(event);imageRatio(event);"/>
                <label for="기본">기본<img src="./assets/icons/check_outline_light_xs.svg"/></label>
            </li>
            <li>
                <input type="radio" id="가로형" name="dropdown" onclick="selectDropDown(event);imageRatio(event);"/>
                <label for="가로형">가로형<img src="./assets/icons/check_outline_light_xs.svg"/></label>
            </li>
            <li>
                <input type="radio" id="세로형" name="dropdown" onclick="selectDropDown(event);imageRatio(event);"/>
                <label for="세로형">세로형<img src="./assets/icons/check_outline_light_xs.svg"/></label>
            </li>
        </ul>
    </div>
`

async function loadImageCard(){
    const skeleton__list = new Array(10).fill(`<div class="skeleton__background"></div>`).join("")

    document.getElementById("dog__list").innerHTML = dogImageURL + skeleton__list

    const result = await fetch('https://dog.ceo/api/breeds/image/random/10');
    console.log(result);

    const resultJSON = await result.json();

    console.log(resultJSON);

    const imageURL = resultJSON.message;
    console.log(imageURL);

    dogImageURL = dogImageURL + imageURL.map(el => `
    <img id="dog__image" class="dog__image" src="${el}"/>
    `).join("")

    document.getElementById("dog__list").innerHTML = dogImageURL
}

