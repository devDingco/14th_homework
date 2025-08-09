let timer;
 function 인증번호요청기능(){
            const myauth = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");   
            document.getElementById("인증번호보여주는곳").innerText = myauth;
        
            let left_time = 180;
            setInterval(function(){
                const min = Math.floor(left_time / 60);
                const sec = left_time % 60;
                document.getElementById("남은시간보여주는곳").innerText = min + ":" + String(sec).padStart(2,"0");
                left_time = left_time - 1 ;
            }, 1000); 
            document.getElementById("버튼").disabled = true;
            document.getElementById("버튼").style = "color: red";
        
        }