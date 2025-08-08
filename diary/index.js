function 등록하기() {
  let 기존배열 = [];

  const 제목값 = document.getElementById("제목").value;
  const 내용값 = document.getElementById("내용").value;
  const 기분값 = document.querySelector('input[name="감정"]:checked').value;

  const 추가배열 = {
    기분: 기분값,
    제목: 제목값,
    내용: 내용값,
  };

  기존배열.push(추가배열);
}
