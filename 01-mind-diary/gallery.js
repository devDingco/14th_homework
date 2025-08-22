// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {
    const 사진목록 = document.querySelector(".사진목록");
    const 사진목록_offsetTop = 사진목록.offsetTop;
    const 사진필터 = document.querySelector("#사진필터");
    const 프로그레시브블러 = document.querySelector("#프로그레시브블러");
    const 스켈레톤로딩 = document.querySelector("#스켈레톤로딩");

    const 강아지불러오는기능 = () => {
        fetch("https://dog.ceo/api/breeds/image/random/10")
            .then((받아온결과) => 받아온결과.json())
            .then((객체만뽑힌결과) => {
                const 이미지다운로드주소들 = 객체만뽑힌결과.message;

                // 이미지를 생성하고 로드 이벤트 리스너를 추가
                const 이미지_로딩_약속들 = 이미지다운로드주소들.map(src => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve();
                        img.onerror = () => resolve(); // 오류 발생 시에도 로딩 완료로 간주
                        img.src = src;
                    });
                });

                // 모든 이미지가 로드될 때까지 기다림
                Promise.all(이미지_로딩_약속들).then(() => {
                    // 스켈레톤 숨기기
                    스켈레톤로딩.style.display = 'none';

                    // 이미지 표시
                    document.getElementById("강아지보여주는곳").innerHTML = 이미지다운로드주소들.map(el => `
                        <img src="${el}" class="강아지사진" />
                    `).join("");
                });
            });
    };

    강아지불러오는기능();

    사진필터.addEventListener("change", e => 사진스타일변경(e));

    const 사진스타일변경 = (e) => {
        사진목록.classList.remove('가로형', '세로형');
        const selectedValue = e.target.value;
        if (selectedValue === '가로형') {
            사진목록.classList.add('가로형');
        } else if (selectedValue === '세로형') {
            사진목록.classList.add('세로형');
        }
    };

    // --- 스크롤 이벤트 (컨트롤바 색상 변경) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 사진목록_offsetTop) {
            사진필터.classList.add('scrolled');
            프로그레시브블러.classList.add('scrolled');
        } else {
            사진필터.classList.remove('scrolled');
            프로그레시브블러.classList.remove('scrolled');
        }
    });
});