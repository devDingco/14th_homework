
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
        받아온결과.json().then((객체만뽑힌결과) => {

            const 이미지다운로드주소 = 객체만뽑힌결과.message
            
            // console.log(이미지다운로드주소)
            // 이미지다운로드주소.forEach((dog) => console.log(dog))

            // const aaa = document.getElementById("강아지보여주는곳").innerHTML = `
            // <img src="${dog}" width="300px" /> `

            const 아무배열 = []

            이미지다운로드주소.forEach((dog) => {
                아무배열.push(
                `
                <img src="${dog}" width="300px" /> 
                `
                )
            })
            
            // console.log(아무배열.join(""))
            document.getElementById("강아지보여주는곳").innerHTML = 아무배열.join("")

            // console.log("이미지다운로드HTML:",이미지다운로드HTML)
        
        })
    })