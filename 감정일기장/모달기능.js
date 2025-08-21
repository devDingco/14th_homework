
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ모달 기능ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const 모달열기기능 = (모달종류) => {
    document.getElementById(모달종류).style = "display: block;";
    window.scrollTo({top: 0,});
    document.body.style.overflow = "hidden";
};

const 모달닫기기능 = (모달종류) => {
    document.getElementById(모달종류).style = "display: none;";
    document.body.style.overflow = "auto";
};

// esc클릭시 모달꺼지기

window.addEventListener ("keyup", (event) => {
    if (event.key === "Escape") {모달닫기기능('일기쓰기모달_전체');
    }
});
