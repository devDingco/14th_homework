
let 인증확인 = false
let 반복
let named 
let email 
let psw
let psw_ 
let phone  
let self_introduction 
let female 
let male
let agreement 

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
    document.getElementById("남은시간보여주는곳").innerText = "3:00"
    document.getElementById("인증번호보여주는곳").innerText = "000000"
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

    if(psw !== psw_){
        document.getElementById("비밀번호재입력alert").innerText = "비밀번호와 비밀번호 확인이 일치하지 않습니다."
        // document.getElementById("가입버튼").style.backgroundColor = "gray"
        // document.getElementById("가입버튼").style.color = "black"
        document.getElementById("가입버튼").disables = true
        psw = ""
        psw_ = ""
    }
    let third_phone = phone.substr(0,3)
    if(String(third_phone)!=='010'){
        console.log("010으로 시작하지 않음")
        phone = ""
        document.getElementById("전화번호유효성alert").innerText = "전화번호는 010으로 시작해야 합니다."
        // 가입활성기능()
        // document.getElementById("가입버튼").style.backgroundColor = "gray"
        // document.getElementById("가입버튼").style.color = "black"
        // document.getElementById("가입버튼").disables = true
        // document.getElementById("전화번호").value = ""
    }
    // if(!("-" in document.getElementById("전화번호").value)){
    //     alert("전화번호에 '-'이 포함되어햐 합니다.")
    //     document.getElementById("가입버튼").style.backgroundColor = "gray"
    //     document.getElementById("가입버튼").style.color = "black"
    //     document.getElementById("가입버튼").disables = true
    //     document.getElementById("전화번호").value = ""
    // }
}

function 가입활성기능(){
    named = document.getElementById("이름").value
    email = document.getElementById("이메일").value
    psw = document.getElementById("비번").value
    psw_ = document.getElementById("비번확인").value
    phone = document.getElementById("전화번호").value   
    self_introduction = document.getElementById("자기소개").value
    female = document.getElementById("radio_1").checked
    male = document.getElementById("radio_2").checked
    agreement = document.getElementById("checkbox_").checked

    

    let 인풋확인 = (named !== "") && (email !== "") && (psw !== "") && (psw_ !== "") && (phone !== "")&& (self_introduction !== "") 
    let 선택확인 = (female === true) || (male === true) 
    let 체크확인 = agreement === true
    // const 인증확인 = validation
    // console.log(named,email,psw,psw_,phone,self_introduction)
    // console.log(선택확인)
    // console.log(agreement)
    // console.log(인증확인)
    
    if(인풋확인 && 선택확인 && 체크확인 && 인증확인 ){
        
        document.getElementById("가입버튼").style.backgroundColor = " #491449"
        document.getElementById("가입버튼").style.color = "white"
        document.getElementById("가입버튼").disables = false
        document.getElementById("가입버튼").addEventListener("click", function(){
            가입확인기능()
            alert("가입을 축하드립니다.")
                document.getElementById("가입버튼").style.backgroundColor = "gray"
                document.getElementById("가입버튼").style.color = "black"
                document.getElementById("가입버튼").disables = true
                document.getElementById("이름").value = ""
                document.getElementById("이메일").value = ""
                document.getElementById("비번").value = ""
                document.getElementById("비번확인").value = ""
                document.getElementById("전화번호").value = ""  
                document.getElementById("자기소개").value = ""
                document.getElementById("radio_1").checked = false
                document.getElementById("radio_2").checked = false
                document.getElementById("checkbox_").checked = false
                document.getElementById("인증번호보여주는곳").innerText = "000000"
            })
        }else{
        document.getElementById("가입버튼").style.backgroundColor = "gray"
        document.getElementById("가입버튼").style.color = "black"
        document.getElementById("가입버튼").disables = true
    }
}



