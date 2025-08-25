    // let 단일카드
// let index
let 마지막페이지 = Math.ceil((JSON.parse(localStorage.getItem("일기카드들")).length)/12)
console.log("마지막페이지", 마지막페이지)
let 시작페이지 = 1

const 단일카드객체생성 = () =>{
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

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2,0);
    const day = String(today.getDate()).padStart(2,0);
    const 오늘의날짜 = `${year}.${month}.${day}`
    
    let 단일카드 = {
    
        기분  : 오늘의기분,
        제목 : 오늘의제목,
        내용 : 오늘의내용,
        날짜 : 오늘의날짜
    }
    if (document.getElementById("오늘의제목").value){
        return 단일카드
    }else{
        return
    }
    
}
const 카드내용_이미지경로_배열생성 = ()=>{
    
    let 일기카드배열 = JSON.parse(localStorage.getItem("일기카드들")) ||[]
    
    
    if(document.getElementById("오늘의제목").value){
        단일카드 = 단일카드객체생성() 
        일기카드배열.push(단일카드)

        localStorage.setItem("일기카드들", JSON.stringify(일기카드배열))
        let 카드내용 = JSON.parse(localStorage.getItem("일기카드들"))
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
        
        let 경로 = 카드내용.map(이미지경로)
        return [카드내용, 경로]
    }
    else{
        
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
    
        let 경로 = 일기카드배열.map(이미지경로)
        return [일기카드배열, 경로]
        
    }
      
}

const 카드태그생성= (index=-1) =>{
    document.getElementById("일기쓰기").style = "display : none"
    document.getElementById("일기쓰기모달배경").style = "display : none"

    document.getElementById("등록완료모달").style = "display : none"
    document.getElementById("모달배경_2").style = "display : none"

    let i
    let 태그배열 
    let [카드내용, 이미지경로] = 카드내용_이미지경로_배열생성()


    console.log("카드내용!!!!", 카드내용)
    console.log("이미지경로!!! ", 이미지경로 )
    document.getElementById("카드영역").innerHTML=""   

    if(index === -1){ 
        console.log("바보야!!")
        태그배열 = []
        for( i = 0 ; i < 카드내용.length; i++){
            index +=1 
            let image_url_=이미지경로[i]
            let 단일태그 = `<a href="./detial.html?number=${index}" style="text-decoration: none;width: 274px; height: 296px">
                            <div id="카드${index}" class="카드">
                                <div class="카드와삭제">
                                    <img id="카드이미지${index}" class="카드이미지" src=${image_url_} >
                                    <img id="${index}" class="삭제버튼" src="./assets/close_outline_light_m.svg" onclick='카드삭제기능(event)'>
                                </div>                            
                                <div id="카드내용요약" class="카드내용요약">
                                    <div class="첫줄">
                                        <div class="기분노출">
                                            ${카드내용[i].기분}
                                        </div>
                                        <div class="날짜노출">${카드내용[i].날짜}</div>
                                    </div>
                                    <div class="내용요약">
                                        <div>${카드내용[i].내용}</div>
                                    </div>                     
                                </div>
                            </div>
                        </a>
                        `   
                태그배열.push(단일태그)
            
              
            }
        document.getElementById("오늘의제목").value =""
        document.getElementById("오늘의내용").value =""
        document.getElementById("행복").checked = false
        document.getElementById("슬픔").checked = false
        document.getElementById("놀람").checked = false
        document.getElementById("화남").checked = false
        document.getElementById("기타").checked = false
        document.getElementById("카드영역").innerHTML = 태그배열.join("")    

        }
    else{

        for (i =0 ; i < index.length; i++){
            
            let image_url_=이미지경로[index[i]]
            let 단일태그 = `<a href="./detial.html?number=${index[i]}" style="text-decoration: none; width: 274px; height: 296px">
                                <div id="카드${index[i]}" class="카드">
                                    <div class="카드와삭제">
                                        <img id="카드이미지${index[i]}" class="카드이미지" src=${image_url_}>
                                        <img id="${index[i]}" class="삭제버튼" src="./assets/close_outline_light_m.svg" onclick='카드삭제기능(event)'>
                                        
                                    </div>                            
                                    <div id="카드내용요약" class="카드내용요약">
                                        <div class="첫줄">
                                            <div class="기분노출">
                                                ${카드내용[index[i]].기분}
                                            </div>
                                            <div class="날짜노출">${카드내용[index[i]].날짜}</div>
                                        </div>
                                        <div class="내용요약">
                                            <div>${카드내용[index[i]].내용}</div>
                                        </div>                     
                                    </div>
                                </div>
                            </a>
                            `
            console.log("단일태그", 단일태그)
            document.getElementById("카드영역").innerHTML +=단일태그
            }
    
        }
    }   

