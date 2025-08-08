function 인증번호요청기능() {
    const 나의인증번호 = String(
      Math.floor(Math.random() * 1000000)
    ).padStart(6, "0");
    document.getElementById("인증번호보여주는곳").innerText = 나의인증번호;
    document.getElementById("인증번호요청버튼").disabled = true;
    document.getElementById("인증번호요청버튼").style.backgroundColor="#C7C7C7";
    document.getElementById("인증번호요청버튼").style.color="#F2F2F2";
    document.getElementById("타이머").style.color="#E84F4F";
    
      if(남은시간 >=0) {
        let 남은시간 = 180
        let 분 = Math.floor(남은시간 / 60)
        let 초 = String(남은시간 % 60).padStart(2,"0")
        document.getElementById("타이머").innerText = 분 + ":" + 초
        남은시간 = 남은시간 - 1
      }
      

  }
  
  function 인증완료() {
    document.getElementById("인증하기버튼").disabled = true;
    document.getElementById("인증하기버튼").innerText = "인증완료";
    document.getElementById("인증하기버튼").style.backgroundColor="#C7C7C7";
    document.getElementById("인증하기버튼").style.color="#F2F2F2";
  }
    

