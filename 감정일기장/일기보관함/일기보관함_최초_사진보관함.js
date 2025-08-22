const 일기보관함내용보이기 = () =>{
    window.document.getElementById("일기보관함_프레임").style = 
        "display: block;";
    window.document.getElementById("일기보관함_필터버튼").style =
        "display: flex;";
    window.document.getElementById("일기보관함탭").style = 
        "display: block;";
            
    window.document.getElementById("사진보관함_프레임").style = 
        "display: none;";
    window.document.getElementById("사진보관함_필터버튼").style =
        "display: none;";
    window.document.getElementById("사진보관함탭").style = 
        "display: block;";
    
    일기그리기기능();
}

const 사진보관함내용보이기 = () =>{
        window.document.getElementById("일기보관함_프레임").style = 
            "display: none;";
        window.document.getElementById("일기보관함_필터버튼").style =
            "display: none;";
        window.document.getElementById("일기보관함탭").style = 
            "color: var(--Gray-Gray-400, #ABABAB); border: none;" 
                
        window.document.getElementById("사진보관함_프레임").style = 
            "display: block;";
        window.document.getElementById("사진보관함_필터버튼").style =
            "display: block;";
        window.document.getElementById("사진보관함탭").style = 
            "color: #000; border-bottom: 0.25rem solid #000"

    강아지사진가져오기();
}

const 강아지사진가져오기 = () => {
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
        받아온결과.json().then((객체로변경한결과) => {
            const 사진주소 = 객체로변경한결과.message;
            console.log(사진주소)

            const 강아지사진리스트 =  사진주소.map(
                (el, index) => `<img src="${el}" alt="강아지사진${index}" />`  
            ).join("");
            console.log(강아지사진리스트)

            document.getElementById("강아지사진보이는곳id").innerHTML = 강아지사진리스트
        })
    })
}