const 필터기능 = (event)=>{
    let 필터링전모든카드= JSON.parse(localStorage.getItem("일기카드들")) || []
    let 선택된감정 = event.target.value
    console.log("선택된감정", 선택된감정)
    let 필터된일기
    
    let [카드내용, 이미지경로] = 카드내용_이미지경로_배열생성()
    // console.log(카드)
    console.log("카드내용", 카드내용, "이미지경로", 이미지경로)
    switch(선택된감정){
        case "행복해요" :{
            필터된일기 = 카드내용.filter((ele) => ele.기분 === "행복해요")
            console.log("필터된일기", 필터된일기)
            if(필터된일기[0]){
               let original_index = 필터된일기.map((el)=>카드내용.indexOf(el))
               console.log("original_index", original_index)
               let 마지막페이지 = Math.max(1, Math.ceil(필터된일기.length / 12));
               console.log("마지막", 마지막페이지)
               이전페이지기능()
               다음페이지기능()
               페이지기능()
               카드목록그리기기능(original_index)
            }
            else{document.getElementById("카드영역").innerHTML=""}
            break
        }
        case "슬퍼요" :{
            필터된일기 = 카드내용.filter((ele) => ele.기분 === "슬퍼요")
            if(필터된일기[0]){
                let original_index = 필터된일기.map((el)=>카드내용.indexOf(el))
                console.log("original_index", original_index)
                let 마지막페이지 = Math.max(1, Math.ceil(필터된일기.length / 12));
                이전페이지기능()
                다음페이지기능()
                페이지기능()
                카드목록그리기기능(original_index)
             }else{document.getElementById("카드영역").innerHTML=""}
            break
        }
        case "놀랐어요" :{
            필터된일기 = 카드내용.filter((ele) => ele.기분 === "놀랐어요")
            if(필터된일기[0]){
                let original_index = 필터된일기.map((el)=>카드내용.indexOf(el))
                console.log("original_index", original_index)
                let 마지막페이지 = Math.max(1, Math.ceil(필터된일기.length / 12));
                이전페이지기능()
                다음페이지기능()
                페이지기능()
                카드목록그리기기능(original_index)
             }else{document.getElementById("카드영역").innerHTML=""}
            break
        }
        case "화나요" :{
            필터된일기 = 카드내용.filter((ele) => ele.기분 === "화나요")
            if(필터된일기[0]){
                let original_index = 필터된일기.map((el)=>카드내용.indexOf(el))
                console.log("original_index", original_index)
                let 마지막페이지 = Math.max(1, Math.ceil(필터된일기.length / 12));
                이전페이지기능()
                다음페이지기능()
                페이지기능()
                카드목록그리기기능(original_index)
             }else{document.getElementById("카드영역").innerHTML=""}
            break
        }
        case "기타" :{
            console.log("기타선택!!!!!!!!!")
            필터된일기 = 카드내용.filter((ele) => ele.기분 === "기타")
            if(필터된일기[0]){
                let original_index = 필터된일기.map((el)=>카드내용.indexOf(el))
                console.log("original_index", original_index)
                let 마지막페이지 = Math.max(1, Math.ceil(필터된일기.length / 12));
                이전페이지기능()
                다음페이지기능()
                페이지기능()
                카드목록그리기기능(original_index)
             }else{document.getElementById("카드영역").innerHTML=""}
            break
        }
        case "전체" : {
            JSON.parse(localStorage.getItem("일기카드들"))
            이전페이지기능()
            다음페이지기능()
            페이지기능()
            카드태그생성()
            return
        }
    }
 
}   
  
    

const 카드삭제기능 = (event) =>{
    event.preventDefault()
    let 카드내용 = 카드내용_이미지경로_배열생성()[0]
    // let 이미지경로 = 카드내용_이미지경로_배열생성()[1]
    let 삭제할인덱스배열 = []
    삭제할인덱스배열.push(Number(event.target.id))
    let 인덱스배열 = () =>{
        const 전체인덱스 = []
        for(let i=0; i < 카드내용.length; i++){
            전체인덱스.push(i)
        }
        return 전체인덱스
    }
    let 전체인덱스 = 인덱스배열()
    // const 남은인덱스 = 전체인덱스.filter((ele)=> !삭제할인덱스배열.includes(ele))
    console.log("전체인덱스",전체인덱스,"삭제할인덱스배열",삭제할인덱스배열)
    const 남은내용 = 카드내용.filter((ele, index) => !삭제할인덱스배열.includes(index))
    localStorage.removeItem("일기카드들")
    localStorage.setItem("일기카드들", JSON.stringify(남은내용))
    // const 남은객체 = JSON.parse(localStorage.getItem("남은내용"))
    // 카드태그생성()
    카드목록그리기기능(1)

}

const 일기쓰기노출기능= ()=>{
    document.getElementById("일기쓰기").style = "display : flex"
    document.getElementById("일기쓰기모달배경").style = "display : flex"
}
const 등록완료팝업생성 = () =>{ 
    document.getElementById("등록완료모달").style = "display : flex"
    document.getElementById("모달배경_2").style = "display : flex"

}
const 등록취소팝업생성 = () =>{
    document.getElementById("등록취소모달").style = "display : flex"
    document.getElementById("모달배경_2").style = "display : flex"
} 

