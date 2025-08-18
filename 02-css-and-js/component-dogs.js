// const 강아지메뉴 =`
//     <div id="이미지나오는곳"></div>
//     <p>강아지목록</p>
//     <p>강아지사진1</p>
//     <p>강아지사진2</p>
//     <p>강아지사진3</p>
// `
// const 이미지불러오는기능 =()=>{
//     fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) =>{
//         받아온결과.json().then((객체만결과)=>{
//             console.log(객체만결과)
//             document.getElementById("메뉴보여주는곳").innerHTML = 일기메뉴
//             const 이미지다운로드주소배열 = 객체만결과.message
//             const 상태 = 객체만결과.status
//             console.log(`이미지다운로드주소배열 : ${이미지다운로드주소배열}`)
//             console.log(`상태 : ${상태}`)

//             document.getElementById("이미지나오는곳").innerHTML = 이미지다운로드주소배열.map(el => { return `
//                <img src="${el}" width="300px" >`
//             }).join("")
            
//         })
//     })
// }