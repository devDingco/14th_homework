
let 인증확인 = false
let 반복
function 인증하기(){
    인증확인 = true
    if (반복){
    clearInterval(반복)
    }
    time =180
    document.getElementById("인증하기버튼").style.backgroundColor = "gray"
    document.getElementById("인증하기버튼").style.color = "black"
    document.getElementById("인증하기버튼").disables = true
    document.getElementById("인증요청버튼").style.backgroundColor = " #491449"
    document.getElementById("인증요청버튼").style.color = "white"
    document.getElementById("인증요청버튼").disables = false
    
}
function 인증번호요청기능(){  
    document.getElementById("인증하기버튼").style.backgroundColor = " #491449"
    document.getElementById("인증하기버튼").style.color = "white"
    document.getElementById("인증하기버튼").disables = false
    document.getElementById("인증요청버튼").style.backgroundColor = "gray"
    document.getElementById("인증요청버튼").style.color = "black"
    document.getElementById("인증요청버튼").disables = true
    let random_number = String(Math.floor(Math.random()*1000000)).padStart(6, "0")
    document.getElementById("인증번호보여주는곳").innerText = random_number
    반복 = setInterval(남은시간계산기능, 1000)
    // 반복
}



let time = 180
function 남은시간계산기능(){
    time -=1    
    let minutes = Math.floor(time/60)
    let seconds = String(time%60).padStart(2,"0")
    document.getElementById("남은시간보여주는곳").innerText = minutes + ":" + seconds
    if (time === 0){
        if(반복){
        clearInterval(반복)
        }
        time = 180
        document.getElementById("인증하기버튼").style.backgroundColor = "gray"
        document.getElementById("인증하기버튼").style.color = "black"
        document.getElementById("인증하기버튼").disables = true
        document.getElementById("인증요청버튼").style.backgroundColor = " #491449"
        document.getElementById("인증요청버튼").style.color = "white"
        document.getElementById("인증요청버튼").disables = false
    }

} 
function 가입확인기능(){

    if(document.getElementById("비번").value !== document.getElementById("비번확인").value){
        document.getElementById("비밀번호재입력alert").innerText = "비밀번호와 비밀번호 확인이 일치하지 않습니다."
    }
    
}

function 가입활성기능(){
    
    const named = document.getElementById("이름").value
    const email = document.getElementById("이메일").value
    const psw = document.getElementById("비번").value
    const psw_ = document.getElementById("비번확인").value
    const phone = document.getElementById("전화번호").value   
    const self_introduction = document.getElementById("자기소개").value
    const female = document.getElementById("radio_1").checked
    const male = document.getElementById("radio_2").checked
    const agreement = document.getElementById("checkbox_").checked

    const 인풋확인 = (named !== "") && (email !== "") && (psw !== "") && (psw_ !== "") && (phone !== "")&& (self_introduction !== "") 
    const 선택확인 = (female === true) || (male === true) 
    const 체크확인 = agreement === true
    // const 인증확인 = validation
    
    if(인풋확인 && 선택확인 && 체크확인 && 인증확인){
        document.getElementById("가입버튼").style.backgroundColor = " #491449"
        document.getElementById("가입버튼").style.color = "white"
        document.getElementById("가입버튼").disables = false
        
    }else{
        document.getElementById("가입버튼").style.backgroundColor = "gray"
        document.getElementById("가입버튼").style.color = "black"
        document.getElementById("가입버튼").disables = true
    }

}
