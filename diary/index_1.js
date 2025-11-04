

let 카드 = document.getElementById("카드영역")
let 단일카드


const 일기카드목록 = () =>{
    let 오늘의제목 = document.getElementById("오늘의제목").value
    let 오늘의내용 = document.getElementById("오늘의내용").value
    let 오늘의기분 = ""
    let 행복 = document.getElementById("행복").checked
    let 슬픔 = document.getElementById("슬픔").checked
    let 놀람 = document.getElementById("놀람").checked
    let 화남 = document.getElementById("화남").checked
    let 기타 = document.getElementById("기타").checked

    let 기분객체 = {
        행복해요 : 행복 , 
        슬퍼요 : 슬픔,
        놀랐어요 : 놀람,
        화나요 :  화남, 
        기타 : 기타}

    console.log(기분객체)
    for (let key in 기분객체){
        if (기분객체[key] === true){
            오늘의기분 = key
        }
    }

    
    단일카드 = {
        기분  : 오늘의기분,
        제목 : 오늘의제목,
        내용 : 오늘의내용
    } 
    let 일기카드배열 = JSON.parse(localStorage.getItem("일기카드들")) || []
    일기카드배열.push(단일카드)
    localStorage.setItem("일기카드들", JSON.stringify(일기카드배열))
    let 카드내용 = JSON.parse(localStorage.getItem("일기카드들"))
    console.log("로컬저장후 불러옴", 카드내용, typeof(카드내용))
    let 이미지경로 = (ele, index)=>{
        
            if(ele.기분 === "행복해요"){
                image_url = './assets/Frame4.png'
            }else if(ele.기분 === "슬퍼요"){
                image_url = './assets/Frame1.png'
            }else if(ele.기분 === "놀랐어요"){
                image_url = './assets/Frame2.png'
            }else if(ele.기분 === "화나요"){
                image_url = './assets/Frame3.png'
            }else if(ele.기분 === "기타"){
                image_url = './assets/Frame5.png'
            }
        return image_url
        
    }
    let 경로 = 카드내용.map(이미지경로)

    let 태그생성 = (ele, index)=>{
        let image_url_=경로[index]
        return    `<a href="./detial.html?number=${index}">
                    <div id="카드${index}" class="카드">
                            <div id="카드이미지${index}" class="카드이미지" style="background-image: url(${image_url_})">
                                <button class="삭제버튼" onclick='카드삭제기능()'>X</button>
                            </div>                            
                            <div id="" class="카드내용요약">
                                <div class="첫줄">
                                    <div class="기분노출">
                                        <div>${ele.기분}</div>
                                    </div>
                                    <div class="날짜노출">'00.00.00'</div>
                                </div>
                                <div class="내용요약">
                                    <div>${ele.내용}</div>
                                </div>                     
                        </div>
                    </div>
                </a>
                `
    }
    카드.innerHTML = 카드내용.map(태그생성).join("")
    console.log(카드.innerHTML)  
    
}

const 필터기능 = (event)=>{
    let 필터링전모든카드= JSON.parse(localStorage.getItem("일기카드들")) || []
    let 필터된카드 = localStorage.setItem("필터링일기카드들", JSON.stringify(필터링전모든카드))
    필터링전모든카드= JSON.parse(localStorage.getItem("일기카드들")) 
    console.log("필터링전모든카드 : ", 필터링전모든카드)
    const 선택된감정 = event.target.value
    console.log("선택된감정 : ", 선택된감정)
    let 필터된일기
    switch(선택된감정){
        case "행복" :{
            필터된일기 = 필터링전모든카드.filter((ele) => ele.기분 === "행복해요")
            console.log("필터된일기 :", 필터된일기)
            url_='./assets/Frame4.png'
            break
        }
        case "슬픔" :{
            필터된일기 = 필터링전모든카드.filter((ele) => ele.기분 === "슬퍼요")
            console.log("필터된일기 :", 필터된일기)
            url_='./assets/Frame1.png'
            break
        }
        case "놀람" :{
            필터된일기 = 필터링전모든카드.filter((ele) => ele.기분 === "놀랐어요")
            console.log("필터된일기 :", 필터된일기)
            url_='./assets/Frame2.png'
            break
        }
        case "화남" :{
            필터된일기 = 필터링전모든카드.filter((ele) => ele.기분 === "화나요")
            console.log("필터된일기 :", 필터된일기)
            url_='./assets/Frame3.png'
            break
        }
        case "기타" :{
            필터된일기 = 필터링전모든카드.filter((ele) => ele.기분 === "기타")
            console.log("필터된일기 :", 필터된일기)
            url_='./assets/Frame5.png'
            break
        }
        case "전체" : {
            JSON.parse(localStorage.getItem("일기카드들"))
            일기카드목록()
            return
        }
    }
    console.log("필터된일기 : ", 필터된일기)
    카드.innerHTML = ""
    카드.innerHTML = 필터된일기.map((ele, index)=>{
        let original_index = 필터링전모든카드.indexOf(ele)

        return `<a href="./detial.html?number=${original_index}">
                    <div id="카드${index}" class="카드">
                            <div id="카드이미지${index}" class="카드이미지" style="background-image: url(${url_})">
                                <button class="삭제버튼" onclick='카드삭제기능(${index})'>X</button>
                            </div>
                            <div id="" class="카드내용요약">
                                <div class="첫줄">
                                    <div class="기분노출">
                                        <div>${ele.기분}</div>
                                    </div>
                                    <div class="날짜노출">'00.00.00'</div>
                                </div>
                                <div class="내용요약">
                                    <div>${ele.내용}</div>
                                </div>                     
                        </div>
                    </div>
                </a>
                `
    }).join("")
        
    // return 필터된일기

}
const 카드삭제기능 = (index) =>{
    JSON.parse(localStorage.getItem("일기카드들").removeItem(index))
}


window.onload = () =>{
    let 카드목록 = JSON.parse(localStorage.getItem("일기카드들"))
    let 이미지경로 = (ele)=>{
        
        if(ele.기분 === "행복해요"){
            image_url = './assets/Frame4.png'
        }else if(ele.기분 === "슬퍼요"){
            image_url = './assets/Frame1.png'
        }else if(ele.기분 === "놀랐어요"){
            image_url = './assets/Frame2.png'
        }else if(ele.기분 === "화나요"){
            image_url = './assets/Frame3.png'
        }else if(ele.기분 === "기타"){
            image_url = './assets/Frame5.png'
        }
        return image_url
    
    }
    카드.innerHTML = 카드목록.map((ele, index) => {
        let image_url = 이미지경로(ele);
        return `
            <a href="./detial.html?number=${index}">
                <div id="카드${index}" class="카드">
                    <div id="카드이미지${index}" class="카드이미지" style="background-image: url(${image_url})">
                        <button class="삭제버튼" onclick='카드삭제기능(${index})'>X</button>
                    </div>
                    <div class="카드내용요약">
                        <div class="첫줄">
                            <div class="기분노출">
                                <div>${ele.기분}</div>
                            </div>
                            <div class="날짜노출">'00.00.00'</div>
                        </div>
                        <div class="내용요약">
                            <div>${ele.내용}</div>
                        </div>                     
                    </div>
                </div>
            </a>
        `;
    }).join("")
}