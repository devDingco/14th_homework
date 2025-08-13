
    const scrollFn = () => {
        //   window.scrollTo({top:0}) //스크롤 맨 위로 올려줘!
        //  window.scrollBy({top:-500}) // 스크롤 지금 위치에서 500만큼 올려줘
        window.scrollTo({top: 0, behavior: "smooth"}) //스크롤 부드럽게 올려줘
    }















// window.onload = () => {
//             const 나의이름 = prompt("이름을 입력하세요")
//             document.getElementById("이름입력하는곳").innerText = 나의이름
//         }

// window.onload = () => {
//            const 나의이름 = prompt("이름을 입력하세요")
//            document.getElementById("이름입력하는곳").innerText = 나의이름
// }
// window.onload = () => {
//            const 나의이름 = prompt("이름을 입력하세요")
//            document.getElementById("이름입력하는곳").innerText = 나의이름
// }
// window.onload = () => {
//            const 나의이름 = prompt("이름을 입력하세요")
//            document.getElementById("이름입력하는곳").innerText = 나의이름
// }


// const 쿼리스트링 = location.search
//         const 잘게나누어담은통 =  new URLSearchParams(쿼리스트링)
//         const 감정인덱스 = 잘게나누어담은통.get("number")       

//         const 감정들 = localStorage.getItem("감정목록")
//         const 감정목록 = JSON.parse(감정들 === null ? "[]" : 감정들 )        

        
//         alert(`${감정목록[감정인덱스].이름}의 페이지에 오신 것을 환영합니다.`)

// const 감정제목담는통 = () => {
//     let 감정타이틀 = const id_diary__title() = {} 여기완성해줘
// }
// const 감정등록기능 = () => {
//             const 감정1 ={
//                 감정: "슬퍼요",
//                 제목: "받아온 타이틀제목들어가게"
//             }
//             const 감정2 ={
//                 감정: "놀랐어요",
//                 제목: "받아온 타이틀제목들어가게"
//             }
//             const 감정3 ={
//                 감정: "화나요",
//                 제목: "받아온 타이틀제목들어가게"
//             }
//             const 감정4 ={
//                 감정: "행복해요",
//                 제목: "받아온 타이틀제목들어가게"
//             }
//             const 감정5 ={
//                 감정: "기타",
//                 제목: "받아온 타이틀제목들어가게"
//             }
//             const 감정들 = [감정1, 감정2, 감정3, 감정4, 감정5]
//             localStorage.setItem("친구목록", JSON.stringify(친구들))
//         }

//         const 감정조회기능 = () => {

//             const 감정들 = localStorage.getItem("감정목록")

//             const 감정목록배열 = JSON.parse(감정들 === null ? "[]" : 감정들)

//             const 감정목록HTML = 감정목록배열.map((el, index) => `
//                 <div>
//                      <a href="./02-routing-detail.html?number=${index}">
//                     감정은 ${el.감정}이고, 제목은 ${el.제목}입니다.
//                     </a>
//                 </div>    
                
//             `).join("") 
//             document.getElementById("감정목록").innerHTML = 감정목록HTML

//         }

