const 버튼비틀어 = (비틀기) => {
    document.getElementById(비틀기).style = "transform: rotateZ(30deg);"
}

const 저장된정보 = localStorage.getItem('전달할것')

const 정보 = JSON.parse(저장된정보)

const 쿼리스트링 = location.search
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링)
const 일기번호상자 = 잘게나누어담은통.get("edit")

// alert(`나 ${일기번호상자}야`)

console.log(정보)

// const 정보의id값

const 제목 = 정보[0].제목
const 내용 = 정보[0].내용

const 인풋 = document.getElementById("frame_63");
const 인풋2 = document.getElementById("frame_63_2");

if (제목) {
    인풋.value = 제목;
}

if (내용) {
    인풋2.value = 내용;
}