const 일기보관함렌더링 = () =>{
    let 카드목록 = JSON.parse(localStorage.getItem("일기카드들")) || []
    if (카드목록[0]){
        카드태그생성()
    }else{document.getElementById("카드영역").innerHTML=''}
    document.getElementById("필터검색일기쓰기버튼").innerHTML =`
         <div class="필터검색기능">
            <div class="필터전체">
            <input type="checkbox" class="필터제목" id="필터제목ID">
            <ul class="필터목록" id="필터목록ID">
                <li> <input id="전체" type="radio" name="필터" value="전체" onclick="필터선택기능(event);필터기능(event)">
                    <label for="전체">전체</label>
                </li>
                <li> <input id="행복해요" type="radio" name="필터" value="행복해요" onclick="필터선택기능(event);필터기능(event)">
                    <label for="행복해요">행복해요</label>
                </li>
                <li> <input id="슬퍼요" type="radio" name="필터" value="슬퍼요" onclick="필터선택기능(event);필터기능(event)">
                    <label for="슬퍼요">슬퍼요</label>
                </li>
                <li> <input id="놀랐어요" type="radio" name="필터" value="놀랐어요" onclick="필터선택기능(event);필터기능(event)">
                    <label for="놀랐어요">놀랐어요</label>
                </li>
                <li> <input id="화나요" type="radio" name="필터" value="화나요" onclick="필터선택기능(event);필터기능(event)" >
                    <label for="화나요">화나요</label>
                </li>
                <li> <input id="기타_" type="radio" name="필터" value="기타" onclick="필터선택기능(event);필터기능(event);">
                    <label for="기타_">기타</label>
                </li>
            </ul>
            </div>
            <input class="검색인풋" id="검색기능" type="text" placeholder="검색어를 입력해 주세요." oninput="검색기능(event)">      
        </div>
        <img id="일기쓰기버튼" class="일기쓰기버튼" onclick="일기쓰기노출기능()" src="./assets/드롭다운.png"/>`
}

const 필터선택기능 = (event) =>{
    document.getElementById("필터제목ID").style =  `--필터제목 : "${event.target.id}" `          
    document.getElementById("필터제목ID").click()
}

document.getElementById("계속작성").addEventListener("click", ()=>{
    document.getElementById("등록취소모달").style = "display : none"
    document.getElementById("모달배경_2").style = "display : none"
})

document.getElementById("등록취소").addEventListener("click", ()=>{
    document.getElementById("일기쓰기").style = "display : none"
    document.getElementById("일기쓰기모달배경").style = "display : none"
        document.getElementById("등록취소모달").style = "display : none"
    document.getElementById("모달배경_2").style = "display : none"
})

let 타이머
const 검색기능=(event)=>{
    clearTimeout(타이머)
    const 일기카드배열 = JSON.parse(localStorage.getItem("일기카드들")) ||[]
    타이머 = setTimeout(()=>{
        const 내가검색한제목 = event.target.value
        console.log("내가검색한제목", 내가검색한제목)
        const 검색결과 = 일기카드배열.filter((ele)=>{return ele.제목.includes(내가검색한제목)
        })
        console.log("검색결과", 검색결과)
        const 검색된일기원래인덱스 = 검색결과.map((ele)=>{return 일기카드배열.indexOf(ele)})
        console.log("검색된일기원래인덱스", 검색된일기원래인덱스)

        카드태그생성(검색된일기원래인덱스)
    }, 2000)

}

const 다크모드기능=(event)=>{
    document.body.classList.toggle("다크모드만들기")
}



const 이전페이지기능= () =>{
    if(시작페이지 >= 6 ){
        시작페이지-=5
        페이지기능()
    }   
}
const 다음페이지기능 = () =>{
    시작페이지+=5
    if(마지막페이지>=시작페이지){
        페이지기능()
    }
}
const 페이지기능 = () =>{
    const arr = new Array(5).fill("mj")
    const 페이지들 = arr.map((ele, index)=>{
        const 페이지번호 = index + 시작페이지
        if(페이지번호 <= 마지막페이지){
            return ` <button onclick="카드목록그리기기능(${페이지번호})">${페이지번호}</button>`
        }else{ return ""}
    }).join("")
   
    document.getElementById("페이지영역").innerHTML = 페이지들

}

const 카드목록그리기기능 = (페이지번호 = 마지막페이지) =>{
    if(typeof(페이지번호) === "number"){
    let 일기카드배열 = JSON.parse(localStorage.getItem("일기카드들")) ||[]
    const 카드목록 = 일기카드배열.filter((ele, index) =>{
        const 건너뛸갯수 = (페이지번호 -1)*12
        return (건너뛸갯수 < index+1) && (건너뛸갯수+12 >= index +1)
    })
    console.log("카드목록", 카드목록)
    let original_index = 카드목록.map((ele,index)=>{return 일기카드배열.indexOf(ele)})
    console.log("오리진인덱스", original_index)
    카드태그생성(original_index)
    }
    else{
        카드태그생성(페이지번호)
    }
    
}

window.일기보관함렌더링=일기보관함렌더링;

window.onload = () =>{
    페이지기능()
    카드목록그리기기능(시작페이지)
    document.getElementById("다음페이지").style.transform = "rotate(180deg)"
    // console.log("마지막페이지", 마지막페이지)
}
