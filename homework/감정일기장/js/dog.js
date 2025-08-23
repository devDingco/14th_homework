const 강아지불러오는기능 = () => {
  fetch('https://dog.ceo/api/breeds/image/random/10').then((받아온결과) => {
    받아온결과.json().then((객체만뽑힌결과) => {
      console.log(객체만뽑힌결과);

      const 이미지다운로드주소들 = 객체만뽑힌결과.message;
      const 상태 = 객체만뽑힌결과.status;
      console.log(`메세지: ${이미지다운로드주소들}`);
      console.log(`상태: ${상태}`);
      document.getElementById('강아지보여주는곳').innerHTML =
        이미지다운로드주소들
          .map((el) => ` <img src="${el}" width='300px' height='300px'  />`)
          .join('');
    });
  });
};
const 선택기능 = (event) => {
  document.getElementById(
    '드롭다운제목ID'
  ).style = `--철수의css변수: "${event.target.id}"`;
  document.getElementById('드롭다운제목ID').click();
  
  // 선택된 항목에 따라 기본 항목 보이기/숨기기
  const 기본라벨 = document.querySelector('#기본 + label');
  if (event.target.id === '기본') {
    // 기본 선택시 숨기기
    기본라벨.style.display = 'none';
  } else {
    // 다른 것 선택시 보이기
    기본라벨.style.display = 'block';
  }
};
// 페이지 로드되면 자동으로 강아지 사진 보여주기
document.addEventListener('DOMContentLoaded', function () {
  강아지불러오는기능();
});
