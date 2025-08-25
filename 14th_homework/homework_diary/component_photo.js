
const 사진보관함렌더링 =()=>{
    document.getElementById("필터검색일기쓰기버튼").innerHTML=`
    <select onchange="강아지사진형태생성(event)">
        <option id="기본" value="기본형">기본형</option>
        <option id="가로" value="가로형">가로형</option>
        <option id="세로" value="세로형">세로형</option>
                        
    </select> 
    `
    사진불러오는기능()
}

window.사진보관함렌더링 = 사진보관함렌더링;

const 사진불러오는기능 = () => {
    fetch("https://dog.ceo/api/breeds/image/random/10")
        .then((받아온결과) => {
            받아온결과.json().then((객체만뽑힌결과) => {
                const 이미지다운로드주소들 = 객체만뽑힌결과.message;
                const 상태 = 객체만뽑힌결과.status;
                document.getElementById("카드영역").innerHTML = 이미지다운로드주소들
                    .map((ele) =>
                         `<img class="강아지사진" src="${ele}">`)
                    .join("");
            });
        });
};

const 강아지사진형태생성= (event)=>{
    const 값 = event.target.value
    console.log(값)
    const 강아지사진들 = document.querySelectorAll(".강아지사진")
    console.log(강아지사진들)
    강아지사진들.forEach((ele)=>{
        switch(값){
            case "기본형" : {
                ele.style.cssText = " aspect-ratio : 1/1; object-fit: cover;"
                break
            }
            case "가로형" :{
                ele.style.cssText = "aspect-ratio : 4/3; object-fit: cover;"
    
                break
            }
            case "세로형"  : {
                ele.style.cssText = "aspect-ratio : 3/4; object-fit: cover; "
    
                break
            }
    }
})
    
}
