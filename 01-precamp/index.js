let 수강생리스트 =[];

function 인증번호요청기능(){
    const 인증번호 =String(Math.floor(Math.random() *1000000)).padStart(6,"0")
    document.getElementById("인증번호요청").innerText = 인증번호;

    let 남은시간 = 180
    timer = setInterval(function(){
        const 분 = String(Math.floor(남은시간/60)).padStart(2,"0")
        const 초 = String(남은시간 % 60).padStart(2, "0");
        document.getElementById("남은시간보여주는곳").innerText = 분 + ":" + 초
        남은시간 = 남은시간 -1;
        
        if(남은시간 <0){
            clearInterval(timer)
        }
    },1000);
}

// function 인증완료기능(){
//     const 결과버튼 = document.getElementById()
// }

function 회원가입기능(){
    const 날짜 = new Date();
    const 년 = 날짜.getFullYear();
    const 월 = 날짜.getMonth() +1;
    const 일 = 날짜.getDate();
    const 가입연월일 = `${년}-${월}-${일}`

    alert(`회원가입을 축하합니다 (가입일시 : ${가입연월일})`);
    
    const 입력한이름 = document.getElementById("이름입력창").value;
    const 입력한이메일 = document.getElementById("이메일입력창").value;
    const 입력한비밀번호 = document.getElementById("비밀번호입력창").value;
    const 입력한전화번호 = document.getElementById("전화번호입력창").value;
    const 입력한성별 = document.querySelector('input[name="성별"]:checked').value;
    const 입력한자기소개 = document.getElementById("자기소개입력창").value;
    
    const 쪼갠전화번호 = 입력한전화번호.split("-")
    const 쪼갠전화번호앞 = 쪼갠전화번호[0]
    const 쪼갠전화번호중간 = 쪼갠전화번호[1]
    const 쪼갠전화번호뒤 = 쪼갠전화번호[2]

    const 새로운전화번호 = `${쪼갠전화번호앞}-****-${쪼갠전화번호뒤}`

    const 새로운수강생 = {
        이름:입력한이름, 이메일:입력한이메일 , 비밀번호:입력한비밀번호,
        전화번호: 새로운전화번호, 성별: 입력한성별, 자기소개: 입력한자기소개 ,가입일시: 가입연월일
        
    }
    
    수강생리스트.push(새로운수강생)
    수강생목록만들기()
}


function 수강생목록만들기(){
    let 수강생 = 수강생리스트[수강생리스트.length -1]
    const 수강생목록 =`
    <div class="바디__메인__메뉴__수강생리스트__수강생모음" onclick="수강생정보보여주기(${0})">
        <img src="./assets/icons/프로필이미지.png" alt="">
        <div class="바디__메인__메뉴__수강생리스트__수강생모음__수강생이름">${수강생.이름}</div>
    </div>`;

    window.document.getElementById("수강생보여주는곳").innerHTML = 수강생목록;
    
}

function 수강생정보보여주기(수강생번호) {
    const 수강생정보 = 수강생리스트[수강생번호];
    alert(`이름 : ${수강생정보.이름}
        이메일 : ${수강생정보.이메일}
        비밀번호 : ****
        성별 : ${수강생정보.성별} 
        전화번호 : ${수강생정보.전화번호}
        동의여부 : Y 
        자기소개 : ${수강생정보.자기소개}
        (가입일시 : ${수강생정보.가입일시})`
    );
  }

function 인증완료기능() {
    document.getElementById("인증하기버튼").innerHTML = `<img src="./assets/images/인증후.png">`
    document.getElementById("인증하기버튼").disabled = true;
  }