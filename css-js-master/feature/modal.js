function preventScroll(e) {
    e.preventDefault();
  }  

const openModal = (modalGroup) => { // <string>
    document.getElementById(modalGroup).style = "display: block;"

    toScrollTop()

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false }); // 모바일 터치
}

// 삭제시 일기 넘버를 받아야함
const openDeleteModal = (modalGroup,contentNumber,key) => { // <string, number>
    console.log(modalGroup,contentNumber,key)
    document.getElementById(modalGroup).style = "display: block;"

    document.getElementById("delete_number_flag").innerHTML = `
        <p>${contentNumber}번 일기 삭제</p>
        <p>일기를 삭제하시겠어요?</p>
    `

    document.getElementById("delete_function_flag").innerHTML = `
        <button class="close_modal_button" onclick="closeModal('main_delete_modal_group')"><p>취소</p></button>
        <button class="confirm_modal_button" onclick="deleteContent(${contentNumber},'${key}'); closeModal('main_delete_modal_group');"><p>삭제</p></button>
    `

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

const successCopyDetail = () => {
    const detailText = document.getElementById("detail_content").innerText
    
    try {
        navigator.clipboard.writeText(`[민지의다이어리]: ${detailText}`)
        document.getElementById("detail_toast_flag").innerHTML = `
            <div class="copy_toast">
                    <p>내용이 복사되었습니다.</p>
                </div>
        `
    } catch (e) {
        alert(e)
    }
}