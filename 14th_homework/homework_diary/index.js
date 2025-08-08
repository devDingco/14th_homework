let i = 3
let 카드 = document.getElementById("카드영역")
const 일기카드생성=()=>{
    i+=1
    console.log("바보")
    카드.innerHTML = 카드.innerHTML + `
                <div id="카드${i}" class="카드">
                    <div id="" class="카드이미지"></div>
                    <div id="" class="카드내용요약"></div>
                </div>
                `
    console.log(카드)
    
    
}