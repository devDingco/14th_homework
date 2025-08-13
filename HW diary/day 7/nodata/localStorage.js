window.onload = () => {
 console.log()
};

window.addEventListener("scroll", () => {
            const scrollDownLength = window.scrollY
            
            if(scrollDownLength >0) {
                document.getElementById("필터색변화").style=<div class=selection_text-reverse>selection_text-reverse</div>

            } else {
                document.getElementById("필터색변화").style= "background-color: none"
            }
        })





const diaryList = [];

const registerDiary = () => {
    const today_date = new Date()

    const dateDetail = {
        year: today_date.getFullYear(),
        month: (today_date.getMonth()+1).toString().padStart(2,"0"),
        date: (today_date.getDate()).toString().padStart(2, "0"),
    };

    const dateStorage = dateDetail.map((el, index) => ` ${el, year}.${el, month}.${el, date} ` ).join("");
    const titleStorage = window.document.getElementById("id_diary__title").value;
    const contextStorage = window.document.getElementById("id_diary__contextarea").value;

    let 행복변수 = window.document.getElementById("happy");
    let 슬픔변수 = window.document.getElementById("sad");
    let 놀람변수 = window.document.getElementById("shocked");
    let 화남변수 = window.document.getElementById("angry");
    let 기타변수 = window.document.getElementById("etccc");

};
//일기 목록화
const diaryStorage = {
    title: titleStorage,
    text: contextStorage,
    wrdate: dateStorage,
};
// 일기 배열에 넣기
diaryList.push(diaryStorage);
// 일기번호 따기
const diaryNumbering = diaryList.length-1;

const 기존그림이랑본문 = window.document.getElementById(picbox).innerHTML;

const 행복 = <img class="emoticon" src="./assets/icons/happy.png" />
const 슬픔 = <img class="emoticon" src="./assets/icons/sad.png" />
const 놀람 = <img class="emoticon" src="./assets/icons/suprise.png" />
const 화남 = <img class="emoticon" src="./assets/icons/angry.png" />
const 기타 = <img class="emoticon" src="./assets/icons/etc.png" />


const 새로등록된그림이랑본문 = ` 
    ${행복변수 === true? < 행복 : ""}
    ${슬픔변수 === true? < 슬픔 : ""}
    ${놀람변수 === true? < 놀람 : ""}
    ${화남변수 === true? < 화남 : ""}
    ${기타변수 === true? < 기타 : ""}

`;