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
};

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
};

const 강아지사진가져오기 = () => {
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
        받아온결과.json().then((객체로변경한결과) => {
            const 사진주소 = 객체로변경한결과.message;
            console.log(사진주소)

            const 강아지사진리스트 =  사진주소.map(
                (el, index) => `<img class="강아지사진" id="강아지사진" src="${el}" alt="강아지사진${index}" />`  
            ).join("");
            // console.log(강아지사진리스트)

            document.getElementById("강아지사진보이는곳id").innerHTML = 강아지사진리스트
        })
    })
};

const 사진크기필터링 = (event) => {
    const 사진필터선택 = event.target.value;
    const 사진리스트 = document.querySelectorAll(".강아지사진");

    사진리스트.forEach((사진) => {
        switch (사진필터선택) {
            case "가로형선택": 
                사진.style.aspectRatio = "4 / 3";
                사진.style.maxWidth = "63rem";
                사진.style.width = "100%";
                break;
            case "세로형선택":
                사진.style.aspectRatio = "3 / 4";
                사진.style.maxWidth = "48rem";
                사진.style.width = "100%";
                break;
            default:
                사진.style.aspectRatio = "1 / 1";
                사진.style.maxWidth = "63rem";
                사진.style.width = "100%";
                break;
        }
    }); 
};