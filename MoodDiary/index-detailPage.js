const 일기목록 = location.search
        const 일기목록나누어 = new URLSearchParams(일기목록)
        const 일기인덱스 = 일기목록나누어.get("number")
        console.log(일기목록);
        console.log(일기목록나누어);
        console.log(일기인덱스);

        const 일기 = localStorage.getItem("일기목록")
        const 일기내용배열 = JSON.parse(일기 === null ? "[]" : 일기)
        
        console.log(일기내용배열)
        // localStorage.setItem("일기목록",JSON.stringify(일기내용))

        
        alert(`${일기내용배열[일기인덱스].날짜}에 작성한 제목: "${일기내용배열[일기인덱스].제목}" 의 상세 페이지 입니다.`)

        let 기분한글변환 = "";

        switch(일기내용배열[일기인덱스].기분){
            case "happy" : 기분한글변환 = "행복해요"; break;
            case "sad" : 기분한글변환 = "슬퍼요"; break;
            case "angry" : 기분한글변환 = "화나요"; break;
            case "surprised" : 기분한글변환 = "놀라워요"; break;
            default : 기분한글변환 = "기타";
        } 
            


        const 일기상세HTML = 
        `<div class="일기상세__다이어리">
           <div class="일기상세__다이어리__제목">민지의 다이어리</div>
       </div>
       <div class="일기상세__메인">
           <div class="일기상세__메인__헤드">
               <div class="일기상세__메인__헤드__타이틀">
                   <div>${일기내용배열[일기인덱스].제목} </div>
                    <hr>
               </div>
               <div class="일기상세__메인__헤드__감정날짜">
                   <div class="일기상세__메인__헤드__감정날짜__감정">
                      <div ><img src="./assets/images/${일기내용배열[일기인덱스].기분}.png" alt="" class="일기상세__메인__헤드__감정날짜__감정__감정이모티콘"></div>
                        <div>${기분한글변환}</div>
                   </div>
                   <div>${일기내용배열[일기인덱스].날짜}</div>
               </div>
           </div>
       
           <div class="일기상세__메인__내용">
                <div>내용</div>
                <div>${일기내용배열[일기인덱스].내용}</div>
            </div>
            <div class="일기상세__수정">
                <button>수정</button>
                <button>삭제</button>
                
             </div>
        </div>`
    
        window.addEventListener('DOMContentLoaded', () => {
            document.getElementById("일기상세").innerHTML = 일기상세HTML;
        });

    // document.getElementById("일기상세").innerHTML = 일기상세HTML

    console.log(일기상세HTML)





