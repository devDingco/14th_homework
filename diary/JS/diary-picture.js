// ------------------------------------- 사진 보관함 -------------------------------------

// 사진보관함

// 공통: 강아지 1마리 불러오기
const 강아지한마리그리기 = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const 이미지다운로드주소 = data.message
            document.getElementById('강아지보여주는곳').innerHTML += `
                <img src="${이미지다운로드주소}" class="보관된사진" width="300px" />`
        })
        .catch(error => {
            console.error('강아지 불러오기 실패:', error)
        })
}

// 초기 10마리 불러오기
const 초기강아지로드 = (개수 = 10) => {
    for (let i = 0; i < 개수; i++) {
        강아지한마리그리기()
    }
}

// 무한 스크롤
const 강아지불러오는기능 = () => {
    console.log("강아지불러오는기능 실행됨")

    // 페이지 진입 시 미리 10마리
    초기강아지로드(10)

    let 타이머2 = "아직실행안함"
    window.addEventListener("scroll", () => {
        if (타이머2 !== "아직실행안함") return
        타이머2 = setTimeout(() => {
            타이머2 = "아직실행안함"
        }, 100)

        const 스크롤퍼센트 =
            document.documentElement.scrollTop /
            (document.documentElement.scrollHeight - document.documentElement.clientHeight)

        if (스크롤퍼센트 >= 0.7) {
            console.log("강아지를 추가로 그려줍니다.")
            강아지한마리그리기()
        }
    })
}

// 사진보관함 메뉴 클릭 시 이벤트

window.addEventListener("DOMContentLoaded", () => {
    강아지불러오는기능()
    
    // const 사진보관함메뉴 = document.getElementById('사진보관함ID')
    // 사진보관함메뉴.addEventListener('click', () => {
    //     메뉴이동('메뉴__사진보관함')
    // })

})


// 사진필터 설정

function pictureFilter(selectedSize) {

    document.querySelectorAll(".보관된사진").forEach((el) => {
        if (selectedSize === "기본") {
            el.style.aspectRatio = "1/1";
        } else if (selectedSize === "가로형") {
            el.style.aspectRatio = "4/3";
        } else if (selectedSize === "세로형") {
            el.style.aspectRatio = "3/4";
        }
    })

}

window.addEventListener("DOMContentLoaded", () => {

    const filterSelect = document.querySelector(".사진필터")

        filterSelect.addEventListener("change", (event) => {
            const selectedSize = event.target.value
            pictureFilter(selectedSize)
        })

})

// 필터 색반전
window.addEventListener("DOMContentLoaded", () => {

    const filterSelect = document.querySelector(".필터")

    // 선택창 열렸을 때 색 반전
    filterSelect.addEventListener("focus", () => {
        filterSelect.classList.add("focused");
    });

    // 선택창 닫혔을 때 색 원상복구
    filterSelect.addEventListener("blur", () => {
        filterSelect.classList.remove("focused");
    });
});