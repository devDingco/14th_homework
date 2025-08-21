function preventScroll(e) {
    e.preventDefault();
  }  

const openModal = (modalGroup) => { // <string>
    document.getElementById(modalGroup).style = "display: block;"

    toScrollTop()

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false }); // 모바일 터치
}

const closeModal = (modalGroup) => {
    document.getElementById(modalGroup).style = "display: none;"

    window.removeEventListener("wheel", preventScroll, { passive: false });
    window.removeEventListener("touchmove", preventScroll, { passive: false });
}

const closeAllModal = (modalGroupArray) => { // <Array>
    modalGroupArray.forEach((v)=>{
        document.getElementById(v).style = "display: none;"
    })

    window.removeEventListener("wheel", preventScroll, { passive: false });
    window.removeEventListener("touchmove", preventScroll, { passive: false });
}

// esc 누를시 등록모달 닫기
window.addEventListener("keydown",(e) => {
    switch (e.key) {
        case "Escape": {
            document.getElementById("main_write_modal_group").style = "display: none;"

            window.removeEventListener("wheel", preventScroll, { passive: false });
            window.removeEventListener("touchmove", preventScroll, { passive: false });
        }
        default:
    }
})