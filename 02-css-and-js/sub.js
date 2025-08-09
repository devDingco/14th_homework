window.onload = function() {
    const 쿼리스트링 = location.search
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링)
    const 일기인덱스 = 잘게나누어담은통.get("number")
    const 일기들 = localStorage.getItem("일기목록")
    const 일기목록 = JSON.parse(일기들 === null ? "[]" : 일기들)
    

    document.getElementById("타이틀나타나는곳").innerText = `${일기목록[일기인덱스].제목}`
    document.getElementById("날짜나타는곳").innerText =`${일기목록[일기인덱스].날짜}`
    document.getElementById("이모지나타는곳").innerHTML =`<img src="./assets/images/작은${일기목록[일기인덱스].감정}.png">`
    document.getElementById("감정나타나는곳").innerText =`${일기목록[일기인덱스].감정}`
    document.getElementById("내용나타는곳").innerText =`${일기목록[일기인덱스].내용}`
};
        
        