// 메인 다이어리 컨테이너 스크롤 동작
document.getElementById("diary_box_container").addEventListener("scroll", () => {
    const dairyContainerScroll = document.getElementById("diary_box_container").scrollTop

    if (dairyContainerScroll > 0) {
        document.getElementById("diary_filter").style = "background: black; color: white;"
    } else if (dairyContainerScroll === 0) {
        document.getElementById("diary_filter").style = "backgorund: white; color: black;"
    }
})

// 메인 플로팅 버튼
window.addEventListener("scroll", () => {
    // const windowHeight = window.innerHeight
    
    const footerH = document.getElementById("footer").getBoundingClientRect().top
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

const toScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    document.getElementById("diary_box_container").scrollTo({ top: 0, behavior: "smooth" })
}