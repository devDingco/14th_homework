// 메인 다이어리 컨테이너 스크롤 동작
if (document.getElementById("diary_box_container")) {
    document.getElementById("diary_box_container").addEventListener("scroll", () => {
        const dairyContainerScroll = document.getElementById("diary_box_container").scrollTop
    
        if (dairyContainerScroll > 0) {
            document.getElementById("diary_filter").style = "background: black; color: white;"
        } else if (dairyContainerScroll === 0) {
            document.getElementById("diary_filter").style = "backgorund: white; color: black;"
        }
    })
}


// 메인 플로팅 버튼
window.addEventListener("scroll", () => {
    // const windowHeight = window.innerHeight
    
    // const footerH = document.getElementById("footer").getBoundingClientRect().top
    // console.log(`현재보이늰화면위_푸터위까지길이: ${footerH}`)

    // const currentScrollH = document.documentElement.scrollTop
    // console.log(currentScrollH)

    // if (windowHeight >= footerH) {
    //     document.getElementById("diary_float_btn").style = `
    //         position: absolute;
    //         bottom: ;
    //         left: 78%;
    //     `
    // } else {
    //     document.getElementById("diary_float_btn").style = `
    //         position: fixed;
    //         bottom: 10px;
    //         left: 78%;
    //     `
    // }
})

const toScrollTop = (tagId) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    // document.getElementById("diary_box_container").scrollTo({ top: 0, behavior: "smooth" })
    document.getElementById(tagId).scrollTo({ top: 0, behavior: "smooth" })
}

// 사진보관함 맨밑까지 스크롤시 작동
let picTimer = null;
window.addEventListener("scroll", () => {
    if (document.getElementById("pic_box_container")) {
        const 스크롤퍼센트 = document.documentElement.scrollTop / (document.documentElement.scrollHeight)
        if(스크롤퍼센트 < 0.8) return;
        if(picTimer !== null) return;
        
        console.log("상자를 그려줍니다.")
        addPicStorageHtml(10)
    
        picTimer = setTimeout(() => {
            picTimer = null
    
            const 마지막스크롤퍼센트 = document.documentElement.scrollTop / (document.documentElement.scrollHeight)
            console.log(마지막스크롤퍼센트)
            if(마지막스크롤퍼센트 === 1) addPicStorageHtml(10)
        }, 2000) 
    }

})

