
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
        받아온결과.json().then((객체만뽑힌결과) => {

            const 이미지다운로드주소 = 객체만뽑힌결과.message

            const 아무배열 = []

            이미지다운로드주소.forEach((dog) => {
                아무배열.push(
                `<div>
                    <img src="${dog}"  class="강아지"/> 
                </div>
                `
                )
            })

            document.getElementById("강아지보여주는곳").innerHTML = 아무배열.join("")

        
        })
    })