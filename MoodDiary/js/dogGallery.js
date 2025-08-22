       
       let 강아지메뉴 = ""

       const 사진사이드바 = () => {
        document.getElementById("필터일기등록").innerHTML = 
                    `
                            <select name="" id="사진배열" onchange="사진배열(event)">
                          
                            <option value="column">기본형</option>
                            <option value="row">가로형</option>
       
                        </select>
                        `
                       
    
    }

    const 사진배열 = (event) => {
        const type = event.target.value
        document.getElementById("사진목록").style.flexDirection = type
    }
       
       const 강아지불러오는기능 = () => {
            fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
                받아온결과.json().then((객체만뽑힌결과) => {
                    console.log(객체만뽑힌결과)

                    const 이미지다운로드주소들 = 객체만뽑힌결과.message
                    const 상태 = 객체만뽑힌결과.status
                    console.log(`이미지다운로드주소들: ${이미지다운로드주소들}`)
                    console.log(`상태: ${상태}`)

                    강아지메뉴 = `
                    <div class="일기목록" id="사진목록">
                    ${이미지다운로드주소들.map(el => `
                        <img src="${el}" alt="" width="300px" id="강아지사진들">
                    `).join("")}
                   </div> `

                    document.getElementById("일기메인").innerHTML = 강아지메뉴
                    
                    
                        
                })
            })
        }