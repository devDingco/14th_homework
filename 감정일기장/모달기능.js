
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

// const 일기등록취소기능 = () => {

// }