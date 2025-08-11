let i = 0
let 카드 = document.getElementById("카드영역")
let 일기카드배열 = []
let 단일카드 = {
    기분 : "",
    제목 : "",
    내용 : ""
}




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
    console.log(단일카드)
    일기카드배열.push(단일카드)
    let 카드저장 = localStorage.setItem("일기카드들", JSON.stringify(일기카드배열))
    let 카드내용 = JSON.parse(localStorage.getItem("일기카드들"))

    console.log("로컬저장후 불러옴", 카드내용, typeof(카드내용))

    카드.innerHTML = 카드.innerHTML +

    `       <a href="./detial.html?number=${i}">
                <div id="카드${i}" class="카드">
                        <div id="카드이미지${i}" class="카드이미지"></div>
                        <div id="" class="카드내용요약">
                            <div class="첫줄">
                                <div class="기분노출">
                                    <div>${카드내용[i].기분}</div>
                                </div>
                                <div class="날짜노출">'00.00.00'</div>
                            </div>
                            <div class="내용요약">
                                <div>${카드내용[i].내용}</div>
                            </div>                     
                    </div>
                    </div>
                </a>
    `
    if(행복){
       document.getElementById(`카드이미지${i}`).style.backgroundImage = "url('./assets/Frame4.png')"
    }else if(슬픔){
        image_url = "./assets/Frame1.png"
        document.getElementById(`카드이미지${i}`).style.backgroundImage = "url('./assets/Frame1.png')"  
    }else if(놀람){
        image_url = "./assets/Frame2.png"
        document.getElementById(`카드이미지${i}`).style.backgroundImage = "url('./assets/Frame2.png')"
    }else if(화남){
        image_url = "./assets/Frame3.png"
        document.getElementById(`카드이미지${i}`).style.backgroundImage = "url('./assets/Frame3.png')"
    }else if(기타){
        image_url = "./assets/Frame5.png"
        document.getElementById(`카드이미지${i}`).style.backgroundImage = "url('./assets/Frame5.png')" 
    }

    i+=1  
    
}
