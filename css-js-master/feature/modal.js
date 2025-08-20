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